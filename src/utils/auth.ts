// utils/cookies.ts
import Cookies from "js-cookie";

export const setRoleCookie = (role: string) => {
  Cookies.set("role", role, { expires: 7 }); // Expira en 7 días
};

export const getRoleCookie = () => {
  return Cookies.get("role");
};

export const removeRoleCookie = () => {
  Cookies.remove("role");
};

export const logout = () => {
  sessionStorage.removeItem("pos_token");
  window.location.reload();
};

export const getTokenAuth = () => {
  const token = sessionStorage.getItem("pos_token");

  // Si no hay token, redirige a login
  if (!token) return null;

  // Verificar si el token es válido
  const decoded = JSON.parse(atob(token.split(".")[1])); // Decodificar el token JWT
  const isTokenExpired = decoded.exp < Date.now() / 1000; // Verificar si ha expirado

  if (isTokenExpired) return null;
  return { token, decoded };
};

export const getIdEnterprice = () => {
  const token = sessionStorage.getItem("pos_token");

  if (!token) return null;

  // Verificar si el token es válido
  const decoded = JSON.parse(atob(token.split(".")[1])); // Decodificar el token JWT
  const isTokenExpired = decoded.exp < Date.now() / 1000; // Verificar si ha expirado

  if (isTokenExpired) return null;
  
  return decoded.enterprice;
}