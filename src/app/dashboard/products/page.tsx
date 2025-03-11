"use client";
import Button from "@/components/Button";
import SideDrawer from "@/components/SideDrawer";
import React from "react";
import ProductFormComponent from "./ProductForm";
import { useForm } from "react-hook-form";
import { postDataWithCredentials, useApiData } from "@/utils/api";
import ProductTable from "./ProductTable";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
import { getIdEnterprice } from "@/utils/auth";

export default function Products() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const form = useForm<Record<string, any>>();
  const { data, error, isLoading } = useApiData("/product", true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    form.reset();
  };

  const onSubmit = async (data: Record<string, any>) => {
    try {
      await postDataWithCredentials({
        method: "post",
        url: `/product`,
        data: {
          ...data,
          enterprice: getIdEnterprice(),
        }, 
        refetchUrl: "/product",
        loader: setLoading
      });
      handleClose();
    } catch (error: any) {
      console.log(error?.response || error);
    }
  };

  return (
    <div>
      <div className="flex justify-end items-center">
        <Button
          text="Nuevo producto"
          variant="contained"
          icon="material-symbols:add"
          onClick={handleOpen}
        />
        <SideDrawer
          open={open}
          onClose={handleClose}
          title="Registro de productos"
        >
          {loading ? (
            <LoadingComponent />
          ) : (
            <ProductFormComponent onSubmit={onSubmit} form={form} />
          )}
        </SideDrawer>
      </div>
      <div className="mt-3">
        <TableComponent isLoading={isLoading} error={error} data={data} />
      </div>
    </div>
  );
}

interface TebleProps {
  isLoading: boolean;
  error?: any;
  data?: []
}

const TableComponent: React.FC<TebleProps> = ({ isLoading, error, data = [] }) => {
  if (isLoading) return <LoadingComponent />;
  if (error)
    return (
      <ErrorComponent
        code={error.status || ""}
        message={
          error?.data?.message ||
          error.response?.data?.message ||
          error.message ||
          error.statusText ||
          "Error desconocido"
        }
      />
    );
  return <ProductTable data={data} />;
};
