import React from "react";
import palette from "@/utils/palette";
import { Icon } from "@iconify/react";

// Definimos los tipos para las combinaciones de color y variante
type Color = "primary" | "secondary" | "danger" | "success" | "info";
type Variant = "text" | "contained" | "outlined";

interface ButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  color?: Color;
  variant?: Variant;
  icon?: string;
  iconSize?: number;
  [key: string]: any;
}

const Button: React.FC<ButtonProps> = ({
  text = "",
  onClick,
  className = "",
  disabled,
  color = "primary", // valor por defecto
  variant = "text", // valor por defecto
  icon,
  iconSize = 18,
  ...rest
}) => {
  // Usamos las clases correspondientes del archivo palette.ts
  const colorClass = palette.button[color];
  const variantClass = palette.button[variant][color]; // Accedemos dinámicamente a la variante según el color

  return (
    <button
      {...rest}
      className={`flex gap-1 items-center px-4 py-1 disabled:cursor-not-allowed cursor-pointer ${colorClass} ${variantClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <Icon icon={icon} width={iconSize} />}
      {text}
    </button>
  );
};

export default Button;
