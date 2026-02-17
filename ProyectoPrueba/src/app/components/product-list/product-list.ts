// Se importan los módulos necesarios
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

// Decorador que define la configuración del componente
@Component({

  // Selector que se utilizará en el HTML para llamar este componente
  selector: 'app-product-list',
  standalone: true,

  // Módulos que este componente necesita para funcionar
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})

// Clase principal del componente
export class ProductList implements OnInit {

  // Evento que abre el formulario para agregar un producto
  @Output() openForm = new EventEmitter<void>();

  // Evento que envía el producto seleccionado para editarlo
  @Output() editProduct = new EventEmitter<Product>();

  // Evento que abre el formulario de categorías
  @Output() openCategoryForm = new EventEmitter<void>();

  // Evento que navega hacia la sección de usuarios
  @Output() goToUsers = new EventEmitter<void>();

  // Evento que permite regresar al inicio
  @Output() goHome = new EventEmitter<void>();

  // Observable que contiene la lista de productos
  productos$!: Observable<Product[]>;

  // Constructor donde se inyectan los servicios necesarios
  constructor(
    private productService: ProductService,
    private notification: NotificationService
  ) {}

  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {

    // Se obtiene el observable de productos desde el servicio
    this.productos$ = this.productService.productos$;

    // Se cargan los productos desde el backend
    this.productService.loadProductos();
  }

  // Método que emite el evento para volver al inicio
  onGoHome(): void {
    this.goHome.emit();
  }

  // Método que emite el evento para agregar un nuevo producto
  onAddProduct(): void {
    this.openForm.emit();
  }

  // Método que emite el producto seleccionado para editarlo
  onEdit(product: Product): void {
    this.editProduct.emit(product);
  }

  // Método que elimina un producto por su id
  onDelete(id: number): void {

    // Muestra confirmación antes de eliminar
    this.notification.confirm('Esta acción eliminará el producto permanentemente.')
      .then(result => {

        // Si el usuario cancela, se detiene la ejecución
        if (!result.isConfirmed) return;

        // Llama al servicio para eliminar el producto
        this.productService.deleteProducto(id)
          .subscribe({

            // Si la eliminación es exitosa
            next: () => {
              this.notification.success('Producto eliminado correctamente');
            },

            // Si ocurre un error
            error: (err) => {
              console.error(err);
              this.notification.error('No se pudo eliminar el producto');
            }
          });

      });
  }

  // Método que emite el evento para abrir el formulario de categorías
  onOpenCategoryForm(): void {
    this.openCategoryForm.emit();
  }
  
  // Método que emite el evento para navegar a usuarios
  onGoToUsers(): void {
    this.goToUsers.emit();
  }

}
