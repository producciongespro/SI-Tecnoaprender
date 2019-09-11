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

    <script src="../../js/reportes.js"></script>
    <script  src="../../js/acercade.js"></script>
    
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.5.6/css/buttons.dataTables.min.css">

    <link rel="stylesheet" href="../../vendor/animate/animate.css">
    <link rel="stylesheet" type="text/css" media="screen" href="../../css/style_forms.css">



    <style>
        tfoot input {
        width: 100%;
        padding: 3px;
        box-sizing: border-box;
    }
    </style>


</head>
<body>
<div class="row" id="encForm">
      <div class="col-sm-12">
        <div class="">
          <div class="d-flex flex-row">
            <div class="p-2 border-logo"><img class ="logo" src="../../images/logo-tecnoaprender.png" alt="logo tecnoaprender"></div>
            <div class="p-2 align-self-center"><span class="tit-header-opt">Reporte general</span></div>
            <div id="divInfo" class="p-2 ml-auto logout"></div>
            <!-- <div class="p-2 ml-auto logout"><a id="btnInicio" href="index.php"><i class= "fas fa-home"></i> Inicio</a></div> -->
          </div>
          <div class="d-flex justify-content-end">
            <div id="divUsuario" class="p-2 logout"></div>
            <div id="divSalir" class="p-2 logout"></div>
          </div>
        </div>
      </div>
</div> 
    <div class="">

    <form id="criterios">

    <table class="table table-bordered">
<tbody>
<tr>
<th>Aspectos generales</th>
<th>Proyectos, iniciativas</th>
<th>Población</th>
<th>Conectividad</th>
<th>Infraestructura</th>
<th>Otros aspectos</th>
</tr>
<tr>
    <td>
        <input type="checkbox" name="columnas" value="institucion"> Institución<br>
        <input type="checkbox" name="columnas" value="cod_pres"> Código presupuestario<br>
        <input type="checkbox" name="columnas" value="provincia"> Provincia <br>
        <input type="checkbox" name="columnas" value="canton"> Cantón<br>
        <input type="checkbox" name="columnas" value="direccion_regional"> Dirección Regional <br>
        <input type="checkbox" name="columnas" value="modalidad"> Modalidad
    </td>
    <td>
        <input type="checkbox" name="columnas" value="nombre"> Proyectos<br>
    </td>
    <td>
        <input type="checkbox" name="columnas" value="matricula_m"> Matrícula mujeres<br>
        <input type="checkbox" name="columnas" value="matricula_h"> Matrícula hombres<br>
        <input type="checkbox" name="columnas" value="cantidad_docentes"> Cantidad docentes<br>
        <input type="checkbox" name="columnas" value="cantidad_grupos"> Cantidad de grupos<br>
    </td>
    <td> 
        <input type="checkbox" name="columnas" value="valor"> Conexión a Internet<br>
        <input type="checkbox" name="columnas" value="estado"> Estado de conexión<br>
    </td>
    <td> 
    <input type="checkbox" name="columnas" value="seguridad" disabled> Seguridad general<br>
    </td>
    <td> 
    <input type="checkbox" name="columnas" value="correo"> E-mail<br>
    <input type="checkbox" name="columnas" value="telefono"> Teléfono<br>
    </td>
    
</tr>

</tbody>

</table>    
<div id="contenedorBoton">
    <input type="button" class="btn btn-info" onclick="crearArreglo()" value="Generar informe"> <br> <br>  
</div>
       
</form>
    </div>

 
    <div id="resultado">
    <div id="alerta" style="visibility:hidden" class="alert alert-danger alert-dismissible fade show">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <strong>Atención: </strong> Debe seleccionar al menos un elemento para generar un informe.
  </div>
    </div>

    
<div class="modal animated" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>    
</body>
</html>