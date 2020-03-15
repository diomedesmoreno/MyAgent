<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Contacto;
class ControllerContacto extends Controller
{
    public function index(){
        return Contacto::all();
    }

    public function create(Request $request){
        Contacto::insert([
          'nombre' => $request->input('nombre'),
          'apellido' => $request->input('apellido'),
          'direccion' => $request->input('direccion'),
          'no_telefono' => $request->input('no_telefono')
        ]);
  
        return response() ->json([
            'message'=> "Guardo exitosamente",
            'success'=> true,
            'status' => 200
        ]);
      }

      public function update(Request $request){

         Contacto::where('id',$request->input('id'))->
            update([
                'nombre' => $request->input('nombre'),
                'apellido' => $request->input('apellido'),
                'direccion' => $request->input('direccion'),
                'no_telefono' => $request->input('no_telefono')
            ]);

            return response() ->json([
                'message'=> "Actualizo exitosamente",
                'success'=> true,
                'status' => 200
            ]);
    }

    public function delete(Request $request){

        Contacto::where('id',$request->input('id'))->delete();
  
        return response() ->json([
            'message'=> "Elimino exitosamente",
            'success'=> true
        ]);
      }
}
