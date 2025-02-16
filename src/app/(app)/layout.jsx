
import SideBar from "@/components/sidebar/SideBar";
import PageAnimation from "@/components/PageAnimation";
import { Menu } from "lucide-react";
import SideBarController from "@/components/sidebar/SideBarController";

const AppLayout = ({ children }) => {
	return (
		<div className="w-screen h-screen flex flex-col-reverse lg:flex-row overflow-x-hidden relative">
			{/* <div className="lg:hidden text-default bg-red-700">
				<Menu strokeWidth={1} />
			</div> */}
				<PageAnimation>
					<main className="h-full w-full">{children}</main>
				</PageAnimation>
				<SideBarController/>
			{/* <SideBar /> */}
		</div>
	);
};

export default AppLayout;
