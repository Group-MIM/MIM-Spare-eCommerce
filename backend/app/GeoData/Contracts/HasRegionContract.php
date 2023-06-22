<?php

namespace App\GeoData\Contracts;

interface HasRegionContract
{
	public function region();
	public function scopeByRegion($query, $region_id);
}