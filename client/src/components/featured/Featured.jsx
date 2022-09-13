import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";

const Featured = ({data}) => {
  const [percentage, setPercentage] = useState(0);
  const { type } = useContext(UserContext);

  const weekly = data.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const today = new Date();
    return orderDate.getDate() >= (today.getDate() - 7) && orderDate.getMonth() === today.getMonth() && orderDate.getFullYear() === today.getFullYear() && order.status === "Completed";
  }).reduce((prev, curr) => prev + curr.price, 0);
  const goodweek = data.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const lastWeek = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
    const twoWeeks = new Date(new Date().getTime() - (14 * 24 * 60 * 60 * 1000));
    return orderDate.getDate() <= lastWeek.getDate() && orderDate.getDate() >= twoWeeks.getDate() && orderDate.getMonth() === lastWeek.getMonth() && orderDate.getFullYear() === lastWeek.getFullYear() && order.status === "Completed";
  }).reduce((prev, curr) => prev + curr.price, 0) < weekly;
  
  const monthly = data.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const today = new Date();
    return orderDate.getMonth() === today.getMonth() && orderDate.getFullYear() === today.getFullYear() && order.status === "Completed";
  }).reduce((prev, curr) => prev + curr.price, 0);
  const goodmonth = data.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const lastMonth = new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000));
    const twoMonths = new Date(new Date().getTime() - (60 * 24 * 60 * 60 * 1000));
    return orderDate.getMonth() <= lastMonth.getMonth() && orderDate.getMonth() >= twoMonths.getMonth() && orderDate.getFullYear() === lastMonth.getFullYear() && order.status === "Completed";
  }).reduce((prev, curr) => prev + curr.price, 0) < monthly;
  
  const yearly = data.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const today = new Date();
    return orderDate.getFullYear() === today.getFullYear() && order.status === "Completed";
  }).reduce((prev, curr) => prev + curr.price, 0);
  const goodyear = data.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const lastYear = new Date().getFullYear() - 1;
    const twoYears = new Date().getFullYear() - 2;
    return orderDate.getFullYear() <= lastYear && orderDate.getFullYear() >= twoYears && order.status === "Completed";
  }).reduce((prev, curr) => prev + curr.price, 0) < yearly;

  useEffect(() => {
    const complete = data.filter(item => item.status === "Completed").length;
    const total = data.length;
    let res = complete/total*100;
    setPercentage(res.toFixed(1));
  }, [data])
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Orders</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={percentage} text={percentage+"%"} strokeWidth={5} />
        </div>
        <p className="title">Percent Completed</p>
        <p className="amount">₦{data.filter((order) => {
            const orderDate = new Date(order.createdAt);
            const today = new Date();
            return orderDate.getMonth() === today.getMonth() && orderDate.getFullYear() === today.getFullYear()
          }).reduce((prev, curr) => prev + curr.price, 0)
        }</p>
        <p className="title nomargin">Projected monthly {type==="customer"?"expenditure":"revenue"}</p>
        <p className="desc">
          Completed orders
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">This Week</div>
            <div className={`itemResult ${goodweek?"positive":"negative"}`}>
              {!goodweek && <KeyboardArrowDownIcon fontSize="small"/>}
              {goodweek && <KeyboardArrowUpOutlinedIcon fontSize="small"/>}
              <div className="resultAmount">₦{weekly}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">This Month</div>
            <div className={`itemResult ${goodmonth?"positive":"negative"}`}>
            {!goodmonth && <KeyboardArrowDownIcon fontSize="small"/>}
              {goodmonth && <KeyboardArrowUpOutlinedIcon fontSize="small"/>}
              <div className="resultAmount">₦{monthly}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">This Year</div>
            <div className={`itemResult ${goodyear?"positive":"negative"}`}>
            {!goodyear && <KeyboardArrowDownIcon fontSize="small"/>}
              {goodyear && <KeyboardArrowUpOutlinedIcon fontSize="small"/>}
              <div className="resultAmount">₦{yearly}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
