import Table from './(components)/Table/Table';
import TicketComponent from './(components)/TicketComponent';
import { getThreadShortId, threadSorter } from './Utils';
import Navigation from "./(components)/Navigation";

interface Params {
  params: {
    forumId: string;
  }
}
export default async function Page({ params: { forumId } }: Params) {
  const tickets = [
    {
      _id: '0',
      authorId: "7ea2b35d-fec9-4c5a-a72c-e917b12ce7ff",
      createdAt: "1707174633487",
      lastUpdatedAt: "-1",
      category: "Test",
      message: "Hi i need help :pensive:",
      status: "In progress",
    }
  ];
  const isError = false;

  const header = [
    <small key={0} className="pl-4 flex justify-start text-start smaller tracking-wider uppercase">Status</small>,
    <small key={1} className="col-span-3 flex justify-start text-center smaller tracking-wider uppercase">Message</small>,
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
                               authorId={t.authorId} createdAt={t.createdAt}
                               lastUpdatedAt={t.lastUpdatedAt} category={t.category}
                               message={t.message} status={t.status}/>
            )}
        </Table>
      </div>
    </Navigation>
  );
}