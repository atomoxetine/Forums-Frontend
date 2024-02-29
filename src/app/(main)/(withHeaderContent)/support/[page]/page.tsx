import Table from '.././(components)/Table/Table';
import TicketComponent from '.././(components)/TicketComponent';
import { getThreadShortId, threadSorter } from '.././Utils';
import Navigation from ".././(components)/Navigation";
import { GetPlayerTickets } from '@/services/forum/ticket/TicketService';
import { isResultError } from '@/libs/Utils';
import Ticket from '@/libs/types/entities/Ticket';
import { GetAllTicketCategories } from '@/services/forum/ticket/TicketCategoryService';
import TicketCategory from '@/libs/types/entities/TicketCategory';
import getSession from '@/libs/session/getSession';
import { redirect } from 'next/navigation';

interface Params {
  params: {
    page: number;
  }
}
export default async function Page({ params: { page } }: Params) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return redirect("/auth/login");
  }

  page = Math.floor(page);

  const res = await GetPlayerTickets(session.uuid, page);
  const isError = isResultError(res);
  if (isError)
    console.error("Error fetching tickets: HTTP " + res[1]);

  const res0 = await GetAllTicketCategories();
  if (isError)
    console.error("Error fetching ticket categories: HTTP " + res0[1]);

  const tickets: Ticket[] = res[0]!;
  const categories: TicketCategory[] = res0[0]!;
  const categoryMap = categories.reduce((acc, crr) => acc.set(crr._id, crr.name), new Map())

  const header = [
    <small key={0} className="pl-4 flex justify-start text-start smaller tracking-wider uppercase">Status</small>,
    <small key={1} className="col-span-1 flex justify-start text-center smaller tracking-wider uppercase">Title</small>,
    <small key={2} className="flex justify-start text-center smaller tracking-wider uppercase">Category</small>,
    <small key={3} className="flex justify-start text-center smaller tracking-wider uppercase">Last Updated</small>,
    <small key={4} className="flex justify-start text-center smaller tracking-wider uppercase">Created</small>,
    <small key={5} className="pr-4 flex justify-end text-end smaller tracking-wider uppercase">Author</small>
  ];
  return (
    <Navigation>
      <div className="flex flex-col overflow-y-scroll overflow-x-hidden gap-4 rounded-lg
        min-h-[579px] h-[579px] w-full categories">
        <Table headerContent={header}>
          {!tickets || !tickets.length ?
            <span className="col-span-full text-center my-4">{isError ?
              <h4>Error while fetching support tickets.</h4> :
              <small>0 tickets found.</small>}</span> :
            tickets.sort(threadSorter).map(t =>
              <TicketComponent key={t._id} id={getThreadShortId(t._id)!}
                authorId={t.author} createdAt={t.createdAt}
                lastUpdatedAt={t.lastUpdatedAt} category={categoryMap.get(t.category)}
                title={t.title} status={t.status} />
            )}
        </Table>
      </div>
    </Navigation>
  );
}
