import './styles.css';
import { MCBust, MCHead, MCProps } from './base';
import useMcUuid from '@/hooks/useMcUuid';

export const ClientMCBust = (props: MCProps) => {
  const { username, className, shadowColor } = props;
  const uuid = useMcUuid(username);
  return <MCBust uuid={uuid} username={username} className={className} shadowColor={shadowColor}/>;
}

export const ClientMCHead = (props: MCProps) => {
  const { username, className, shadowColor } = props;
  const uuid = useMcUuid(username);
  return <MCHead uuid={uuid} username={username} className={className} shadowColor={shadowColor}/>;
}