import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@/components/Button";
import CustomDialog from "@/components/CustomDialog";
import SideDrawer from "@/components/SideDrawer";
import LoadingComponent from "@/components/LoadingComponent";
import { axiosInstance, postDataWithCredentials } from "@/utils/api";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { useSnackbar } from "notistack";
import UserFormComponent from "./UserForm";
import { dataControls } from "./form_items";

const columns: GridColDef[] = [
  { field: "code", headerName: "Código", flex: 1,  },
  { field: "username", headerName: "Usuario", flex: 1 },
  { field: "name", headerName: "Nombre", flex: 1 },
  { field: "lastName", headerName: "Apellido", flex: 1 },
  { field: "email", headerName: "Correo electrónico", flex: 1 },
  {
    field: "active",
    headerName: "Activo",
    flex: 1,
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
    field: "isAdmin",
    headerName: "Admin",
    flex: 1,
    valueGetter: (value) => (value ? "SI" : "NO"),
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

interface UserTableProps {
  data: [];
}

const UsersTable: React.FC<UserTableProps> = ({ data }) => {
  const [loading, setLoading] = React.useState(false);
  const [editingId, setEditingId] = React.useState("");
  const [deletingId, setDeletingId] = React.useState("");
  const form = useForm<Record<string, any>>();
  const { enqueueSnackbar } = useSnackbar();

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
        url: `/user/${editingId}`,
        data,
        refetchUrl: "/user",
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
        url: `/user/${deletingId}`,
        refetchUrl: "/user",
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
          <UserFormComponent onSubmit={onSubmitUpdate} form={form} />
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

export default UsersTable;
