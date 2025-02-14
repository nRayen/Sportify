import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import LogoutButton from "./LogoutButton";
import SideBarProfile from "./SideBarProfile";
import SideBarThemeSwitch from "./SideBarThemeSwitch";
import { CalendarDays, Home, LogOut, Settings, ChartLine } from "lucide-react";
import React from "react";
import SideBarNav from "./SideBarNav";

const SideBar = () => {
  const itemstyle =
    "py-3 px-1 w-full h-8 flex items-center box-border hover:bg-backgroundItem dark:hover:bg-backgroundItem-dark gap-2 rounded-md";


  return (
    <aside className="w-[350px] h-full bg-bgtone p-4 flex flex-col justify-between">
      {/* User */}
      <SideBarProfile />

      {/* Navigation */}
      <nav>
        <h3 className="text-xs font-medium text-text-secondary mb-2 px-1">
          Navigation
        </h3>

        {/* <div className="flex gap-1 flex-col">
          {nav.map(({ link, text, icon }) => {
            return (
              <Link key={link} href={link} className={itemstyle}>
                {React.createElement(icon, { strokeWidth: 1, size: 25 })}
                {text}
              </Link>
            );
          })}
        </div> */}
        <SideBarNav itemstyle={itemstyle}/>
      </nav>

      {/* Boutons en bas */}
      <section className="w-full fill-black dark:fill-white text-sm gap-1 flex flex-col">
        <SideBarThemeSwitch className={itemstyle} />

        <Link href={"/settings"} className={itemstyle}>
          <Settings strokeWidth={1} size={25} />
          Paramètres
        </Link>

        <LogoutButton className={itemstyle}>
          <LogOut strokeWidth={1} size={25} />
          Déconnexion
        </LogoutButton>
      </section>
    </aside>
  );
};

export default SideBar;