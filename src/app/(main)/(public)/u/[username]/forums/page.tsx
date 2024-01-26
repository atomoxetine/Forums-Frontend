
interface UserForumsParams {
  params: {
    username: string
  }
}
export default function UserForums({ params: { username } }: UserForumsParams) {
  return <>Forums</>
}