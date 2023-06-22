<?php

use App\Product;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $arr_exts = array("jpg", "gif", "png");
        $arr_imagenes = [];
        $actual_link = "http://localhost:8000/public/img/";
        //$actual_link = "http://localhost:8000/img/";

        $path = "./public/img";
        $dir = opendir($path);

        while ($elemento = readdir($dir)) {
            $ext = substr($elemento, -3);
            if (($elemento != '.') && ($elemento != '..') && in_array($ext, $arr_exts)) {
                array_push($arr_imagenes, $actual_link . $elemento);
            }
        }

        $faker = Faker::create();

        $categorias = array(
            'Categoria1',
            'Categoria2',
            'Categoria3',
            'Categoria4',
        );

        $madein = array(
            'España',
            'Francia',
            'Portugal',
            'Alemania',
            'Holanda',
        );

        $iva = array(
            8,
            10,
            21,
        );

        for ($i = 0; $i < count($arr_imagenes); $i++) {
            Product::create([
                'title' => $faker->text(20),
                'description' => $faker->text(250),
                'imageLink' => $arr_imagenes[$i],
                'price' => $faker->randomFloat(2, 1, 100),
                'madeIn' => $madein[array_rand($madein)], //$faker->country,
                'quantity' => $faker->randomDigitNotNull,
                'iva' => $iva[array_rand($iva)],
                'price_sin_iva' => $faker->randomFloat(2, 1, 100),
                'category' => $categorias[array_rand($categorias)], //$faker->text(20)
            ]);}

    }
}
