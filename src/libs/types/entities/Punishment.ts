export interface Proof {
  type: string,
  proof: string,
  addedBy: string,
}

export default interface Punishment {
  punishmentType: string,
  silent: boolean,
  removedSilent: boolean,
  ip: boolean,
  voided: boolean,
  shadow: boolean,
  punishmentID: string,
  address: string,
  proof: Proof[],
  active: boolean,
  duration: number,
  issuedAt: string,
  issuedBy: string,
  issuedOn: string,
  permanent: boolean,
  reason: string,
  removedAt: string,
  removedBy: string,
  removedOn: string,
  removedReason: string,
  target: string,
}
