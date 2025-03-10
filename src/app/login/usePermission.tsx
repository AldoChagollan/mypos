// hooks/useAuth.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  // #### obtener pathname
  // #### obtener roles de cookies
  // #### matchear rol-vista con pathname actual
  // #### enivar persmiso

  /* useEffect(() => {
    const token = sessionStorage.getItem('pos_token');          
    
    // Si no hay token, redirige a login
    if (!token) return router.push('/');

    // Verificar si el token es válido
    const decoded = JSON.parse(atob(token.split('.')[1]));  // Decodificar el token JWT
    const isTokenExpired = decoded.exp < Date.now() / 1000;  // Verificar si ha expirado

    if (isTokenExpired) {
      sessionStorage.removeItem('pos_token');
      router.push('/');
      return;
    }

    setAuthenticated(true);
  }, [router]); */

  return authenticated;
};

export default useAuth;
