'use client'

import { useState } from "react";
import { createForum } from "./ServerActions";
import ForumCategory from "@/libs/types/entities/ForumCategory";

export interface Props {
  categories: ForumCategory[]
}

export default function CreateForumForm(props: Props) {
  const { categories } = props;

  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  function onSubmit(formData: FormData) {
    setLoading(true);

    createForum(formData).then(res => {
      if (res) {
        setLoading(false);
        setError(res);
      } else {
        setLoading(true);
        window.location.assign("/forums");
      }
    })
  }

  return <form action={onSubmit} className="bg-base-200 flex flex-col gap-2">
    <div className="flex flex-col gap-1">
      <label className="text-lg" htmlFor="name">Forum Name</label>
      <input className="text-lg rounded-lg" name="name" id="name" />
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-lg" htmlFor="description">Forum Description</label>
      <input className="text-lg rounded-lg" name="description" id="description" />
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-lg" htmlFor="weight">Forum Weight</label>
      <input type="number" className="text-lg rounded-lg" name="weight" id="weight" />
    </div>
    <div className="flex flex-row gap-1">
      <input type="checkbox" className="text-lg rounded-lg" name="locked" id="locked" />
      <label className="text-lg" htmlFor="locked">Locked?</label>
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-lg font-bold" htmlFor="category">Category</label>
      <select className="p-2 rounded-lg" id="category" name="category" required>
        <option disabled selected value="">Select Category</option>
        {categories.map((c, i) =>
          <option key={i} value={c._id}>{c.name}</option>
        )}
      </select>
    </div>
    <div className="text-lg text-red-600 font-bold">
      {error}
    </div>
    <button
      className="btn px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bolder"
      type="submit"
      disabled={loading}>
      {loading ? "Saving.." : "SAVE"}
    </button>
  </form>
}
