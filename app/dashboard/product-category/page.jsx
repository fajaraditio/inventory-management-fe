"use client";

import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure, Input, Textarea } from "@nextui-org/react";

const ProductCategoryPage = () => {
    const [productCategories, setProductCategories] = useState(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

    const createProductCategory = () => {
        
    }

    const createButton = () => {
        return (
            <>
                <Button className="bg-blue-700 text-white" radius="sm" onPress={onOpen}>Create Product Category</Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <form onSubmit={createProductCategory}>
                                    <ModalHeader className="flex flex-col gap-2">Create Product Category</ModalHeader>
                                    <ModalBody>
                                        <div className="mb-6">
                                            <Input type="text" name="name" label="Product Category Name" placeholder="e.g: AC LCAC" autoComplete="off" size="md" radius="sm" variant="bordered" labelPlacement="outside" classNames={{
                                                inputWrapper: [
                                                    "border-1",
                                                ]
                                            }} />
                                        </div>
                                        <div className="mb-6">
                                            <Textarea name="description" label="Product Category Description" autoComplete="off" size="md" radius="sm" variant="border" labelPlacement="outside" classNames={{
                                                inputWrapper: [
                                                    "bg-white hover:bg-white",
                                                    "border-1",
                                                ],
                                            }}>
                                            </Textarea>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button type="button" color="danger" variant="light" onPress={onClose} radius="sm">
                                            Close
                                        </Button>
                                        <Button type="submit" color="primary" onPress={onClose} radius="sm">
                                            Create
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </>
                        )}

                    </ModalContent>
                </Modal>
            </>
        )
    }

    return (
        <div className="flex flex-col gap-3">
            <div>
                {createButton()}
            </div>
            <Table aria-label="Table" radius="sm">
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