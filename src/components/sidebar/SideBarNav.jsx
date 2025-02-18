"use client"
import { usePathname } from 'next/navigation';
import { CalendarDays, Home, ChartLine, Dumbbell } from "lucide-react";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';



const SideBarNav = ({itemstyle}) => {

    const path = usePathname()
    // const [active, setActive] = useState(usePathname())


    const nav = [
        {
          link: "/dashboard",
          text: "Acceuil",
          icon: Home,
        },
        {
          link: "/planning",
          text: "Planning",
          icon: CalendarDays,
        },
        {
          link: "/exercices",
          text: "Exercices",
          icon: Dumbbell,
        },
        {
          link: "/suivi",
          text: "Suivi",
          icon: ChartLine,
        },
      ];

  return (
    <div className="flex gap-1 flex-col">
    {nav.map(({ link, text, icon }) => {
      const activeLink = link === path

      return (
        <Link prefetch key={link} href={link} className={activeLink ? itemstyle+" text-primary bg-bgcolor" : itemstyle}>
          {React.createElement(icon, { strokeWidth: 1, size: 25 })}
          {text}
        </Link>
      );
    })}
  </div>
  )
}

export default SideBarNav