import './styles.css';
import Image from "next/image";

export interface MCProps {
  uuid?: string;
  username?: string;
  className?: string;
  shadowColor?: string;
}

export const MCHead = (props: MCProps) => {
  const { uuid, username, className, shadowColor = "#ffffff" } = props;
  const defaultUrl = '/img/fem-alex-head.png';

  const title = (username ?? "Fem Alex") + "'s Head";
  return (
    <div className={`w-fit h-fit text-center flex items-center justify-center mc-head ${className}`}
      style={{filter: `drop-shadow(0px 0px 5px ${shadowColor})`}}
    >
      <svg className="my-px mx-[3px]" height="70" width="61" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="hex-small">
            <path d="M24.248711305964278 3.4999999999999996Q30.31088913245535 0 36.373066958946424 3.5L54.55960043841963 14Q60.6217782649107 17.5 60.6217782649107 24.5L60.6217782649107 45.5Q60.6217782649107 52.5 54.55960043841963 56L36.373066958946424 66.5Q30.31088913245535 70 24.24871130596428 66.5L6.06217782649107 56Q0 52.5 0 45.5L0 24.5Q0 17.5 6.062177826491071 14Z"></path>
          </clipPath>
        </defs>
        <foreignObject className="text-left" width="130%" height="100%" clipPath="url(#hex-small)">
          <Image className="mt-[-3px] ml-[-10px]" width={180} height={191} title={title} alt={title} src={uuid ? `https://skins.mcstats.com/skull/${uuid}` : defaultUrl}/>
        </foreignObject>
      </svg>
    </div>
  );
}

export const MCBust = (props: MCProps) => {
  const { uuid, username, className, shadowColor = "#ffffff" } = props;
  const defaultUrl = '/img/fem-alex.png';

  const style = shadowColor ? {filter: `drop-shadow(0px 0px 3px ${shadowColor})`} : {};
  return (
    <div className={`w-fit h-fit text-center flex items-center justify-center mc-bust ${className}`}
      style={style}
    >
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