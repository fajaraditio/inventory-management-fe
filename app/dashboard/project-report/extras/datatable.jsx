import ProjectReportService from "@/app/lib/services/ProjectReportService";
import TranslateService from "@/app/lib/services/TranslateService";
import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription, DialogFooter, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFormatter, useTranslations } from "next-intl";
import { useState } from "react";

const ViewDialog = ({ data, onOpenChange, isOpen }) => {
    const t = useTranslations('ProjectReportPage');
    const format = useFormatter();

    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);

    let projectReport = data?.data;

    const translate = async (targetLang) => {
        const translatedTitle = await TranslateService.translate(projectReport?.title, targetLang);
        const translatedContent = await TranslateService.translate(projectReport?.content, targetLang);

        projectReport.title = translatedTitle.data[0];
        projectReport.content = translatedContent.data[0];

        setTitle(translatedTitle.data[0]);
        setContent(translatedContent.data[0]);
    }

    if (title && content && !isOpen) {
        setTitle(null);
        setContent(null);
    }

    return (
        <Dialog onOpenChange={onOpenChange} open={isOpen} modal defaultOpen={isOpen}>
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
                        <span id="title" className="italic">{title || projectReport?.title}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="block mb-2 font-medium">{t('report_content')}</label>
                        <span id="content" className="italic">{content || projectReport?.content}</span>
                    </div>
                </div>
                <DialogFooter>
                    <LanguageSwitcher switch={translate} />
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
            <ViewDialog onOpenChange={setDialogOpen} isOpen={isDialogOpen} data={singleDataset} />

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
        </Select>
    );
}

export default DataTable;