'use server'

import Ticket from "@/libs/types/entities/Ticket";
import z from "zod"
import { CreateTicket } from "@/services/forum/ticket/TicketService";
import { randomUUID } from "crypto";
import { isResultError } from "@/libs/Utils";

const schema = z.object({
  title: z.string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(30, { message: "Title must be at max 30 characters long" }),
  body: z.string()
    .min(15, { message: "Message must be at least 15 characters long" })
    .max(2000, { message: "Message must be at max 2000 characters long" }),
});

export async function createTicket(formData: FormData) {
  const result = schema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
  });

  if (!result.success)
    return result.error.errors
      .map(err => err.message)
      .reduce((msg, acc) => acc + "\n" + msg);

  const title = result.data.title;
  const body = result.data.body;

  const crrDate = Date.now().toFixed();
  const message = title + "\n\n" + body;

  const ticket: Ticket = {
    _id: randomUUID(),
    author: randomUUID(),
    category: "null",
    createdAt: crrDate,
    lastUpdatedAt: crrDate,
    body: message,
    status: "new"
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
