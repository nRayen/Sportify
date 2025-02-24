import PageAnimation from "@/components/PageAnimation";
import SideBarController from "@/components/sidebar/SideBarController";

const AppLayout = ({ children }) => {
	return (
		<div className="w-screen min-h-screen h-full flex flex-col-reverse justify-end lg:flex-row overflow-x-hidden relative">
			<PageAnimation>
				<main className="w-full">{children}</main>
			</PageAnimation>
			<SideBarController />
		</div>
	);
};

export default AppLayout;
