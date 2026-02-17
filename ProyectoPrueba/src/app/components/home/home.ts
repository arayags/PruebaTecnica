// Se importan los módulos necesarios
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

// Decorador que define la configuración del componente
@Component({

  // Selector que se utilizará en el HTML para llamar este componente
  selector: 'app-home',
  standalone: true,

  // Módulos que este componente necesita para funcionar
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

// Clase principal del componente
export class Home {

  // Evento que permite navegar hacia la sección de productos
  @Output() goToProductos = new EventEmitter<void>();

  // Evento que permite navegar hacia la sección de usuarios
  @Output() goToUsuarios = new EventEmitter<void>();

  // Evento que permite navegar hacia la sección de categorías
  @Output() goToCategorias = new EventEmitter<void>();

  // Método que emite el evento para ir a productos
  openProductos() {
    this.goToProductos.emit();
  }

  // Método que emite el evento para ir a usuarios
  openUsuarios() {
    this.goToUsuarios.emit();
  }

  // Método que emite el evento para ir a categorías
  openCategorias() {
    this.goToCategorias.emit();
  }
}
