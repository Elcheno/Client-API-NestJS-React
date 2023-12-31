/* eslint-disable react/prop-types */
import FormNote from "./formNote"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"

const AddNote = ({ addNote }) => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Note <PlusCircle className="ml-2"/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Note</DialogTitle>
                    <DialogDescription>
                        Create a new note
                    </DialogDescription>
                </DialogHeader>
                <FormNote submit={addNote}/>
            </DialogContent>
        </Dialog>
    )
}

export default AddNote