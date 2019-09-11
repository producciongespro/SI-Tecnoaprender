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
<html lang="es">
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
     <script src="../../vendor/moment-with-locales.min.js"></script> 

     <script src="../../js/reporte_ce.js"></script>
     <script  src="../../js/acercade.js"></script>

     <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.5.6/css/buttons.dataTables.min.css">
    <link rel="stylesheet" href="../../vendor/animate/animate.css">
    <link rel="stylesheet" href="../../css/main.css">
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
            <div class="p-2 align-self-center"><span class="tit-header-opt">Reporte de centros educativos</span></div>
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
    <div class="container container-custom">
    <div id="ceModal" class="modal fade">  
      <div class="modal-dialog modal-lg">  
           <div class="modal-content">  
                <div class="modal-header">  
                <h5 class="modal-title">Información adicional</h5>  
                     <button type="button" class="close" data-dismiss="modal">&times;</button>  
                     
                </div>  
                <div class="modal-body" id="employee_detail"> 
                
                    <span>Centro educativo:</span> <span id="nombre"></span>
                    <a href="" id="verCentro">| Ver más...</a>  <br>
                        <span>Matrícula:</span> <span id="matricula"></span><br>
                        <span>Proyectos:</span> <span id="proyectos"></span><br>
                        <span>Cuenta con internet:</span> <span id="internet"></span><br>
                        <span>Profesor enlace:</span> <span id="enlace"></span><br>
                        <span>Asesor a cargo:</span> <span id="asesor"><br>
                        <div id="visorAsesorias"></div>
                        
                </div>  
                <div id="editor"></div>
                <div class="modal-footer">  
                 
                <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button> 
                
                </div>  
           </div>  
      </div>  
 </div> 

 <div id="mapaModal" class="modal fade">  
      <div class="modal-dialog modal-lg">  
           <div class="modal-content">  
                <div class="modal-header">  
                <h5 class="modal-title">Ubicación aproximada</h5>  
                     <button type="button" class="close" data-dismiss="modal">&times;</button>  
                     
                </div>  
                <div class="modal-body" id="employee_detail"> 
                    <span>Coordenada X:</span> <span id="coorX"></span> <br>
                    <span>Coordenada Y:</span> <span id="coorY"></span><br>
                     <div id="visorMapa"></div>
                </div>  
                <div class="modal-footer">  
                 
                <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button> 
                
                </div>  
           </div>  
      </div>  
 </div> 

            <div id="visor">

            </div>

    </div>


    <div class="div-shadow invisible">
        <img class="img-ajax-loading" src="../../images/ajax-loader.gif" alt="Loading">
    </div>

    <div class="modal animated" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>      

</body>
</html>