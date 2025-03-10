"use client";
import React from "react";
import Button from "@/components/Button";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SideMobilDrawer from "@/components/SideNavMobil";
import { logout } from "@/utils/auth";
import useAuth from "../login/useAuth";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "mdi:graph-line",
  },
  {
    name: "Usuarios",
    href: "/dashboard/users",
    icon: "mdi:account-cog",
  },
  {
    name: "Productos",
    href: "/dashboard/products",
    icon: "solar:bottle-bold",
  },
  {
    name: "Inventarios",
    href: "/dashboard/inventory",
    icon: "material-symbols:inventory",
  },
  {
    name: "Reportes",
    href: "/dashboard/reports",
    icon: "bxs:report",
  },
  {
    name: "Configuración",
    href: "/dashboard/settings",
    icon: "material-symbols:settings",
  },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const authenticated = useAuth();

  const handleOpenToggle = () => {
    setOpen(!open);
  };

  if (!authenticated) return null

  return (
    <div className="flex flex-col h-screen">
      <div className="h-12 bg-gray-50 flex px-5 items-center gap-2">
        <div
          className="cursor-pointer text-gray-700 md:hidden"
          onClick={handleOpenToggle}
        >
          <Icon icon="material-symbols:menu" width="24" height="24" />
        </div>
        <h3 className="font-semibold text-lg text-gray-700 flex-1 mx-2">
          {navItems.find((item) => item.href === pathname)?.name}
        </h3>
        <Button text="Ventas" icon="ep:sell" />
        <Button text="Perfil" icon="mdi:user" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[260px_2fr] flex-1 relative">
        <SideMobilDrawer
          navItems={navItems}
          open={open}
          onClose={handleOpenToggle}
        />
        <div className="p-5 bg-gray-50 hidden md:flex flex-col">
          {navItems.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex h-[48px] items-center gap-2 rounded-md text-sm font-medium text-gray-600 hover:bg-sky-100 hover:text-blue-600 flex-none justify-start p-2 px-3
              ${pathname === link.href && "bg-sky-100 text-blue-700"}
              `}
              >
                <Icon icon={link.icon} width={22} />
                <p>{link.name}</p>
              </Link>
            );
          })}
          <div className="grow-1"></div>
          <button
            className="flex h-[48px] w-full items-center gap-2 rounded-md text-sm font-medium text-gray-600 hover:bg-red-100 hover:text-red-600 flex-none justify-start p-2 px-3"
            onClick={logout}
          >
            <Icon icon="material-symbols:logout" width={22} />
            Cerrar sesión
          </button>
        </div>
        <div className="p-5 px-8 rounded-md relative">{children}</div>
      </div>
    </div>
  );
}
