import { NextResponse } from 'next/server'

export function middleware(request) {
    const { pathname } = request.nextUrl
    const isAuthenticated = request.cookies.get('isAuthenticated')

    const protectedRoutes = ['/account', '/profile', '/settings']
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

    if (isProtectedRoute && !isAuthenticated) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/account/:path*', '/profile/:path*', '/settings/:path*'],
}