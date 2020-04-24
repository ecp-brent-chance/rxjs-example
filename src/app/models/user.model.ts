
export enum UserRole {
  Developer,
  Staff,
  Patient,
}

export interface LookupUser {
  id: number,
  first: string,
  last: string,
}

export interface User extends LookupUser {
  role: UserRole,
  lastVisit?: Date,
  balance?: number,
}
