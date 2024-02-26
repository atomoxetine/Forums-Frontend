
export default interface Ticket {
  _id: string,
  authorId: string,
  createdAt: string,
  lastUpdatedAt: string,
  category: string,
  message: string,
  status: string,
}
