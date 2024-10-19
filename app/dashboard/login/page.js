"use client";

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react";
import { Eye } from "@phosphor-icons/react";
import { EyeSlash } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React from "react";

export default function LoginPage() {
    const [errors, setErrors] = React.useState({})
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    async function login(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        try {
            const response = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/api/auth/login`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) setErrors(data.errors);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">

            <Image src="/gree-logo.svg" className="mb-3" alt="Gree Logo" width={200} height={200}></Image>

            <h1 className="text-center font-semibold text-2xl mb-6">Login Dashboard</h1>

            <Card radius="sm" className="p-3">
                <CardHeader className="p-6">
                    <p className="text">Please login to your account before entering dashboard</p>
                </CardHeader>
                <Divider className="bg-gray-100"></Divider>
                <form onSubmit={login}>
                    <CardBody className="p-6">
                        <div className="mb-6">
                            <Input type="email" name="email" label="Email" autoComplete="off" placeholder="john.doe@example.com" size="md" radius="sm" variant="bordered" labelPlacement="outside" classNames={{
                                inputWrapper: [
                                    "border-1",
                                ]
                            }} isInvalid={errors && errors.email && errors.email.length > 0} errorMessage={errors && errors.email && errors.email[0]} />
                        </div>
                        <div className="mb-6">
                            <Input type={isVisible ? 'text' : 'password'} name="password" label="Password" autoComplete="off" placeholder="* * * * * *" size="md" radius="sm" variant="bordered" labelPlacement="outside" classNames={{
                                inputWrapper: [
                                    "border-1",
                                ]
                            }} endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                    {isVisible ? <Eye></Eye> : <EyeSlash></EyeSlash>}
                                </button>
                            } isInvalid={errors && errors.password && errors.password.length > 0} errorMessage={errors && errors.password && errors.password[0]} />
                        </div>
                        <div className="mb-6">
                            <Button type="submit" radius="sm" className="bg-blue-800 text-white">Login Sekarang</Button>
                        </div>
                    </CardBody>
                </form>
            </Card>
        </div>
    )
}