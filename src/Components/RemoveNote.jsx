/* eslint-disable react/prop-types */
import DialogAlert from "./DialogAlert"
import { Trash2 } from "lucide-react"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

const RemoveNote = ({ onDelete, rowSelected }) => {
    return (
        <AlertDialog>
            {
                rowSelected.length > 0
                ? (
                    <AlertDialogTrigger>            
                        <Button>Remove Note <Trash2 className="ml-2" /></Button>
                    </AlertDialogTrigger>
                )
                : (
                    <Button>Remove Note <Trash2 className="ml-2" /></Button>
                )
            }

            <DialogAlert title={"Remove Note"} msg={"Are you sure you want to remove this note?"} handleConfirm={onDelete} />
        </AlertDialog>
    )
}

export default RemoveNote