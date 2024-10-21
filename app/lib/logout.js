"use server";

import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";

export default async function handleLogout() {
    cookies().delete('session');

    permanentRedirect('/dashboard/login');
}