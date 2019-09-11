<?php
session_start();
if(!isset($_SESSION["usuario"])){ //Si no ha iniciado sesi贸n redirecciona a index.php
      header("Location: ../../index.php");
  }
  //  elseif ($_SESSION['tipo'] !== 1) {  //debe ser tipo administrador
  //        header("Location: ../../index.php");
  //      }
?>
<!DOCTYPE html>
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=gb18030">
    
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
    
    <script src="../../js/modalidades.js"></script>
    <script src="../../vendor/moment-with-locales.min.js"></script>
    <script  src="../../js/acercade.js"></script>

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.5.6/css/buttons.dataTables.min.css">
    <link rel="stylesheet" href="../../css/main.css">
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
          <div class="p-2 align-self-center"><span class="tit-header-opt">Modalidades</span></div>
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

    <div id="agregarModal" class="modal fade">  
      <div class="modal-dialog">  
           <div class="modal-content">  
                <div class="modal-header">  
                     <button type="button" class="close" data-dismiss="modal">&times;</button>  
                     <h4 class="modal-title">Agregar modalidad</h4>  
                </div>  
                <div class="modal-body" id="employee_detail">  
                    <label for="nombre">Nombre de la modalidad:</label>
                    <input type="text" name="modalidadNueva" id="modalidadNueva" required>
                    <div id="mensajeError" class="alert alert-warning alert-dismissible fade show" style="display: none" role="alert">
                      Debe escribir el nombre de la modalidad
                      <button type="button" class="close"  aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <br>
                </div>  
                <div class="modal-footer">  
                <button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button> 
                <button id="btn-agregar" type="button" class="btn btn-success">Agregar</button>  
                </div>  
           </div>  
      </div>  
 </div> 

    <div id="dataModal" class="modal fade">  
      <div class="modal-dialog">  
           <div class="modal-content">  
                <div class="modal-header">  
                     <button type="button" class="close" data-dismiss="modal">&times;</button>  
                     <h4 class="modal-title">Modalidad</h4>  
                </div>  
                <div class="modal-body" id="employee_detail">  
                    <label for="nombre">Modalidad:</label>
                    <input type="text" name="modalidad_educativa" id="modalidad_educativa">
                    <br>
                </div>  
                <div class="modal-footer">  
                <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button> 
                <button id="btn-actualizar" type="button" class="btn btn-success">Actualizar</button>  
                </div>  
           </div>  
      </div>  
 </div> 

 <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="mi-modal">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Confirmar</h4>
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
                if ($_SESSION["tipo_usuario"]  != "6"  ) {
                    echo "<h3 id='agregarModalidad'><i class='fa fa-plus-square' style='font-size:24px'></i> Agregar modalidad</h3>";
                }
            ?>
            <div id="visor">

            </div>

    </div>
    
<div class="modal animated" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>    
</body>
</html>