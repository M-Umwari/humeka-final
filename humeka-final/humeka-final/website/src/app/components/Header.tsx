"use client"
import { useEffect, useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from 'react-icons/io5';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Header = () => {
    const pathname = usePathname()
    const [toggleDropdown, setToggleDropdown] = useState(false)
    const [activeSection, setActiveSection] = useState("")
    
    useEffect(() => {
        const sections = document.querySelectorAll('.section')

        window.addEventListener('scroll', () => {
            sections.forEach((section) => {
                //@ts-expect-error wrong type
                if(window.scrollY >= (section.offsetTop - 225)){
                    setActiveSection(section.id)
                }
            })
        })
    },[])

    return (
        <header className="fixed top-0 flex items-center justify-center w-full xs:h-20 lg:h-16 z-20 bg-white shadow-md">
            <div className='xs:w-[85%] md:w-[90%] flex items-center justify-between'>
                <Link href='/#home' className='cursor-pointer'>
                    <img
                        src='/logo.png'
                        alt="headerLogo" 
                        className='w-[100px]'
                    />
                </Link>
                <nav className='xs:hidden lg:flex items-center gap-8 text-custom-textBlue'>
                    <Link href='/#home' className={`hover:text-custom-yellow font-medium text-base ${activeSection === 'home' && 'text-custom-yellow underline'}`}>Home</Link>
                    <Link href='/#about' className={`hover:text-custom-yellow font-medium text-base ${activeSection === 'about' && 'text-custom-yellow underline'}`}>About Us</Link>
                    <Link href='/#services' className={`hover:text-custom-yellow font-medium text-base ${activeSection === 'services' && 'text-custom-yellow underline'}`}>Services</Link>
                    <Link href='/#testimonials' className={`hover:text-custom-yellow font-medium text-base ${activeSection === 'testimonials' && 'text-custom-yellow underline'}`}>Testimonials</Link>
                    <Link href='/#team' className={`hover:text-custom-yellow font-medium text-base ${activeSection === 'team' && 'text-custom-yellow underline'}`}>Our Team</Link>   
                    <Link href='/questionnaire' className={`hover:text-custom-yellow font-medium text-base ${pathname === '/questionnaire' && 'text-custom-yellow underline'}`}>Questionnaire</Link> 
                </nav>
                <Link href='/#contact' className='w-32 h-10 xs:hidden lg:flex items-center justify-center bg-custom-yellow text-white rounded-lg font-semibold'>Contact</Link>
                {!toggleDropdown && <RxHamburgerMenu color='#ebcc00' size={25} className='xs:flex lg:hidden' onClick={() => setToggleDropdown(true)}/>}
                {toggleDropdown && <IoClose color='#ebcc00' size={30} className='xs:flex lg:hidden' onClick={() => setToggleDropdown(false)}/>}
            </div>
                {toggleDropdown && <div 
                    className={`fixed top-20 flex flex-col items-center w-full bg-black bg-opacity-50`}
                    style={{height: "calc(100vh - 7rem)"}}
                    >
                    <div className='flex flex-col items-center gap-4 w-full text-custom-textBlue py-4 bg-white'>
                        <Link href='/#home' className={`hover:text-custom-yellow font-bold text-base ${activeSection === 'home' && 'text-custom-yellow underline'}`}>Home</Link>
                        <Link href='/#about' className={`hover:text-custom-yellow font-bold text-base ${activeSection === 'about' && 'text-custom-yellow underline'}`}>About Us</Link>
                        <Link href='/#services' className={`hover:text-custom-yellow font-bold text-base ${activeSection === 'services' && 'text-custom-yellow underline'}`}>Services</Link>
                        <Link href='/#testimonials' className={`hover:text-custom-yellow font-bold text-base ${activeSection === 'testimonials' && 'text-custom-yellow underline'}`}>Testimonials</Link>
                        <Link href='/#team' className={`hover:text-custom-yellow font-bold text-base ${activeSection === 'team' && 'text-custom-yellow underline'}`}>Our Team</Link> 
                        <Link href='/#contact' className={`hover:text-custom-yellow font-bold text-base ${activeSection === 'contact' && 'text-custom-yellow underline'}`}>Contact</Link>  
                        <Link href='/questionnaire' className={`hover:text-custom-yellow font-bold text-base ${pathname === '/questionnaire' && 'text-custom-yellow underline'}`}>Questionnaire</Link>            
                    </div>
                </div>}
        </header>
    );
}
 
export default Header;