import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const List = ({ rows }) => {
  const { type } = useContext(UserContext);
  const navigate = useNavigate();
  const opts = {
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  }

  const viewOrder = (id) => {
    navigate(`/orders/${id}`);
  }

  const handleAccept = (id) => {
  }

  const handleUpdate = (id) => {
  }

  const handleComplete = (id) => {
  }

  const handleReassign = (id) => {
  }

  const handleCancel = (id) => {
  }

  const handleCancelRequest = (id) => {
  }

  const handleDelete = (id) => {
  }

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Date placed</TableCell>
            <TableCell className="tableCell">Order Type</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Agent</TableCell>
            <TableCell className="tableCell">Status</TableCell>
            <TableCell className="tableCell">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length && rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{new Date(row.createdAt).toLocaleString('en')}</TableCell>
              <TableCell className="tableCell">{row.orderType}</TableCell>
              <TableCell className="tableCell">{row.price}</TableCell>
              <TableCell className="tableCell">{row.customer.firstName}</TableCell>
              <TableCell className="tableCell">{row.assignedAgent?.firstName}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status.replace(' ','')}`}>{row.status}</span>
              </TableCell>
              <TableCell className="tableCell">
                <button className="button" onClick={viewOrder.bind(null, row.id)}>View</button>
                { type==="agent" && 
                  <>
                    <button className="button" onClick={handleAccept.bind(null, row.id)}>Accept</button>
                    <button className="button" onClick={handleReassign.bind(null, row.id)}>Reject</button>
                    <button className="button" onClick={handleUpdate.bind(null, row.id)}>Report Status</button>
                  </>
                }
                { type==="customer" && row.status === "Pending" &&
                  <button className="button" onClick={handleCancel.bind(null, row.id)}>Cancel</button>
                }
                { type==="customer" && row.status !== "Pending" &&
                  <>
                    <button className="button" onClick={handleComplete.bind(null, row.id)}>Mark Complete</button>
                    <button className="button" onClick={handleCancelRequest.bind(null, row.id)}>Request Cancel</button>
                  </>
                }
                { type==="admin" &&
                  <>
                    <button className="button" onClick={handleReassign.bind(null, row.id)}>Reassign agent</button>
                    <button className="button" onClick={handleDelete.bind(null, row.id)}>Delete</button>
                  </>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
