<?php

namespace App\GeoData\Models;

use Illuminate\Database\Eloquent\Model;
use App\GeoData\Contracts\CityContract;
use App\GeoData\Contracts\HasCountryContract;
use App\GeoData\Traits\HasCountry;
use App\GeoData\Traits\HasRegion;
use App\GeoData\Traits\Sluggable;
use App\GeoData\Traits\Activable;

class City extends Model implements CityContract, HasCountryContract
{
    use HasCountry, HasRegion, Sluggable, Activable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
        'country_code',
        'region_id',
        'active'
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;
}
