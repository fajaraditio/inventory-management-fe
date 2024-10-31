import ProjectReportService from "@/app/lib/services/ProjectReportService";
import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription, DialogFooter, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFormatter, useTranslations } from "next-intl";
import { useState } from "react";

const ViewDialog = ({ data, onClose, isOpen }) => {
    const t = useTranslations('ProjectReportPage');
    const format = useFormatter();

    let projectReport = data?.data;

    return (
        <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>View Report</DialogTitle>
                    <DialogDescription>
                        View report from salesman
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <div className="mb-3">
                        <label htmlFor="salesman_name" className="block mb-2 font-medium">{t('salesman_name')}</label>
                        <span id="salesman_name" className="italic">{projectReport?.salesman_name}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="salesman_name" className="block mb-2 font-medium">{t('created_at')}</label>
                        <span id="salesman_name" className="italic">{projectReport && projectReport.created_at ? format.dateTime(new Date(projectReport?.created_at), {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        }) : ''}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="block mb-2 font-medium">{t('report_title')}</label>
                        <span id="title" className="italic">{projectReport?.title}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="block mb-2 font-medium">{t('report_content')}</label>
                        <span id="content" className="italic">{projectReport?.content}</span>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={() => translate()}>Translate</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const DataTable = (data, ...props) => {
    const t = useTranslations('ProjectReportPage');

    const projects = data.data;

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [singleDataset, setSingleDataset] = useState(null);

    const viewDataset = async (id) => {
        const response = await ProjectReportService.fetchProjectReport(id);

        setSingleDataset(response);

        setDialogOpen(true);
    }

    return (
        <>
            <ViewDialog onClose={setDialogOpen} isOpen={isDialogOpen} data={singleDataset} />

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
                        {projects && projects.length > 0 ?
                            <>
                                {projects.map((project, index) => (
                                    <TableRow key={project.id}>
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell className="font-base">{project.salesman_name}</TableCell>
                                        <TableCell className="font-base">{project.title}</TableCell>
                                        <TableCell className="font-base">{project.content}</TableCell>
                                        <TableCell className="font-base">{project.created_at}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => viewDataset(project.id)}>View</Button>
                                        </TableCell>
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
        </>
    )
}

export default DataTable;