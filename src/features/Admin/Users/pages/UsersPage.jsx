import TableUsers from "../components/TableUsers"
import { useState } from "react"

const UsersPage = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="p-6">
        <TableUsers />
      </div>

    </div>
  )
}

export default UsersPage