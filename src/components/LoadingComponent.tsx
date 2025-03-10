import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface PropsLoading {
  height?: number;
}

const LoadingComponent: React.FC<PropsLoading> = ({
    height = 50
}) => {
  return (
    <div className="flex flex-col justify-center items-center" style={{ height: `${height}vh` }}>
      <h5 className="font-medium">Cargando</h5>
      <Icon icon="eos-icons:three-dots-loading" width={70} className="text-blue-500" />
    </div>
  );
};

export default LoadingComponent;
