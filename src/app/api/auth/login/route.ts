

import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type LoginCredentials ={
    email: string;
    password: string;
}

export async function POST(req: NextApiRequest) {
    try {
        const { email, password }: LoginCredentials = req.body;

        console.log('Email:', email);
        console.log('Password:', password);

        if (!email || !password) {
            console.log('Informations d\'identification manquantes');
            return NextResponse.json({ message: 'Les informations d\'identification sont requises' }, { status: 400 });
        }

        const user = await prisma.employee.findUnique({
            where: { email: email }
        });

        if (!user) {
            console.log('Utilisateur non trouvé');
            return NextResponse.json({ message: 'L\'e-mail ou le mot de passe est invalide' }, { status: 400 });
        }

        if (password !== user.password) {
            console.log('Mot de passe incorrect');
            return NextResponse.json({ message: 'L\'e-mail ou le mot de passe est invalide' }, { status: 400 });
        }

        console.log('Connexion réussie');
        return NextResponse.json(exclude(user, ["password"]), { status: 200 });
    } catch (error: any) {
        console.error('Erreur:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

function exclude(user: any, keys: string[]) {
    for (let key of keys) {
        delete user[key];
    }
    return user;
}

export default POST;
