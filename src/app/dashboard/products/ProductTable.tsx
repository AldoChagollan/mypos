import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@/components/Button";
import CustomDialog from "@/components/CustomDialog";
import SideDrawer from "@/components/SideDrawer";
import LoadingComponent from "@/components/LoadingComponent";
import { postDataWithCredentials } from "@/utils/api";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import ProductFormComponent from "./ProductForm";
import { dataControls } from "./productControls";

const columns: GridColDef[] = [
  { field: "barcode", headerName: "Código de barras", width: 150,  },
  { field: "alternateKey", headerName: "Clave Alterna", width: 150, },
  { field: "productName", headerName: "Artículo", flex: 1 },
  { field: "category", headerName: "Categoria", flex: 1 },
  { field: "brand", headerName: "Marca", flex: 1 },
  { field: "price", headerName: "Precio", width: 150, },
  {
    field: "active",
    headerName: "Activo",
    width: 100,
    renderCell: (active) => {
      const customStyle = active
        ? "border-blue-600 bg-blue-500 text-white"
        : "border-gray-400 bg-gray-300";

      return (
        <div className={`flex items-center justify-center h-full`}>
          <div className={`border rounded-md leading-4 px-2 ${customStyle}`}>
            {active ? "activo" : "inactivo"}
          </div>
        </div>
      );
    },
  },
  {
    field: "edit",
    headerName: "",
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    width: 50,
    renderCell: (params) => (
      <div className={`flex items-center justify-center h-full`}>
        <Button icon="tabler:edit" iconSize={25} color="secondary" />
      </div>
    ),
  },
  {
    field: "delete",
    headerName: "",
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    width: 50,
    renderCell: (params) => (
      <div className={`flex items-center justify-center h-full`}>
        <Button
          icon="material-symbols-light:delete-outline"
          iconSize={25}
          color="danger"
        />
      </div>
    ),
  },
];

interface ProductTableProps {
  data: [];
}

const ProductTable: React.FC<ProductTableProps> = ({ data }) => {
  const [loading, setLoading] = React.useState(false);
  const [editingId, setEditingId] = React.useState("");
  const [deletingId, setDeletingId] = React.useState("");
  const form = useForm<Record<string, any>>();

  const handleCellClick = (columData: any) => {
    if (columData.field === "edit") handleSetDataToEdit(columData.row);
    if (columData.field === "delete") setDeletingId(columData.row._id);
  };

  const handleSetDataToEdit = (row: any) => {
    dataControls.forEach((el) => {
      form.setValue(el.name, row[el.name]);
    });
    setEditingId(row._id);
  };

  const onSubmitUpdate = async (data: Record<string, any>) => {
    try {
      await postDataWithCredentials({
        method: "put",
        url: `/product/${editingId}`,
        data,
        refetchUrl: "/product",
        loader: setLoading
      });
      form.reset();
      setEditingId("")
    } catch (error: any) {
      console.log(error?.response || error);
    }
  };

  const onSubmitDelete = async () => {
    try {
      await postDataWithCredentials({
        method: "delete",
        url: `/product/${deletingId}`,
        refetchUrl: "/product",
        loader: setLoading
      });
      form.reset();
      setDeletingId("")
    } catch (error: any) {
      console.log(error?.response || error);
    }
  };

  return (
    <div className="grid grid-cols-1 w-full">
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row._id}
        hideFooter
        onCellClick={handleCellClick}
        disableRowSelectionOnClick
      />
      <SideDrawer
        open={editingId ? true : false}
        onClose={() => setEditingId("")}
        title="Editar usuario"
      >
        {loading ? (
          <LoadingComponent />
        ) : (
          <ProductFormComponent onSubmit={onSubmitUpdate} form={form} />
        )}
      </SideDrawer>
      <CustomDialog
        open={deletingId ? true : false}
        title="Eliminar usuario"
        subtitle="Se eliminará este usuario de forma permanente"
        onClose={() => setDeletingId("")}
        onOk={() => onSubmitDelete()}
        loading={loading}
      />
    </div>
  );
};

export default ProductTable;
