"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

interface IProps {
  image: string;
  name: string;
  position: string;
}

const Card = ({ image, name, position }: IProps) => (
  <div className="flex flex-col items-center justify-center gap-4 bg-white shadow-all-sides rounded-lg w-full p-6">
    <div className="w-32 h-32 rounded-full overflow-hidden">
      <img src={image} className="w-full h-full object-cover" />
    </div>
    <div className="flex flex-col gap-2 items-center">
      <h2 className="text-lg font-semibold">{name}</h2>
      <h2>{position}</h2>
    </div>
  </div>
);

const list = [
  {
    image: "/Amanda.jpg",
    name: "AKALIZA Amanda",
    position: "Founder& President",
  },
  {
    image: "/BISABO.jpg",
    name: "Biganza Isibo",
    position: "Vice President",
  },
  {
    image: "/ISIMBI.jpg",
    name: "Anais Simbi",
    position: "COO",
  },
  {
    image: "/Cathy.jpg",
    position: "Chief Counsel",
    name: "Cathy Teufack",
  },
];

const OurTeamSwiper = () => {
  return (
    <>
      <div className="xs:hidden lg:flex relative w-full mt-8">
        <img
          src="/arrowL.png"
          alt="back"
          width={40}
          height={40}
          className="swiper-button-prev-customO absolute left-[-5rem] top-[45%] cursor-pointer"
        />
        <img
          src="/arrowR.png"
          alt="forward"
          width={40}
          height={40}
          className="swiper-button-next-customO absolute right-[-5rem] top-[45%] cursor-pointer"
        />
        <Swiper
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={3}
          navigation={{
            nextEl: ".swiper-button-next-customO",
            prevEl: ".swiper-button-prev-customO",
          }}
          loop
          className="w-full !pb-4 !px-2 !pt-2">
          {list.map((card) => (
            <SwiperSlide className="w-[15rem]" key={crypto.randomUUID()}>
              <Card
                image={card.image}
                name={card.name}
                position={card.position}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="xs:flex lg:hidden relative w-full mt-8">
        <Swiper
          modules={[Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          loop
          className="w-full !pb-16 !px-2 !pt-2"
          pagination={{ clickable: true }}>
          {list.map((card) => (
            <SwiperSlide className="w-full" key={crypto.randomUUID()}>
              <Card
                image={card.image}
                name={card.name}
                position={card.position}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default OurTeamSwiper;
