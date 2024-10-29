"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { Button } from "@/components/ui/button";
import LoginService from "@/app/lib/services/LoginService";
import { handleSuccesfullyLogin } from "@/app/lib/actions/auth";
import { useTranslations } from "next-intl";

const LoginPage = () => {
    const t = useTranslations('LoginPage');

    let formState = { email: "", password: "" };

    const [errorState, setErrorState] = useState({ ...formState });

    const login = async (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        const request = Object.fromEntries(formData.entries());

        const response = await LoginService.authenticate(request);

        if (response.success) handleSuccesfullyLogin(response.data);

        if (!response.success) {
            let errors = {};

            if (response.errors.email) errors = { email: response.errors.email[0] };
            if (response.errors.password) errors = { ...errorState, password: response.errors.password[0] };

            setErrorState(errors);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md p-6">
                <CardHeader>
                    <Image src="/gree-logo.svg" alt="Gree Logo" width={150} height={150} className="mb-6"></Image>
                    <CardTitle>{t('title')}</CardTitle>
                    <CardDescription>Please login to continue to dashboard</CardDescription>
                </CardHeader>
                <form onSubmit={login}>
                    <CardContent className="flex flex-col gap-6">
                        <div className="grid w-full max-w-md items-center gap-1.5">
                            <Label htmlFor="email">{t('email')}</Label>
                            <Input type="email" name="email" id="email" placeholder="Email" autoComplete="off" className={errorState.email ? "ring-red-500 ring-1" : ""} />
                            {errorState.email ? <small className="text-red-500">{errorState.email}</small> : ''}
                        </div>
                        <div className="grid w-full max-w-md items-center gap-1.5">
                            <Label htmlFor="email">{t('password')}</Label>
                            <InputPassword type="password" name="password" id="password" placeholder="Password" autoComplete="off" className={errorState.password ? "ring-red-500 ring-1" : ""} />
                            {errorState.password ? <small className="text-red-500">{errorState.password}</small> : ''}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">
                            {t('title')}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div >
    )
}

export default LoginPage;