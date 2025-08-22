import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../api";

type Props = {
    params: Promise<{id: string}>
}

export async function GET(request:NextRequest, {params}: Props) {
    const {id} = await params;
    try {
        const {data} = await api(`/notes${id}`);
        return NextResponse.json(data)
    } catch (error) {
        const errorData = error as ApiError;

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

export async function DELETE(request:NextRequest, {params}: Props) {
    const {id} = await params
    
    try {
        const {data} = await api(`/notes${id}`);
        return NextResponse.json(data)
    } catch (error) {
        const errorData = error as ApiError;

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