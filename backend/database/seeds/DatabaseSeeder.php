<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //$this->call(ProductsSeeder::class);
        $this->call(AllCountriesSeeder::class);
        $this->call(UsersSeeder::class);
        //$this->call(OrdersTableSeeder::class);
    }
}
