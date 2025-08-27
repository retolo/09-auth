import { cookies } from "next/headers";
import { NextServer } from "./api";
import { UpdateUsername, User } from "./api";


export const checkServerSession = async () =>{
    const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const cookiesStore = await cookies();
    const response = await NextServer.get(`/auth/session`, {headers: {
                accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${mykey}`,
                Cookie: cookiesStore.toString(),
    }})

    return response;

}


export const getMe = async (): Promise<User> =>{
    const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const response = await NextServer.get('/users/me', {headers:{
                accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${mykey}`,
                
    }})


    return response.data
}


export const getMeUpdata = async (data: UpdateUsername) =>{
        const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
        const response = await NextServer.patch('/auth/users/me',data, {headers:{
                    accept: 'application/json',
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${mykey}`,
                    
        }})

        return response.data
}









