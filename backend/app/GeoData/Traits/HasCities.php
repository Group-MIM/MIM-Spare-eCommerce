<?php

namespace App\GeoData\Traits;

use App\GeoData\Models\City;

trait HasCities
{
	/**
	 * Get cities.
	 *
	 * @return mixed
	 */
	public function cities()
	{
		return $this->hasMany(City::class);
	}
}