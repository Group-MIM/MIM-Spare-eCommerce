export class Order {
    id: string;
    client_id: string;
    cart: string;
    price: number;
    complete: boolean;
    nombre: string;
    direccion: string;
    provincia: string;
    municipio: string;
    codigo_postal: string;
    direccion_alt: string;
    provincia_alt: string;
    municipio_alt: string;
    codigo_postal_alt: string;
    telefono: string;
    email: string;
    products_table: string;
    estado: number;
    enviar_direccion_alternativa: boolean;
    transportista: string;
    precio_envio: number;
    
    updated_at: Date;

    constructor(
    ) { }


}
