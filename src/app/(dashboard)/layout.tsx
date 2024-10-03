import Sidebar from "./_components/Sidebar";

const DashboardLayout = ({children} : {children : React.ReactNode}) => {
    return (
        <div className="h-full flex flex-row">
            <div className="hidden md:flex flex-col h-full w-56 inset-y-0">
                <Sidebar />
            </div>
            <div>
               {children}
            </div>
        </div>
    );
}
 
export default DashboardLayout;