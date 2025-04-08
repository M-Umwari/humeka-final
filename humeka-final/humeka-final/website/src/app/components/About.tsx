import Image from 'next/image'

const About = () => {
    return (
        <div className="xs:w-[85%] md:w-[80%] flex xs:flex-col lg:flex-row xs:gap-12 lg:gap-0 lg:justify-between xs:mt-20 lg:mt-28 section" id='about'>
            <div className="flex flex-col lg:justify-end xs:items-center lg:items-start gap-4 xs:w-full lg:w-[45%]">
                <h1 className="text-custom-yellow xs:text-3xl lg:text-4xl font-semibold">About Us</h1>
                <p className="text-justify">
                    Humeka Organization is a youth-led, non-profit initiative dedicated to promoting mental health and wellness among young people. Founded to address the pressing need for mental health awareness and support, our mission is to help individuals thrive, not just survive. We are committed to breaking the stigma surrounding mental health by providing evidence-based education, fostering open conversations, and creating safe spaces for self-expression and healing.  
                </p>
            </div>
            <div className='relative flex items-end'>
                <div className="flex xs:w-full lg:w-[27rem] h-60 overflow-hidden rounded-xl relative">
                    <Image 
                        src='/home.jpg'
                        alt='glasses'
                        fill={true}
                        className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                </div>
                <img
                    src='/star1.png'
                    alt='star'
                    className="xs:w-[25px] lg:w-[30px] absolute xs:bottom-[-1.5rem] xs:left-[-1.5rem] lg:bottom-[-2rem] lg:left-[-2rem]" 
                />
            </div>   
        </div>
    );
}
 
export default About;