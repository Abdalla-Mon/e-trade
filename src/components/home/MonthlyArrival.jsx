import { Link } from "react-router-dom";

import { AddToCart, AddToWhishList } from "../fixed-component/CardBtns";
import { FiEye } from "react-icons/fi";
import { CustomSwiperContainer } from "../fixed-component/CustomSwiper";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { getHomeData } from "../react-query/FetchData";
function selector(data) {
  return data.filter((e) => e.prod);
}

export default function MonthlyArrival() {
  const { data: monthlyArrivalData, isLoading } = getHomeData(selector);
  return (
    <CustomSwiperContainer
      data={monthlyArrivalData}
      isLoading={isLoading}
      text={"This Month's"}
      swiperEle={MonthlyArrivalCard}
      head={"New Arrivals"}
      icon={<HiOutlineShoppingBag />}
      className={"month-arrival"}
    />
  );
}

export function MonthlyArrivalCard(e) {
  return (
    <div className="shop-card month-arrival flex flex-col justify-center text-center relative">
      <div className="img-container relative">
        <img src={e.img} alt={e.id} />
      </div>
      <Link to={"/shop/" + e.id}>{e.name}</Link>
      <h3 className="card-price flex gap-3 justify-center">
        <span>${e.price}</span>
        {e.desc ? <span className="old-price">${e.price - e.desc}</span> : null}
      </h3>{" "}
      <div className="show-btns flex gap-1">
        <AddToWhishList item={e} />
        <AddToCart text={true} item={e} />
        <Link
          className="inspect-icon"
          to={"/shop/" + e.id}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
        >
          <FiEye />
        </Link>
      </div>
    </div>
  );
}
