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
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect } from "react"

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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


export function DataTable({ columns, data, loadNotes, toggleRowSelected }) {
  useEffect(() => {
    exportRowSelected()
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

  })

  const exportRowSelected = () => {
    toggleRowSelected(table)
  }

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
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="mt-4 flex justify-center">
        <Button onClick={loadMoreNotes}>Load More</Button>
      </div>
    </div>
  )
}


export default function Home({ notes, setNotes, loadNotes }) {
  let rowSelected = []

  const toggleRowSelected = (table) => {
    // console.log(table.getFilteredSelectedRowModel().rows)
    rowSelected = table.getFilteredSelectedRowModel().rows
  }

  const addNote = (note) => {
    noteService.saveNote(note)
    .then((newNote) => {
      setNotes([newNote, ...notes])
    })
    .catch((err) => console.log(err))
    // setNotes([note, ...notes])
  }

  const removeNote = () => {
    if (rowSelected.length > 0) {
      let noteId = rowSelected[0].original.id
      noteService.deleteNote(noteId)
      .then(() => {
        setNotes(notes.filter((note) => note.id !== noteId))
      })
      .catch((err) => console.log(err))
      // setNotes(notes.filter((note) => note.id !== noteId))
    }
  }
    
  return (
    <div className="mx-auto py-10 w-full pr-8 pl-8 overflow-x-scroll mb-10">
      <div className="flex justify-start gap-x-4 mb-3">
        <AddNote addNote={addNote} />
        <Button onClick={removeNote}>Remove Note ➖</Button>
      </div>
      <DataTable columns={columns} data={notes} loadNotes={loadNotes} toggleRowSelected={toggleRowSelected}/>
    </div>
  )
}