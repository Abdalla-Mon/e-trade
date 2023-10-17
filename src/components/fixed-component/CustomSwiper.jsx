import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { CustomHeader } from "./FixedComponent";
import { SingleSkeleton } from "./ShopSkeleton";
export function CustomSwiperContainer({
  className,
  icon,
  head,
  text,
  data,
  swiperEle,
  isLoading,
}) {
  const fakeData = [1, 2, 3, 4];
  return (
    <div className={"custom-container " + className}>
      <div className="container mx-auto">
        <CustomHeader icon={icon} text={text} head={head} />
        <CustomSwiper
          num={30}
          data={isLoading ? fakeData : data}
          swiperEle={swiperEle}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
export default function CustomSwiper({
  data,
  num,
  swiperEle,
  isLoading = false,
}) {
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
          enabled: true,
        }}
        modules={[Navigation]}
        className="custom-swiper"
        onSlideChange={() => {}}
      >
        {data.map((el, index) => {
          return (
            <SwiperSlide key={index}>
              <motion.div>
                {isLoading ? <SingleSkeleton /> : swiperEle(el)}
              </motion.div>
            </SwiperSlide>
          );
        })}

        <div className="navigation">
          <span className="next-btn">
            <BsArrowRight />
          </span>
          <span className="prev-btn">
            <BsArrowLeft />
          </span>
        </div>
      </Swiper>
    </>
  );
}
