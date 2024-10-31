import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription, DialogFooter, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";
import { useState } from "react";


const ViewDialog = ({ data, onClose, isOpen }) => {
    return (
        <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>View Report</DialogTitle>
                    <DialogDescription>
                        View report from salesman
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const DataTable = (data, ...props) => {
    const t = useTranslations('ProjectReportPage');

    const projects = data.data;

    const [isDialogOpen, setDialogOpen] = useState(false);

    const viewDataset = async () => {
        setDialogOpen(true);
    }

    return (
        <>
            <ViewDialog onClose={setDialogOpen} isOpen={isDialogOpen} />

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
                                            <Button onClick={() => viewDataset()}>View</Button>
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