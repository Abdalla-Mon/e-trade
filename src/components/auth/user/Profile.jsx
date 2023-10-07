import { Navigate } from "react-router-dom";
import { auth, db } from "../../../firebaseConfig/firebaseConfig";
import { authFnc } from "../AuthProvider";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { BiSolidShoppingBag, BiSolidUserDetail } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Pagination, Stack } from "@mui/material";
export async function logout() {
  await signOut(auth);
}
export default function Profile() {
  const [state, setState] = useState("orders");

  if (!authFnc().logined) {
    return <Navigate to={"/login"} replace={true} />;
  }
  if (auth?.currentUser?.email === "admin@etrade.com") {
    return <Navigate to="/dashboard" replace={true} />;
  }
  const profileObject = {
    orders: {
      title: "Orders",
    },
    acc_details: {
      title: "Account Details",
      userName: auth?.currentUser.displayName,
      email: auth?.currentUser.email,
    },
  };
  return (
    <div className="profile">
      <div className="container mx-auto">
        <div className="flex gap-10 flex-col-reverse tab:flex-row ">
          <div className="profile-nav tab:w-2/6">
            <ProfileNav setState={setState} />
          </div>
          <div className="profile-data tab:w-4/6">
            <ProfileData state={state} data={profileObject} />
          </div>
        </div>
      </div>
    </div>
  );
}
function handleClick(el) {
  document.querySelectorAll(".profile-li").forEach((e) => {
    e.classList.remove("active");
  });
  el.classList.add("active");
}
function ProfileNav({ setState }) {
  return (
    <>
      <ul className="flex  flex-row tab:flex-col gap-3 tab:gap-5">
        <li
          className="profile-li active flex gap-3 items-center"
          onClick={(e) => {
            setState("orders");
            handleClick(e.target);
          }}
        >
          <BiSolidShoppingBag />
          <span>Orders</span>
        </li>
        <li
          className="profile-li flex gap-3 items-center"
          onClick={(e) => {
            setState("acc_details");
            handleClick(e.target);
          }}
        >
          <BiSolidUserDetail />
          <span> Account</span>
        </li>
        <li
          className="profile-li flex gap-3 items-center"
          onClick={() => {
            logout();
          }}
        >
          <FiLogOut /> <span>Log out</span>
        </li>
      </ul>
    </>
  );
}
function ProfileData({ state, data }) {
  const currentObject = data[state];
  return (
    <>
      {currentObject.title === "Orders" ? null : (
        <h1> {currentObject.title}</h1>
      )}
      {currentObject.title === "Orders" ? <Orders /> : null}
      {currentObject.userName && (
        <div className="email">
          UserName : <span>{currentObject.userName}</span>
        </div>
      )}
      {currentObject.email && (
        <div className="email">
          Email : <span>{currentObject.email}</span>
        </div>
      )}
    </>
  );
}

function Orders() {
  const [orders, setOrders] = useState([]);
  const [sliceNum, setSliceNum] = useState(0);
  // const [grid, setGrid] = useState(4);
  let dataSliced = orders?.reverse().slice(sliceNum, sliceNum + 4);

  useEffect(() => {
    async function getUserOrders() {
      try {
        const docRef = doc(db, "orders", auth.currentUser.uid);
        const userOrder = await getDoc(docRef);
        if (userOrder === undefined) {
          setOrders([]);
          return;
        }
        setOrders(userOrder.data().data);
      } catch {
        setOrders;
      }
    }
    getUserOrders();
  }, [orders.length]);
  return (
    <>
      {orders.length < 1 && "No orders"}
      {orders.length > 0 && (
        <>
          <div className="profile-orders">
            <table className="orders">
              <TableHead />
              <tbody>
                {dataSliced.map((order) => {
                  return <TableBody order={order} key={order.orderNumber} />;
                })}
              </tbody>
            </table>{" "}
          </div>
          <TablePaginationDemo
            setSliceNum={setSliceNum}
            length={orders.length}
          />
        </>
      )}
    </>
  );
}

function TablePaginationDemo({ setSliceNum, length }) {
  const [page, setPage] = useState(1);
  const index = Math.ceil(length / 4);

  let paginationNum = 0;
  for (let i = 0; i < index; i++) {
    paginationNum++;
  }
  const handleChange = (event, value) => {
    setPage(value);
    setSliceNum((value - 1) * 4, value * 4);
  };
  return (
    <Stack spacing={2} className="pagination">
      <Pagination
        size="large"
        count={paginationNum}
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
}
function TableHead() {
  return (
    <thead>
      <tr>
        <th className="order">Order</th>
        <th className="date">Date</th>
        <th className="status">Status</th>
        <th className="total">Total</th>
        <th className="details"></th>
      </tr>
    </thead>
  );
}
function TableBody({ order }) {
  const timestampInMilliseconds =
    order.date.seconds * 1000 + order.date.nanoseconds / 1000000;

  const date = new Date(timestampInMilliseconds);
  let dateDetails = date.toLocaleDateString();
  let timeDetails = date.toLocaleTimeString();
  let itemsQuantity = 0;
  for (let i = 0; i < order.data.length; i++) {
    itemsQuantity += order.data[i].qty;
  }
  const [details, setDetails] = useState(false);
  return (
    <>
      <tr className="single-order">
        <td className="order">#{order.orderNumber}</td>
        <td className="date">
          <span>{dateDetails}</span>, At: {timeDetails}
        </td>
        <td className="status">{order.status}</td>
        <td className="total">
          ${order.totalPrice} for {itemsQuantity} items
        </td>
        <td className="details" onClick={() => setDetails(true)}>
          Details
        </td>{" "}
      </tr>
      {details && <Details order={order} setDetails={setDetails} />}
    </>
  );
}
function Details({ order, setDetails }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: [0, 0.5, 1] }}
      className="order-container fixed"
    >
      <div className="close-event" onClick={() => setDetails(false)}></div>
      <div className="order-details flex flex-col-reverse gap-8 tab:flex-row">
        <div className="close-btn absolute" onClick={() => setDetails(false)}>
          X
        </div>
        <OrderDetail order={order} />
        <div className="table-container tab:w-2/5">
          <h4>Order Summery</h4>
          <table className="item-table">
            <thead>
              <tr>
                <th className="img-container">Product</th>
                <th className="qty">Quantity</th>
                <th className="total-price">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {order.data.map((e, index) => (
                <ItemDetails item={e} key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
function OrderDetail({ order }) {
  return (
    <div className="order-details-container tab:w-3/5">
      <h4>Order Details</h4>
      <div>
        {" "}
        <span>Name :</span>
        {order.formDetails.pafirstName} {order.formDetails.pasecondName}
      </div>
      <div>
        {" "}
        <span>Derlivering to :</span>
        {order.formDetails.paaddress}, {order.formDetails.pacity}
      </div>
      <div>
        {" "}
        <span>Card Number :</span>
        {order.formDetails.creditcard.slice(-4)}****
      </div>
      <div>
        {" "}
        <span>Order Status :</span>
        {order.status}
      </div>
      <div>
        {" "}
        <span>Total Price :</span>${order.totalPrice}
      </div>
    </div>
  );
}
function ItemDetails({ item }) {
  return (
    <tr className="items-details">
      <td className="img-container">
        <img src={item.img} alt="item image" />
      </td>
      <td className="qty">
        {item.qty} * ${item.price - (item.desc || 0)}
      </td>
      <td className="total-price">
        ${item.qty * (item.price - (item.desc || 0))}
      </td>
    </tr>
  );
}
