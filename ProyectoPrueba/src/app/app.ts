// Se importan los módulos necesarios
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Se importan los componentes de la aplicación
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { ProductList } from './components/product-list/product-list';
import { ProductForm } from './components/product-form/product-form';
import { UserList } from './components/user-list/user-list';
import { CategoryForm } from './components/category-form/category-form';

// Se importan los modelos y servicios necesarios
import { Product } from './models/product.model';
import { AuthService } from './services/auth.service';

// Decorador que define la configuración del componente principal
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    Login,
    Home,
    ProductList,
    ProductForm,
    UserList,
    CategoryForm
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

// Clase principal de la aplicación
export class App {

  // Variable que controla la vista actual mostrada en la aplicación
  currentView: 'login' | 'home' | 'dashboard' | 'form' | 'categoryForm' = 'login';

  // Variable que controla la sección activa dentro del dashboard
  currentSection: 'productos' | 'usuarios' = 'productos';

  // Variable que almacena el producto seleccionado para edición
  selectedProduct: Product | null = null;

  // Constructor donde se inyecta el servicio de autenticación
  constructor(private authService: AuthService) {}

  // ==========================
  // MÉTODOS DE AUTENTICACIÓN
  // ==========================

  // Cambia la vista al Home después del login
  goToHome() {
    this.currentView = 'home';
  }

  // Cierra la sesión y regresa a la vista de login
  logout() {
    this.authService.logout();
    this.currentView = 'login';
  }

  // ==========================
  // NAVEGACIÓN HOME → DASHBOARD
  // ==========================

  // Cambia a la vista del dashboard indicando la sección activa
  goToDashboard(section: 'productos' | 'usuarios') {
    this.currentSection = section;
    this.currentView = 'dashboard';
  }

  // ==========================
  // GESTIÓN DE PRODUCTOS
  // ==========================

  // Abre el formulario para crear o editar un producto
  goToForm(product: Product | null = null) {
    this.selectedProduct = product;
    this.currentView = 'form';
  }

  // Regresa al dashboard y limpia el producto seleccionado
  goBackToDashboard() {
    this.selectedProduct = null;
    this.currentView = 'dashboard';
  }

  // ==========================
  // GESTIÓN DE CATEGORÍAS
  // ==========================

  // Abre el formulario de categorías
  goToCategoryForm() {
    this.currentView = 'categoryForm';
  }

  // Regresa al dashboard desde el formulario de categorías
  goBackFromCategory() {
    this.currentView = 'dashboard';
  }
}
