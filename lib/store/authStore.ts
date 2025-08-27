import { persist } from 'zustand/middleware';

import {create} from 'zustand';
import { User } from '@/types/user';




type isAuthenticatedStore = {
    isAuthenticated: boolean,
    user: User | null,
    setData: (userData: User) => void,
    clearData: () => void
}


export const useUserData = create<isAuthenticatedStore>()(
    persist(
        (set) =>({
            isAuthenticated: false,
            user: null,
            setData: (userData: User) =>{
                set(() => ({user: userData, isAuthenticated: true}))
            },
            clearData: () => {
                set(() => ({user: null, isAuthenticated: false}))
            }
        }),
        {
            name: 'user-data',
            partialize: (state) => ({user: state.user})
        }
    )
)