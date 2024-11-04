"use client";

import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import DataTable from "./extras/datatable";
import ProjectReportService from "@/app/lib/services/ProjectReportService";

const ProjectReport = () => {
    const t = useTranslations('ProjectReportPage');

    const [dataset, setDataset] = useState(null);

    useEffect(() => async () => {
        const response = await ProjectReportService.fetchProjectReports();

        setDataset(response.data);
    }, [])

    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-medium text-2xl">{t('title')}</h1>

            <Separator></Separator>

            <div>
                <h2 className="font-medium text-lg">{t('heading')}</h2>
                <p className="text-sm">{t('subheading')}</p>
            </div>

            <DataTable data={dataset}></DataTable>
        </div>
    );

}

export default ProjectReport;