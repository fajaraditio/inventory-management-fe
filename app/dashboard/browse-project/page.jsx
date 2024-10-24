"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import SearchProvince from "./extras/search-province";
import SearchCity from "./extras/search-city";
import SearchDistrict from "./extras/search-district";
import SearchSubDistrict from "./extras/search-sub-district";

const BrowseProject = () => {
    let formState = {
        project_name: "",
    };

    const [errorState, setErrorState] = useState({ ...formState })

    return (
        <>
            <div className="flex flex-col gap-6">
                <h1 className="font-medium text-2xl">Browse Project</h1>

                <Separator></Separator>

                <div>
                    <h2 className="font-medium text-lg">Search Projects</h2>
                    <p className="text-sm">Search projects with criteria and check similarity between projects</p>
                </div>

                <div className="flex flex-wrap items-start gap-6">
                    <div className="w-1/4">
                        <Label htmlFor="email" className="mb-6">Project Name</Label>
                        <Input type="text" name="project_name" id="project_name" placeholder="e.g: RS PIK" autoComplete="off" className={errorState.email ? "ring-red-500 ring-1" : ""} />
                    </div>
                    <div className="w-1/4">
                        <Label htmlFor="province_name" className="mb-6">Province Name</Label>
                        <SearchProvince />
                    </div>
                    <div className="w-1/4">
                        <Label htmlFor="city_name" className="mb-6">City Name</Label>
                        <SearchCity />
                    </div>
                    <div className="w-1/4">
                        <Label htmlFor="city_name" className="mb-6">District Name</Label>
                        <SearchDistrict />
                    </div>
                    <div className="w-1/4">
                        <Label htmlFor="city_name" className="mb-6">Sub District Name</Label>
                        <SearchSubDistrict />
                    </div>
                </div>
            </div>
        </>
    );
}

export default BrowseProject;