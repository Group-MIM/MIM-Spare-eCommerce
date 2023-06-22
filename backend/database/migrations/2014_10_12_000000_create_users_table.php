<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('role')->default('user');
            $table->integer('active')->default(0);
            $table->string('avatar')->default('img/default_avatar.png');
            $table->string('code');
            $table->string('direccion');
            $table->string('pais');
            $table->string('provincia');
            $table->string('municipio');
            $table->string('codigo_postal');
            $table->string('direccion_alt');
            $table->string('pais_alt');
            $table->string('provincia_alt');
            $table->string('municipio_alt');
            $table->string('codigo_postal_alt');
            $table->string('telefono');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
