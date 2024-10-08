import Thread from "./Thread";

export default interface Forum {
  _id: string,
  name: string,
  description: string,
  weight: number,
  locked: boolean,
  category: string,
  categoryName: string,
  categoryWeight: number,
  threadAmount: number
  lastThread?: Thread;
}
