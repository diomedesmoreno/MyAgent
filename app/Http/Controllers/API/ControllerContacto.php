<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Contacto;
class ControllerContacto extends Controller
{
    public function index(){
        dd(78);
        return Contacto::all();      
    }

    public function create(Request $request){
        Contacto::insert([
          'nombre' => $request->input('nombre'),
          'apellido' => $request->input('apellido'),
          'dirreccion' => $request->input('dirreccion'),
          'no_telefono' => $request->input('no_telefono')
        ]);
  
        return $response() ->json([
            'message'=> "Guardo exitosamente",
            'success'=> true
        ]);
      }

      public function update(Request $request){

         Contacto::where('id',$request->input('id'))->
            update([
                'titulo' => $request->input('nombre'),
                'descripcion' => $request->input('descripcion'),
                'precio' => $request->input('precio')
            ]);

            return $response() ->json([
                'message'=> "Actualizo exitosamente",
                'success'=> true
            ]);
    }

    public function delete(Request $request){

        Contacto::where('id',$request->input('id'))->delete();
  
        return $response() ->json([
            'message'=> "Elimino exitosamente",
            'success'=> true
        ]);
      }
}
