'use client';

import './styles.css'
import Popup from "reactjs-popup";
import { useEffect, useState } from "react";
import { createTicket } from './createTicket';
import { GetAllTicketCategories } from '@/services/forum/ticket/TicketCategoryService';
import TicketCategory from '@/libs/types/entities/TicketCategory';

export default function Component() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<TicketCategory[]>([]);

  const fetchCategories = async () => {
    const res = await GetAllTicketCategories();
    setCategories(res[0] || []);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function onSubmit(formData: FormData) {
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

  return <>
    <Popup trigger={
      <button
        className="btn btn-secondary min-h-fit h-fit min-w-fit w-fit rounded-none pl-3 pr-5 mr-[-8px] py-1 my-[-4px]">
        <span className="font-semibold text-base-200">Create <span className="hidden sm:inline-block">a new ticket</span></span>
      </button>
    } modal>
      <div className="flex flex-col bg-base-200 border-2 border-black px-4 py-2 gap-3 w-[700px] rounded-lg">
        <h4 className="mt-2 text-center w-full">Create a new Ticket</h4>
        <hr className="mt-2 mb-4" />
        <form className="flex flex-col gap-3" action={onSubmit}>
          <input className="py-3 px-4 min-h-fit h-fit w-full rounded-lg bg-base-100 placeholder:text-base placeholder:text-base-content"
            disabled={isLoading} type="text" name="title" placeholder="Title" required />
          <textarea className="py-3 px-4 min-h-fit h-fit w-full rounded-lg bg-base-100 placeholder:text-base placeholder:text-base-content"
            disabled={isLoading} name="body" placeholder="Body" required />
          <select className="py-3 px-4 min-h-fit h-fit w-full rounded-lg bg-base-100 placeholder:text-base placeholder:text-base-content"
            disabled={isLoading} name="category" required>
            {categories.map(category =>
              <option value={category._id}>{category.name}</option>
            )}
          </select>

          {error && <p className="text-error mb-[-8px]">{error}</p>}
          <button className="btn btn-secondary py-3 px-4 min-h-fit h-fit w-full mb-2" disabled={isLoading} type="submit">{isLoading ? "On it…" : "Create"}</button>
        </form>
      </div>
    </Popup>
  </>;
}
