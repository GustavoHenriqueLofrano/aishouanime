import { NextResponse, NextRequest} from 'next/server'
import { getCookieServer } from "./lib/cookieServer"
import { api } from "./services/api"

export default async function Middleware(req: NextRequest){
    const { pathname }   = req.nextUrl
    const token = await getCookieServer()
    
    if (
        pathname === "/" || 
        pathname.startsWith("/_next") || 
        pathname.startsWith("/images") ||
        pathname.endsWith('.jpg') || 
        pathname.endsWith('.jpeg') ||
        pathname.endsWith('.png') ||
        pathname.endsWith('.css')
    ) {
        return NextResponse.next();
    }
    
    if (pathname.startsWith("/_next") || pathname === "/" || pathname === "/signup") {
        return NextResponse.next();
    }
    if(pathname.startsWith("/home")){
        if(!token){
            return NextResponse.redirect(new URL("/", req.url))
        }
        if(token){
            const isValid = await validateToken(token)
            if(!isValid){
                return NextResponse.redirect(new URL("/", req.url))

            }
        }
        return NextResponse.next()
    }
    if(!token){
        return NextResponse.redirect(new URL("/", req.url))
    }

    const isValid = await validateToken(token)
    if(!isValid){
        return NextResponse.redirect(new URL("/", req.url))
    }
    return NextResponse.next()
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
