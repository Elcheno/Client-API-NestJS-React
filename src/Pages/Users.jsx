/* eslint-disable react/prop-types */
import DataTable from "../Components/DataTable"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Circle } from "lucide-react"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import DialogAlert from "../Components/DialogAlert"
import userService from "../Services/userService"
import uiService from "../Services/uiService"

const Users = ({ users, loadItems, sessionData, setUsers }) => {
    useEffect(() => {
        const rol = sessionData?.rol
        if (rol !== "admin") navigate("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const navigate = useNavigate()

    const columns = [
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => {
                const email = row.getValue("email")
                return (
                    <div className="font-medium">{email}</div>
                )
            }
        },
        {
            accessorKey: "username",
            header: "Username",
            cell: ({ row }) => {
                const username = row.getValue("username")
                return (
                    <div>{username}</div>
                )
            }
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => {
                const name = row.getValue("name")
                return (
                    <div>{name}</div>
                )
            }
        },
        {
            accessorKey: "state",
            header: "State",
            cell: ({ row }) => {
                let state = row.getValue("state")
                return (
                    <div className="flex items-center">
                        { state === 'active' && <Circle className="h-2.5 w-2.5 mr-2 text-green-400"/> }
                        { state === 'blocked' && <Circle className="h-2.5 w-2.5 mr-2 text-red-400"/> }
                        { state }
                    </div>
                )
            }
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const user = row.original

                return (
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
                                <DropdownMenuItem className="cursor-pointer">
                                    <AlertDialogTrigger className="w-full text-start">
                                        {user?.state === "active" ? "Block" : "Active"}
                                    </AlertDialogTrigger>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DialogAlert 
                            title={ user?.state === "active" ? "Block User" : "Active User" } 
                            msg={ user?.state === "active" ? "Are you sure you want to block this user?" : "Are you sure you want to active this user?" } 
                            handleConfirm={() => updateStateUser(user)} 
                        />
                    </AlertDialog >
                )
            },
        },
    ]

const toggleRowSelected = () => { }

const updateStateUser = (user) => {
    uiService.showLoading()
    user.state = user.state === "active" ? "blocked" : "active"
    userService.updateUserState({ id: user.id, state: user.state })
    .then((res) => {
        if (!res) return
        setUsers(users.map((u) => u.id === res.id ? res : u))
        uiService.toast({ type: 'success', msg: 'State updated successfully' })
    }).catch((err) => {
        console.log(err)
        uiService.toast({ type: 'error', msg: 'Failed to update state' })
    })
    .finally(() => {
        uiService.dismissLoading()
    })
}

return (
    <main className="mx-auto py-10 w-full pr-8 pl-8 mb-10">
        <DataTable columns={columns} data={users} loadItems={loadItems} toggleRowSelected={toggleRowSelected} />
    </main>
)
}

export default Users