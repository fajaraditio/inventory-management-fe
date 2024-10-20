"use client";

import Image from "next/image";

const { Navbar, NavbarBrand, NavbarContent, NavbarItem } = require("@nextui-org/react");
const { default: Link } = require("next/link");

const DashboardLayout = () => {
    return (
        <div>
            <Navbar position="static">
                <NavbarBrand>
                    <Image src="/gree-logo.svg" className="mb-3" alt="Gree Logo" width={100} height={100}></Image>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem className="hidden sm:flex gap-4">
                        <Link color="foreground" href="/dashboard">
                            Dashboard
                        </Link>
                        <Link color="foreground" href="/dashboard">
                            Product Category
                        </Link>
                        <Link color="foreground" href="/dashboard">
                            Product
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">

                </NavbarContent>
            </Navbar>
        </div>
    );
}

export default DashboardLayout;