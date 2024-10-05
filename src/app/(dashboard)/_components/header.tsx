import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobilesidebar";
import NavbarRoutes from "@/components/navbar-routes";

const Header = () => {
    return (
    <div className="h-full w-full flex items-center p-4 shadow-sm">
        <MobileSidebar />
        <NavbarRoutes />
    </div>
    );
}
 
export default Header;