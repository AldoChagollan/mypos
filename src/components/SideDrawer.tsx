import React from "react";
import Button from "./Button";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  className?: string;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

const SideDrawer: React.FC<DrawerProps> = ({
  open = false,
  onClose,
  maxWidth,
  className,
  title = "",
  subtitle = "",
  children,
  ...rest
}) => {
  const isOpenClass = open ? "opacity-100 visible" : "opacity-0 invisible";
  const panelClass = open
    ? "translate-x-0 w-2/2 md:w-2/3 lg:w-1/2 xl:w-1/3"
    : "translate-x-[-35px] w-0";

  return (
    <div
      className={`z-10 absolute bg-black/3 h-[calc(100vh-48px)] top-0 right-0 w-screen flex justify-end transition-opacity duration-300 ease-in-out ${isOpenClass}`}
      style={{ backdropFilter: "blur(1.5px)" }}
      onClick={onClose}
    >
      <div
        {...rest}
        onClick={(e) => e.stopPropagation()}
        className={`bg-white shadow-xl h-[calc(100vh-48px)] p-5 px-10 ${className} flex-col transform transition-all duration-300 ease-in-out ${panelClass}`}
      >
        <div className={`${open ? "block" : "hidden"}`}>
          <div className={`flex mb-5 items-center gap-4`}>
            <Button
              icon="lets-icons:back"
              iconSize={24}
              variant="outlined"
              onClick={onClose}
            />
            <div>
              {title && (
                <h3 className="font-semibold text-lg text-gray-700 leading-5">
                  {title}
                </h3>
              )}
              {subtitle && (
                <h4 className="font-thin text-sm text-gray-500">{subtitle}</h4>
              )}
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
