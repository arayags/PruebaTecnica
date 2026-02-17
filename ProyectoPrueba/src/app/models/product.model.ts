// Interfaz que representa la estructura completa de un producto
export interface Product {
  producto_id: number;
  producto_Nombre: string;
  producto_Precio: number;
  producto_Cantidad: number;
  producto_Descripcion: string;
  producto_Categoria: number;
  producto_Responsable?: number;
  categoria?: string;
  responsable?: string;
}

// Interfaz que representa la estructura necesaria para crear un producto
export interface CreateProduct {
  producto_Nombre: string;
  producto_Precio: number;
  producto_Cantidad: number;
  producto_Descripcion: string;
  producto_Categoria: number;
  producto_Responsable?: number;
}
