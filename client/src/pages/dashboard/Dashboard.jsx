import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./dashboard.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Table from "../../components/table/Table";
import { useEffect, useState, useContext } from "react";
import { SERVER_URL } from "../../config";
import { UserContext } from "../../context/userContext";

const Dashboard = () => {
  const [orders, setOrders] = useState([])
  const { type } = useContext(UserContext);

  const [moneyAmt, setMoneyAmt] = useState(0);
  const [ordersAmt, setOrdersAmt] = useState(0);
  const [agentsAmt, setAgentsAmt] = useState(0);

  const [agentsDiff, setAgentsDiff] = useState(0);
  const [ordersDiff, setOrdersDiff] = useState(0);
  const [moneyDiff, setMoneyDiff] = useState(0);

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

  useEffect(() => {
    setOrdersAmt(orders.filter((order) => !["Pending","Rejected","Cancelled"].includes(order.status)).length);
    if(type === "admin") {
      fetch(`${SERVER_URL}/agent/get-all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
      }).then((res) => res.ok && res.json())
        .then((data) => {
          setAgentsAmt(data.length);
          setAgentsDiff(data.filter((agent) => {
            const agentDate = new Date(agent.createdAt);
            const today = new Date();
            return agentDate.getMonth() === today.getMonth() && agentDate.getFullYear() === today.getFullYear();
          }).length/data.length*100 || 0);
        });
    } else if(type === "agent") {
      let earningsAmt = 0, earningsDiff = 0;
      orders.map((order) => {
        if (order.status === "Completed") {
          earningsAmt += order.price;
          const earningDate = new Date(order.updatedAt);
          const today = new Date();
          if (earningDate.getMonth() === today.getMonth() && earningDate.getFullYear() === today.getFullYear()) {
            earningsDiff += order.price;
          }
        }
      })
      setMoneyAmt(earningsAmt);
      setMoneyDiff(earningsDiff/earningsAmt*100 || 0);
    } else if(type === "customer") {
      let spendingAmt = 0, spendingDiff = 0;
      orders.map((order) => {
        if (!["Pending","Rejected","Cancelled"].includes(order.status)) {
          spendingAmt += order.price;
          const spendingDate = new Date(order.updatedAt);
          const today = new Date();
          if (spendingDate.getMonth() === today.getMonth() && spendingDate.getFullYear() === today.getFullYear()) {
            spendingDiff += order.price;
          }
        }
      })
      setMoneyAmt(spendingAmt);
      setMoneyDiff(spendingDiff/spendingAmt*100 || 0);
    }
  }, [orders])

  useEffect(() => {
    if(ordersAmt > 0)
    setOrdersDiff(orders.filter((order) => !["Pending","Rejected","Cancelled"].includes(order.status) && new Date(order.updatedAt).getMonth() === new Date().getMonth()).length/ordersAmt*100);
    else setOrdersDiff(0);
  }, [ordersAmt])

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Navbar />
        <div className="widgets">
          {type==="admin" && <Widget type="agents" amount={agentsAmt} diff={agentsDiff}/>}
          <Widget type="orders" amount={ordersAmt} diff={ordersDiff} />
          {type==="agent" && <Widget type="earnings" amount={moneyAmt} diff={moneyDiff} />}
          {type==="customer" && <Widget type="costs" amount={moneyAmt} diff={moneyDiff} />}
        </div>
        {type==="admin" && <div className="listContainer">
        <a className="button gap" href="/admin/register">
          Register an Admin
        </a>
        </div>}
        {orders && <div className="listContainer">
          <div className="listTitle">Orders</div>
          {type==="customer" && <a className="button gap" href="/orders/new">Place Order</a>}
          <Table rows={orders} />
        </div>}
        {type !== "admin" && <div className="charts">
          <Featured data={orders}/>
        </div>}
      </div>
    </div>
  );
};

export default Dashboard;
