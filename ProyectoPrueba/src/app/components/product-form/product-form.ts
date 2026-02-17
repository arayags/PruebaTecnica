// Se importan los módulos necesarios
import { Component, Output, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { CreateProduct, Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

// Decorador que define la configuración del componente
@Component({

  // Selector que se utilizará en el HTML para llamar este componente
  selector: 'app-product-form',
  standalone: true,

  // Módulos que este componente necesita para funcionar
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})

// Clase principal del componente
export class ProductForm implements OnChanges, OnInit {

  // Recibe un producto desde el componente padre (para edición)
  @Input() product: Product | null = null;

  // Evento que se emite cuando el producto se guarda correctamente
  @Output() productSaved = new EventEmitter<void>();

  // Evento que se emite cuando se cancela la operación
  @Output() cancel = new EventEmitter<void>();

  // Formulario reactivo para manejar los datos del producto
  productForm: FormGroup;

  // Variable que indica si el formulario está en modo edición
  isEditMode = false;

  // Observable que contiene la lista de categorías
  categorias$!: Observable<any[]>;

  // Observable que contiene la lista de usuarios (responsables)
  usuarios$!: Observable<User[]>;

  // Constructor donde se inyectan los servicios necesarios
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private userService: UserService
  ) {

    // Se inicializa el formulario con sus controles y validaciones
    this.productForm = this.fb.nonNullable.group({
      producto_Nombre: ['', Validators.required],
      producto_Precio: [0, [Validators.required, Validators.min(0)]],
      producto_Cantidad: [0, [Validators.required, Validators.min(0)]],
      producto_Descripcion: ['', Validators.required],
      producto_Categoria: [null, Validators.required],
      producto_Responsable: [null] // 🔥 opcional
    });
  }

  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {

    // 🔹 Cargar categorías
    this.categorias$ = this.categoryService.categorias$;
    this.categoryService.loadCategorias();

    // 🔹 Cargar usuarios (Responsables)
    this.usuarios$ = this.userService.usuarios$;
    this.userService.loadUsuarios();
  }

  // Método que detecta cambios en las propiedades @Input
  ngOnChanges(changes: SimpleChanges): void {

    // Si cambia el producto y existe un valor válido
    if (changes['product'] && this.product) {

      // Activa el modo edición
      this.isEditMode = true;

      // Rellena el formulario con los datos del producto recibido
      this.productForm.patchValue({
        producto_Nombre: this.product.producto_Nombre,
        producto_Precio: this.product.producto_Precio,
        producto_Cantidad: this.product.producto_Cantidad,
        producto_Descripcion: this.product.producto_Descripcion,
        producto_Categoria: this.product.producto_Categoria,
        producto_Responsable: this.product.producto_Responsable
      });
    }
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {

    // Si el formulario es inválido, se detiene la ejecución
    if (this.productForm.invalid) return;

    // Obtiene los valores del formulario
    const data: CreateProduct = this.productForm.getRawValue();

    // Si está en modo edición y existe un producto seleccionado
    if (this.isEditMode && this.product) {

      // Llama al servicio para actualizar el producto
      this.productService.updateProducto(this.product.producto_id, data)
        .subscribe({
          next: () => this.productSaved.emit(),
          error: () => alert('Error al actualizar producto')
        });

    } else {

      // Llama al servicio para agregar un nuevo producto
      this.productService.addProducto(data)
        .subscribe({
          next: () => this.productSaved.emit(),
          error: () => alert('Error al agregar producto')
        });
    }
  }

  // Método que se ejecuta al cancelar la acción
  onCancel(): void {
    this.cancel.emit();
  }
}
