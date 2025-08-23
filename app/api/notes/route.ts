


import { api, ApiError } from "../api";
import { NextResponse, NextRequest } from "next/server";



export async function GET(){
    try {
        const {data} = await api.get('/notes')

        return NextResponse.json(data)
    } catch (error) {
        const errorData = error as ApiError;
        return NextResponse.json({
            error: errorData.response?.data.error ?? errorData.message
        },
        {
            status: errorData.status 
        }
    )
    }
}



export async function POST(request: NextRequest) {
    const body = await request.json()
    try {
        
        const {data} = await api.post(`/notes`, body);

        return NextResponse.json(data)
    } catch (error) {
        const errorData = error as ApiError

        return NextResponse.json(
            {
                error: errorData.response?.data?.error ?? errorData.message
            },
            {
                status: errorData.status
            }
        )
        
    }
    
}


