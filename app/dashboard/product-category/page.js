"use client";

import React, { useEffect, useState } from "react";
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

const ProductCategoryPage = () => {
    const [productCategories, setProductCategories] = useState(null);

    useEffect(() => {
        async function fetchProductCategories() {
            let response = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/api/v1/product-categories`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.api+json'
                }
            });

            let data = await response.json();

            setProductCategories(data.data)
        }

        fetchProductCategories();
    }, [])

    if (!productCategories) return <div>Loading ...</div>

    console.log(productCategories);

    return (
        <div>
            <Table aria-label="Table">
                <TableHeader>
                    <TableColumn width={300}>Name</TableColumn>
                    <TableColumn>Description</TableColumn>
                </TableHeader>
                <TableBody>
                    {productCategories.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.attributes.name}</TableCell>
                            <TableCell>{row.attributes.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ProductCategoryPage;