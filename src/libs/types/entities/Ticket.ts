
export default interface ticket {
  _id: string,
  author: string,
  createdAt: string,
  lastUpdatedAt: string,
  category: string,
  title: string,
  body: string,
  parent: string | null,
  status: string,
}
