import NextAuth ,{NextAuthOptions,User} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { login } from "@api/client/login" 

const prisma = new PrismaClient();

const options : NextAuthOptions  = {
  providers: [
    CredentialsProvider({
        
        credentials: { email: { label: "Email", type: "text" }, password: { label: "Mot de passe", type: "password" } },
        
        async authorize(credentials : {  email: string; password: string; } | undefined, req: any): Promise<User | null> {
            if (credentials) {
              
              try {
                const userCredentials = {
                  email: credentials.email ,
                  password: credentials.password,
                } 
                
                const user : User =  await login(userCredentials);
                return user ? user : null;
              } catch (e: any) {
                
                throw new Error(JSON.stringify(e?.response));
              }
            } else {
              return null;
            }
        } 
    }),
  ],

  adapter: PrismaAdapter(prisma),

  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },

  jwt: {
    
    maxAge: 60 * 60 * 24 * 30,
  },

  pages: {
    signIn: "/dashboard",
    signOut: "/auth/login",
    error: "/auth/login",
  },

  callbacks: {
    async session({ session, user, token }) {
      console.log("Session callback called");
      console.log("Session:", session);
      console.log("User:", user);
      console.log("Token:", token);
      
      if (token.user) {
        session.user = token.user as User;
      }
      return await session;
    },
  
    async jwt({ token, user }) {
      console.log("JWT callback called");
      console.log("Token:", token);
      console.log("User:", user);
  
      const isSignedIn = user ? true : false;
      if (isSignedIn) {
        token.user = { ...user as User };
      }
  
      return await token;
    },
  },
};

const handler = NextAuth(options);
export { handler as GET, handler as POST,options as nextAuthOptions };
