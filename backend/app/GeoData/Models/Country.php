<?php

namespace App\GeoData\Models;

use Illuminate\Database\Eloquent\Model;
use App\GeoData\Contracts\CountryContract;
use App\GeoData\Contracts\HasRegionsContract;
use App\GeoData\Contracts\HasCitiesContract;
use App\GeoData\Traits\HasRegions;
use App\GeoData\Traits\HasCities;
use App\GeoData\Traits\Sluggable;
use App\GeoData\Traits\Activable;

class Country extends Model implements CountryContract, HasRegionsContract, HasCitiesContract
{
    use HasRegions, HasCities, Sluggable, Activable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
        'code',
        'active'
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * Scope by country code.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByCountryCode($query, $code)
    {
        return $query->where('code', $code);
    }

    /**
     * Get regions.
     *
     * @return mixed
     */
    public function regions()
    {
        return $this->hasMany(Region::class, 'country_code', 'code');
    }

    /**
     * Get cities.
     *
     * @return mixed
     */
    public function cities()
    {
        return $this->hasMany(City::class, 'country_code', 'code');
    }
}
