import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { User, CreateUser } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css']
})
export class UserForm implements OnChanges {

  /**
   * 🔹 Usuario recibido para edición
   */
  @Input() user: User | null = null;

  /**
   * 🔹 Evento cuando se guarda correctamente
   */
  @Output() saved = new EventEmitter<void>();

  /**
   * 🔹 Evento para cancelar
   */
  @Output() cancel = new EventEmitter<void>();

  userForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notification: NotificationService
  ) {

    /**
     * 🔹 Inicialización del formulario con validaciones
     */
    this.userForm = this.fb.nonNullable.group({
      usuario_Nombre: ['', [Validators.required, Validators.minLength(3)]],
      usuario_Apellido: ['', [Validators.required, Validators.minLength(3)]],
      usuario_Rol: [2, Validators.required],
      usuario_Correo: ['', [Validators.required, Validators.email]],
      usuario_Contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', Validators.required],
      usuario_user: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  /**
   * 🔹 Detecta si llega usuario para edición
   */
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['user'] && this.user) {

      this.isEditMode = true;

      this.userForm.patchValue({
        usuario_Nombre: this.user.usuario_Nombre,
        usuario_Apellido: this.user.usuario_Apellido,
        usuario_Rol: this.user.usuario_Rol,
        usuario_Correo: this.user.usuario_Correo,
        usuario_Contrasena: this.user.usuario_Contrasena,
        confirmarContrasena: this.user.usuario_Contrasena,
        usuario_user: this.user.usuario_user
      });
    }
  }

  /**
   * 🔹 Guardar usuario
   */
  onSubmit(): void {

    if (this.userForm.invalid) {
      this.notification.error('Por favor completa correctamente todos los campos.');
      return;
    }

    const formData = this.userForm.getRawValue();

    // 🔒 Validar coincidencia de contraseña
    if (formData.usuario_Contrasena !== formData.confirmarContrasena) {
      this.notification.error('Las contraseñas no coinciden.');
      return;
    }

    // 🔒 Validar rol permitido
    if (formData.usuario_Rol !== 1 && formData.usuario_Rol !== 2) {
      this.notification.error('Rol inválido.');
      return;
    }

    const newUser: CreateUser = {
      usuario_Nombre: formData.usuario_Nombre,
      usuario_Apellido: formData.usuario_Apellido,
      usuario_Rol: formData.usuario_Rol,
      usuario_Correo: formData.usuario_Correo,
      usuario_Contrasena: formData.usuario_Contrasena,
      usuario_user: formData.usuario_user
    };

    if (this.isEditMode && this.user) {

      this.userService.updateUsuario(this.user.usuario_id, newUser)
        .subscribe({
          next: () => {
            this.notification.success('Usuario actualizado correctamente.');
            this.saved.emit();
          },
          error: () => {
            this.notification.error('Error al actualizar usuario.');
          }
        });

    } else {

      this.userService.addUsuario(newUser)
        .subscribe({
          next: () => {
            this.notification.success('Usuario creado correctamente.');
            this.saved.emit();
          },
          error: () => {
            this.notification.error('Error al crear usuario.');
          }
        });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
