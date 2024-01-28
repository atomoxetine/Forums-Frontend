import './styles.css';
import { MCBust, MCHead, MCProps } from './base';

export const ServerMCBust = async (props: MCProps) => 
  await getFromFunc(MCBust, props);

export const ServerMCHead = async (props: MCProps) => 
  await getFromFunc(MCHead, props);

const getUuid = async (username?: string) => {
  if (!username) return '';

  let uuid = '';
  try {
    uuid = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`)
      .then(res => res?.json())
      .then(res => res?.id);
  } catch { /* Do nothing */ }

  if (!uuid) { // Fallback in case Mojang's API is down
    try {
      uuid = await fetch(`https://playerdb.co/api/player/minecraft/${username}`)
        .then(res => res?.json())
        .then(res => res?.data?.player?.raw_id);
    } catch { /* Do nothing */ }
  }
  return uuid;
}

const getFromFunc = async (Func: (props: MCProps) => Promise<React.JSX.Element>, props: MCProps) => {
  const { username, className, shadowColor } = props;
  const uuid = await getUuid(username);
  return <Func uuid={uuid} username={username} className={className} shadowColor={shadowColor}/>;
}