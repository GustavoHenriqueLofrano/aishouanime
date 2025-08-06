import { NextResponse, NextRequest} from 'next/server'
import { getCookieServer } from "./lib/cookieServer"
import { api } from "./services/api"

export default async function Middleware(req: NextRequest){
    const { pathname }   = req.nextUrl
    
    if (pathname.startsWith("/_next")
        || pathname === "/" 
        || pathname === "/signup"
        || pathname === "/login"
        || pathname === '/api/'
        || pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    const token = await getCookieServer()
    
    if(pathname.startsWith("/home")){
        if(!token){
            return NextResponse.redirect(new URL("/login", req.url))
        }
        else if(token){
            const isValid = await validateToken(token)
            if(!isValid){
                return NextResponse.redirect(new URL("/login", req.url))

            }
        }
        return NextResponse.next()
    }
}


async function validateToken(token: string) {
    if(!token) return false;
    
    try {
        await api.get('/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (error) {
        console.error('Token validation error:', error);
        return false;
    }
}
