// Se importan los módulos necesarios
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { NotificationService } from '../../services/notification.service';

// Decorador que define la configuración del componente
@Component({

  // Selector que se utilizará en el HTML para llamar este componente
  selector: 'app-category-form',
  standalone: true,

  // Módulos que este componente necesita para funcionar
  imports: [CommonModule, FormsModule],
  templateUrl: './category-form.html',
  styleUrls: ['./category-form.css']
})

// Clase principal del componente
export class CategoryForm {

  // Propiedad que almacena la descripción de la categoría
  descripcion = '';

  // Evento que se emite cuando la categoría se guarda correctamente
  @Output() saved = new EventEmitter<void>();

  // Constructor donde se inyectan los servicios necesarios
  constructor(
    private categoryService: CategoryService,
    private notification: NotificationService   
  ) {}

  // Método que se ejecuta al guardar la categoría
  guardar(): void {

    // Validación: si la descripción está vacía o solo contiene espacios
    if (!this.descripcion.trim()) {
      this.notification.error('La descripción es obligatoria.');
      return;
    }

    // Llama al servicio para agregar la nueva categoría
    this.categoryService.addCategoria(this.descripcion)
    .subscribe({
      
      // Si la operación es exitosa
      next: () => {
        this.notification.success('Categoría creada correctamente.');
        this.descripcion = '';
        this.saved.emit();
      },

      // Si ocurre un error en la operación
      error: () => {
        this.notification.error('No se pudo crear la categoría.');
      }
    });

  }
}
