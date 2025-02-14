import SideBar from "@/components/SideBar";
import PageAnimation from "@/components/PageAnimation";

const AppLayout = ({ children }) => {
	return (
		<div className="w-screen h-screen flex">
			<PageAnimation>
				<main className="h-full w-full">{children}</main>
			</PageAnimation>
			<SideBar />
		</div>
	);
};

export default AppLayout;
