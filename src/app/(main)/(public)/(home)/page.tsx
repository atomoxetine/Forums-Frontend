import './styles.css';
import Hero from './Hero';
import HeaderContext from '@/components/HeaderContext';

export default function Page() {
  const headerContent: [string, string] = ["", ``];
  return <>
    <HeaderContext setTo={headerContent}/>
    <Hero />
  </>;
}
