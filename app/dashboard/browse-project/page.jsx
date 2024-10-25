"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import SearchProvince from "./extras/search-province";
import SearchCity from "./extras/search-city";
import SearchDistrict from "./extras/search-district";
import SearchSubDistrict from "./extras/search-sub-district";
import MatchSimilarityDataTable from "./extras/match-similarity-datatable";
import { Button } from "@/components/ui/button";
import B2BProjectService from "@/app/lib/services/B2BProjectService";

const BrowseProject = () => {
    let formState = {
        project_name: "",
        province_name: "",
        city_name: "",
        district_name: "",
        sub_district_name: "",
    };

    const [errorState, setErrorState] = useState({ ...formState });
    const [similarityData, setSimilarityData] = useState(null);

    const searchProject = async (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        const request = Object.fromEntries(formData.entries());

        const response = await B2BProjectService.fetchMatchSimilarityProject(request);

        if (!response.success) {
            let errors = {};

            if (response.errors?.project_name) errors = { project_name: response.errors.project_name[0] };
            if (response.errors?.province_name) errors = { ...errorState, province_name: response.errors.province_name[0] };
            if (response.errors?.city_name) errors = { ...errorState, city_name: response.errors.city_name[0] };
            if (response.errors?.district_name) errors = { ...errorState, district_name: response.errors.district_name[0] };
            if (response.errors?.sub_district_name) errors = { ...errorState, sub_district_name: response.errors.sub_district_name[0] };

            setErrorState(errors);
        }

        setSimilarityData(response.data);
    }

    return (
        <>
            <div className="flex flex-col gap-6">
                <h1 className="font-medium text-2xl">Browse Project</h1>

                <Separator></Separator>

                <div>
                    <h2 className="font-medium text-lg">Search Projects</h2>
                    <p className="text-sm">Search projects with criteria and check similarity between projects</p>
                </div>

                <form onSubmit={searchProject}>
                    <div className="flex flex-wrap items-start gap-6 w-full mb-6">
                        <div className="w-1/3">
                            <Label htmlFor="email" className="mb-6">Project Name</Label>
                            <Input type="text" name="project_name" id="project_name" placeholder="e.g: RS PIK" autoComplete="off" className={errorState.project_name ? "ring-red-500 ring-1" : ""} />
                            {errorState.project_name ? <small className="text-red-500">{errorState.project_name}</small> : ''}
                        </div>
                        <div className="w-1/3">
                            <Label htmlFor="province_name" className="mb-6">Province Name</Label>
                            <SearchProvince className={errorState.province_name ? "ring-red-500 ring-1" : ""} />
                            {errorState.province_name ? <small className="text-red-500">{errorState.province_name}</small> : ''}
                        </div>
                        <div className="w-1/3">
                            <Label htmlFor="city_name" className="mb-6">City Name</Label>
                            <SearchCity className={errorState.city_name ? "ring-red-500 ring-1" : ""} />
                            {errorState.city_name ? <small className="text-red-500">{errorState.city_name}</small> : ''}
                        </div>
                        <div className="w-1/3">
                            <Label htmlFor="city_name" className="mb-6">District Name</Label>
                            <SearchDistrict className={errorState.district_name ? "ring-red-500 ring-1" : ""} />
                            {errorState.district_name ? <small className="text-red-500">{errorState.district_name}</small> : ''}
                        </div>
                        <div className="w-1/3">
                            <Label htmlFor="city_name" className="mb-6">Sub District Name</Label>
                            <SearchSubDistrict className={errorState.sub_district_name ? "ring-red-500 ring-1" : ""} />
                            {errorState.sub_district_name ? <small className="text-red-500">{errorState.sub_district_name}</small> : ''}
                        </div>
                    </div>

                    <div>
                        <Button type="submit">Search Projects</Button>
                    </div>
                </form>

                <div className="w-full">
                    <MatchSimilarityDataTable data={similarityData} />
                </div>
            </div>
        </>
    );
}

export default BrowseProject;