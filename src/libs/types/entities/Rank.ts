import Permission from './Permission';
import Scope from './Scope';

export default interface Rank {
  _id: string;
  name: string;
  defaultRank: boolean;
  priority: number;
  price: number;
  permissions: Permission[];
  inheritance: string[];
  scopes: Scope[];
  prefix: string;
  displayName: string;
  suffix: string;
  color: string;
  playerListPrefix: string;
  visible: boolean;
  staff: boolean;
  subscription: boolean;
  grantable: boolean;
  purchasable: boolean
}
