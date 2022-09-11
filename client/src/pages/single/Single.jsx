import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { SERVER_URL } from "../../config";
import { UserContext } from "../../context/userContext";

const Single = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const {type} = useContext(UserContext)

  useEffect(() => {
    fetch(`${SERVER_URL}/order/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
    }).then((res) => res.ok && res.json())
      .then((data) => {
        setOrder(data);
      });
  }, [])

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {order && !!order.id && <div className="top">
          <div className="left">
            <h1 className="title">Order Information</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{order.orderType}: <span className={order.status?.replace(' ','')}>{order.status}</span></h1>
                <div className="detailItem">
                  <span className="itemKey">Order ID:</span>
                  <span className="itemValue">{order.id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{order.price}</span>
                </div>
                {!!order.recipient && <div className="detailItem">
                  <span className="itemKey">Recipient:</span>
                  <span className="itemValue">
                    {order.recipient}
                  </span>
                </div>}
                {!!order.description && <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{order.description}</span>
                </div>}
              </div>
            </div>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">Customer: {order.customer.firstName} {order.customer.lastName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{order.customer.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{order.customer.phone}</span>
                </div>
              </div>
            </div>
            {order.assignedAgent && 
              <div className="item">
                <div className="details">
                  <h1 className="itemTitle">Agent: {order.assignedAgent.firstName} {order.assignedAgent.lastName}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{order.assignedAgent.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{order.assignedAgent.phone}</span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Single;
