<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $table = 'countries';
    protected $fillable = ['name', 'code'];

    public static function countries($code){
   
        return Country::all();
        //var_dump(City::where('region_id', '=', $id)->orderBy('name', 'asc')->get());
    }
}
