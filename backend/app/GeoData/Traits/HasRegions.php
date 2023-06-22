<?php

namespace App\GeoData\Traits;

use App\GeoData\Models\Region;

trait HasRegions
{
	/**
	 * Get regions.
	 *
	 * @return mixed
	 */
	public function regions()
	{
		return $this->hasMany(Region::class);
	}
}