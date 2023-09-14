import { Link } from "react-router-dom";
import data from "../../srcDb/home.json";
import { CustomSwiperContainer } from "../fixed-component/CustomSwiper";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiEye } from "react-icons/fi";
import { AddToCart, AddToWhishList } from "../fixed-component/FixedComponent";
const newArrivalData = data.filter((e) => e.newArrival);
export default function NewArrival() {
  return (
    <CustomSwiperContainer
      data={newArrivalData}
      text={"This Week's"}
      swiperEle={ShopCard}
      head={"New Arrivals"}
      icon={<HiOutlineShoppingBag />}
      className={"new-arrival"}
    />
  );
}
export function ShopCard(e) {
  return (
    <div className="new-arrival-card flex flex-col justify-center text-center relative">
      <div className="img-container relative">
        <img src={e.img} alt={e.id} />
        <div className="show-btns flex gap-1">
          <AddToWhishList />
          <AddToCart text={true} />
          <Link className="inspect-icon" to={"/" + e.id}>
            <FiEye />
          </Link>
        </div>
      </div>
      <Link to={"/" + e.id}>{e.name}</Link>
      <h3>${e.price}</h3>
    </div>
  );
}
