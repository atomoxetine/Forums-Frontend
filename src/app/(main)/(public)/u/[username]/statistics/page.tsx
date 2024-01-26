interface UserStatisticsParams {
  params: {
    username: string
  }
}
export default function UserStatistics({ params: { username } }: UserStatisticsParams) {
  return <>Statistics</>
}