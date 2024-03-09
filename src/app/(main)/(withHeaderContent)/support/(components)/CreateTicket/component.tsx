'use client';

import './styles.css'
import Popup from "reactjs-popup";
import { useEffect, useState } from "react";
import { createTicket } from './createTicket';
import { GetAllTicketCategories } from '@/services/forum/ticket/TicketCategoryService';
import TicketCategory from '@/libs/types/entities/TicketCategory';
import { QUESTIONS } from '../Questions';

export default function Component() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<TicketCategory[]>([]);
  const [formQuestions, setFormQuestions] = useState<typeof QUESTIONS[0]>({
    name: "", 
    subtitle: "", 
    fields: [], 
    replies: [],
  });

  const fetchCategories = async () => {
    const res = await GetAllTicketCategories();
    setCategories(res[0] || []);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  function onSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    createTicket(formData).then(res => {
      if (typeof res == "string") {
        setError(res);
        setIsLoading(false);
      } else {
        window.location.reload();
      }
    });

  }

  function updateFormQuestions(categoryId: string) {
    const category = categories.find(c => c._id == categoryId);
    let questions = QUESTIONS.find(q => q.name == category?.name);
    if (!questions) questions = QUESTIONS[0];

    setFormQuestions(questions);
  }

  return <>
    <Popup trigger={
      <button
        className="btn btn-secondary min-h-fit h-fit min-w-fit w-fit rounded-none pl-3 pr-5 mr-[-8px] py-1 my-[-4px]">
        <span className="font-semibold text-base-200">Create <span className="hidden sm:inline-block">a new ticket</span></span>
      </button>
    } modal>
      <div className="max-h-[600px] flex flex-col bg-base-200 border-2 border-black px-4 py-2 gap-3 w-[700px] rounded-lg overflow-y-scroll">
        <h4 className="mt-2 text-center w-full">Create a new Ticket</h4>
        <hr className="mt-2 mb-4" />
        <form className="flex flex-col gap-3" action={onSubmit}>
          <label htmlFor="title">Title for your ticket</label>
          <input id="title" name="title" type="text" className="py-3 px-4 min-h h-fit w-full rounded-lg bg-base-100 placeholder:text-base placeholder:text-base-content" placeholder="Ticket Title" disabled={isLoading} required />
          <label htmlFor="category">Select the ticket category:</label>
          <select 
            className="py-3 px-4 min-h-fit h-fit w-full rounded-lg bg-base-100 placeholder:text-base placeholder:text-base-content"
            disabled={isLoading}
            id="category"
            name="category" 
            required
            onChange={e => updateFormQuestions(e.target.value)}>

            <option key={-1} value={-1} selected disabled>Select Category</option>
            {categories.map((category, i) =>
              <option key={i} value={category._id}>{category.name}</option>
            )}
          </select>
          <h5 className="text-center w-full">{formQuestions.subtitle}</h5>
          {formQuestions.fields.map((field, i) =>
            <div key={i}>
              {field.type != "Checkbox" ? <label htmlFor={field.name} className="mt-4">{field.label}</label> : <></>}
              {field.type == "ShortText"
                ? <input id={field.name} name={field.name} type="text" className="mt-1 py-3 px-4 min-h h-fit w-full rounded-lg bg-base-100 placeholder:text-base placeholder:text-base-content" placeholder={field.placeholder} disabled={isLoading} required />
                : field.type == "Number"
                  ? <input id={field.name} name={field.name} type="number" className="mt-1 py-3 px-4 min-h h-fit w-full rounded-lg bg-base-100 placeholder:text-base placeholder:text-base-content" placeholder={field.placeholder} disabled={isLoading} required />
                  : field.type == "Checkbox"
                  ? <input id={field.name} name={field.name} type="checkbox" className="mt-1 mx-2 w-4 h-4 rounded-lg" />
                  : <textarea id={field.name} name={field.name} className="mt-1 py-3 px-4 min-h-[150px] h-fit w-full rounded-lg bg-base-100 placeholder:text-base placeholder:text-base-content" disabled={isLoading} placeholder={field.placeholder} required />}
              {field.type == "Checkbox" ? <label htmlFor={field.name} className="mt-4">{field.label}</label> : <></>}
            </div>
          )}

          {error && <p className="text-error mb-[-8px]">{error}</p>}
          <button className="btn btn-secondary py-3 px-4 min-h-fit h-fit w-full mb-2" disabled={isLoading} type="submit">{isLoading ? "On it…" : "Create"}</button>
        </form>
      </div>
    </Popup>
  </>;
}
