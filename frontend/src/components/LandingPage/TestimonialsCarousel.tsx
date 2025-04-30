import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "./TestimonialsCarousel.css";

const testimonials = [
  { text: "عالی بود ", name: "کاربر ۱" },
  { text: "پشتیبانی قوی", name: "کاربر ۲" },
  { text: "راضی بودم ", name: "کاربر ۳" },
  { text: "خیلی حرفه‌ای", name: "کاربر ۴" },
  { text: "قیمت مناسب", name: "کاربر ۵" },
  { text: "تجربه عالی", name: "کاربر ۶" },
];

const TestimonialsCarousel: React.FC = () => {
  return (
    <section className="testimonials-container">
      {/* ردیف اول: حرکت به چپ */}
      <Swiper
  modules={[Autoplay, FreeMode]}
  slidesPerView={4}
  spaceBetween={0} // 👈 فاصله بین اسلایدها حذف شد
  loop={true}
  freeMode={true}
  speed={5000}
  autoplay={{
    delay: 0,
    disableOnInteraction: false,
    reverseDirection: false, // برای ردیف اول، به چپ
  }}
  allowTouchMove={false}
>

        {testimonials.map((t, index) => (
          <SwiperSlide key={`top-${index}`}>
            <div className="testimonial-card">
              <p>{t.text}</p>
              <strong>{t.name}</strong>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ردیف دوم: حرکت به راست */}
      <Swiper
  modules={[Autoplay, FreeMode]}
  slidesPerView={4}
  spaceBetween={0}
  loop={true}
  freeMode={true}
  speed={5000}
  autoplay={{
    delay: 0,
    disableOnInteraction: false,
    reverseDirection: true,
  }}
  allowTouchMove={false}
  style={{ marginTop: "50px" }} // 👈 فاصله دلخواه بین ردیف بالا و پایین
>


        {testimonials.map((t, index) => (
          <SwiperSlide key={`bottom-${index}`}>
            <div className="testimonial-card">
              <p>{t.text}</p>
              <strong>{t.name}</strong>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TestimonialsCarousel;
