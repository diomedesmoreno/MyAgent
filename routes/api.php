<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('contacto/list','API\ControllerContacto@index');
Route::post('contacto/create','API\ControllerContacto@create');
Route::post('contacto/update','API\ControllerContacto@update');
Route::post('contacto/delete','API\ControllerContacto@delete');