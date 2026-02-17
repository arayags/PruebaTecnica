import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'   // 🔥 ESTO ES CLAVE
})
export class NotificationService {

  success(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: message,
      confirmButtonColor: '#2563eb'
    });
  }

  error(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonColor: '#dc2626'
    });
  }

  confirm(message: string) {
    return Swal.fire({
      icon: 'warning',
      title: 'Confirmar',
      text: message,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#2563eb'
    });
  }
}
