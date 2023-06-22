<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        User::create([
            'name' => 'Admin',
            'role' => 'admin',
            'active' => 1,
            'avatar' => 'http://localhost:8000/public/img/adminavatar.png',
            'code' => '00000000',
            'direccion' => '-',
            'provincia' => '-',
            'pais' => '-',
            'pais_alt' => '-',
            'municipio' => '-',
            'codigo_postal' => '-',
            'direccion_alt' => '-',
            'provincia_alt' => '-',
            'municipio_alt' => '-',
            'codigo_postal_alt' => '-',
            'telefono' => '-',
            'email' => 'admin@admin.com',
            'password' => 'qwerty123',

        ]);

        User::create([
            'name' => 'Demo',
            'role' => 'user',
            'active' => 1,
            'avatar' => 'http://localhost:8000/img/defaultavatar.png',
            'code' => '11111111',
            'direccion' => '-',
            'provincia' => '-',
            'pais' => '-',
            'pais_alt' => '-',
            'municipio' => '-',
            'codigo_postal' => '-',
            'direccion_alt' => '-',
            'provincia_alt' => '-',
            'municipio_alt' => '-',
            'codigo_postal_alt' => '-',
            'telefono' => '-',
            'email' => 'demo@demo.com',
            'password' => 'qwerty123',

        ]);

    }
}
