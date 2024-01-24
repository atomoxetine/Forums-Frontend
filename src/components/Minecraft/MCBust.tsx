'use client';
import './styles.css';
import Image from "next/image";
import useMcUuid from "@/hooks/useMcUuid";

interface MCBustProps {
  username?: string;
  className?: string;
}
const MCBust = ({ username: username, className: className }: MCBustProps) => {
  const defaultUrl = '/img/fem-alex.png';
  const uuid = useMcUuid(username);

  return (
    <div className={`w-fit h-fit text-center flex items-center justify-center mc-shadow mc-bust ${className}`}>
      <svg className="mt-[-20px] mr-[-22px] mb-[-6px] ml-[-11px]" height="135" width="130" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="hex">
            <path d="M43.301270189221924 9.999999999999998Q60.6217782649107 0 77.94228634059948 10L103.92304845413264 25Q121.2435565298214 35 121.2435565298214 55L121.2435565298214 85Q121.2435565298214 105 103.92304845413263 115L77.94228634059948 130Q60.6217782649107 140 43.30127018922193 130L17.32050807568877 115Q0 105 0 85L0 55Q0 35 17.320508075688775 25Z"></path>
          </clipPath>
        </defs> 
        <foreignObject className="text-left" clipPath="url(#hex)" height="100%" width="100%">
          <Image className="mt-5" width={120} height={120} alt={username ?? "Fem Alex"} src={uuid ? `https://skins.mcstats.com/bust/${uuid}` : defaultUrl}/>
        </foreignObject>
      </svg>
    </div>
  );
}
export default MCBust;