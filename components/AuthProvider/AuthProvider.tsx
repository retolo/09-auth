'use client'
import { useUserData } from "@/lib/store/noteStore";
import { checkSession } from "@/lib/api/ClientApi";
import { getMe } from "@/lib/api/ClientApi";
import React, { useEffect } from "react";

type Props = {
    children: React.ReactNode
}

const AuthProvider = ({children}: Props) =>{
    const {setData, clearData} = useUserData()



    useEffect(() =>{
        const fetchUser = async () =>{
            const isAuth = await checkSession()

            if(isAuth){
                const user = await getMe()

                if(user){
                    setData(user)
                }
                else{
                    clearData()
                }
            }

        }

        fetchUser();
    }, [setData, clearData])

    return children;
}


export default AuthProvider;