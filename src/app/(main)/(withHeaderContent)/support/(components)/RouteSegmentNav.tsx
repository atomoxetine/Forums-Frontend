import { IoHome } from "react-icons/io5";
import HashLink from "@/components/HashLink";
import { headers } from "next/headers";
import CreateTicket from "./CreateTicket/component";
import { GetTicket } from "@/services/forum/ticket/TicketService";
import { isResultError } from "@/libs/Utils";
import Link from "next/link";

interface Route { route: string, routeTitle: string, idx: number }

function isNumber(str: string) {
  // digits, maybe dot, maybe digits
  return /^\d+\.?\d*$/.test(str);
}

const RouteSegmentNav = async () => {
  const currPath = new URL(headers().get('x-url')!).pathname;
  const [ticketId] = currPath?.split('/').slice(-1);
  const routes: (Route | null)[] = [{ route: '/support', routeTitle: 'Tickets', idx: 0 }, null];

  let hasTicket = !ticketId || isNumber(ticketId)

  if (hasTicket) {
    routes[1] = null;
  } else {
    const res = await GetTicket(ticketId);
    const isError = isResultError(res);
    if (isError) {
      console.error("Failed to fetch ticket: HTTP " + res[1]);
      hasTicket = false;
    } else {
      const ticket = res[0]!;

      let message = ticket.body;
      if (message.length > 23)
        message = message.substring(0, 20) + "...";
      routes[1] = { route: `/support/${ticketId}`, routeTitle: ticket.title, idx: 1 };
    }

  }

  return <>
    <div className="flex w-full rounded-t-xl overflow-hidden border-[1px] border-base-300">
      <div className="flex-1 flex min-h-full text-base-200 font-semibold">
        <Link href="/" className="overflow-hidden ml-[-17px]">
          <div className="relative capitalize bg-neutral w-fit h-fit flex mr-[17px]">
            <span className="z-[2] py-1 pl-6 w-full"><IoHome className="mr-1 h-[21px] w-[21px]" /></span>
            <div className="z-[1] h-[23px] w-[23px] rotate-45 bg-neutral
                absolute top-[3px] right-[-12.5px] border-t-2 border-r-2 border-base-100"></div>
          </div>
        </Link>

        {routes.filter(r => !!r).map((r, i) =>
          <Link key={i} href={r!.route || '/'} className="overflow-hidden ml-[-17px]">
            <div className="relative capitalize bg-secondary w-fit h-fit flex mr-[17px]">
              <span className="z-[2] py-1 pl-6 w-full whitespace-nowrap">{r!.routeTitle}</span>
              <div className="z-[1] h-[23px] w-[23px] rotate-45 bg-secondary
                absolute top-[3px] right-[-12.5px] border-t-2 border-r-2 border-base-100"></div>
            </div>
          </Link>
        )}
      </div>
      {hasTicket ?
        <div className="flex-none flex items-center">
          <CreateTicket />
        </div> : <></>
      }
    </div>
  </>;
};

export default RouteSegmentNav;
