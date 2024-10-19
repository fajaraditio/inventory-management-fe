"use server";

import { cookies } from "next/headers";

export default async function handleLogin(sessionData) {
    cookies().set('session', sessionData, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24,
        path: '/'
    });
}