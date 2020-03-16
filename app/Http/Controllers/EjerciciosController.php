<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EjerciciosController extends Controller
{
    public function fibonacci(Request $request)
    {
        // $this->validate($request,[ 'numero'=>'required']);
        $limit = $request->numero ? $request->numero : 0;
        $fibonacci = array(0,1); 
        for($i=2;$i<=$limit;$i++){
            $fibonacci[$i] = $fibonacci[$i-1]+$fibonacci[$i-2];
        }
        return view('ejercicios.fibonacci',compact('fibonacci'));
    }
    public function multiplo(Request $request)
    {
        // $this->validate($request,[ 'numero'=>'required']);
        $numero = $request->numero ? $request->numero: 2;
            if($numero%3==0){
             $resultado = $numero." es múltiplo de 3";
            } else if($numero%5==0){
                $resultado = $numero." es múltiplo de 5";
            } else {
                $resultado = $numero." no es múltiplo de 3 ni de 5";
            }
        return view('ejercicios.multiplo',compact('resultado'));
    }
    public function numeroImpar(Request $request)
    {
        // $this->validate($request,[ 'numero'=>'required']);
        $numero = $request->numero;        
        if ($numero%2==0){
            $resultado = "el $numero es par";
        }else{
            $resultado = "el $numero es impar";
        }
        return view('ejercicios.numeroImpar',compact('resultado'));
    }
}
