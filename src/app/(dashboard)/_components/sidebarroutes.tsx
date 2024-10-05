"use client"
import { BarChart, Book, Compass , Layout } from "lucide-react";
import SidebarPiece from "./sidebarPiece";
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        name : "DashBoard",
        href : "/",
        icon : Layout
    },
    {
        name : "Browse",
        href : "/browse",
        icon : Compass
    }
]

const TeacherRoutes = [
    {
        name : "My courses",
        href : "/teacher/courses",
        icon : Layout
    },
    {
        name: "Add New Course",
        href: "/teacher/addcourse",
        icon: Book
    },
    {
        name : "Analytics",
        href : "/teacher/analytics",
        icon : BarChart
    }
]
const SidebarRoutes = () => {

    const pathname  = usePathname();

    const isTeacherPage = (pathname?.startsWith("/teacher"));
    const Routes = isTeacherPage ? TeacherRoutes : guestRoutes;
    return (
        <div className="w-full flex flex-col">
           {
            Routes.map((route)=>{
                return(
                    <SidebarPiece key={route.href} name={route.name} icon={route.icon} href={route.href}/>
                )
            })
           }
        </div>
    );
}
 
export default SidebarRoutes;