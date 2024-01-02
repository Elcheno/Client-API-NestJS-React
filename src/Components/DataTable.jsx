/* eslint-disable react/prop-types */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useState, useEffect } from "react"
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

const DataTable = ({ columns, data, loadItems, toggleRowSelected }) => {
    useEffect(() => {
        toggleRowSelected(table)
    })

    const [loadingLoadItems, setLoadingLoadItems] = useState(false)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const loadMoreItems = () => {
        setLoadingLoadItems(true)
        loadItems().then(() => {
            setLoadingLoadItems(false)
        })
    }

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="mt-4 flex flex-col items-center justify-center">
                <div className="h-10 w-10 mb-2">
                    {loadingLoadItems && <span className="loading loading-spinner loading-lg"></span>}
                </div>
                <Button onClick={loadMoreItems}>Load More</Button>
            </div>
        </div>
    )

}

export default DataTable