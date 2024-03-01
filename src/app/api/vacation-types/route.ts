"use server";
import { NextResponse ,NextRequest } from "next/server";
import prisma from "@pisma/client";
import type { NextApiRequest  } from "next";
import {  VacationType } from '@prisma/client';
type CreateVacationTypeInput = Omit<VacationType, 'id'>;

export  async function POST(req: NextApiRequest){
    try {
        let passedValue = await new Response(req.body).text();
        let body = JSON.parse(passedValue);
        const vacationType : CreateVacationTypeInput  = body;
           // checker si la requete est vide 
        if (!vacationType) {
            return NextResponse.json({ error: 'requete vide' }, { status: 400 });
        }
        await prisma.vacationType.create({
            data: vacationType
        });
        return NextResponse.json({ message: 'type de vacance creer avec succes ' }, { status: 200 });
   
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
       
    } finally {
        await prisma.$disconnect();
    }
}

export  async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const id = !Number.isNaN(Number(searchParams.get('id'))) ? Number(searchParams.get('id')) : null;
        if(id){
           
            const vacationType = await prisma.vacationType.findUnique({
                where: {
                    id: id
                }
            });
            return NextResponse.json(vacationType, { status: 200 });
        }
        const vacationType = await prisma.vacationType.findMany();
        return NextResponse.json(vacationType, { status: 200 });
     
    
    } catch (error) {
        NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

// delete 

export  async function DELETE(req: NextApiRequest) {
    let passedValue = await new Response(req.body).text();
    let body = JSON.parse(passedValue);
    const id = body.id;
    try {
        const vacationType = await prisma.vacationType.delete({
            where: {
                id: id
            }
        });
        return NextResponse.json(vacationType, { status: 200 });
    } catch (error) {
        NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}


// edit 

export  async function PUT(req: NextApiRequest) {
    let body = await new Response(req.body).text();
    try {
        const vacationType : VacationType  = JSON.parse(body);
        await prisma.vacationType.update({
            where: {
                id: Number(vacationType.id)
            },
            data: {
                label: vacationType.label,
            }
        });
        return NextResponse.json({ message: 'mise a jour du type de vacance avec succes' }, { status: 200 });
       
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
   
