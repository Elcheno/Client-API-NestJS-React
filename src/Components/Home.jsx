import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect } from "react"
import noteService from "../Services/noteService"
import uiService from "../Services/uiService"
import { useState } from "react"

export default function Home() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    loadNotes()
  }, [])

  const loadNotes = () => {
    uiService.showLoading()
    setTimeout(() => {
      noteService.getNotes()
        .then((res) => {
          if (res) {
            setNotes(res)
            console.log(res)
          }
          uiService.dismissLoading()
        })
        .catch((err) => {
          console.log(err)
          uiService.dismissLoading()
        })
    }, 2000)
  }

  return (
    <Table>
      <TableCaption>A list of your notes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[350px]">Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-center">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notes.map((note) => (
          <TableRow key={note.id}>
            <TableCell className="font-medium">{note.title}</TableCell>
            <TableCell>{note.description}</TableCell>
            <TableCell className="text-center">{new Date(note.date).toLocaleDateString()}</TableCell>
            <TableCell className="text-center">{new Date(note.date).toLocaleTimeString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}