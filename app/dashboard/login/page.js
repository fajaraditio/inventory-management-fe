import Button from "@/app/components/atoms/Button";
import Input from "@/app/components/atoms/Input";
import Image from "next/image";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">

            <Image src="/gree-logo.svg" className="mb-3" alt="Gree Logo" width={200} height={200}></Image>

            <h1 className="text-center font-semibold text-2xl mb-6">Login Dashboard</h1>

            <div className="shadow rounded bg-white p-12 max-w-md w-full">
                <p className="text mb-6">Please login to your account before entering dashboard</p>

                <div className="mb-6">
                    <label htmlFor="email" className="text-sm">Email</label>
                    <Input type="text" name="email" id="email" placeholder="john.doe@gmail.com" className="w-full"></Input>
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="text-sm">Password</label>
                    <Input type="password" name="password" placeholder="* * * * * *" className="w-full"></Input>
                </div>
                <div className="mb-6">
                    <Button type="primary">Login Sekarang</Button>
                </div>
            </div>
        </div>
    )
}