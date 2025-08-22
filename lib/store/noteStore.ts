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