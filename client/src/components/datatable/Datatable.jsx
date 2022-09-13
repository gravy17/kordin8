import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "./Datasource";
import { useState, useEffect } from "react";
import { SERVER_URL } from "../../config";

const Datatable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${SERVER_URL}/agent/get-all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    }).then((res) => res.ok && res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, [])

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Agents
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default Datatable;
