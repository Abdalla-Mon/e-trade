import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useRef } from "react";
import { Navigation } from "swiper/modules";
export function CustomSwiperContainer({
  className,
  icon,
  head,
  text,
  data,
  swiperEle,
}) {
  return (
    <div className={"custom-container " + className}>
      <div className="container mx-auto">
        <div className="custom-header">
          <div className="flex gap-2 items-center">
            <div className="icon">{icon}</div>
            {text}
          </div>
          <h1> {head}</h1>
        </div>
        <CustomSwiper num={40} data={data} swiperEle={swiperEle} />
      </div>
    </div>
  );
}
export default function CustomSwiper({ data, num, swiperEle }) {
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  return (
    <>
      <Swiper
        spaceBetween={num}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          991: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
        loop={true}
        navigation={{
          // nextEl: nextRef.current,
          // prevEl: prevRef.current,
          enabled: true,
        }}
        modules={[Navigation]}
        className="custom-swiper"
      >
        {data.map((el, index) => {
          return <SwiperSlide key={index}>{swiperEle(el)}</SwiperSlide>;
        })}

        <div className="navigation">
          <span ref={nextRef} className="next-btn">
            <BsArrowRight />
          </span>
          <span ref={prevRef} className="prev-btn">
            <BsArrowLeft />
          </span>
        </div>
      </Swiper>
    </>
  );
}
