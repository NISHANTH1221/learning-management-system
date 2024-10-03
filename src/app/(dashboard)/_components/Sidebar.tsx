import Logo from "./logo";
import SidebarRoutes from "./sidebarroutes";
const Sidebar = () => {
    return (
        <div className="h-full flex flex-col border-r">
            <div className="p-6">
                <Logo />
            </div>
            <div className="w-full">
                <SidebarRoutes />
            </div>
        </div>
    );
}
 
export default Sidebar;