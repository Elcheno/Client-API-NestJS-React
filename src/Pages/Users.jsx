/* eslint-disable react/prop-types */
import DataTable from "../Components/DataTable"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Users = ({ users, loadItems, sessionData }) => {
    useEffect(() => {
        const rol = sessionData?.rol
        if (rol !== "admin") navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const navigate = useNavigate()

    const columns = [
        {
            accessorKey: "username",
            header: "Username",
            cell: ({ row }) => {
                const username = row.getValue("username")
                return (
                    <div className="font-medium">{username}</div>
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
                const state = row.getValue("state")
                return (
                    <div>{state}</div>
                )
            }
        }
    ]

    const toggleRowSelected = () => {}

    return (
        <main className="mx-auto py-10 w-full pr-8 pl-8 mb-10">
            <DataTable columns={ columns } data={ users } loadItems={ loadItems } toggleRowSelected={ toggleRowSelected } />
        </main>
    )
}

export default Users