<?php

namespace App\GeoData\Traits;

use App\GeoData\Models\City;

trait HasCity
{
	/**
	 * Get parent city.
	 *
	 * @return mixed
	 */
	public function city()
	{
		return $this->belongsTo(City::class);
	}
}