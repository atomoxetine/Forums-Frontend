import {IoHome} from "react-icons/io5";
import HashLink from "@/components/HashLink";
import {headers} from "next/headers";
import CreateTicket from "./CreateTicket/component";

interface Route { route: string, routeTitle: string, idx: number }
const RouteSegmentNav = async () => {
  const currPath = new URL(headers().get('x-url')!).pathname;
  const [ticketId] = currPath?.split('/').slice(2);
  const routes: (Route | null)[] = [{route: '/support', routeTitle: 'Tickets', idx: 0}, null];

  if (!ticketId) {
    routes[1] = null;
  } else {
    const r = {
      name: "Hi i need help :pensive:",
    };
    let message = r!.name;
    if (message.length > 23)
      message = message.substring(0, 20) + "...";
    routes[1] = {route: `/support/${ticketId}`, routeTitle: message, idx: 1};
  }

  return <>
    <div className="flex w-full rounded-t-xl overflow-hidden border-[1px] border-base-300">
      <div className="flex-1 flex min-h-full text-base-200 font-semibold">
        <HashLink href="/" className="overflow-hidden ml-[-17px]">
          <div className="relative capitalize bg-neutral w-fit h-fit flex mr-[17px]">
            <span className="z-[2] py-1 pl-6 w-full"><IoHome className="mr-1 h-[21px] w-[21px]"/></span>
            <div className="z-[1] h-[23px] w-[23px] rotate-45 bg-neutral
                absolute top-[3px] right-[-12.5px] border-t-2 border-r-2 border-base-100"></div>
          </div>
        </HashLink>

        {routes.filter(r => !!r).map((r, i) =>
          <HashLink key={i} href={r!.route || '/'} className="overflow-hidden ml-[-17px]">
            <div className="relative capitalize bg-secondary w-fit h-fit flex mr-[17px]">
              <span className="z-[2] py-1 pl-6 w-full whitespace-nowrap">{r!.routeTitle}</span>
              <div className="z-[1] h-[23px] w-[23px] rotate-45 bg-secondary
                absolute top-[3px] right-[-12.5px] border-t-2 border-r-2 border-base-100"></div>
            </div>
          </HashLink>
        )}
      </div>
      {!ticketId ?
        <div className="flex-none flex items-center">
          <CreateTicket />
        </div> : <></>
      }
    </div>
  </>;
};

export default RouteSegmentNav;