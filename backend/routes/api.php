<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */
//header('Access-Control-Allow-Origin:  *');
//header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
//header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
return $request->user();
});
 */

Route::group(['middleware' => 'cors'], function () {
    Route::resource('products', 'ProductsController');
});

Route::group(['middleware' => 'cors'], function () {
    Route::resource('users', 'UsersController');
});

Route::group(['middleware' => 'cors'], function () {
    Route::resource('uploadfile', 'UploadFilesController');
});
Route::get('products/{pruduct_num}/{id_product}', 'ProductsController@saveProductHome')->name('products.saveProductHome')->middleware('cors');

Route::get('products/productHome/get/{id_product}', 'ProductsController@getProductHome')->name('products.getProductHome')->middleware('cors');

Route::get('categories', 'CategoryController@index')->name('categories')->middleware('cors');

Route::get('categories/{category_num}/{id_category}', 'CategoryController@saveCategoryHome')->name('categories.saveCategoryHome')->middleware('cors');

Route::get('categories/categoryHome/get/{id_category}', 'CategoryController@getCategoryHome')->name('categories.getCategoryHome')->middleware('cors');

Route::get('products/category/get/list/{category}', 'ProductsController@indexByCategory')->name('products.indexByCategory')->middleware('cors');

Route::post('products/where', 'ProductsController@indexWhere')->name('products.indexWhere')->middleware('cors');

Route::get('products/{sortBy}/{price}/{category}/{madein}/sort', 'ProductsController@indexSorted')->name('products.indexSorted')->middleware('cors');

Route::get('products/{palabraBuscar}/search/get', 'ProductsController@indexSearch')->name('products.indexSearch')->middleware('cors');

Route::get('products/showByName/{palabraBuscar}/get', 'ProductsController@showByName')->name('products.showByName')->middleware('cors');

Route::get('products/restar/stock/{name}/{quantity}', 'ProductsController@restarStock')->name('products.restarStock')->middleware('cors');

Route::get('products/update/stock/{id}/{quantity}', 'ProductsController@updateStock')->name('products.updateStock')->middleware('cors');

//Route::post('uploadfile', 'UploadFilesController@upload')->name('uploadfile.upload')->middleware('cors');

Route::get('activacion/{code}', 'UsersController@activate');

Route::get('reset/password/{code}', 'UsersController@resetPassword');

Route::put('users/update/{id}', 'UsersController@editar')->name('users.editar')->middleware('cors');

Route::get('users/login/{email}/{password}', 'UsersController@login')->name('users.login')->middleware('cors');

Route::get('users/get/token/{code}', 'UsersController@getUserByToken')->name('users.getUserByToken')->middleware('cors');

Route::post('orders/guardarCarro/{complete}/{user_id}', 'OrdersController@guardarCarro')->name('orders.guardarCarro')->middleware('cors');

Route::post('orders/getProducts/{complete}', 'OrdersController@getProducts')->name('orders.getProducts')->middleware('cors');

Route::post('orders/save/guardarDatosCliente/{user_id}', 'OrdersController@guardarDatosCliente')->name('orders.guardarDatosCliente')->middleware('cors');

Route::get('orders/getInvoiceData/{invoice_id}', 'OrdersController@getInvoiceData')->name('orders.getInvoiceData')->middleware('cors');

Route::get('orders/cambiarEstado/{invoice_id}/{estado}', 'OrdersController@cambiarEstado')->name('orders.cambiarEstado')->middleware('cors');

Route::post('mail', 'MailsController@sendMail')->name('mails.sendMail')->middleware('cors');

Route::post('mail/reset', 'MailsController@resetPass')->name('mails.resetPass')->middleware('cors');

Route::get('mail/confirmarcompra/{mail}/{importe}', 'MailsController@confirmarCompra')->name('mails.confirmarCompra')->middleware('cors');

Route::get('mail/verify/{userEmail}', 'MailsController@verifyUser')->name('mails.verifyUser')->middleware('cors');

Route::get('countries/', 'CountriesController@getCountries')->name('countries.getCountries')->middleware('cors');

Route::get('regions/{countryCode}', 'RegionsController@getRegions')->name('regions.getRegions')->middleware('cors');

Route::get('cities/{regionId}', 'CitiesController@getCities')->name('cities.getCities')->middleware('cors');
