/* eslint-disable react/prop-types */
import FormNote from "./FormNote"
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

const UpdateNote = ({ note, updateNote }) => {
    
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Update note</DialogTitle>
                <DialogDescription>
                    Update title and description of the note
                </DialogDescription>
            </DialogHeader>
            <FormNote note={note} submit={updateNote}/>
        </DialogContent>
    )
}

export default UpdateNote