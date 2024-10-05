import { Menu } from "lucide-react";
import {
    Sheet,
    SheetTrigger,
    SheetContent
} from "@/components/ui/sheet"
import Sidebar from "./Sidebar";
const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className="flex md:hidden hover:opacity-30 transition">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
        
}
 
export default MobileSidebar;