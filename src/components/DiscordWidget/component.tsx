'use client';

import './styles.css';
import { useEffect, useState } from 'react';
import useTheme from '@/hooks/useTheme';
import Image from 'next/image';

interface DiscordWidgetProps {
  guildId: string,
  className?: string,
}
const DiscordWidget = (props: DiscordWidgetProps) => {
  const { guildId, className } = props;
  const [theme] = useTheme();
  const [userN, setUserN] = useState<number>(-1);

  useEffect(() => {
    fetch(`https://discord.com/api/guilds/${guildId}/widget.json`)
      .then(r => r?.json()).then((r: any) => setUserN(r["members"].length));
  }, [guildId]);

  return (
    <div className={`widget discord-widget flex flex-col min-w-80 h-[400px] rounded-lg overflow-hidden ` + (className || '')}>
      <div className="widget-override h-fit w-full border-0 border-b-[1px] relative flex items-center justify-between text-end text-gray-200 py-3 px-6 tracking-wider uppercase font-semibold">
        <Image width={640} height={125} className="w-28 h-5" src="/img/discord-logo.png" alt="Discord" />
        <h6>{userN} Online</h6>
      </div>
      <div className="overflow-hidden w-full h-full flex flex-col">
        <iframe
          className="bg-transparent w-full h-full flex-1"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          src={`https://discord.com/widget?id=${guildId}&theme=${theme}`}>  
        </iframe>
      </div>
      <h6 className="widget-override h-fit w-full border-0 border-t-[1px] relative block text-gray-200 text-center py-3 px-6 tracking-wider uppercase font-semibold">
        <a href={process.env.NEXT_PUBLIC_DISCORD_URL}>
          Click to join!
        </a>
      </h6>
    </div>
  );
}

export default DiscordWidget;