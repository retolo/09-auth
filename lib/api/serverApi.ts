import { cookies } from "next/headers";
import { NextServer } from "./api";

import { UpdateUsername } from "./clientApi";
import { Note } from "@/types/note";
import { User } from "@/types/user";


export interface FetchNotesProps{
    notes: Note[]
    totalPages: number
}

export interface FetchNotesRequest{
    searchText?: string
    pageQuery?: number
    tagNote?: string | null
}
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


export const getMeServer = async (): Promise<User> => {
    const cookiesStore = await cookies();
    const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const { data } = await NextServer.get<User>('/users/me', {headers:{
        Cookie: cookiesStore.toString(),
        accept: 'application/json',
        "Content-Type": 'application/json',
        Authorization: `Bearer ${mykey}`,
    }});
    return data;
};


export const updateMeServer = async (data: UpdateUsername): Promise<User> => {
    const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const cookiesStore = await cookies();
    const res = await NextServer.patch<User>('/users/me', data, {headers:{
        Cookie: cookiesStore.toString(),
        accept: 'application/json',
        "Content-Type": 'application/json',
        Authorization: `Bearer ${mykey}`,
    }});
    return res.data;
};

export const  fetchNoteByIdServer = async (id: string): Promise<Note> =>{
    const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const cookiesStore = await cookies();
    const response = await NextServer.get<Note>(
        `/notes'${id}`,
        {
            headers:{
                accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${mykey}`,
                Cookie: cookiesStore.toString(),
            }
        }
    )
    return response.data
    
}


export const fetchNotesServer = async ({searchText, pageQuery, tagNote}: FetchNotesRequest): Promise<FetchNotesProps> => {
    
    const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const cookiesStore = await cookies();
    const response = await NextServer.get<FetchNotesProps>(
        '/notes'
,
        {
            params:{
                ...(searchText ? { search: searchText } : {}),
                ...(pageQuery ? { page: pageQuery } : {}),
                ...(tagNote ? { tag: tagNote } : {}),
                
                
                
            },
            headers:{
                accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${mykey}`,
                Cookie: cookiesStore.toString(),
                
            }
        }
        
    );

    
    return response.data

}





