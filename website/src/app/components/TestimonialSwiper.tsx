"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

interface IProps {
    review:string,
    reviewer: {
        name: string,
    }
}

const Card = ({review, reviewer}:IProps) => (
    <div className="flex flex-col justify-center gap-4 bg-white shadow-all-sides rounded-lg w-full p-6">
        <img src='/quote.png' alt='quote' width={30} height={30}/>
        <p className="text-justify text-sm h-28 overflow-y-auto review">
            {review}
        </p>
        <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{reviewer.name}</h2>
            <div className='flex items-center gap-1'>
                <img src='/star2.png' alt='ratingStar' width={15} height={15}/>
                <img src='/star2.png' alt='ratingStar' width={15} height={15}/>
                <img src='/star2.png' alt='ratingStar' width={15} height={15}/>
                <img src='/star2.png' alt='ratingStar' width={15} height={15}/>
                <img src='/star2.png' alt='ratingStar' width={15} height={15}/>
            </div> 
        </div>
    </div>
)

const list = [
    {
        review: "Humeka has been a life-changing experience for me. The one-on-one counseling sessions helped me uncover strengths I didn’t know I had, and the group counseling made me feel understood and supported.",
        reviewer: {
            name: "Diana"
        }
    },
    {
        review: "Humeka has been a life-changing experience for me. The one-on-one counseling sessions helped me uncover strengths I didn’t know I had, and the group counseling made me feel understood and supported.",
        reviewer: {
            name: "Gabriella",
        }
    },
    {
        review: "Humeka has been a life-changing experience for me. The one-on-one counseling sessions helped me uncover strengths I didn’t know I had, and the group counseling made me feel understood and supported.",
        reviewer: {
            name: "Denis",
        }
    },
]

const ReviewSwiper = () => {
    return (
        <>
            <div className='xs:hidden lg:flex relative w-full mt-8'>
                <img src='/arrowL.png' alt='back' width={40} height={40} className='swiper-button-prev-customT absolute left-[-5rem] top-[45%] cursor-pointer border border-blue-700'/>
                <img src='/arrowR.png' alt='forward' width={40} height={40} className='swiper-button-next-customT absolute right-[-5rem] top-[45%] cursor-pointer border border-blue-700'/>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={50}
                    slidesPerView={3}
                    navigation={{
                        nextEl: '.swiper-button-next-customT',
                        prevEl: '.swiper-button-prev-customT',
                    }}
                    loop
                    className="w-full !pb-4 !px-2 !pt-2"
                >
                    {list.map(card => (
                        <SwiperSlide className='w-[18rem]' key={crypto.randomUUID()}>
                            <Card review={card.review} reviewer={{name: card.reviewer.name}}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className='xs:flex lg:hidden relative w-full mt-8'>
                <Swiper
                    modules={[Pagination]}
                    spaceBetween={50}
                    slidesPerView={1}
                    loop
                    className="w-full !pb-16 !px-2 !pt-2"
                    pagination={{clickable:true}}
                >
                    {list.map(card => (
                        <SwiperSlide className='w-full' key={crypto.randomUUID()}>
                            <Card review={card.review} reviewer={{name: card.reviewer.name}}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}
 
export default ReviewSwiper;