
import { type Note} from "../types/note";
import { NextServer } from "./api";


interface FetchNotesProps{
    notes: Note[]
    totalPages: number
}

export interface CreateNoteTask{
    title: string
    content: string
    tag: string

}

interface FetchNotesRequest{
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
                Authorization: `Bearer ${mykey}`
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
                Authorization: `Bearer ${mykey}`
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
                Authorization: `Bearer ${mykey}`
            }
        }
    )
    return response.data
    
}

