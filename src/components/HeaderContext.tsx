'use client';
import useGlobal from '@/hooks/useGlobal';

interface HeaderContextProps {
  current: [string, string];
}
const HeaderContext = ({ current: current }: HeaderContextProps) => {
  const [_, setHeaderContent] = useGlobal('headerContent');
  setHeaderContent(["Information", `Here you can gather some info on us and our policies.`]);
  return <></>;
}