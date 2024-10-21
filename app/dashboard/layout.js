"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const { Navbar, NavbarBrand, NavbarContent, NavbarItem } = require("@nextui-org/react");
const { default: Link } = require("next/link");

const DashboardLayout = ({ children }) => {
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

                </NavbarContent>
            </Navbar>

            <div className="bg-gray-100 min-h-screen px-12 py-6">
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;