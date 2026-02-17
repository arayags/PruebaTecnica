// Se importa la función necesaria para crear un interceptor HTTP
import { HttpInterceptorFn } from '@angular/common/http';

// Se define el interceptor de autenticación
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // Obtiene el token almacenado en el localStorage
  const token = localStorage.getItem('token');

  // Si existe un token
  if (token) {

    // Se clona la petición original y se le agrega el header Authorization
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    // Se envía la petición modificada al siguiente manejador
    return next(cloned);
  }

  // Si no existe token, se envía la petición original sin modificar
  return next(req);
};
