import SideBar from "@/components/SideBar";
import { SessionProvider } from "../../hooks/useSession";

const AppLayout = ({ children }) => {

    return (
        <div className="w-screen h-screen flex">
            <main className="w-full">

            </main>
            <SideBar/>
        </div>
    )
};

export default AppLayout
