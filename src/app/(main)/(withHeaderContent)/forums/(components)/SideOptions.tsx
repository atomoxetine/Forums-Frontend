'use client'

import Link from "next/link";

export interface SideOption {
  name: string,
  color: string,
  disabled: boolean,
  href: string,
}

export interface Props {
  options: SideOption[]
}

export default function SideOptions(props: Props) {
  const { options } = props;

  return <div className="flex flex-col gap-2 p-2 rounded-lg bg-base-300 min-h-fit my-5">
    {options.map((opt, i) =>
      <Link key={i} href={opt.href}>
        <button
          className="btn rounded-lg border-2 bg-base-200 w-full"
          style={{ borderColor: opt.color }}
          disabled={opt.disabled}>
          {opt.name}
        </button>
      </Link>
    )}
  </div>
}
