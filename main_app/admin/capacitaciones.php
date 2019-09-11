<?php
session_start();
if(!isset($_SESSION["usuario"])){ //Si no ha iniciado sesión redirecciona a index.php
      header("Location: ../../index.php");
  }
  //  elseif ($_SESSION['tipo'] !== 1) {  //debe ser tipo administrador
  //        header("Location: ../../index.php");
  //      }
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Reportes</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
		<script src="https://code.jquery.com/jquery-3.3.1.js"></script>   
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.js"></script>
    <script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script> 
    <script src=" https://cdn.datatables.net/buttons/1.5.6/js/dataTables.buttons.min.js"></script>
		<script src="https://cdn.datatables.net/buttons/1.5.6/js/buttons.flash.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
		<script src="https://cdn.datatables.net/buttons/1.5.6/js/buttons.html5.min.js"></script>
		<script src="https://cdn.datatables.net/buttons/1.5.6/js/buttons.print.min.js"></script>
  	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

		<script src="../../vendor/dist/jquery.validate.js"></script>
		<script src="../../vendor/alertify/alertify.min.js"></script>

		<link rel="stylesheet" href="https://jqueryvalidation.org/files/demo/site-demos.css">
		<link rel="stylesheet" href="../../vendor/alertify/css/alertify.min.css">
		<link rel="stylesheet" href="../../vendor/alertify/css/themes/default.css">
		
  	<script src="../../js/capacitaciones.js"></script>
		<script src="../../vendor/moment-with-locales.min.js"></script>
		<script  src="../../js/acercade.js"></script>

  	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
		<link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
		<link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.5.6/css/buttons.dataTables.min.css">

		<!-- <link rel="stylesheet" href="../../css/main.css"> -->
		<link rel="stylesheet" href="../../vendor/animate/animate.css">
    <link rel="stylesheet" href="../../css/style_forms.css">
		
		<style>
        tfoot input {
        width: 100%;
        padding: 3px;
        box-sizing: border-box;
    }
    
		.buscador{
        visibility:hidden;
    }
    
		</style>


</head>
<body>  
	<div class="row" id="encForm">
		<div class="col-sm-12">
			<div class="">
				<div class="d-flex flex-row">
					<div class="p-2 border-logo"><img class ="logo" src="../../images/logo-tecnoaprender.png" alt="logo tecnoaprender"></div>
					<div class="p-2 align-self-center"><span class="tit-header-opt">Capacitaciones</span></div>
					<div id="divInfo" class="p-2 ml-auto logout"></div>
				</div>
				<div class="d-flex justify-content-end">
					<div id="divUsuario" class="p-2 logout"></div>
					<div id="divSalir" class="p-2 logout"></div>
				</div>
			</div>
		</div>
	</div>
