import {  VacationType } from '@prisma/client';
type VacationTypeInput = Partial<VacationType>;
import { QueryFunctionContext } from '@tanstack/react-query';

export const createVacationType = async (values: VacationTypeInput ) => {
    try {
        const resp = await fetch(`/api/vacation-types`, {
            method: 'POST',
            body: JSON.stringify(values),
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

export const updateVacationType = async (values: VacationType ) => {
    try {
        const resp = await fetch(`/api/vacation-types`, {
            method: 'PUT',
            body: JSON.stringify(values),
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

export const getVacationTypes = async () => {

    try {
        const data = await fetch(`/api/vacation-types`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(!data.ok){
          throw new Error('Quelque chose s est mal passe');
        }
      return  await data.json() as VacationType[];
    } catch (error) {
        throw new Error('Quelque chose s est mal passe');
    }

};

export const getVacationType = async ({ queryKey  } : QueryFunctionContext<[string, number]>  ): Promise<VacationType> => {

    try {
        const id = queryKey[1];
        const data = await fetch(`/api/vacation-types?id=${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(!data.ok){
          throw new Error('Quelque chose s est mal passe');
        }
      return  await data.json() as VacationType;
    } catch (error) {
        throw new Error('Quelque chose s est mal passe');
    }

};

// delete 

export const deleteVacationType = async (id: number) => {
    try {
        const resp = await fetch(`/api/vacation-types`, {
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