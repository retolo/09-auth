import { cookies } from "next/headers";
import { NextServer } from "./api";
import { User } from "./api";
import { UpdateUsername } from "./api";

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






export const getMeUpdata = async (data: UpdateUsername) =>{
        const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
        const cookiesStore = await cookies();
        const response = await NextServer.patch('/auth/users/me',data, {headers:{
                    accept: 'application/json',
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${mykey}`,
                    Cookie: cookiesStore.toString(),
        }})

        return response.data
}


