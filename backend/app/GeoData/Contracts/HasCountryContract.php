<?php

namespace App\GeoData\Contracts;

interface HasCountryContract
{
	public function country();
	public function scopeByCountryCode($query, $code);
}