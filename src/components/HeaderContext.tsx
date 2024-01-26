'use client';
import useGlobal from '@/hooks/useGlobal';
import { useEffect } from 'react';

interface HeaderContextProps {
  setTo: [string, string];
}
const HeaderContext = ({ setTo: setTo }: HeaderContextProps) => {
  const [_, setHeaderContent] = useGlobal<[string, string]>('headerContent');
  useEffect(() => 
    setHeaderContent(setTo)
  , [setHeaderContent, setTo]);
  return <></>;
}
export default HeaderContext;