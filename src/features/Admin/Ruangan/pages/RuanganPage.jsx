import React, { useState } from 'react'
import TableRuangan from '../components/tableRuangan'

const RuanganPage = () => {
    const [collapsed, setCollapsed] = useState(false)
  return (
    <div className="min-h-screen bg-gray-50">
      <TableRuangan />
    </div>
  )
}

export default RuanganPage