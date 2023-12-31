/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { DialogFooter, DialogClose } from "@/components/ui/dialog"


const FormNote = ({ note = null, submit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setDescription(note.description);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title && title.length > 4) {
            const newNote = {
                id: note?.id,
                title,
                description,
                date: new Date(Date.now()).toISOString(),
            }
            submit(newNote);
            dialogClose();
        }
    }

    const dialogClose = () => {
        document.getElementById('closeDialog')?.click();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
                {
                    note
                        ? (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">
                                        Title
                                    </Label>
                                    <Input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        type="text"
                                        id="title"
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">
                                        Description
                                    </Label>
                                    <Input
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        type="text"
                                        id="description"
                                        className="col-span-3"
                                    />
                                </div>
                                <DialogFooter className="sm:justify-between">
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary" id="closeDialog">
                                            Close
                                        </Button>
                                    </DialogClose>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </>
                        )
                        : (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">
                                        Title
                                    </Label>
                                    <Input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        type="text"
                                        id="title"
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">
                                        Description
                                    </Label>
                                    <Input
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        type="text"
                                        id="description"
                                        className="col-span-3"
                                    />
                                </div>
                                <DialogFooter className="sm:justify-between">
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary" id="closeDialog">
                                            Close
                                        </Button>
                                    </DialogClose>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </>
                        )
                }
            </div>
        </form>
    )
}

export default FormNote