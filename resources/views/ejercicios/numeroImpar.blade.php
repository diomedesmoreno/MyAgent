@extends('layouts.layout')
@section('content')
<div class="row">
	<section class="content">
		<div class="col-md-8 col-md-offset-2">
			@if (count($errors) > 0)
			<div class="alert alert-danger">
				<strong>Error!</strong> Revise los campos obligatorios.<br><br>
				<ul>
					@foreach ($errors->all() as $error)
					<li>{{ $error }}</li>
					@endforeach
				</ul>
			</div>
			@endif
			@if(Session::has('success'))
			<div class="alert alert-info">
				{{Session::get('success')}}
			</div>
			@endif

			<div class="container">
				<h1>Número Impar </h1>
				<div class="row"> 
					<form>
						<div class="row">
						  <div class="col-sm-12">
							<input type="number" name="numero" class="form-control" placeholder="Introduzca que cantidad de numeros quieres imprimir">
						  </div>
						</div>
						<div class="col-sm-12">
							<button type="submit" class="btn btn-primary">Comprobar</button>
						</div>  
					</form>
					<br/>
				</div>
				
				<div class="row">
					<ul class="list-group">
						<li class="list-group-item"> El resultado es: {{ $resultado }}</</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
	@endsection