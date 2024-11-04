import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription, DialogFooter, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdvancedMarker, APIProvider, InfoWindow, Map, Marker, Pin } from "@vis.gl/react-google-maps";
import { useFormatter, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const ViewDialog = ({ data, onOpenChange, isOpen }) => {
    const t = useTranslations('BrowseProjectPage');

    const formatter = useFormatter();

    let b2bproject = data;

    return (
        <Dialog onOpenChange={onOpenChange} open={isOpen} modal defaultOpen={isOpen}>
            <DialogContent className="max-w-screen-lg max-h-svh overflow-auto">
                <DialogHeader>
                    <DialogTitle>View B2B Report</DialogTitle>
                    <DialogDescription>
                        View B2B Project Report
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <div className="mb-3">
                        <label htmlFor="project_code" className="block mb-2 font-medium">{t('project_code')}</label>
                        <span id="project_code" className="italic">{b2bproject?.project_code}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="project_name" className="block mb-2 font-medium">{t('project_name')}</label>
                        <span id="project_name" className="italic">{b2bproject?.project_name}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="salesman" className="block mb-2 font-medium">{t('salesman')}</label>
                        <span id="salesman" className="italic">{b2bproject?.salesman_name}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="total_amount" className="block mb-2 font-medium">{t('total_amount')}</label>
                        <span id="total_amount" className="italic">{formatter.number(b2bproject?.total_amount, { style: 'currency', currencyDisplay: 'narrowSymbol', currency: 'IDR', maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="similarity_score" className="block mb-2 font-medium">{t('similarity_score')}</label>
                        <span id="similarity_score" className="italic">{b2bproject?.total_similarity}%</span>
                    </div>
                    <div className="min-h-96">
                        <APIProvider apiKey={process.env.mapsAPIKey}>
                            <Map zoom={15} center={{ lat: parseFloat(b2bproject?.latitude), lng: parseFloat(b2bproject?.longitude) }} mapId="maps">
                                <AdvancedMarker position={{ lat: parseFloat(b2bproject?.latitude), lng: parseFloat(b2bproject?.longitude) }} title={b2bproject?.project_name}>
                                    <InfoWindow position={{ lat: parseFloat(b2bproject?.latitude), lng: parseFloat(b2bproject?.longitude) }} maxWidth={200}>
                                        <h2 className="font-medium">{b2bproject?.project_code}</h2>
                                        <h1 className="font-medium text-lg">{b2bproject?.project_name}</h1>
                                        <p className="mb-3">{b2bproject?.detail_address}</p>
                                        <p>Salesman: {b2bproject?.salesman_name}</p>
                                        <p>Total Amount: {formatter.number(b2bproject?.total_amount, { style: 'currency', currencyDisplay: 'narrowSymbol', currency: 'IDR', maximumFractionDigits: 0 })}</p>
                                    </InfoWindow>
                                    <Pin
                                        background={'#15489B'}
                                        glyphColor={'#fff'}
                                        borderColor={'#15489B'}
                                    >
                                    </Pin>
                                </AdvancedMarker>
                            </Map>
                        </APIProvider>
                    </div>
                </div>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const MatchSimilarityDataTable = (data, ...props) => {
    const t = useTranslations('BrowseProjectPage');

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [singleDataset, setSingleDataset] = useState(null);

    const matchSimilarities = data.data;

    const viewDataset = async (b2bproject) => {
        setSingleDataset(b2bproject);

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
                            <TableHead>{t('project_code')}</TableHead>
                            <TableHead>{t('project_name')}</TableHead>
                            <TableHead>{t('salesman')}</TableHead>
                            <TableHead>{t('latitude')}</TableHead>
                            <TableHead>{t('longitude')}</TableHead>
                            <TableHead>{t('total_amount')}</TableHead>
                            <TableHead>{t('similarity_score')}</TableHead>
                            <TableHead>{t('is_existing_project')}</TableHead>
                            <TableHead>Action</TableHead>
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
                                        <TableCell>
                                            <Button onClick={() => viewDataset(b2bproject)}>View Project</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                            :
                            <TableRow>
                                <TableCell colSpan={9} className="h-24 text-center">
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

export default MatchSimilarityDataTable;