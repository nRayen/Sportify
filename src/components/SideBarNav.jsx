"use client"
import { usePathname } from 'next/navigation';
import { CalendarDays, Home, ChartLine } from "lucide-react";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';



const SideBarNav = ({itemstyle}) => {

    // const path = usePathname()
    const [active, setActive] = useState(usePathname())
    useEffect(() => {
      return () => {

      }
      setActive(usePathname())
    }, [])



    const nav = [
        {
          link: "/app",
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
          icon: Home,
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
      const activeLink = link === active

      return (
        <Link key={link} href={link} className={activeLink ? itemstyle+" text-primary" : itemstyle}>
          {React.createElement(icon, { strokeWidth: 1, size: 25 })}
          {text}
        </Link>
      );
    })}
  </div>
  )
}

export default SideBarNav