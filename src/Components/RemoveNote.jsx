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
                    <AlertDialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2">   
                        Remove Note <Trash2 className="ml-2" />         
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