import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type LoginCredentials ={
    email: string;
    password: string;
}

export  async function POST(req: NextApiRequest){
    try {
        let passedValue = await new Response(req.body).text();
        let body = JSON.parse(passedValue);
        const {
            email,
            password
        } : LoginCredentials  = body;
           // Ensure the request body is not empty
        if (!email || !password) {
            return NextResponse.json({ message: 'The Credentials is required' }, { status: 400 });
        }

         // Check if the email  exists
         const user = await prisma.employee.findUnique({
            where: {
                email: email
            }
        });
        
        if (!user) {
            return NextResponse.json({ message: 'email ou mot de passe invalide' }, { status: 400 });
        }
        if (!user || password !== user.password) {
            return NextResponse.json({ message: 'email ou mot de passe invalide' }, { status: 400 });
        }
        return NextResponse.json(exclude(user, ["password"]), { status: 200 });
  
   
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
       
    } finally {
        await prisma.$disconnect();
    }
}

function exclude(user:any , keys:string[]) {
    for (let key of keys) {
      delete user[key];
    }
    return user;
  }

export default POST;
