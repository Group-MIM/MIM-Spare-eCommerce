<?php

namespace App\GeoData\Models;

use Illuminate\Database\Eloquent\Model;
use App\GeoData\Contracts\RegionContract;
use App\GeoData\Contracts\HasCountryContract;
use App\GeoData\Contracts\HasCitiesContract;
use App\GeoData\Traits\HasCountry;
use App\GeoData\Traits\HasCities;
use App\GeoData\Traits\Sluggable;
use App\GeoData\Traits\Activable;

class Region extends Model implements RegionContract, HasCountryContract, HasCitiesContract
{
    use HasCountry, HasCities, Sluggable, Activable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
        'country_code',
        'active'
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;
}
