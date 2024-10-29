'use client';

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Boxes, Home, ListChecks } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { setLanguage } from "../lib/actions/switchLang";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AppSidebar = () => {
    return (
        <Sidebar className="p-3">
            <SidebarHeader>
                <h1 className="font-bold">Dashboard</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Product</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/">
                                        <Home />
                                        <span>Home</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/dashboard/product-category">
                                        <Boxes />
                                        <span>Product Category</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>B2B Project</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/dashboard/browse-project">
                                        <ListChecks />
                                        <span>Browse Projects</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

const LanguageSwitcher = (props) => {
    return (
        <Select onValueChange={(val) => props.switch(val)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="zh">Mandarin</SelectItem>
                <SelectItem value="jp">Japan</SelectItem>
            </SelectContent>
        </Select >
    )
}

const DashboardLayout = ({ children }) => {
    const router = useRouter();

    const pathName = usePathname();

    const switchLanguage = async (locale) => {
        await setLanguage(locale);

        console.log(locale);

        router.refresh();
    }

    const blankLayoutRoutes = [
        '/dashboard/login',
    ];

    if (blankLayoutRoutes.includes(pathName)) return (
        <>
            <main className="w-full flex items-center justify-center">
                <div className="container p-6">
                    {children}
                </div>
            </main>
            <div className="fixed bottom-10 right-10 z-10">
                <LanguageSwitcher switch={switchLanguage}></LanguageSwitcher>
            </div>
        </>
    );

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <SidebarTrigger></SidebarTrigger>
                <div className="container p-6">
                    {children}
                </div>
            </main>
            <div className="fixed bottom-10 right-10 z-10">
                <LanguageSwitcher switch={switchLanguage}></LanguageSwitcher>
            </div>
        </SidebarProvider>
    )
}

export default DashboardLayout;