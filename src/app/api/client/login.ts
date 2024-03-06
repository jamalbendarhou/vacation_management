import { BASE_URl } from '@api/constants';
type LoginCredentials ={
    email : string,
    password : string
}



export const login = async (values: LoginCredentials ) => {
    try {
        const resp = await fetch(`${BASE_URl}/api/auth/login`, {
            method: 'POST',
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
        throw new Error(error.message);
    }

};