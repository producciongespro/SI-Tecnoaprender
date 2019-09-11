<?php
// MENU PRINCIPAL

 session_start();
 if(!isset($_SESSION["usuario"])){ //Si no ha iniciado sesión redirecciona a index.php
  header("Location: ../../index.php");
  }
  // $arreglo = [1,8];

  // if (!in_array($_SESSION['tipo_usuario'], $arreglo)) {
  //   header("Location: ../../index.php");
// }

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Reportes - Director</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    

    <script>        
        var idCE = <?php echo $_SESSION['id_CE'];?>;
        console.log("id CE", idCE);
    </script>


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
  <script src="../../vendor/alertify/alertify.min.js"></script>
  <script src="../../vendor/moment-with-locales.min.js"></script> 
  <script src="../../js/logo_tecnoaprender.js"></script>
  <script src="../../js/validar_asesorias_director.js"></script>
  <script  src="../../js/acercade.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js"></script>
  <link rel="stylesheet" href="../../vendor/alertify/css/alertify.min.css">
<link rel="stylesheet" href="../../vendor/alertify/css/themes/default.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.5.6/css/buttons.dataTables.min.css">
    <link rel="stylesheet" href="../../vendor/animate/animate.css">
    <link rel="stylesheet" href="../../css/main.css">
    <link rel="stylesheet" type="text/css" media="screen" href="../../css/style_forms.css">
    
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
<!-- <div class="row" style="background-color: #e45032b5; color: beige; padding-bottom: 14px;padding-left: 4px">
    <div  class="col-1">
        <a  href="../admin"><i style="margin-top: 14px;float: right" class="fa-home-color fas fa-home fa-lg"></i></a>
    </div>  
    <div  class="col-11">
        <h1 style="padding-left: -3px">Tecnoaprender - Director - Asesorías </h1>
    </div> 
    </div> -->
    <div class="row" id="encForm">
      <div class="col-sm-12">
        <div class="">
          <div class="d-flex flex-row">
            <div class="p-2 border-logo"><img class ="logo" src="../../images/logo-tecnoaprender.png" alt="logo tecnoaprender"></div>
            <div class="p-2 align-self-center"><span class="tit-header-opt">Director - asesorías</span></div>
            <div id="divInfo" class="p-2 ml-auto logout"></div>
          </div>
          <div class="d-flex justify-content-end">
            <div id="divUsuario" class="p-2 logout"></div>
            <div id="divSalir" class="p-2 logout"></div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <div class="container">
    <div id="asesoriasModal" class="modal fade">  
      <div class="modal-dialog modal-lg">  
           <div class="modal-content">  
                <div class="modal-header">  
                <h5 class="modal-title">Detalles de asesoría</h5>  
                     <button type="button" class="close" data-dismiss="modal">&times;</button>  
                     
                </div>  
                <div class="modal-body" id="employee_detail"> 
                        <div id="visorAsesorias"></div>
                </div>  
                <div id="editor"></div>
                <div class="modal-footer">  
                <button type="button" id="btn-exportar" class="btn btn-success">Exportar a PDF</button> 
                <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button> 
                
                </div>  
           </div>  
      </div>  
 </div> 

            <div id="visor">

            </div>

    </div>


    <div id="mdlValidar" class="modal fade">  
      <div class="modal-dialog modal-lg">  
           <div class="modal-content">  
                <div class="modal-header">  
                <h5 class="modal-title">Validar informe</h5>                       
                     
                </div>  
                <div class="modal-body" > 
                    <div class="row">
                        <div class="col-12">
                            <span class="badge badge-secondary p-2">Modo de validación</span>
                                <select id ="formEstado_asesoria"  class="form-control custom-select form-1" required>                            
                                        <option value="default" selected="true" disabled="disabled">Seleccione una opoción...</option>
                                        <option value="conforme">Validado conforme</option>
                                        <option value="disconforme">Validado disconforme</option>                          
                                </select>
                        </div>
                    </div>
                    <br>
                
              <div class="row">
                <div class="col-12">
                    <div class="form-group">
                        <span class="badge badge-secondary p-2">Observaciones sobre el informe</span>
                        <textarea class="form-control" id="txtObservaciones_director"  rows="3" ></textarea>
                    </div> 
                </div>
              </div>
              <br>
              <div class="row">
                  <div class="col-12" id="visorAlerta">
                  
                  </div>
              </div>

                </div>  
               
                <div class="modal-footer">                  
                
                    <button type="button" class="btn btn-outline-success" id="btnEnviarValidacion" alt="Enviar" target=""  >Enviar validación</button>
                    <button type="button" class="btn btn-outline-danger" data-dismiss="modal">Cancelar</button>
                
                </div>  
           </div>  
      </div>  
 </div> 


    <div class="div-shadow invisible">
        <img class="img-ajax-loading" src="../../images/ajax-loader.gif" alt="Loading">
    </div>
    <div class="modal animated" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>      
</body>
</html>