import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface PropsLoading {
  height?: number;
  code?: string;
  message?: string;
}

const ErrorComponent: React.FC<PropsLoading> = ({
    height = 50,
    code = "",
    message = "",
}) => {
  return (
    <div className="flex flex-col justify-center items-center" style={{ height: `${height}vh` }}>
      <h5 className="font-medium">{code}</h5>
      <h5 className="font-medium">{message}</h5>
      <Icon icon="material-symbols:error" width={70} className="text-red-400" />
    </div>
  );
};

export default ErrorComponent;
