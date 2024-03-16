'use client'

import { useState } from "react";
import { createCategory } from "./ServerActions";

export default function CreateCategoryForm() {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  function onSubmit(formData: FormData) {
    setLoading(true);

    createCategory(formData).then(res => {
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
      <label className="text-lg" htmlFor="name">Category Name</label>
      <input className="text-lg rounded-lg" name="name" id="name" />
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-lg" htmlFor="weight">Category Weight</label>
      <input type="number" className="text-lg rounded-lg" name="weight" id="weight" />
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
