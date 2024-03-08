
export interface ProofType {
  niceName: string,
}

export interface Proof {
  proofType: ProofType,
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
}
