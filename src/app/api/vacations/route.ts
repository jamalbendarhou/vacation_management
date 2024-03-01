"use server";
import { NextResponse ,NextRequest } from "next/server";
import prisma from "@pisma/client";
import type { NextApiRequest  } from "next";
import {  Vacation } from '@prisma/client';
type CreateVacationInput = Omit<Vacation, 'id'>;

export  async function POST(req: NextRequest){
    try {
        let passedValue = await new Response(req.body).text();
        let body = JSON.parse(passedValue);
        const vacation : CreateVacationInput  = body;
           // s assurer que la requete n est pas vide 
        if (!vacation) {
            return NextResponse.json({ error: 'la requete est vide' }, { status: 400 });
        }
        await prisma.vacation.create({
            data: vacation
        });
        return NextResponse.json({ message: 'vacance creer avec succes ' }, { status: 200 });
   
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
           
            const vacation = await prisma.vacation.findUnique({
                where: {
                    id: id
                },
                include: {
                    vacation_type: true
                }
            });
            return NextResponse.json(vacation, { status: 200 });
        }
        const vacation = await prisma.vacation.findMany({
            include: {
                vacation_type: true
            }
        });
        return NextResponse.json(vacation, { status: 200 });
     
    
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
        const vacation = await prisma.vacation.delete({
            where: {
                id: id
            }
        });
        return NextResponse.json(vacation, { status: 200 });
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
        const vacation : Vacation  = JSON.parse(body);
        await prisma.vacation.update({
            where: {
                id: Number(vacation.id)
            },
            data: {
                start_at: vacation.start_at,
                end_at: vacation.end_at,
                vacationTypeId: vacation.vacationTypeId,
                status: vacation.status
            }
        });
        return NextResponse.json({ message: 'Vacation updated successfully' }, { status: 200 });
       
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
   
