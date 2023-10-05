import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { BsWatch, BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
export default function HomeLanding() {
  return (
    <div className="home-landing">
      <div className="container mx-auto">
        <div className="lap:flex flex-row gap-8 mb-8">
          <LandingSwiper />
          <div className="right-home flex flex-col justify-center items-center lap:mt-0 mt-8">
            <BagElement />
          </div>
        </div>
        <ServicesElements />
      </div>
    </div>
  );
}
const swiperData = [
  { text: "Bloosom Smart Watch", img: "./landing-page/land-1.webp" },
  { text: "Delux Brand Watch", img: "./landing-page/land-2.webp" },
  { text: "Bloosom Smart Watch", img: "./landing-page/land-1.webp" },
];
function LandingSwiper() {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      effect={"fade"}
      pagination={{
        clickable: true,
      }}
      speed={2000}
      modules={[Autoplay, Pagination, EffectFade]}
    >
      {swiperData.map((el, index) => {
        return (
          <SwiperSlide key={el.text + index} className="flex gap-8">
            <div className="left  flex flex-col justify-center">
              <SwiperHead />
              <h1>{el.text}</h1>
              <GoToShop />
            </div>
            <div className="right flex ">
              <img src={el.img} alt={"stopwatch image"} />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

function SwiperHead() {
  return (
    <div className="swiper-header flex gap-3 items-center">
      <div className="watch-icon">
        <BsWatch />
      </div>
      <h5>Smartwatch</h5>
    </div>
  );
}
function GoToShop() {
  return (
    <Link to="shop" className="go-shop flex gap-5 items-center">
      <span>Shop Now</span>
      <BsArrowRight />
    </Link>
  );
}
function BagElement() {
  return (
    <>
      <div >
        <img src="./landing-page/bag.webp" alt="bag" />
        <Link to="shop">Yanti Leather Bags</Link>
        <h3>$39.50</h3>
      </div>
    </>
  );
}
const serviceData = [
  {
    id: "service-1",
    img: "./landing-page/service1.webp",
    text: "Fast & Secure Delivery",
  },
  {
    id: "service-2",
    img: "./landing-page/service2.webp",
    text: "100% Guarantee On Product",
  },
  {
    id: "service-3",
    img: "./landing-page/service3.webp",
    text: "Next Level Pro Quality",
  },
  {
    id: "service-4",
    img: "./landing-page/service4.webp",
    text: "24 Hour Return Policy",
  },
];
function ServicesElements() {
  return (
    <>
      <div className="landing-service grid gap-8 tab:grid-cols-2 lap:grid-cols-4">
        {serviceData.map((el) => {
          return <Service el={el} key={el.id} />;
        })}
      </div>
    </>
  );
}
function Service({ el }) {
  return (
    <>
      <div className="service flex text-center flex-col items-center">
        <div className="img-container">
          <img src={el.img} alt={el.id} />
        </div>
        <h4>{el.text}</h4>
      </div>
    </>
  );
}
