<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contacto extends Model
{
    protected $table='contacto';

    protected $fillable=['id','nombre', 'apellido', 'direccion', 'no_telefono' ];

    public $timestamps = false;

}
