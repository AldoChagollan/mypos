import React from "react";
import Button from "./Button";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  onOk: () => void;
  className?: string;
  title?: string;
  subtitle?: string;
  loading?: boolean;
  [key: string]: any;
}

const CustomDialog: React.FC<DialogProps> = ({
  open = false,
  onClose,
  onOk = () => null,
  className,
  title = "",
  subtitle = "",
  loading = false,
  ...rest
}) => {
  const isOpenClass = open ? "opacity-100 visible" : "opacity-0 invisible";

  return (
    <div
      className={`z-10 absolute bg-black/3 h-[calc(100vh-48px)] top-0 right-0 w-screen flex justify-center items-center transition-opacity duration-300 ease-in-out ${isOpenClass}`}
      style={{ backdropFilter: "blur(1.5px)" }}
      onClick={onClose}
    >
      <div
        {...rest}
        onClick={(e) => e.stopPropagation()}
        className={`bg-white shadow-xl h-min rounded-md mt-[-150px] p-5 px-10 ${className} w-120 flex-col transform transition-all duration-300 ease-in-out`}
      >
        <div className={`${open ? "block" : "hidden"}`}>
          <div className={`mb-5`}>
            {title && (
              <h3 className="font-semibold text-xl text-gray-700">
                {title}
              </h3>
            )}
            {subtitle && (
              <h4 className="font-thin text-md text-gray-500">{subtitle}</h4>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <Button
              iconSize={24}
              onClick={onClose}
              text="Cancelar"
            />
            <Button
              icon={loading ? "eos-icons:three-dots-loading" : "material-symbols-light:delete-outline"}
              disabled={loading}
              iconSize={24}
              variant="contained"
              onClick={onOk}
              color="danger"
              text="Eliminar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDialog;
