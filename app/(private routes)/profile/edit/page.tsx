'use client'
import Image from "next/image";
import css from './edit.module.css'
import { useRouter } from "next/navigation";
import { updateMe} from "@/lib/api/clientApi";
import { getMe} from "@/lib/api/clientApi";
import { useUserData } from "@/lib/store/authStore";
import React, { useEffect, useState } from "react";

const Edit =  () =>{
    const {setData} = useUserData()
    const [userName, setUserName] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>('')
    const [userAvatar, setUserAvatar] = useState<string>('')

    const router = useRouter()
    const handleCancel = () =>{
        router.push('/profile')
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setUserName(event.target.value);
    }
     
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        await updateMe({username: userName})
        setData({username: userName, email: userEmail, avatar: userAvatar})
        
    }

    useEffect(() =>{
        getMe()
        .then((value) =>{
            setUserEmail(value.email);
            setUserName(value.username)
            setUserAvatar(value.avatar)

        })
        
    }, [])
    return(
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <Image src={userAvatar}
                alt="User Avatar"
                width={120}
                height={120}
                className={css.avatar}
                />

                <form onSubmit={handleSubmit}  className={css.profileInfo}>
                <div className={css.usernameWrapper}>
                    <label htmlFor="username">Username: {userName}</label>
                    <input value={userName} onChange={handleChangeName} id="username"
                    type="text"
                    className={css.input}
                    />
                </div>
                
                
                <p>Email: {userEmail}</p>
                
                

                <div className={css.actions}>
                    <button  type="submit" className={css.saveButton}>
                    Save
                    </button>
                    <button onClick={handleCancel} type="button" className={css.cancelButton}>
                    Cancel
                    </button>
                </div>
                </form>
            </div>
        </main>

    )
}

export default Edit;