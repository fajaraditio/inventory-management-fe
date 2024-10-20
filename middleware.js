import { NextResponse } from "next/server";

const middleware = (request) => {
    const session = request.cookies.get('session');

    if (request.nextUrl.pathname.startsWith('/dashboard') && !request.nextUrl.pathname.startsWith('/dashboard/login')) {
        if (!session) return NextResponse.redirect(new URL('/dashboard/login', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/dashboard/login')) {
        if (session) return NextResponse.redirect(new URL('/dashboard', request.url));
    }
}

export default middleware;