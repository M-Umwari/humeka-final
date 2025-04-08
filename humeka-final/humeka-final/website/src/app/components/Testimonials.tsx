import TestimonialSwiper from './TestimonialSwiper';


const Testimonials = () => {
    return (
        <div className="xs:w-[85%] md:w-[80%] flex flex-col items-center gap-6 xs:mt-16 lg:mt-28 section" id='testimonials'>
            <h1 className="text-custom-yellow xs:text-3xl lg:text-4xl font-semibold">Testimonials</h1>
            <p className="xs:text-justify lg:text-center font-medium xs:w-full lg:w-[90%]">
                Hear from those whose lives have been positively impacted—because your journey matters, and together, we can create lasting change.
            </p>
            <TestimonialSwiper/>
        </div>
    );
}
 
export default Testimonials;