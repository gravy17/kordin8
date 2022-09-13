import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext, useRef } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../config";

const List = ({ rows }) => {
  const { type } = useContext(UserContext);
  const navigate = useNavigate();
  const statusReport = useRef();
  const currentStatus = useRef();
  const reportStatusBtn = useRef();

  const viewOrder = (id) => {
    navigate(`/orders/${id}`);
  }

  const updateOrder = async(id, status) => {
    const res = await fetch(`${SERVER_URL}/order/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        status
      })
    })

    if (!res.ok) {
      alert("Error updating order");
    } else {
      alert("Order updated");
    }
    return;
  }

  const attemptDelete = async(id) => {
    const res = await fetch(`${SERVER_URL}/order/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    return res;
  }

  const handleAccept = (id, evt) => {
    evt.target.disabled = true;
    updateOrder(id, "Accepted");
    viewOrder(id);
  }

  const handleUpdate = (id) => {
    statusReport.current.open = true;
    reportStatusBtn.current.onclick = () => {
      const status = currentStatus.current.value;
      updateOrder(id, status);
      statusReport.current.open = false;
    }
    viewOrder(id);
  }

  const handleComplete = (id, evt) => {
    evt.target.disabled = true;
    updateOrder(id, "Completed");
    viewOrder(id);
  }

  const handleReassign = (id, evt) => {
    evt.target.disabled = true;
    fetch(`${SERVER_URL}/order/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    }).then((res) => {
      if (!res.ok) {
        alert("Error rejecting order");
      } else {
        alert("Order reassigned");
        navigate("/orders");
      }
    })
  }

  const handleReject = (id, evt) => {
    evt.target.disabled = true;
    updateOrder(id, "Rejected");
    viewOrder(id);
  }

  const handleCancel = (id, evt) => {
    evt.target.disabled = true;
    attemptDelete(`my-orders/${id}`).then((res) => {
      if (!res.ok) {
        alert("Error cancelling order");
      } else {
        alert("Order cancelled");
        navigate("/orders");
      }
    })
  }

  const handleCancelRequest = (id, evt) => {
    evt.target.disabled = true;
    attemptDelete(`my-orders/${id}`).then((res) => {
      if (!res.ok) {
        alert("Error requesting cancellation");
      } else {
        alert("Order cancellation requested");
      }
    })
  }

  const handleDelete = (id, evt) => {
    evt.target.disabled = true;
    attemptDelete(id).then((res) => {
      if (!res.ok) {
        alert("Error deleting order");
      } else {
        alert("Order deleted");
        navigate("/orders");
      }
    })
  }

  return (
    <>
    <dialog open={false} ref={statusReport}>
      <p>Choose a status to report:</p>
      <form method="dialog">
        <select ref={currentStatus}>
          <option value="In Progress">In Progress</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button ref={reportStatusBtn}>OK</button>
      </form>
    </dialog>
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
          {rows[0] && rows.map((row) => (
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
                    <button className="button" onClick={handleUpdate.bind(null, row.id)}>Report Status</button>
                  </>
                }
                { type==="agent" && row.status === "Pending" &&
                  <>
                    <button className="button" onClick={handleAccept.bind(null, row.id)}>Accept</button>
                    <button className="button" onClick={handleReassign.bind(null, row.id)}>Reject</button>
                  </>
                }
                { type==="customer" && row.status === "Pending" &&
                  <button className="button" onClick={handleCancel.bind(null, row.id)}>Cancel</button>
                }
                { type==="customer" && row.status !== "Pending" && row.status !== "Completed" && row.status !== "Rejected" &&
                  <>
                    <button className="button" onClick={handleComplete.bind(null, row.id)}>Mark Complete</button>
                    <button className="button" onClick={handleCancelRequest.bind(null, row.id)}>Request Cancel</button>
                  </>
                }
                { type==="admin" &&
                  <>
                    <button className="button" onClick={handleReassign.bind(null, row.id)}>Reassign agent</button>
                    <button className="button" onClick={handleReject.bind(null, row.id)}>Reject</button>
                    <button className="button" onClick={handleDelete.bind(null, row.id)}>Delete</button>
                  </>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default List;
