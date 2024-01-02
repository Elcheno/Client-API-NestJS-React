/* eslint-disable react/prop-types */
import noteService from "../Services/noteService"
import uiService from "../Services/uiService"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import AddNote from "../Components/AddNote"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, FileEdit, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import UpdateNote from "../Components/UpdateNote"
import { Input } from "@/components/ui/input"
import RemoveNote from "../Components/removeNote"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import DialogAlert from "../Components/DialogAlert"
import DataTable from "../Components/DataTable"

export default function Home({ notes, setNotes, loadNotes }) {
  const [filterNoteString, setFilterNoteString] = useState('')
  const [rowSelected, setRowSelected] = useState([])

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
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const note = row.original

        return (
          <Dialog>
            <AlertDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DialogTrigger>
                    <DropdownMenuItem>
                      <FileEdit className="h-4 w-4 mr-2" />
                      Update Note
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuItem>
                    <AlertDialogTrigger className="flex items-center">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Note
                    </AlertDialogTrigger>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <UpdateNote note={note} updateNote={updateNote} />
              <DialogAlert title={"Remove Note"} msg={"Are you sure you want to remove this note?"} handleConfirm={() => removeNote(note)} />
            </AlertDialog>
          </Dialog>
        )
      },
    },
  ]

  const toggleRowSelected = (table) => {
    setRowSelected(table.getFilteredSelectedRowModel().rows)
  }

  const addNote = (note) => {
    uiService.showLoading()

    setTimeout(() => {
      noteService.saveNote(note)
        .then((newNote) => {
          setNotes([newNote, ...notes])
          uiService.dismissLoading()
          uiService.toast({ type: 'success', msg: 'Note added successfully' })
        })
        .catch((err) => {
          console.log(err)
          uiService.dismissLoading()
          uiService.toast({ type: 'error', msg: 'Failed to add note' })
        })
    }, 250)
  }

  const removeNote = (note = null) => {
    if (note?.id) {
      uiService.showLoading()

      setTimeout(() => {
        noteService.deleteNote(note.id)
          .then(() => {
            setNotes(notes.filter((n) => n.id !== note.id))
            uiService.dismissLoading()
            uiService.toast({ type: 'success', msg: 'Note removed successfully' })
          })
          .catch((err) => {
            console.log(err)
            uiService.dismissLoading()
            uiService.toast({ type: 'error', msg: 'Failed to remove note' })
          })
      }, 250)
    } else {
      if (rowSelected.length > 0) {
        uiService.showLoading()

        setTimeout(() => {
          let noteId = rowSelected[0].original.id
          console.log(noteId)
          noteService.deleteNote(noteId)
            .then(() => {
              setNotes(notes.filter((note) => note.id !== noteId))
              uiService.dismissLoading()
              uiService.toast({ type: 'success', msg: 'Note removed successfully' })
            })
            .catch((err) => {
              console.log(err)
              uiService.dismissLoading()
              uiService.toast({ type: 'error', msg: 'Failed to remove note' })
            })
        }, 250)
      }
    }
  }

  const updateNote = (note) => {
    uiService.showLoading()

    setTimeout(() => {
      noteService.updateNote(note)
        .then((updatedNote) => {
          setNotes(notes.map((n) => (n.id === note.id ? updatedNote : n)))
          uiService.dismissLoading()
          uiService.toast({ type: 'success', msg: 'Note updated successfully' })
        })
        .catch((err) => {
          console.log(err)
          uiService.dismissLoading()
          uiService.toast({ type: 'error', msg: 'Failed to update note' })
        })
    }, 250)
  }

  const loadFilteredNotes = (event) => {
    event.preventDefault()
    const filterString = event.target.value
    setFilterNoteString(filterString)
    loadNotes(filterString)
  }

  return (
    <div className="mx-auto py-10 w-full pr-8 pl-8 overflow-x-scroll mb-10">
      <div className="flex justify-start gap-x-4 mb-3">
        <Input
          value={filterNoteString}
          onChange={loadFilteredNotes}
          placeholder="Filter notes..."
          className="max-w-sm"
        />
        <AddNote addNote={addNote} />
        <RemoveNote onDelete={removeNote} rowSelected={rowSelected} />
      </div>
      <DataTable columns={columns} data={notes} loadItems={loadNotes} toggleRowSelected={toggleRowSelected} />
    </div>
  )
}