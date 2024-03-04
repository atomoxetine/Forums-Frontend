
export default interface Ticket {
  _id: string,
  author: string,
  createdAt: string,
  lastUpdatedAt: string,
  category: string,
  title: string,
  body: string,
  parentTicket: string | null,
  status: string,
  replies: string[],
}
