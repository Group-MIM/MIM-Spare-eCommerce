export class Product {
  id?: number;
  title: string;
  description: string;
  imageLink: string;
  priceAmount: number;
  price: number;
  quantity: number;
  madeIn: string;
  category: string;
  iva: number;
  price_sin_iva: number;
  medida: string;
  priority: number;
  codigo_articulo: string;
  provider: string;//  "provider": "125-21-1,65-23-2,", precio-iva-proveedor
  tech_sheet: string;

  constructor(
  ) {
  }


}
