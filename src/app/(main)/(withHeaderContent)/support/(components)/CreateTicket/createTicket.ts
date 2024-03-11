'use server'

import Ticket from "@/libs/types/entities/Ticket";
import z from "zod"
import { CreateTicket } from "@/services/forum/ticket/TicketService";
import { randomUUID } from "crypto";
import { isResultError } from "@/libs/Utils";
import getSession from "@/libs/session/getSession";
import { QUESTIONS } from "../Questions";
import { GetAllTicketCategories } from "@/services/forum/ticket/TicketCategoryService";
import { getAllFilters } from "@/services/forum/filter/TextFilterService";

const schema = z.object({
  title: z.string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(30, { message: "Title must be at max 30 characters long" }),
  body: z.string()
    .min(15, { message: "Message must be at least 15 characters long" })
    .max(2000, { message: "Message must be at max 2000 characters long" }),
  category: z.string({ invalid_type_error: "Category was not selected" })
});

const schemas = QUESTIONS
  .map(q => {
    let schema: { [key: string]: z.ZodSchema } = {};
    schema["title"] = z.string()
      .min(3, { message: "Title must be at least 3 characters long" })
      .max(30, { message: "Title must be at max 30 characters long" });

    for (let field of q.fields) {
      switch (field.type) {
        case "Checkbox":
          if (field.required) {
            schema[field.name] = z.string({ required_error: `${field.displayName} is not marked` })
              .transform(value => value === "on" ? "yes" : "no");
          } else
            schema[field.name] = z.string().optional().transform(value => !value ? "no" : "yes");
          break;
        case "Number":
          if (field.required) {
            schema[field.name] = z.number({
              invalid_type_error: `${field.displayName} provided is not a number`,
              required_error: `${field.displayName} is required`,
            });
          } else {
            schema[field.name] = z.number({
              invalid_type_error: `${field.displayName} provided is not a number`
            });
          }
          break;
        case "ShortText":
        case "TextArea":
          if (field.required) {
            schema[field.name] = z.string()
              .min(2, { message: `${field.displayName} must be at minimum 2 characters long` })
              .max(2000, { message: `${field.displayName} must be at most 2000 characters long` });
          } else {
            schema[field.name] = z.string()
              .max(2000, { message: `${field.displayName} must be at most 2000 characters long` });
          }
          break;
      }
    }

    return z.object(schema);
  }).reduce<{ [key: string]: z.ZodObject<{ [key: string]: z.ZodSchema }> }>((acc, crr, i) => {
    acc[QUESTIONS[i].name] = crr;
    return acc;
  }, {});

export async function createTicket(formData: FormData) {
  const categoryEntry = formData.get("category");

  if (!categoryEntry)
    return "Category was not selected";

  const categories = (await GetAllTicketCategories())[0]!;
  const category = categories.find(c => c._id == categoryEntry.valueOf().toString());
  if (!category)
    return "Invalid category";

  let toParse: { [key: string]: any } = {};
  formData.forEach((val, key) => toParse[key] = val);

  const result = schemas[category.name].safeParse(toParse);

  if (!result.success)
    return result.error.errors
      .map(err => err.message)
      .reduce((msg, acc) => acc + "\n" + msg);

  let body;
  try {
    body = Object.keys(result.data).reduce((acc, crr) =>
      crr == "title"
        ? acc
        : acc + "\n\n" +
        (QUESTIONS.find(q => q.name == category.name) || QUESTIONS[0])
          .fields.find(q => q.name == crr)?.label +
        "\n" +
        result.data[crr], "");
  } catch (err) {
    console.error(err);
    return "Error parsing body";
  }

  const title = result.data.title as string;

  const filters = (await getAllFilters())[0] || [];

  for (let filter of filters) {
    if (body.includes(filter.filter) || title.includes(filter.filter))
      return "Message did not pass text filtering"

  }

  const session = await getSession();
  const crrDate = Date.now().toFixed();

  const ticket: Ticket = {
    _id: randomUUID(),
    author: session.uuid,
    category: category._id,
    createdAt: crrDate,
    lastUpdatedAt: crrDate,
    title: title,
    body: body,
    parentTicket: null,
    status: "open",
    result: "Pending",
    replies: [],
  }

  const res = await CreateTicket(ticket);

  const isError = isResultError(res);
  if (isError) {
    const errMessage = "Error creating ticket: HTTP " + res[1]
    console.error(errMessage);
    return errMessage;
  }

  return true;
}
