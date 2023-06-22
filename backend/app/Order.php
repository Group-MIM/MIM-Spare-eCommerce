<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';
    protected $fillable = [
        'client_id', 
        'cart', 
        'date', 
        'price', 
        'complete',
        'nombre',
        'direccion',
        'provincia',
        'municipio',
        'codigo_postal',
        'direccion_alt',
        'provincia_alt',
        'municipio_alt',
        'codigo_postal_alt',
        'telefono',
        'email',
        'products_table',
        'estado',
        'enviar_direccion_alternativa',
        'transportista',
        'precio_envio',
        
    ];
}
