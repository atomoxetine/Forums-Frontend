'use client';
import './styles.css'
import { Suspense, createContext, useState } from "react";
import { ClientMCBust } from '@/components/Minecraft/Client';

type ContextT = { setUsername: React.Dispatch<React.SetStateAction<string | undefined>>; } | undefined;
export const AuthContext = createContext<ContextT>(undefined);
export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  const [username, setUsername] = useState<string>(); 
  return (
    <div className="template rounded-t-lg overflow-hidden mb-0 xl:mb-16">
      <div className="relative bg-full bg-banner w-full h-36">
        <ClientMCBust username={username} className="absolute"/>
      </div>
      <div className="px-5 pt-3 pb-6 sm:px-24 overflow-hidden bg-base-200 rounded-b-lg">
        <div className="flex flex-col items-center text-center w-fit max-w-[346px] h-fit">
          <AuthContext.Provider value={{ setUsername }}>
            <Suspense>{children}</Suspense>
          </AuthContext.Provider>
        </div>
      </div>
    </div>
  );  
}