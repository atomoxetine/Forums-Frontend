'use client';
import './styles.css'
import React from "react";
import { BsSearchHeart } from "react-icons/bs";

const ShrinkableSearch = () => (
  <div className="shrinkable-search flex justify-end max-w-full">
    <input id="searchToggle" type="checkbox" className="drawer-toggle border-0"/>
    <div tabIndex={0} className="form-control border-0">
      <input type="text" placeholder="Search" className="input rounded-3xl w-full border-2 border-white border-opacity-25 focus:border-opacity-80"/>
    </div>
    <label htmlFor="searchToggle" tabIndex={0} className="ml-2 btn btn-ghost btn-circle"><BsSearchHeart className="text-xl"/></label>
  </div>
);

export default ShrinkableSearch;