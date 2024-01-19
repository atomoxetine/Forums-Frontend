import Dropdown from "@/components/Dropdown";
import { IoPerson } from "react-icons/io5";
import React from "react";
import { UserNav } from "./NavLinks";

const UserDropdown = (props: { className?: string }) =>
  <Dropdown
    className="dropdown-custom"
    indicatorIcon={<IoPerson className="w-5 h-5"/>}
    dropdownClassName={`shadow rounded-box px-4 py-2 bg-base-300 w-fit h-fit whitespace-nowrap ${props.className || ''}`}
  >
    <UserNav />
  </Dropdown>

export default UserDropdown;