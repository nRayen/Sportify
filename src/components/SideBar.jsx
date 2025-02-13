import Link from "next/link"
import SettingsSVG from "./SVG/SettingsSVG"
import LogoutSVG from "./SVG/LogoutSVG"

const SideBar = () => {



  return (
    <aside className="w-[350px] h-full bg-bgtone p-4 flex flex-col justify-between">


        <section>
          dqsd
        </section>
        {/* // Boutons en bas */}
        <section className="w-full fill-black dark:fill-white text-xl gap-1">
            <Link href={"/settings"} className="p-2 w-full flex items-center box-border hover:bg-background hover:dark:bg-background-dark gap-2 rounded-md">
              <SettingsSVG className="fill-inherit w-8"/>
              Paramètres
            </Link>


            <Link href={"/settings"} className="p-2 w-full flex items-center box-border hover:bg-background hover:dark:bg-background-dark gap-2 rounded-md">
              <LogoutSVG className="fill-inherit w-8"/>
              Déconnexion
            </Link>


        </section>
    </aside>
  )
}

export default SideBar