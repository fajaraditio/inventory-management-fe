"use client";

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

export default function LoginPage() {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">

            <Image src="/gree-logo.svg" className="mb-3" alt="Gree Logo" width={200} height={200}></Image>

            <h1 className="text-center font-semibold text-2xl mb-6">Login Dashboard</h1>

            <Card radius="sm" className="p-3">
                <CardHeader className="p-6">
                    <p className="text">Please login to your account before entering dashboard</p>
                </CardHeader>
                <Divider className="bg-gray-100"></Divider>
                <CardBody className="p-6">
                    <div className="mb-6">
                        <Input type="email" name="email" label="Email" autoComplete="off" placeholder="john.doe@example.com" size="md" radius="sm" variant="bordered" labelPlacement="outside" classNames={{
                            inputWrapper: [
                                "border-1",
                            ]
                        }} />
                    </div>
                    <div className="mb-6">
                        <Input type="password" name="password" label="Password" autoComplete="off"  placeholder="* * * * * *" size="md" radius="sm" variant="bordered" labelPlacement="outside" classNames={{
                            inputWrapper: [
                                "border-1",
                            ]
                        }} />
                    </div>
                    <div className="mb-6">
                        <Button radius="sm" className="bg-blue-800 text-white">Login Sekarang</Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}