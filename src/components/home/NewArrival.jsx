import { Link } from "react-router-dom";
import data from "../../srcDb/home.json";
import { CustomSwiperContainer } from "../fixed-component/CustomSwiper";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { ShopCard } from "../fixed-component/FixedComponent";
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
