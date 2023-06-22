<?php

namespace App\GeoData\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\GeoData\Models\Country;

class CountriesController extends Controller
{
    /**
     * Show countries list.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function countries()
    {
        $countries = Country::active()
            ->orderBy('name', 'ASC')
            ->get([
                'id',
                'code',
                'name',
                'slug'
            ]);

        return response()->json([
            'countries' => $countries
        ]);
    }
}
