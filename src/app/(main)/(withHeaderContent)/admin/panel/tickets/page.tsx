import { GetAllTickets } from "@/services/forum/ticket/TicketService";
import TicketSearch from "./TicketSearch";
import { GetAllTicketCategories } from "@/services/forum/ticket/TicketCategoryService";
import { getUsernameFromUuid } from "@/services/forum/account/AccountService";
import { getHighestRank, getRankColor } from "@/services/controller/GrantService";


export default async function Page() {
  const tickets = (await GetAllTickets())[0] || [];
  const categories = (await GetAllTicketCategories())[0] || [];
  const userCache: {[key:string]: {uuid: string, name: string, color: string}} = {};

  for (let ticket of tickets) {
    if (userCache[ticket.author]) continue;

    userCache[ticket.author] = {
      uuid: ticket.author,
      name: (await getUsernameFromUuid(ticket.author)) || "Unknown",
      color: (await getRankColor((await getHighestRank(ticket.author))?._id || "")),
    }
  }

  return <>
    <TicketSearch tickets={tickets} categories={categories} userCache={userCache} />
  </>
}
