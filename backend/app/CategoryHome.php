<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategoryHome extends Model
{
    protected $table = 'categories_home';
    protected $fillable = [
        'id_category'
    ];
}
