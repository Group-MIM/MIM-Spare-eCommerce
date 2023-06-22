<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';
    protected $fillable = [
        'title', 'description', 'imageLink', 'madeIn', 'quantity', 'category', 'iva', 'medida', 'priority', 'codigo_articulo', 'provider', 'tech_sheet'
    ];
}
