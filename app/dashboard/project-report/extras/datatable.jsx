import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";

const DataTable = (data, ...props) => {
    const t = useTranslations('ProjectReportPage');

    const matchSimilarities = data.data;
    return (
        <div className="bg-white rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('number')}</TableHead>
                        <TableHead>{t('salesman_name')}</TableHead>
                        <TableHead>{t('report_title')}</TableHead>
                        <TableHead>{t('report_content')}</TableHead>
                        <TableHead>{t('created_at')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {matchSimilarities && matchSimilarities.length > 0 ?
                        <>
                            {matchSimilarities.map((b2bproject, index) => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell className="font-base">{project.salesman_name}</TableCell>
                                    <TableCell className="font-base">{project.report_title}</TableCell>
                                    <TableCell className="font-base">{project.report_content}</TableCell>
                                    <TableCell className="font-base">{project.created_at}</TableCell>
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

export default DataTable;