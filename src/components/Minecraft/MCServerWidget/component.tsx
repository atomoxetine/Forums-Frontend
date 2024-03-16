import { getPlayerCount } from '@/services/base/ServerStatsService';
import './styles.css';
import React from 'react';

interface MCServerWidgetProps {
  className?: string,
}
const MCServerWidget = async (props: MCServerWidgetProps) => {
  const { className } = props;

  const playerCount = await getPlayerCount();

  return (
    <div className={`server-widget bg-banner relative min-w-80 h-14 bg-full rounded-lg overflow-hidden ${className || ''}`}>
      <div className="border-box w-full h-full absolute inset-0 p-1 widget-filter"><div/></div>
      <div className="pointer-events-none absolute inset-0 w-full h-full inline-flex items-center justify-between font-bold p-4">
        <h5 className="mb-1.5 text-white">mccade.net</h5>
        {playerCount 
          ? <small className="tracking-wider uppercase text-green-300">{playerCount} Online</small> 
          : <small className="tracking-wider uppercase text-red-300">Offline</small>}
      </div>
    </div>
  );
}

export default MCServerWidget;
