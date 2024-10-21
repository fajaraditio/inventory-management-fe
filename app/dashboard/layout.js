"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const { Navbar, NavbarBrand, NavbarContent, NavbarItem } = require("@nextui-org/react");
const { default: Link } = require("next/link");

const DashboardLayout = () => {
    const navbarItems = [
        {
            name: 'Dashboard',
            route: '/dashboard',
        },
        {
            name: 'Product Category',
            route: 'product-category',
        },
        {
            name: 'Product',
            route: '/dashboard/product',
        }
    ];

    return (
        <div>
            <Navbar position="static">
                <NavbarBrand>
                    <Image src="/gree-logo.svg" className="mb-3" alt="Gree Logo" width={100} height={100}></Image>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    {
                        (navbarItems.map((item) => {
                            return <NavbarItem isActive={usePathname() == item.route}>
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
        </div>
    );
}

export default DashboardLayout;