import { Note } from "@/types/note";
import { LoginRequest, NextServer } from "./api";
import { RegisterRequest } from "./api";
import { CheckSessionRequest } from "./api";
import { User } from "@/types/user";
export type UpdateUsername = {
    username: string
}
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
        `/notes/${id}`,
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
        `/notes/${id}`,
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

export const register = async (data: RegisterRequest): Promise<RegisterRequest> =>{
    
    const response = await NextServer.post<User>(`/auth/register`, data);
                        
    
                
    
    return{
        email: response.data.email,
        password: response.data.email,
        userName: response.data.username,
        avatar: response.data.avatar
    }
}



export const login = async (data: LoginRequest): Promise<LoginRequest>=>{
    
    const response = await NextServer.post<User>('/auth/login', data)
                
    
    return{
        email: response.data.email,
        password: response.data.email,
        avatar: response.data.avatar
        
    }
}

export const logout = async () =>{
    const response = await NextServer.post<User>('/auth/logout')
         
    
    return response.data
}


export const checkSession = async (): Promise<CheckSessionRequest> =>{

        const response = await NextServer.get<CheckSessionRequest>('/auth/session'

                    
        )

        return response.data;
}




export const getMe = async (): Promise<User> => {
    const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const { data } = await NextServer.get<User>('/users/me'

    );
    return data;
};


export const updateMe = async (data: UpdateUsername): Promise<User> => {
    const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const res = await NextServer.patch<User>('/users/me', data, 
        {
            headers:{
                    accept: 'application/json',
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${mykey}`,
            }
        }
    );
    return res.data;
};