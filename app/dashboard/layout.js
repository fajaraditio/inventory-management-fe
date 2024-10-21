"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import handleLogout from "../lib/logout";

const { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } = require("@nextui-org/react");
const { default: Link } = require("next/link");

const DashboardLayout = ({ children }) => {
    const router = useRouter();

    const navbarItems = [
        {
            name: 'Dashboard',
            route: '/dashboard',
        },
        {
            name: 'Product Category',
            route: '/dashboard/product-category',
        },
        {
            name: 'Product',
            route: '/dashboard/product',
        }
    ];

    const logout = async (event) => {
        event.preventDefault();

        handleLogout();
    }

    const excludeLayout = [
        '/dashboard/login',
    ];

    if (excludeLayout.includes(usePathname())) return (<div>{children}</div>);

    return (
        <div>
            <Navbar className="bg-white" position="static">
                <NavbarBrand>
                    <Image src="/gree-logo.svg" className="mb-3" alt="Gree Logo" width={100} height={100}></Image>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-6" justify="center">
                    {
                        (navbarItems.map((item) => {
                            return <NavbarItem isActive={usePathname() == item.route} key={item.name}>
                                <Link className="hover:text-blue-700" href={item.route}>
                                    {item.name}
                                </Link>
                            </NavbarItem>
                        }))
                    }
                </NavbarContent>
                <NavbarContent justify="end">
                    <form onSubmit={logout}>
                        <Button type="submit" radius="sm" className="bg-blue-700 text-white">Logout</Button>
                    </form>
                </NavbarContent>
            </Navbar>

            <div className="bg-gray-100 min-h-screen px-12 py-6">
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;