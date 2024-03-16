'use client'

import { useState } from "react";
import { unlockForum } from "./ServerActions";
import ForumCategory from "@/libs/types/entities/ForumCategory";

export interface Props {
  categories: ForumCategory[]
}

export default function UnlockForumForm(props: Props) {
  const { categories } = props;

  const [loading, setLoading] = useState<boolean>();
  const [category, setCategory] = useState<ForumCategory | undefined>(undefined);
  const [error, setError] = useState<string>();

  function onSubmit(formData: FormData) {
    setLoading(true);

    const category = categories.find(c => c._id == formData.get("categoryId")?.toString() || "");

    const forum = category?.forums.find(f => f._id == formData.get("forumId")?.toString() || "");

    const result = confirm(`Are you sure you want to unlock ${forum?.name || "null"}?`)

    if (!result) {
      setLoading(false);
      return;
    }

    unlockForum(formData).then(res => {
      if (res) {
        setLoading(false);
        setError(res);
      } else {
        setLoading(true);
        window.location.assign("/forums");
      }
    })
  }

  function onSelectCategory(newCategoryId: string) {
    const newCategory = categories.find(c => c._id == newCategoryId);
    setCategory(newCategory);
  }

  return <form action={onSubmit} className="bg-base-200 flex flex-col gap-2">
    <div className="flex flex-col gap-1">
      <label className="text-lg font-bold" htmlFor="categoryId">Category</label>
      <select 
        className="p-2 rounded-lg"
        id="categoryId" name="categoryId"
        required
        onChange={e => onSelectCategory(e.currentTarget.value)}>
        <option disabled selected value="">Select Category</option>
        {categories.map((c, i) =>
          <option key={i} value={c._id}>{c.name}</option>
        )}
      </select>
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-lg font-bold" htmlFor="forumId">Forum</label>
      <select className="p-2 rounded-lg" id="forumId" name="forumId" required>
        <option disabled selected value="">Select Forum</option>
        {category?.forums.map((f, i) =>
          <option key={i} value={f._id}>{f.name}</option>
        )}
      </select>
    </div>
    <div className="text-lg text-red-600 font-bold">
      {error}
    </div>
    <button 
      className="btn px-3 bg-red-700 hover:bg-red-800 text-white font-bolder"
      type="submit"
      disabled={loading || !category}>
      {loading ? "Locking.." : "Lock"}
    </button>
  </form>
}


