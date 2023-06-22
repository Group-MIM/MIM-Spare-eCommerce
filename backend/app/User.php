<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';
    protected $fillable = [
        'name', 
        'role', 
        'email', 
        'active', 
        'avatar', 
        'password', 
        'code', 
        'direccion', 
        'pais', 
        'provincia', 
        'municipio', 
        'codigo_postal', 
        'direccion_alt', 
        'pais_alt', 
        'provincia_alt', 
        'municipio_alt', 
        'codigo_postal_alt', 
        'telefono'
    ];
}
