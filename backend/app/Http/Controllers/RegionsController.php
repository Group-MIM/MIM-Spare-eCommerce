<?php

namespace App\Http\Controllers;

use App\Region;

class RegionsController extends Controller
{
    public function getRegions($code)
    {
        $regions = Region::where('country_code', '=', $code)->orderBy('name', 'asc')->get();
        return $regions;

    }
}
