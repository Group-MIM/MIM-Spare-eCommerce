<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Carrier extends Model
{
    protected $table = 'carriers';
    protected $fillable = [
        'name',
        'codigo_postal',
    ];
}
