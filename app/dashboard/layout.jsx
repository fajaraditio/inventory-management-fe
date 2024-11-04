'use client';

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Boxes, Home, ListChecks, Table } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { setLanguage } from "../lib/actions/switchLang";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslations } from "next-intl";

const AppSidebar = () => {
    const t = useTranslations('NavMenu');

    return (
        <Sidebar className="p-3">
            <SidebarHeader>
                <h1 className="font-bold">{t('dashboard')}</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>{t('product')}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/">
                                        <Home />
                                        <span>{t('home')}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/dashboard/product-category">
                                        <Boxes />
                                        <span>{t('product_category')}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>{t('b2b_project')}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/dashboard/browse-project">
                                        <ListChecks />
                                        <span>{t('browse_project')}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/dashboard/project-report">
                                        <Table />
                                        <span>{t('project_report')}</span>
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
                <SelectItem value="zh">Chinese</SelectItem>
                <SelectItem value="id">Indonesia</SelectItem>
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
            <div className="fixed bottom-10 left-10 z-10">
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
            <div className="fixed bottom-10 left-10 z-10">
                <LanguageSwitcher switch={switchLanguage}></LanguageSwitcher>
            </div>
        </SidebarProvider>
    )
}

export default DashboardLayout;