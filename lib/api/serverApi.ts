import { cookies } from "next/headers";
import { NextServer } from "./api";
import { UpdateUsername, User } from "./api";
import { Note } from "@/types/note";


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
    const cookiesStore =  cookies();
    const response = await NextServer.get(`/auth/session`, {headers: {
                accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${mykey}`,
                Cookie: cookiesStore.toString(),
    }})

    return response;

}


export const getMeServer = async (): Promise<User> => {
    const cookiesStore =  cookies();
    const { data } = await NextServer.get<User>('/users/me', {headers:{
        Cookie: cookiesStore.toString(),
    }});
    return data;
};


export const updateMeServer = async (data: UpdateUsername): Promise<User> => {
    const cookiesStore =  cookies();
    const res = await NextServer.patch<User>('/users/me', data, {headers:{
        Cookie: cookiesStore.toString(),
    }});
    return res.data;
};

export const  fetchNoteByIdServer = async (id: string): Promise<Note> =>{
    const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const cookiesStore =  cookies();
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
    const cookiesStore =  cookies();
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





