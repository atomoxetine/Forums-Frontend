import Forum from "./Forum";

export default interface ForumCategory {
  _id: string;
  name: string;
  weight: number;
  forums: Forum[];
}