'use client';

import './styles.css'
import useGlobal from '@/hooks/useGlobal';
import { useCallback } from 'react';

const Header = () => {
  const defaultVal = useCallback(() => (['', ''] as [string, string]), []);
  const [headerContent] = useGlobal<[string, string]>('headerContent', defaultVal);

  return (
    <div className="header-content-bg bg-full h-44 flex-none w-full flex justify-center items-center">
      <span className="mt-12 gap-1 flex flex-col text-center uppercase tracking-widest font-bold text-neutral-300 text-stroke">
        <h3>{headerContent?.[0]}</h3>
        <small>{headerContent?.[1]}</small>
      </span>
    </div>
  );
};

export default Header;