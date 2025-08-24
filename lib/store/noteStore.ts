import { string } from 'yup';
import {create} from 'zustand';

import { persist } from 'zustand/middleware';


 interface CreateTask{
    title: string
    content: string
    tag: 'Todo' | string

}

type NoteDraftStore = {
    draft: CreateTask,
    setDraft: (note: CreateTask) => void,
    clearDraft: () => void,
}

const initialDraft: CreateTask = {
    title: '',
    content: '',
    tag: 'Todo',
}

interface User{
    isAuthenticated: boolean,
    email: string,
    password: string,
    username?: string
}

type isAuthenticatedStore = {
    data: User,
    setData: (noteData: User) => void,
    clearData: () => void
}
const initialData: User = {
    email: '',
    password: '',
    isAuthenticated: false,
    username: ''
}


export const useNoteDraft = create<NoteDraftStore>()(
    persist(
        (set) =>({
            draft: initialDraft,
            setDraft: (newData: CreateTask) => set({draft: newData}),
            clearDraft: () => set({draft: initialDraft})
        }),
        {
            name: 'note-draft',
            partialize: (state) => ({draft: state.draft})
        }
    )
    
)


export const useUserData = create<isAuthenticatedStore>()(
    persist(
        (set) =>({
            data: initialData,
            setData: (newUserData: User) => set({data: newUserData}),
            clearData: () => set({data: initialData})
        }),
        {
            name: 'user-data',
            partialize: (state) => ({data: state.data})
        }
    )
)