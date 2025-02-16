
import { Menu } from "lucide-react";
// import { useState } from "react";
import SideBar from "./SideBar";

const SideBarController = () => {
	// const [isOpen, setIsOpen] = useState();

	return (
		<>
			<div className="lg:hidden text-default bg-red-700">
				<Menu strokeWidth={1} />
			</div>
            <SideBar/>
		</>
	);
};

export default SideBarController;
