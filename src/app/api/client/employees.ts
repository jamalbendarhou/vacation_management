// importation de les tables employee et vacation 
import {  Employee,Vacation ,Prisma} from '@prisma/client';

// Définition du type EmployeeInput
type EmployeeInput = Partial<Employee>;

// Importation du type QueryFunctionContext depuis le module '@tanstack/react-query'
import { QueryFunctionContext } from '@tanstack/react-query';


type CreateEmployeeBody ={
    employee : EmployeeInput,
    vacations : Vacation[]
}

type UpdateEmployeeBody ={
    employee : Employee,
    vacations : Vacation[]
}

type EmployeeWithRelations = Employee & {
    vacations: Vacation[]
}
// fonction pour creer un employee en envoyant une requete POST 
export const createEmployee = async (values: CreateEmployeeBody ) => {
    try {
        // envoie de la requete POST
        const resp = await fetch(`/api/employees`, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
            },
        
        })
        // recuperation des donnees
        const data = await resp.json();
        
        // verificatiom si la requete a reussi 
        if(!resp.ok)  {
            throw new Error(data.message);
        } 
        return data;
    } catch (error : any) {
        throw new Error(error.message);
    }

};


// fonction pour mettre a jour les info d un employe 
export const updateEmployee = async (values: UpdateEmployeeBody ) => {
    try {
        const resp = await fetch(`/api/employees`, {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
            },
        
        })
        const data = await resp.json();
        
        if(!resp.ok)  {
            throw new Error(data.message);
        } 
        return data;
    } catch (error : any) {
        console.log(error);
        throw new Error(error.message);
    }

};

// fonction pour recuperer la liste des employes GET 
export const getEmployees = async (): Promise<EmployeeWithRelations[]> => {

    try {
        const data = await fetch(`/api/employees`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(!data.ok){
          throw new Error('Quelque chose s est mal passe');
        }
      return  await data.json() as EmployeeWithRelations[];
    } catch (error) {
        throw new Error('Quelque chose s est mal passe');
    }

};

// fonction pour recuperer un employer specifique 
export const getEmployee = async ({ queryKey  } : QueryFunctionContext<[string, number]>  ): Promise<EmployeeWithRelations> => {

    try {
        // recuperation de l ID de l employe 
        const id = queryKey[1];

        const data = await fetch(`/api/employees?id=${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(!data.ok){
          throw new Error('Quelque chose s est mal passe');
        }
      return  await data.json() as EmployeeWithRelations;
    } catch (error) {
        throw new Error('Quelque chose s est mal passe');
    }

};

// fonction pour supprimer un employe DELETE

export const deleteEmployee = async (id: number) => {
    try {
        const resp = await fetch(`/api/employees`, {
            method: 'DELETE',
            body: JSON.stringify({id}),
            headers: {
                'Content-Type': 'application/json',
            },
        
        })
        const data = await resp.json();
        
        if(!resp.ok)  {
            throw new Error('Quelque chose s est mal passe');
        } 
        return data;
    } catch (error) {
        throw new Error('Quelque chose s est mal passe');
    }
};