<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EjerciciosController extends Controller
{
    public function fibonacci(Request $request)
    {
        // $this->validate($request,[ 'numero'=>'required']);
        $limit = 4000;//$request->numero ? $request->numero : 0;
        $fibonacci = array(0,1); 
        for($i=2;$i<=$limit;$i++){
            $fibonacci[$i] = $fibonacci[$i-1]+$fibonacci[$i-2];
        }
        return view('ejercicios.fibonacci',compact('fibonacci'));
    }
    public function multiplo(Request $request)
    {
        // $this->validate($request,[ 'numero'=>'required']);
        $limite = 1000;//$request->numero ? $request->numero: 2;
            for($i=0;$i<$limite;$i++){
                if($i%3==0){
                 $resultado += $i;
                } else if($i%5==0){
                    $resultado += $i;
                }
            }
        return view('ejercicios.multiplo',compact('resultado'));
    }
    public function numeroPrimo(Request $request)
    {
        // $this->validate($request,[ 'numero'=>'required']);
        
        $resultado = [];      
        
        function primo($num)        
        {        
            if ($num == 2 || $num == 3 || $num == 5 || $num == 7) {        
                return True;        
            } else {        
                if ($num % 2 != 0) {        
                    for ($i = 3; $i <= sqrt($num); $i += 2) {        
                        if ($num % $i == 0) {        
                            return False;        
                        }        
                    }        
                    return True;        
                }        
            }        
            return False;        
        }
        for ($i=1; $i<=130195; $i++) {
            if (primo($i)) {        
                $resultado[$i] = $i; 
            }        
        }

        // dd($resultado);     

        return view('ejercicios.numeroImpar',compact('resultado'));
    }
}
