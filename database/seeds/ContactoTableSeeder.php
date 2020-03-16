<?php

use Illuminate\Database\Seeder;

class ContactoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('contacto')->insert(
            [
                [
                    'nombre' => 'Pedro',
                    'apellido'=> 'Perez', 
                    'correo' => 'pperez@yopmail.com',
                    'no_telefono' => '849-698-3210',
                    'created_at' => date("Y-m-d H:i:s"),
                    'updated_at' => date("Y-m-d H:i:s")
                ],
                [
                    'nombre' => 'Maria',
                    'apellido'=> 'Morillo', 
                    'correo' => 'mmorillo@yopmail.com',
                    'no_telefono' => '849-856-3014',
                    'created_at' => date("Y-m-d H:i:s"),
                    'updated_at' => date("Y-m-d H:i:s")
                ],
                [
                    'nombre' => 'Feliz',
                    'apellido'=> 'Rodriguez', 
                    'correo' => 'frodriguez@yopmail.com',
                    'no_telefono' => '849-204-7413',
                    'created_at' => date("Y-m-d H:i:s"),
                    'updated_at' => date("Y-m-d H:i:s")
                ],
            ]);
    }
}
