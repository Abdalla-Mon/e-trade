import { FaHeadphones } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HomeOffer() {
  return (
    <div className="home-offer">
      <div className="container mx-auto">
        <div className="offer grid gap-8 tab:grid-cols-2">
          <div className="left flex flex-col justify-center">
            <Left />
          </div>
          <div className="right">
            <Right />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
function Left() {
  const timeData = [
    { id: "time", time: "days", num: 0 },
    { id: "time", time: "hrs", num: 0 },
    { id: "time", time: "men", num: 0 },
    { id: "time", time: "sec", num: 0 },
  ];
  return (
    <>
      <div className="flex gap-2">
        <div className="icon">
          <FaHeadphones />
        </div>
        Don&apos;t Miss!!
      </div>
      <h1>Enhance Your Music Experience</h1>
      <div className="flex gap-2">
        {timeData.map((e, index) => (
          <Timer key={e.id + index} time={e.time} num={e.num} />
        ))}
      </div>
      <Link to="/shop">Check Now</Link>
    </>
  );
}
function Timer({ num, time }) {
  return (
    <div className="time">
      <h5>{num}</h5>
      <h6>{time}</h6>
    </div>
  );
}
function Right() {
  return (
    <div className="img-container">
      <img src="./landing-page/headphone.webp" alt="headphone-img" />
    </div>
  );
}
