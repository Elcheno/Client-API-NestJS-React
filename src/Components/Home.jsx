/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import noteService from "../Services/noteService"
// import uiService from "../Services/uiService"
// import { useState, useEffect } from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import AddNote from "./addNote"

const columns = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title")
      return (
        <div className="font-medium">{title}</div>
      )
    }
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return new Date(row.getValue("date")).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    }
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => {
      return new Date(row.getValue("time")).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    }
  }
]


export function DataTable({ columns, data, loadNotes }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

  })

  const loadMoreNotes = () => {
    loadNotes()
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
      <div className="mt-4 flex justify-center">
        <Button onClick={loadMoreNotes}>Load More</Button>
      </div>
    </div>
  )
}


export default function Home({ notes, setNotes, loadNotes }) {


  const addNote = (note) => {
    noteService.saveNote(note)
    .then((newNote) => {
      setNotes([newNote, ...notes])
    })
    // setNotes(notes.unshift(note))
    // setNotes([note, ...notes])
  }

  return (
    <div className="mx-auto py-10 w-full pr-8 pl-8 overflow-x-scroll mb-10">
      <div>
        <AddNote addNote={addNote} />
      </div>
      <DataTable columns={columns} data={notes} loadNotes={loadNotes} />
    </div>
  )
}