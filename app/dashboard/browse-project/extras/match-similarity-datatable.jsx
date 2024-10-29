import B2BProjectService from "@/app/lib/services/B2BProjectService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const MatchSimilarityDataTable = (data, ...props) => {
    const t = useTranslations('BrowseProjectPage');

    const matchSimilarities = data.data;

    console.log(matchSimilarities);

    return (
        <div className="bg-white rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('number')}</TableHead>
                        <TableHead>{t('project_code')}</TableHead>
                        <TableHead>{t('project_name')}</TableHead>
                        <TableHead>{t('salesman')}</TableHead>
                        <TableHead>{t('latitude')}</TableHead>
                        <TableHead>{t('longitude')}</TableHead>
                        <TableHead>{t('total_amount')}</TableHead>
                        <TableHead>{t('similarity_score')}</TableHead>
                        <TableHead>{t('is_existing_project')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {matchSimilarities && matchSimilarities.length > 0 ?
                        <>
                            {matchSimilarities.map((b2bproject, index) => (
                                <TableRow key={b2bproject.id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell className="font-medium">{b2bproject.project_code}</TableCell>
                                    <TableCell className="font-base">{b2bproject.project_name}</TableCell>
                                    <TableCell className="font-base">{b2bproject.salesman}</TableCell>
                                    <TableCell className="font-base">{b2bproject.latitude}</TableCell>
                                    <TableCell className="font-base">{b2bproject.longitude}</TableCell>
                                    <TableCell className="font-base">{b2bproject.total_amount}</TableCell>
                                    <TableCell className="font-base">{b2bproject.total_similarity}</TableCell>
                                    <TableCell className="font-base">{b2bproject.project_status}</TableCell>
                                </TableRow>
                            ))}
                        </>
                        :
                        <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center">
                                {t('no_results')}
                            </TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default MatchSimilarityDataTable;