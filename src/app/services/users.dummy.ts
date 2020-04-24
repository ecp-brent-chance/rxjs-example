
import { User, UserRole } from '../models/user.model';

let nextUserCount = 0;
export const dummyUsers: User[] = [
  {
    id: nextUserCount++,
    first: 'Brent',
    last: 'Chance',
    role: UserRole.Developer,
    lastVisit: null,
    balance: null,
  },
  {
    id: nextUserCount++,
    first: 'Staff',
    last: 'Person',
    role: UserRole.Staff,
    lastVisit: null,
    balance: null,
  },
  {
    id: nextUserCount++,
    first: 'John',
    last: 'Doe',
    role: UserRole.Patient,
    lastVisit: new Date('2020-03-15'),
    balance: 0.0,
  },
  {
    id: nextUserCount++,
    first: 'Jane',
    last: 'Doe',
    role: UserRole.Patient,
    lastVisit: new Date('2020-04-20'),
    balance: 1200.0,
  },
];
