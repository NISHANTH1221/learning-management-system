import Header from "./_components/header";
import Sidebar from "./_components/Sidebar";

const DashboardLayout = ({children} : {children : React.ReactNode}) => {
    return (
        <div className="h-full">
            <div className="md:pl-56 w-full h-[70px] z-50 fixed">
                <Header />
            </div>
            <div className="hidden md:flex flex-col fixed h-full w-56 inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className="h-full md:pl-56 pt-[70px]">
               {children}
            </main>
        </div>
    );
}
 
export default DashboardLayout;