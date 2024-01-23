export default interface Account {
  _id: string,
  email: string,
  password?: string,
  token: string,
  settings: {[key: string]: string}
}