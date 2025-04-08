import Link from 'next/link';
import BackToTop from './FooterBackToTop';

const Footer = () => {
    return (
        <div className="w-full flex flex-col items-center section" id='contact'>
            <div className="relative flex xs:flex-col lg:flex-row xs:gap-10 items-center lg:justify-between w-[90%] mt-36 py-8">
                <div className="flex flex-col gap-4 xs:w-full lg:w-[30%] xs:mt-8 lg:mt-0 lg:py-8">
                    <Link href='/#home' className='cursor-pointer'>
                        <img
                            src='/logo.png'
                            alt="headerLogo" 
                            className='w-[150px]'
                        />
                    </Link>
                    <p>
                        Humeka Organization is a youth-led, non-profit initiative
                        dedicated to promoting mental health and wellness among
                        young people. Founded to address the pressing need for
                        mental health awareness and support, our mission is
                        to help individuals thrive, not just survive.
                    </p>
                </div>
                <div className="flex flex-col  gap-4 xs:w-full lg:w-[20%] lg:py-8">
                    <div className="font-semibold text-2xl flex items-center">Humeka</div>
                    <div className="flex flex-col gap-2">
                        <Link href='/#home' className='hover:text-custom-yellow'>Home</Link>
                        <Link href='/#about' className='hover:text-custom-yellow'>About</Link>
                        <Link href='/#services' className='hover:text-custom-yellow'>Services</Link>
                        <Link href='/#testimonials' className='hover:text-custom-yellow'>Testimonials</Link>
                    </div>
                </div>
                <div className="flex flex-col gap-4 xs:w-full lg:w-[30%] xs:mb-8 lg:mb-0 lg:py-8">
                    <div className="font-semibold text-2xl flex items-center">Contact Info</div>
                    <div className="flex flex-col gap-2">
                        <h2>Location: KG 219 St, Kigali Rwanda</h2>
                        <h2>Email: humekaofficial@gmail.com</h2>
                        <h2>Phone:  +250 784 192 824/ +250 791 590 780</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <img src="/facebookRed.png" className="w-8 h-8"/>
                        <a href='https://www.instagram.com/humeka_org/' target='_blank'>
                            <img src="/instagramRed.png" className="w-8 h-8"/>
                        </a> 
                        <img src="/linkedinRed.png" className="w-8 h-8"/>
                    </div>
                </div>
                <BackToTop/>
            </div>
            <div className="w-full h-16 flex items-center justify-center bg-custom-yellow xs:text-sm text-white">
                Copyright @2025 Humeka All rights reserved.
            </div>
        </div>
    );
}
 
export default Footer;