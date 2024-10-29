"use server"

import { cookies } from "next/headers";

const setLanguage = async (locale) => {
    cookies().set('default_lang', locale, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24,
        path: '/'
    });
};

export { setLanguage }