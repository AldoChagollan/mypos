import { logout } from "@/utils/auth";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export interface NavItems {
  name: string;
  href: string;
  icon: string;
}

interface DrawerProps {
  open: boolean;
  navItems: NavItems[];
  onClose: () => void;
}

const SideMobilDrawer: React.FC<DrawerProps> = ({
  open = false,
  onClose,
  navItems,
}) => {
  const pathname = usePathname();

  const isOpenClass = open ? "opacity-100 visible" : "opacity-0 invisible";
  const panelClass = open
    ? "translate-x-0 w-[240px]"
    : "translate-x-[-35px] w-0";

  return (
    <div
      className={`absolute z-10 bg-black/3 h-[calc(100vh-48px)] top-0 left-0 w-screen flex transition-opacity duration-300 ease-in-out ${isOpenClass}`}
      style={{ backdropFilter: "blur(3px)" }}
      onClick={onClose}
    >
      <div
        className={`bg-white shadow-xl h-[calc(100vh-48px)] transform transition-all duration-300 ease-in-out ${panelClass}`}
      >
        <div className="p-5 bg-gray-50 flex flex-col h-full">
          {navItems.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
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
      </div>
    </div>
  );
};

export default SideMobilDrawer;
