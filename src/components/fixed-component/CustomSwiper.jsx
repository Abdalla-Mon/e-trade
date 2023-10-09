import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useState } from "react";
import { Navigation } from "swiper/modules";
import { motion, useAnimationControls } from "framer-motion";
import { CustomHeader } from "./FixedComponent";
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
        <CustomHeader icon={icon} text={text} head={head} />
        <CustomSwiper num={30} data={data} swiperEle={swiperEle} />
      </div>
    </div>
  );
}
export default function CustomSwiper({ data, num, swiperEle }) {
  const [animation, setAnimation] = useState(false);
  const controls = useAnimationControls();
  // useEffect(() => {
  //   controls.start({
  //     opacity: [0, 1],
  //     transition: { duration: 0.6 },
  //   });
  // }, [animation]);
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
        onSlideChange={() => {
          // setAnimation(!animation);
        }}
      >
        {data.map((el, index) => {
          return (
            <SwiperSlide key={index}>
              <motion.div
                // whileInView={() => setAnimation(!animation)}
                animate={controls}
              >
                {swiperEle(el)}
                {/* {swiperEle(el)} */}
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
