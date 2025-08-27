import { Note } from "@/types/note";
import { LoginRequest, NextServer } from "./api";
import { RegisterRequest } from "./api";
import { CheckSessionRequest } from "./api";
import { UpdateUsername, User } from "@/types/user";

export interface FetchNotesProps{
    notes: Note[]
    totalPages: number
}

export interface CreateNoteTask{
    title: string
    content: string
    tag: string

}

export interface FetchNotesRequest{
    searchText?: string
    pageQuery?: number
    tagNote?: string | null
}


export const fetchNotes = async ({searchText, pageQuery, tagNote}: FetchNotesRequest): Promise<FetchNotesProps> => {
    
    const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
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
                
            }
        }
        
    );

    
    return response.data

}


export const  createNote = async (newTask: CreateNoteTask): Promise<Note> => {
    const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const response = await NextServer.post<Note>(
        '/notes', newTask,
        {
            headers:{
                accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${mykey}`,
                
            }
        }

    )
    return response.data
}

export const  deleteNote = async (id: string): Promise<Note> =>{
    const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const response = await NextServer.delete<Note>(
        `/notes${id}`,
        {
            headers:{
                accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${mykey}`
            }
        }
    )
    return response.data
    
}


export const  fetchNoteById = async (id: string): Promise<Note> =>{
    const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const response = await NextServer.get<Note>(
        `/notes'${id}`,
        {
            headers:{
                accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${mykey}`
            }
        }
    )
    return response.data
    
}

export const register = async (data: RegisterRequest) =>{
    const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const response = await NextServer.post<User>(`/auth/register`, data, {headers: {
                        accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${mykey}`,
    }});
                
    
    return response.data
}



export const login = async (data: LoginRequest) =>{
    const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const response = await NextServer.post<User>('/auth/login', data, {headers: {
                accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${mykey}`,
    }})
    return response.data
}

export const logout = async () =>{
    const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const response = await NextServer.post<User>('/auth/logout', {headers: {
                accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${mykey}`,
    }})
    return response.data
}


export const checkSession = async () =>{
        const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
        const response = await NextServer.get<CheckSessionRequest>('/auth/session', {headers:{
                    accept: 'application/json',
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${mykey}`,
                    
        }})

        return response.data.success
}




export const getMe = async (): Promise<User> => {
  const { data } = await NextServer.get<User>('/users/me');
  return data;
};


export const updateMe = async (data: UpdateUsername): Promise<User> => {
  const res = await NextServer.patch<User>('/users/me', data);
  return res.data;
};