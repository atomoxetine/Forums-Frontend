interface Params {
  params: {
    username: string
  }
}
export default function Page({ params: { username } }: Params) {
  return <>Statistics</>
}