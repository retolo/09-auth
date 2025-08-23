import { NextRequest, NextResponse } from "next/server";
import { ApiError, api } from "../../api";
import { cookies } from "next/headers";
import { parse } from "cookie";



export async function POST(request: NextRequest){
    try {
        const data = await api.post(`/auth/login`)

        const cookieStore = await cookies();
        const setCookies = data.headers['set-cookie'];

        if(cookieStore){
            const cookieArray = Array.isArray(setCookies) ? setCookies : [setCookies]



            for(const cookieStr of cookieArray){
                const parsed = parse(String(cookieStr));


                const options = {
                    expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
                    path: parsed.Path,
                    maxAge: Number(parsed['Max-Age'])
                }


                if(parsed.accessToken){
                    cookieStore.set('accessToken', parsed.accessToken, options)
                }

                if(parsed.refreshToken){
                    cookieStore.set('refreshToken', parsed.refreshToken, options)
                }
            }

            return NextResponse.json(data)
        }
            return NextResponse.json({error: 'Unauthorized'}, {status: 401})

        
    } catch (error) {
        const errorData = error as ApiError;
        return NextResponse.json(
            {
                error: errorData.response?.data?.error ?? errorData.message
            },
            {
                status: errorData?.status
            }
        )
        
    }
}