import NavLink from "@/components/NavLink/component"


export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  return <div className="flex flex-col gap-2 w-full md:w-[80%] lg:w-[70%]">
    <div className="flex flex-row flex-wrap gap-2">
      <NavLink href="/admin/panel/general" className="btn bg-base-200 hover:bg-base-100 py-2 px-4 min-h-fit h-fit flex-1">
        General
      </NavLink>
      <NavLink href="/admin/panel/tickets" className="btn bg-base-200 hover:bg-base-100 py-2 px-4 min-h-fit h-fit flex-1">
        Tickets
      </NavLink>
    </div>
    <div className="w-full">
      {children}
    </div>
  </div>
}
