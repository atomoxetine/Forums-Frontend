import './styles.css';
import { MCBust, MCHead, MCProps } from './base';
import { getUuid } from '@/services/forum/account/AccountService';

export const ServerMCBust = async (props: MCProps) => 
  await getFromFunc(MCBust, props);

export const ServerMCHead = async (props: MCProps) => 
  await getFromFunc(MCHead, props);

const getFromFunc = async (Func: (props: MCProps) => React.JSX.Element, props: MCProps) => {
  let { uuid, username, className, shadowColor } = props;
  if (!uuid && !username) return null;
  if (!uuid) uuid = await getUuid(username!);
  return <Func uuid={uuid} username={username} className={className} shadowColor={shadowColor}/>;
}
