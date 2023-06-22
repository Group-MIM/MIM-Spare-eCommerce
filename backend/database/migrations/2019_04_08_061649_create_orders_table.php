<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('client_id');
            $table->string('cart', 1000);
            $table->decimal('price');
            $table->boolean('complete');
            $table->string('nombre', 50);
            $table->string('provincia', 50);
            $table->string('municipio', 50);
            $table->string('direccion', 100);
            $table->string('codigo_postal', 6);
            $table->string('provincia_alt', 50);
            $table->string('municipio_alt', 50);
            $table->string('direccion_alt', 100);
            $table->string('codigo_postal_alt', 6);
            $table->string('telefono', 20);
            $table->string('email', 50);
            $table->string('products_table', 1000);
            $table->integer('estado');
            $table->boolean('enviar_direccion_alternativa');
            $table->string('transportista');
            $table->decimal('precio_envio');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
