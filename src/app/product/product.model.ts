export class ProductModel {
  id: number = 0;
  nameProduct: string = '';
  description: string = '';
  typeProduct?: 'bicicleta' | 'accesorios' | 'mantenimiento' | 'ropa deportiva';
}
