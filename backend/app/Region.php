<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    protected $table = 'regions';
    protected $fillable = ['name'];

    public static function regions($id){
        return Region::where('id', '=', $id)->get();
    }
}
