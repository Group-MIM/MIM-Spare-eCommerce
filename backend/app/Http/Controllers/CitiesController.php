<?php

namespace App\Http\Controllers;

use App\City;

class CitiesController extends Controller
{

    public function getCities($id)
    {
        $cities = City::where('region_id', '=', $id)->orderBy('name', 'asc')->get();
        return $cities;

    }

}
