import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobilesidebar";

const Header = () => {
    return (
    <div className="h-full w-full flex items-center p-4 shadow-sm">
            <MobileSidebar />
    </div>
    );
}
 
export default Header;