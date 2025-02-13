import Link from "next/link"
import SettingsSVG from "./SVG/SettingsSVG"
import LogoutSVG from "./SVG/LogoutSVG"
import ThemeSwitch from "./ThemeSwitch"

const SideBar = () => {

  return (
    <aside className="w-[350px] h-full bg-bgtone p-4 flex flex-col justify-between">f
      <div className="absolute top-0 right-0">
        <ThemeSwitch/>
      </div>


        <section>
          dqsd
        </section>
        {/* // Boutons en bas */}
        <section className="w-full fill-black dark:fill-white text-sm gap-1 flex flex-col">
            <Link href={"/settings"} className="py-1 px-2 w-full flex items-center box-border hover:bg-backgroundItem dark:hover:bg-backgroundItem-dark gap-2 rounded-md">
              <SettingsSVG className="fill-inherit h-6"/>
              Paramètres
            </Link>


            <button className="py-1 px-2 w-full flex items-center box-border hover:bg-backgroundItem dark:hover:bg-backgroundItem-dark gap-2 rounded-md">
              <LogoutSVG className="fill-inherit w-6"/>
              Déconnexion
            </button>


        </section>
    </aside>
  )
}

export default SideBar