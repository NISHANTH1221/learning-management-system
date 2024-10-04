"use client"
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const SidebarPiece = (
    {
        name,
        icon : Icon,
        href
    }:
    {
       name : string,
       icon : LucideIcon,
       href : string
    }
) => {
    const pathname = usePathname();
    const router = useRouter();
    const isActive = (pathname==href) || (pathname=="/" && href == "/") || (pathname?.startsWith(`${href}/`))
    
    const onClick= () => {
        if (!isActive){
            router.push(href)
        }
    }
    return (
        <div onClick={onClick} className={
            cn(
                `flex items-center gap-x-2 font-[500] text-sm pl-6 transition-all hover:bg-slate-400
                 hover: bg-slate-200/20 py-4 
                `,
                isActive && `text-sky-500 bg-sky-200/20 border-r-4 border-r-sky-600 hover:bg-sky-200/20 hover:text-sky-500`
            )
        }>
            <div>
                <Icon />
            </div>
            <div className="px-2 text-lg">
                {
                    name
                }
            </div>
        </div>
    );
}
 
export default SidebarPiece;