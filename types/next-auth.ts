import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { Employee } from "@prisma/client";

declare module 'next-auth' {
  /**
   * Leveraged by session callback's user object (AdapterUser extends User)
   */
  export interface User extends DefaultUser , Employee {
    id: number;
    email: string;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Session extends DefaultSession{
    user: Employee;
  }
}