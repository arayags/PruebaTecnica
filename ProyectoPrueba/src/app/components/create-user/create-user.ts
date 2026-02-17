import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-user.html',
  styleUrls: ['./create-user.css']
})
export class CreateUser {
  @Output() cancel = new EventEmitter<void>();

  nombre = '';
  apellido = '';
  usuario = '';
  correo = '';
  contrasena = '';
  rol: number | null = null;

  createUser() {
    // Aquí va la lógica para crear usuario (actualmente solo simulado)
    console.log({
      nombre: this.nombre,
      apellido: this.apellido,
      usuario: this.usuario,
      correo: this.correo,
      contrasena: this.contrasena,
      rol: this.rol
    });

    alert('Usuario creado (simulado)');
    this.cancel.emit(); // Emitimos evento para regresar al login
  }

  goBack() {
    this.cancel.emit(); // Emitimos evento para regresar al login
  }
}
