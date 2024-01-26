import { permanentRedirect } from 'next/navigation';

export default function Redirect() {
  permanentRedirect('/rules/global');
}