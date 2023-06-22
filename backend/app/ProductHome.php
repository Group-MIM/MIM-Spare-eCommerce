<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductHome extends Model
{
    protected $table = 'products_home';
    protected $fillable = [
        'id_prod'
    ];
}
