import ServiceSwiper from "./ServiceSwiper";

const Services = () => {
    return (
        <div className="xs:w-[85%] md:w-[80%] flex flex-col items-center gap-6 xs:mt-16 lg:mt-40 section" id='services'>
            <div className="relative">
                <h1 className="xs:text-3xl lg:text-4xl font-semibold text-custom-yellow">Services</h1>
                <img src='/star1.png' alt='star' className="xs:w-[25px] lg:w-[30px] absolute xs:top-[-1rem] xs:right-[-2rem] lg:top-[-1rem] lg:right-[-2rem]"/>
            </div>
            <p className="text-center font-medium xs:w-full lg:w-[90%]">
                At Humeka, we are dedicated to providing comprehensive mental health services tailored to meet the unique needs of every individual. Our offerings include counseling, therapy sessions, mental health workshops, and support groups designed to promote emotional well-being and resilience.
            </p>
            <ServiceSwiper/>
        </div>
    );
}
 
export default Services;