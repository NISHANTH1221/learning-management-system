import { SignIn, UserButton } from "@clerk/nextjs";
const Dashboard = () => {
    return (
    <div>
        <UserButton 
        afterSwitchSessionUrl="/signin"
        />
        <h1>Dashboard</h1>
    </div>
    );
}
export default Dashboard;