'use client';
import { useEffect, useState } from 'react';

const getHash = () => (typeof window !== 'undefined' ? decodeURIComponent(window.location.hash) : '');

const useHash = () => {
  const [hash, setHash] = useState(getHash());

  useEffect(() => {
    const onHashChanged = () => {
      setHash(getHash());
    };

    window.addEventListener("hashchange", onHashChanged);
    return () => window.removeEventListener("hashchange", onHashChanged);
  }, []);

  return hash;
};

export default useHash;