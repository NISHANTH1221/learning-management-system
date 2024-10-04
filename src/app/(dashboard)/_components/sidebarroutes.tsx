"use client"
import { Compass, Layout } from "lucide-react";
import SidebarPiece from "./sidebarPiece";

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
const SidebarRoutes = () => {
    const Routes = guestRoutes;
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