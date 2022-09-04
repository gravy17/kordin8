import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Nav_stat from "../../components/nav-status/Nav_stat";
// import Datatable from '../../components/data-table/Datatable';
import { Table, TableHead, TableRow } from '@mui/material';




function Orders() {

  return (
    <>
    <Nav_stat />
    <div className="dashboard">
      <Sidebar />
      </div>
      {/* <Datatable /> */}
      <Table>
        <TableHead>
          <TableRow>
            <th>Name</th>
            <th>Name</th>

            <th>Status</th>
          </TableRow>
        </TableHead>
      </Table>
  </>
  )
}

export default Orders