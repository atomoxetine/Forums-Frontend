interface UserGeneralParams {
  params: {
    username: string
  }
}
export default function UserGeneral({ params: { username } }: UserGeneralParams) {
  return <>General</>;
}