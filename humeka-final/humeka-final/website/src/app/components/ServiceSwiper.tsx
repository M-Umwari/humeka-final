"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

interface IProps {
  image: string;
  name: string;
  description: string;
}

const Card = ({ image, name, description }: IProps) => (
  <div className="flex flex-col justify-center rounded-lg w-full">
    <div className="rounded-xl overflow-hidden w-full h-[20rem] relative">
      <Image
        src={image}
        alt={name}
        fill={true}
        className="object-cover transition-transform duration-700 hover:scale-110"
      />
    </div>
    <h2 className="text-xl font-semibold mt-4">{name}</h2>
    <p className="text-justify mt-4">{description}</p>
  </div>
);

const list = [
  {
    image: "/Awareness.jpg",
    name: "Mental Health Awareness Campaigns",
    description:
      "We organize educational initiatives and events to increase understanding of mental health issues and reduce stigma.",
  },
  {
    image: "/support groups.jpg",
    name: "Counseling and Peer Support",
    description:
      "We connect young people with trained professionals and peer support networks to provide a safe and supportive environment for healing.",
  },
  {
    image: "/outreach.jpg",
    name: "Community Outreach",
    description:
      "We partner with local organizations and underserved communities to expand access to mental health resources.",
  },
  {
    image: "/group.jpg",
    name: "Workshops and Training",
    description:
      "We provide capacity-building workshops for teachers, parents, and community leaders to equip them with tools to support young people’s mental health.",
  },
  {
    image: "/youth.jpg",
    name: "Youth Empowerment Programs",
    description:
      "Through leadership training, mentorship, and skills-building activities, we empower youth to take control of their mental well-being and lead with resilience.",
  },
];

const ServiceSwiper = () => {
  return (
    <>
      <div className="xs:hidden lg:flex relative w-full mt-8">
        <img
          src="/arrowL.png"
          alt="back"
          width={40}
          height={40}
          className="swiper-button-prev-customS absolute left-[-5rem] top-[45%] cursor-pointer"
        />
        <img
          src="/arrowR.png"
          alt="forward"
          width={40}
          height={40}
          className="swiper-button-next-customS absolute right-[-5rem] top-[45%] cursor-pointer"
        />
        <Swiper
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={2}
          navigation={{
            nextEl: ".swiper-button-next-customS",
            prevEl: ".swiper-button-prev-customS",
          }}
          loop
          className="w-full !pb-4">
          {list.map((card) => (
            <SwiperSlide key={crypto.randomUUID()}>
              <Card
                image={card.image}
                name={card.name}
                description={card.description}
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
          className="w-full !pb-20"
          pagination={{ clickable: true }}>
          {list.map((card) => (
            <SwiperSlide className="w-full" key={crypto.randomUUID()}>
              <Card
                image={card.image}
                name={card.name}
                description={card.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ServiceSwiper;
