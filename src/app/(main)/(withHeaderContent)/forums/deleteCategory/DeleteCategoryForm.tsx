'use client'

import { useState } from "react";
import { deleteCategory } from "./ServerActions";
import ForumCategory from "@/libs/types/entities/ForumCategory";

export interface Props {
  categories: ForumCategory[]
}

export default function DeleteCategoryForm(props: Props) {
  const { categories } = props;

  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  function onSubmit(formData: FormData) {
    setLoading(true);

    const category = categories.find(c => c._id == formData.get("id")?.toString() || "");

    const result = confirm(`Are you sure you want to delete ${category?.name || "null"}?`)

    if (!result) {
      setLoading(false);
      return;
    }

    deleteCategory(formData).then(res => {
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
      <label className="text-lg font-bold" htmlFor="id">Category</label>
      <select className="p-2 rounded-lg" id="id" name="id" required>
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
      className="btn px-3 bg-red-700 hover:bg-red-800 text-white font-bolder"
      type="submit"
      disabled={loading}>
      {loading ? "Deleting.." : "DELETE"}
    </button>
  </form>
}

