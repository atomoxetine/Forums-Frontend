import { permanentRedirect } from 'next/navigation';

interface UserParams {
  params: {
    username: string
  }
}
export default function User({ params: { username } }: UserParams) {
  permanentRedirect(`/u/${username}/general`);
}