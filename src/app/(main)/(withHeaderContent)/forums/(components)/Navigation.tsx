import RouteSegmentNav from './RouteSegmentNav';
import { headers } from "next/headers";

export default function Navigation({
  children,
}: {
  children: React.ReactNode
}) {
  return <>
    <div className="flex flex-col justify-center items-center max-w-[1016px] rounded-xl min-h-fit flex-1 p-4">
      <RouteSegmentNav />
      <div className="flex h-fit w-full inner p-2 gap-4 bg-base-300 rounded-b-xl">
        {children}
      </div>
    </div>
  </>;
}
