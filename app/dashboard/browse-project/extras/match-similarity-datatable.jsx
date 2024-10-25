import B2BProjectService from "@/app/lib/services/B2BProjectService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

const MatchSimilarityDataTable = (data, ...props) => {
    const matchSimilarities = data.data;

    console.log(matchSimilarities);

    return (
        <div className="bg-white rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>No.</TableHead>
                        <TableHead>Project Code</TableHead>
                        <TableHead>Project Name</TableHead>
                        <TableHead>Salesman</TableHead>
                        <TableHead>Latitude</TableHead>
                        <TableHead>Longitude</TableHead>
                        <TableHead>Total Amount</TableHead>
                        <TableHead>Similarity Score</TableHead>
                        <TableHead>Is Existing Project?</TableHead>
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
                                No results.
                            </TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default MatchSimilarityDataTable;