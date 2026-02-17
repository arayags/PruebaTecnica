// Se importan los módulos necesarios
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { UserForm } from '../user-form/user-form';

// Decorador que define la configuración del componente
@Component({

  // Selector que se utilizará en el HTML para llamar este componente
  selector: 'app-user-list',
  standalone: true,

  // Módulos que este componente necesita para funcionar
  imports: [CommonModule, UserForm],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css']
})

// Clase principal del componente
export class UserList implements OnInit {

  // Evento que permite navegar hacia la sección de productos
  @Output() goToProducts = new EventEmitter<void>();

  // Observable que contiene la lista de usuarios
  usuarios$!: Observable<User[]>;

  // Variable que controla si se muestra el formulario
  showForm = false;

  // Variable que almacena el usuario seleccionado para edición
  selectedUser: User | null = null;

  // Constructor donde se inyectan los servicios necesarios
  constructor(
    private userService: UserService,
    private notification: NotificationService
  ) {}

  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {

    // Se obtiene el observable de usuarios desde el servicio
    this.usuarios$ = this.userService.usuarios$;

    // Se cargan los usuarios desde el backend
    this.userService.loadUsuarios();
  }

  // Método que prepara el formulario para agregar un nuevo usuario
  onAdd(): void {
    this.selectedUser = null;
    this.showForm = true;
  }

  // Método que prepara el formulario para editar un usuario existente
  onEdit(user: User): void {
    this.selectedUser = user;
    this.showForm = true;
  }

  // Método que cierra el formulario y limpia la selección
  onCloseForm(): void {
    this.showForm = false;
    this.selectedUser = null;
  }

  // Método que elimina un usuario por su id
  onDelete(id: number): void {

    // Muestra confirmación antes de eliminar
    this.notification.confirm('Esta acción eliminará el usuario.')
      .then(result => {

        // Si el usuario cancela, se detiene la ejecución
        if (!result.isConfirmed) return;

        // Llama al servicio para eliminar el usuario
        this.userService.deleteUsuario(id)
          .subscribe({

            // Si la eliminación es exitosa
            next: () => this.notification.success('Usuario eliminado'),

            // Si ocurre un error
            error: () => this.notification.error('No se pudo eliminar')
          });
      });
  }

  // Método que emite el evento para volver a la sección de productos
  onGoToProducts(): void {
    this.goToProducts.emit();
  }
}
