import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { LayoutContext } from "./context";
import Image from "next/image";

type Testimonial = {
  image: string;
  name: string;
  username: string;
  quote: string;
  highlight: string;
};

type TranslationsType = {
  testimonialsSection: {
    testimonialHeading: string;
    trustedClients: string;
    testimonials: Testimonial[];
  };
};

type LayoutContextType = {
  translations: TranslationsType;
  isRTL: boolean;
};

const TestimonialSection: React.FC = () => {
  const context = useContext(LayoutContext) as LayoutContextType;

  if (!context) {
    throw new Error(
      "LayoutContext must be used within a LayoutContext.Provider"
    );
  }

  const { translations, isRTL } = context;
  const { testimonialsSection } = translations;

  return (
    <section
      className="py-16  transition-colors duration-500 max-w-5xl mx-auto"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-lightText dark:text-darkText mb-4">
          {testimonialsSection.testimonialHeading}
        </h2>
        <p className="text-xl text-gray-500 dark:text-gray-400 mb-10">
          {testimonialsSection.trustedClients}
        </p>

        <Swiper
          modules={[EffectCoverflow, Autoplay, Pagination]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          className="mx-auto"
        >
          {testimonialsSection.testimonials.map((testimonial, index) => (
            <SwiperSlide
              key={index}
              className="bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center"
              style={{ width: "380px", transition: "transform 0.3s ease" }}
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name || "Client testimonial image"}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="italic text-sm mb-6">
                &quot;{testimonial.quote}{" "}
                <span className="font-semibold">{testimonial.highlight}</span>
                &quot;
              </p>
              <h4 className="font-bold text-xl mb-2">{testimonial.name}</h4>
              <p className="text-sm">{testimonial.username}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
