"use client";
import React from "react";
import { FormControl } from "@/components/GenericControls";
import GenericFormComponent from "@/components/GenericForm";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { postData } from "@/utils/api";
import { useRouter } from "next/navigation";
import useAuth from "./useAuth";

export const dataControls: FormControl[] = [
  {
    id: "1",
    name: "email",
    label: "Correo electrónico",
    placeholder: "Ej: juan123@gmail.com",
    type: "email",
    value: "",
    required: true,
    message: "Este campo es requerido",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Por favor ingrese un correo electrónico válido",
    },
  },
  {
    id: "2",
    name: "password",
    label: "Contraseña",
    placeholder: "Ingrese una contraseña",
    type: "password",
    value: "",
    required: true,
    message: "Este campo es requerido",
    pattern: {
      value: /^.{6,}$/,
      message: "La contraseña debe tener al menos 6 caracteres",
    },
  },
];

export default function LoginComponent() {
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const authenticated = useAuth();

  const form = useForm<Record<string, any>>({
    mode: "onBlur", // Valida cuando el usuario sale del input
  });

  const onSubmit = async (data: Record<string, any>) => {
    try {
      const response = await postData({
        method: "post",
        url: "/auth/signin",
        data,
        loader: setLoading,
      });
      sessionStorage.setItem("pos_token", response.token);
      router.push("/dashboard");
    } catch (error: any) {
      console.log(error?.response || error);
    }
  };

  React.useEffect(() => {
    if (authenticated) router.push("/dashboard");
  }, [authenticated]);

  if (authenticated) return null;

  return (
    <div className="w-xs">
      <h2 className="text-base/7 font-semibold text-gray-900 mb-5 text-center">
        Iniciar Sesion
      </h2>
      <GenericFormComponent
        dataControls={dataControls}
        formHook={form}
        onSubmit={onSubmit}
        onOkText="Iniciar sesion"
        loading={loading}
      />
    </div>
  );
}
