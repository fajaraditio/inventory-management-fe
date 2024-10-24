"use server"

import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";

const handleSuccesfullyLogin = async (data) => {
    cookies().set('session', data, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24,
        path: '/'
    });

    permanentRedirect('/dashboard');
};

const handleLogout = async () => {
    cookies().delete('session');

    permanentRedirect('/dashboard/login');
}

export {
    handleSuccesfullyLogin,
    handleLogout
}