<div class="container-fluid">
  <div id="dataModal" class="modal fade">  
    <div class="modal-dialog">  
  	 <div class="modal-content">  
        <div class="modal-header">  
					<h4 class="modal-title">Capacitaciones</h4>  
          <button type="button" class="close" data-dismiss="modal">&times;</button>   
        </div>  
        <div class="modal-body" id="employee_detail">  
        	<form name="formCapEdit" id="formCapEdit">
						<div class="row">
							<div class="col-sm-5">
								<label for="capacitacionCambiada">Capacitación:</label>
							</div>
							<div class="col-sm-7">
								<input type="text" class="form-control" name="capacitacionCambiada" id="capacitacionCambiada" required>
							</div>
							<div class="error"></div>
						</div>
						<br>
						<div class="row">
							<div class="col-sm-5">
								<label for="capacitacionFecha">Fecha de ejecución:</label>
							</div>
							<div class="col-sm-7">
								<input type="date" class="form-control" name="capacitacionFecha" id="capacitacionFecha" required>
							</div>
							<div class="error"></div>
						</div>
						<br>
						<div class="row">
							<div class="col-sm-5">
								<label for="capacitacionModalidad2">Modalidad:</label>
							</div>
							<div class="col-sm-7">
								<select class="form-control" name="capacitacionModalidad2" id="capacitacionModalidad2" required>
									<option value="default" selected disabled>Seleccione la modalidad</option> 
								</select>				
								<div class="error"></div>
							</div>
						</div>
						<br>
						<div class="row">
							<div class="col-sm-5">
								<label for="capacitacionMediador2">Mediador:</label>
							</div>
							<div class="col-sm-7">
								<!-- <select class="form-control" name="capacitacionMediador2" id="capacitacionMediador2" required>
								</select> -->
								<input type="text" class="form-control"  name="capacitacionMediador2" id="capacitacionMediador2" required>
							</div>
							<div class="error"></div>
						</div>
						<br>
						<div class="row">
							<div class="col-sm-5">
								<label for="capacitacionHoras">Cantidad de horas:</label>
							</div>
							<div class="col-sm-7">
								<input type="number" class="form-control" name="capacitacionHoras" id="capacitacionHoras" min="0" required>
							</div>
							<div class="error"></div>
						</div>
						<br>
					</form>
				</div> 

				<div class="modal-footer">  
					<button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button> 
					<button id="btn-actualizar" type="button" class="btn btn-success">Actualizar</button>  
				</div>  
			</div>  
		</div>  
 </div> 

 <div id="agregarModal" class="modal fade">  
	<div class="modal-dialog modal-lg">  
		<div class="modal-content">  
			<div class="modal-header">  
				<h4 class="modal-title">Agregar capacitacion</h4>  
				<button type="button" class="close" data-dismiss="modal">&times;</button>    
			</div>  
			<div class="modal-body" id="employee_detail"> 
				<form name="formCap" id="formCap" action="" method=""> 
					<div class="row">
						<div class="col-sm-5">
							<label for="cod_cap">Código:</label>
						</div>
						<div class="col-sm-7">
							<input type="text" class="form-control" name="cod_cap" id="cod_cap" required>
						</div>
						<div class="error"></div>
					</div>
				<br>
					<div class="row">
						<div class="col-sm-5">
							<label for="capacitacionNueva">Nombre de la capacitacion:</label>
						</div>
						<div class="col-sm-7">
							<input type="text" class="form-control"  name="capacitacionNueva" id="capacitacionNueva" required>
						</div>
						<div class="error"></div>
					</div>													
											
					<!-- <div id="mensajeError" class="alert alert-warning alert-dismissible fade show" style="display: none" role="alert">
							Debe escribir el nombre de la capacitacion

						<button type="button" class="close" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button> 
					</div> -->
					<br>
					<div class="row">
						<div class="col-sm-5">			
							<label for="capacitacionFecha">Fecha de ejecución:</label>
						</div>
						<div class="col-sm-7">		
							<input type="date" class="form-control"  name="capacitacionFecha" id="capacitacionFecha" required><br>
						</div>
						<div class="error"></div>
					</div>	
					<br>
					<div class="row">
						<div class="col-sm-5">			
							<label for="capacitacionModalidad">Modalidad:</label>
					</div>
						<div class="col-sm-7">
							<select name="capacitacionModalidad" class="form-control"  id="capacitacionModalidad" required>
									<option value="default" selected disabled>Seleccione la modalidad</option> 
							</select>
						</div>
						<div class="error"></div>
					</div>			
					<br>
					<div class="row">
						<div class="col-sm-5">			
							<label for="capacitacionMediador">Mediador(es):</label>
						</div>
						<div class="col-sm-7">
							<input type="text" class="form-control"  name="capacitacionMediador" id="capacitacionMediador" placeholder="Separe los nombres con ; (punto y coma)" required>
						</div>
						<div class="error"></div>
						<!-- <div class="col-sm-7">			
							<select name="capacitacionMediador" id="capacitacionMediador" required>
								<option selected="true" disabled="disabled">Seleccione el mediador</option> 
							</select>
						</div> -->
					</div>	
					<br>
					<div class="row">
						<div class="col-sm-5">			
							<label for="capacitacionHoras">Cantidad de horas:</label>
						</div>
						<div class="col-sm-7">			
							<input type="number" class="form-control"  name="capacitacionHoras" id="capacitacionHoras" required>
						</div>
						<div class="error"></div>
					</div>												 

				</form>
				</div>  
				<div class="modal-footer">  
					<button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button> 
					<button id="btn-agregar" type="button" class="btn btn-success">Agregar</button>  
				</div>  
			</div>  
		</div>  
 	</div> 

 	<div id="participantesModal" class="modal fade">  
		<div class="modal-dialog">  
			<div class="modal-content">  
				<div class="modal-header">  
					<h4 class="modal-title">Participantes</h4>  
					<button type="button" class="close" data-dismiss="modal">&times;</button>  
				</div>  
				<div class="modal-body" id="employee_detail"> 
					<div id="visorParticipantes"></div>
				</div>  
				<div class="modal-footer">  
					<button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button> 
				</div>  
			</div>  
		</div>  
	</div> 

 	<div id="participantesAgregarModal" class="modal fade">  
		<div class="modal-dialog">  
			<div class="modal-content">  
				<div class="modal-header">  
					<h4 class="modal-title">Participantes</h4>  
					<button type="button" class="close" data-dismiss="modal">&times;</button>  
				</div>  
				<div id="formParticipante" class="modal-body" id="employee_detail"> 
					<form id="form-participantes" action="" method="">
						<div class="row">
							<div class="col-sm-5">			
							<label for="cedulaParticipante">Cédula del participante:</label>
						</div>
							<div class="col-sm-7">
							<input type="text" class="form-control" name="cedulaParticipante" id="cedulaParticipante" placeholder="Formato de nueve dígitos, no guiones" required>
							</div>
							<div class="error"></div>
						</div>			
						<br>
						<div class="row">
							<div class="col-sm-5">			
								<label for="capacitacionModalidad">Centro Educativo:</label>
						</div>
							<div class="col-sm-7">
								<input type="text" class="form-control" name="ceParticipante" id="ceParticipante" required>
							</div>
							<div class="error"></div>
						</div>			
						<br>
					</form>
				</div>  
				<div class="modal-footer">  
					<button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button> 
					<button id="btn-agregarParticipante" type="button" class="btn btn-success">Agregar</button>  
				</div>  
			</div>  
		</div>  
 	</div> 

 	<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="mi-modal">
  	<div class="modal-dialog modal-sm">
    	<div class="modal-content">
      	<div class="modal-header">
					<h4 class="modal-title" id="myModalLabel">Confirmar</h4>
        	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      	</div>
	      <div class="modal-body" id="">
					<span id="elimina-a"></span>
				</div>
      	<div class="modal-footer">
        	<button type="button" class="btn btn-danger" id="modal-btn-si">Si</button>
        	<button type="button" class="btn btn-primary" id="modal-btn-no" data-dismiss="modal">No</button>
      	</div>
    	</div>
  	</div>
	</div>
  <br>
  
<?php
//Solamente se permite a los perfiles administradores agregar capacitaciones
		if ($_SESSION["tipo_usuario"] == "1" || $_SESSION["tipo_usuario"] == "8"  || $_SESSION["tipo_usuario"] == "9"  ) {
			echo '<h3 id="agregarCapacitacion"><i class="fa fa-plus-square" style="font-size:24px"></i> Agregar capacitacion</h3>';
		}
?>
  
  
  
  <div id="visor">
	</div>

</div>

<div class="modal animated" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>      

</body>
</html>