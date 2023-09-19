import { Link } from "react-router-dom";
import { AddToCart, AddToWhishList } from "../fixed-component/FixedComponent";
import { FiEye } from "react-icons/fi";
import data from "../../srcDb/home.json";
import { CustomSwiperContainer } from "../fixed-component/CustomSwiper";
import { HiOutlineShoppingBag } from "react-icons/hi";

const newArrivalData = data.filter((e) => e.prod);

export default function MonthArrival() {
  return (
    <CustomSwiperContainer
      data={newArrivalData}
      text={"This Month's"}
      swiperEle={MonthArrivalCard}
      head={"New Arrivals"}
      icon={<HiOutlineShoppingBag />}
      className={"month-arrival"}
    />
  );
}

function MonthArrivalCard(e) {
  return (
    <div className="shop-card month-arrival flex flex-col justify-center text-center relative">
      <div className="img-container relative">
        <img src={e.img} alt={e.id} />
      </div>
      <Link to={"/" + e.id}>{e.name}</Link>
      <h3 className="card-price flex gap-3 justify-center">
        <span>${e.price}</span>
        {e.desc ? <span className="old-price">${e.price - e.desc}</span> : null}
      </h3>{" "}
      <div className="show-btns flex gap-1">
        <AddToWhishList item={e} />
        <AddToCart text={true} item={e} />
        <Link className="inspect-icon" to={"/" + e.id}>
          <FiEye />
        </Link>
      </div>
    </div>
  );
}
