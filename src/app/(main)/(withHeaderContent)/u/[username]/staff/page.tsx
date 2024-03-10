import { permanentRedirect } from 'next/navigation';

interface Params {
  params: {
    username: string
  }
}
export default function Redirect({ params: { username } }: Params) {
  permanentRedirect(`/u/${username}/staff/punishments`);
}
