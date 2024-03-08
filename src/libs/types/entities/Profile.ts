export interface PermissionScope {
  scope: string;
}

export interface ProfilePermission {
  permission: string;
  expiration: number;
  scopes: PermissionScope[];
}

export interface Cooldown {
  start: number;
  expire: number;
  name: string;
}

export interface Note {
  uuid: string;
  issuedBy: string;
  issuedAt: number;
  note: string;
}

export interface Skin {
  name: string;
  value: string;
  signature: string;
}

export interface DisguiseData {
  realName: string;
  disguiseName: string;
  rankId: string;
  realSkin: string;
  disguiseSkin: string;
}

export interface Login {
  time: number;
  ip: string;
}

export default interface Profile {
  name: string;
  _id: string;
  nameToLowercase: string;
  permissions: ProfilePermission[];
  attachmentPermissions: string[];
  ignoring: string[];
  cooldowns: Cooldown[];
  alts: string[];
  notes: Note[];
  currentAddress: string;
  knownAddresses: string[];
  disguiseData: DisguiseData;
  tagName: string;
  authType: string;
  twoFactor: boolean;
  logins: Login[];
  metadata: {[key:string]: string}
}


