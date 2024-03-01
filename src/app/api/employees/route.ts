"use server";
import { NextResponse ,NextRequest } from "next/server";
import prisma from "@pisma/client";
import type { NextApiRequest  } from "next";
import {  Employee ,Vacation } from '@prisma/client';
// type derive d employee exclus id qui est autonumber
type CreateEmployeeInput = Omit<Employee, 'id'>;

type CreateEmployeeBody ={
    employee : CreateEmployeeInput,
    vacations : Vacation[]
}
type UpdateEmployeeBody ={
    employee : Employee,
    vacations : Vacation[]
}


export  async function POST(req: NextApiRequest){
    try {
        let passedValue = await new Response(req.body).text();
        let body = JSON.parse(passedValue);
        const {
            employee,
            vacations
        } : CreateEmployeeBody  = body;
           // verifier si la requete est vide 
        if (!employee) {
            return NextResponse.json({ message: 'requete vide ' }, { status: 400 });
        }

         // verifier si l email existe deja 
         const existingEmployee = await prisma.employee.findUnique({
            where: {
                email: employee.email
            }
        });
        
        if (existingEmployee) {
            return NextResponse.json({ message: 'Email existe deja ' }, { status: 400 });
        }
        

        await prisma.employee.create({
            data: {
                ...employee,
                vacations : {
                    connect : vacations.map((vacation) => {
                        return {
                            id : vacation.id
                        }
                    })
                }
            }
        });
        return NextResponse.json({ message: 'employe creer avec succes' }, { status: 200 });
   
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
           
            const employee = await prisma.employee.findUnique({
                where: {
                    id: id
                },
                include: {
                   vacations : {
                        include: {
                            vacation_type: true
                        }
                   }
                }
            });
            return NextResponse.json(employee, { status: 200 });
        }
        const employee = await prisma.employee.findMany({
            include: {
                vacations : {
                     include: {
                         vacation_type: true
                     }
                }
             }
        });
        return NextResponse.json(employee, { status: 200 });
     
    
    } catch (error) {
        NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

// supprimer 

export  async function DELETE(req: NextApiRequest) {
    let passedValue = await new Response(req.body).text();
    let body = JSON.parse(passedValue);
    const id = body.id;
    try {
        const employee = await prisma.employee.delete({
            where: {
                id: id
            }
        });
        return NextResponse.json(employee, { status: 200 });
    } catch (error) {
        NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}


// update

export  async function PUT(req: NextApiRequest) {
    let passedValue = await new Response(req.body).text();
    try {
        const { employee, vacations } : UpdateEmployeeBody  = JSON.parse(passedValue);
        // verification si l email existe chez un autre employee
        const existingEmployee = await prisma.employee.findFirst({
            where: {
                email: employee.email,
                NOT: {
                    id: Number(employee.id)
                }
            }
        });
        
        if (existingEmployee) {
            return NextResponse.json({ message: 'cet Email existe deja chez un autre employe' }, { status: 400 });
        }
        await prisma.employee.update({
            where: {
                id: Number(employee.id)
            },
            data: {
                last_name : employee.last_name,
                first_name : employee.first_name,
                email : employee.email,
                password : employee.password,
                role : employee.role,
                department : employee.department,
                vacations : {
                    connect: vacations
                }
            }
        });
        return NextResponse.json({ message: 'mise a jour de l employee avec succes ' }, { status: 200 });
       
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
   
