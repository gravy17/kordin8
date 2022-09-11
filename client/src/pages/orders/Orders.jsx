import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./orders.scss";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../../config";

const Orders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch(`${SERVER_URL}/order`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
    })
      .then((res) => res.ok && res.json())
      .then((data) => {
        data.map(order => order.price = Number(order.price) || 0)
        setOrders(data);
      });
  }, []);

  return (
    <div className="orders">
      <Sidebar />
      <div className="ordersContainer">
        <Navbar />
        {orders && <div className="listContainer">
          <div className="listTitle">Orders</div>
          <Table rows={orders} />
        </div>}
      </div>
    </div>
  );
};

export default Orders;
