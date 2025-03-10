import axios from "axios";
import useSWR, { mutate } from "swr";
import { useSnackbar } from "notistack";
import { getTokenAuth } from "./auth";
import { enqueueSnackbar } from "notistack";

// Instancia de Axios con configuración base
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetcher = async (url: string, needsAuth = false) => {
  try {
    const headers: Record<string, string> = {};
    const token: any = getTokenAuth();

    if (needsAuth && token) {
      headers.Authorization = `Bearer ${token.token}`;
    }
    let identerprice = `?identerprice=${token.decoded.enterprice}`
    if(url.includes("?")) identerprice = `&identerprice=${token.decoded.enterprice}`

    const response = await axiosInstance.get(`${url+identerprice}`, { headers });
    return response.data;
  } catch (error: any) {
    throw error.response || error;
  }
};

export const useApiData = (url: string, needsAuth = false) => {
  const { enqueueSnackbar } = useSnackbar();

  const { data, error, isLoading } = useSWR(
    [url, needsAuth],
    ([url, auth]) => fetcher(url, auth),
    {
      onError: (err) => {
        enqueueSnackbar(`Error: ${err?.message || "Algo salió mal."}`, {
          variant: "error",
        });
        enqueueSnackbar(
          `Error: ${
            (err?.message,
            error.response?.data?.message ||
              error.response?.statusText ||
              error.message ||
              "Algo salió mal.")
          }`,
          {
            variant: "error",
          }
        );
        throw error.response || error;
      },
      /*  onSuccess: () => {
       // Notificación de éxito
       //enqueueSnackbar("¡Datos cargados exitosamente!", { variant: "success" });
     }, */
    }
  );

  if (isLoading) return { data: null, error: null, isLoading: true };

  return { data, error, isLoading: false };
};

interface TokenProps {
  decoded: any,
  token: string,
}

const handlerPostData = async (
  url: string,
  data: any,
  method: string,
  token?: TokenProps,
) => {
  let headers = {};
  if (token) {
    headers = {
      Authorization: `Bearer ${token.token}`,
    };
  }

  if (method === "put") {
    return await axiosInstance.put(url, data, { headers });
  } else if (method === "delete") {
    return await axiosInstance.delete(url, { headers });
  } else {
    return await axiosInstance.post(url, data, { headers });
  }
};

interface postDataParams {
  method: string;
  url: string;
  data?: object;
  refetchUrl?: string;
  loader?: (bol: boolean) => void;
}

export const postData = async ({
  method,
  url,
  data,
  refetchUrl,
  loader,
}: postDataParams) => {
  try {
    if (loader) loader(true);
    const response = await handlerPostData(url, data, method);

    if (loader) loader(false);
    if (refetchUrl) mutate(refetchUrl);
    enqueueSnackbar(response?.data?.message ?? "Listo", { variant: "success" });
    return response.data;
  } catch (error: any) {
    if (loader) loader(false);
    enqueueSnackbar(
      error.response?.data?.message ||
        error.response?.statusText ||
        error.message ||
        "Error",
      {
        variant: "error",
      }
    );
    throw error.response || error;
  }
};

export const postDataWithCredentials = async ({
  method,
  url,
  data,
  refetchUrl,
  loader,
}: postDataParams) => {
  try {
    const token: any = getTokenAuth();
    if (!token) {
      return enqueueSnackbar("No estas autenticado", { variant: "error" });
    }
    if (loader) loader(true);

    console.log("TOKEN", token)

    const response = await handlerPostData(url, data, method, token);

    if (!response) throw new Error("No response");
    if (loader) loader(false);
    if (refetchUrl) mutate(refetchUrl);
    enqueueSnackbar(response?.data?.message ?? "Listo", { variant: "success" });
    return response.data;
  } catch (error: any) {
    if (loader) loader(false);
    enqueueSnackbar(
      error.response?.data?.message ||
        error.response?.statusText ||
        error.message ||
        "Error",
      {
        variant: "error",
      }
    );
    throw error.response || error;
  }
};
