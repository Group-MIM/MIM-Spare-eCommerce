<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $table = 'cities';
    protected $fillable = ['name', 'region_id'];

    public static function cities($id){
   
        return City::where('region_id', '=', $id)->orderBy('name', 'asc')->get();
        //var_dump(City::where('region_id', '=', $id)->orderBy('name', 'asc')->get());
    }

}
