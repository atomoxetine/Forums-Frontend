import RouteSegmentNav from './RouteSegmentNav';
import {headers} from "next/headers";

export default function Navigation({
  children,
}: {
  children: React.ReactNode
}) {
  return <>
    <div className="flex flex-col justify-center items-center min-h-fit w-full p-4">
      <div className="flex flex-col h-fit w-full max-w-[996px] rounded-xl">
        <RouteSegmentNav />
        <div className="flex h-fit w-full inner p-2 gap-4 bg-base-300 rounded-b-xl">
          {children}
        </div>
      </div>
    </div>
  </>;  
}