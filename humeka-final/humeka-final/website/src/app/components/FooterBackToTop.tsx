"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const BackToTop = () => {
    const pathname = usePathname()
    return (
        <Link href={`${pathname}#top`} className="absolute bottom-8 right-0">
            <img src="/backtotop.png" className="w-12 h-12"/>
        </Link>
    );
}
 
export default BackToTop;