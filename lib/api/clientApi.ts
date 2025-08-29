import { Note } from "@/types/note";
import { LoginRequest, NextServer } from "./api";
import { RegisterRequest } from "./api";
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
    

    const response = await NextServer.get<FetchNotesProps>(
        '/notes'
,
        {
            params:{
                ...(searchText ? { search: searchText } : {}),
                ...(pageQuery ? { page: pageQuery } : {}),
                ...(tagNote ? { tag: tagNote } : {}),
                
                
                
            }
            
        }
        
    );

    
    return response.data

}


export const  createNote = async (newTask: CreateNoteTask): Promise<Note> => {

    const response = await NextServer.post<Note>(
        '/notes', newTask,
        {
            headers:{
                accept: 'application/json',
                "Content-Type": 'application/json',
                
                
            }
        }

    )
    return response.data
}

export const  deleteNote = async (id: string): Promise<Note> =>{

    const response = await NextServer.delete<Note>(
        `/notes/${id}`,
        
    )
    return response.data
    
}


export const  fetchNoteById = async (id: string): Promise<Note> =>{

    const response = await NextServer.get<Note>(
        `/notes/${id}`
        
    )
    return response.data
    
}

export const register = async (data: RegisterRequest): Promise<User> =>{
    
    const response = await NextServer.post<User>(`/auth/register`, data);
                        
    
                
    
    return response.data
        
        
    
        
    
}



export const login = async (data: LoginRequest): Promise<User>=>{
    
    const response = await NextServer.post<User>('/auth/login', data)
                
    
    return response.data
}

export const logout = async (): Promise<void> =>{
    await NextServer.post('/auth/logout')
         
    
    
}


export const checkSession = async (): Promise<boolean> =>{

        const response = await NextServer.get<{success: boolean}>('/auth/session'

                    
        )

        return response.data.success;
}




export const getMe = async (): Promise<User> => {
    const { data } = await NextServer.get<User>('/users/me'

    );
    return data;
};


export const updateMe = async (data: UpdateUsername): Promise<User> => {
    
    const res = await NextServer.patch<User>('/users/me', data, 
        
    );
    return res.data;
};