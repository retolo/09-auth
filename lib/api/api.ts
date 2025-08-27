import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const NextServer = axios.create({
    baseURL: baseURL,
    withCredentials: true
})


export type RegisterRequest = {
    email: string,
    password: string,
    userName: string
}




export type LoginRequest ={
    email: string,
    password: string
}


export type CheckSessionRequest = {
    success: boolean
}