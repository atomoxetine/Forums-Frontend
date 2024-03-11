
export interface Scope {
  scope: string,
}

export default interface Grant {
  rankId: string,
  scopes: Scope[],
  _id: string,
  target: string,
  active: string,
  issuedAt: string,
  issuedBy: string,
  issuedOn: string
  reason: string,
  removedAt: string,
  removedBy: string,
  removedOn: string,
  removedReason: string,
  duration: string,
  permanent: string,
}
