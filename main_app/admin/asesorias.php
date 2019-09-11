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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

<link rel="stylesheet" href="../../vendor/bootstrap-4.1.3/css/bootstrap.min.css">

<link rel='stylesheet' href='../../lib/fontawesome/css/all.css'>
<link rel="stylesheet" href="https://jqueryvalidation.org/files/demo/site-demos.css">
<link rel="stylesheet" href="../../vendor/alertify/css/alertify.min.css">
<link rel="stylesheet" href="../../vendor/alertify/css/themes/default.css">

<link rel="stylesheet" href="../../css/style_forms.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css">

<!-- <link rel="stylesheet" href="../../css/main.css"> -->
<link rel="stylesheet" href="../../css/style_forms.css">

<link rel="stylesheet" href="../../vendor/animate/animate.css">

<script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.js" charset="utf-8"></script>

<script src="../../vendor/jquery-3.4.1/jquery.min.js"></script>

<script src="../../vendor/bootstrap-4.1.3/js/bootstrap.min.js" charset="utf-8"></script>
<script src="../../vendor/dist/jquery.validate.js"></script>
<script src="../../vendor/dist/additional-methods.min.js"></script>
<script src="../../vendor/alertify/alertify.min.js"></script>
<script src="../../vendor/moment-with-locales.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.js"></script>

<script src="../../js/asesorias.js" charset="utf-8"></script>
<script  src="../../js/acercade.js"></script>



  <title>Asesoria</title>
</head>
  <body>

  <div class="row" id="encForm">
      <div class="col-sm-12">
        <div class="">
          <div class="d-flex flex-row">
            <div class="p-2 border-logo"><img class ="logo" src="../../images/logo-tecnoaprender.png" alt="logo tecnoaprender"></div>
            <div class="p-2 align-self-center"><span class="tit-header-opt">Agregar asesorías</span></div>
            <!-- <div class="p-2 ml-auto logout"><a id="btnInicio" href="index.php"><i class= "fas fa-home"></i> Inicio</a></div> -->
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
    <div class="row">
      <div class="col-12">
          <span class="badge badge-secondary p-2">Datos básicos de la visita</span>        
      </div>
    </div>
    <form  id="form_asesoria" name="form_asesoria" >
      <div class="row">        
        <div class="col-sm-6 form-group">
          <div class="input-group input-group-sm">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Centro Educativo</span>
                        </div>
                        <input id="form_idCE" name="form_idCE" type="text" class="form-control form-1" aria-label="Default" required placeholder="Escriba el nombre o cód presupuestario" >
                      </div>
                      <div class="error"></div>
                  </div>

                  <div class=" col-sm-6 form-group">
                      <div class="input-group input-group-sm">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Correo del asesor</span>
                        </div>
                        <input id="form_correoAsesor" name="form_correoAsesor" type="text" class="form-control form-1" aria-label="Default" readonly >
                        
                      </div>
                      <div class="error"></div>
                  </div>
                </div>

              <div class="row">
                <div class="col-sm-6 form-group">
                <div class="input-group input-group-sm">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Tipo de gestión</span>
                  </div>
                  <select id ="form_medio" name="form_medio" class="form-control custom-select form-1" required>
                      <!-- <option value="default" selected>Seleccione...</option> -->
                    <option value="default" selected="true" disabled="disabled">Seleccione...</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Correo">Correo</option>
                    <option value="Llamada">Llamada</option>
                    <option value="WhatsApp">WhatsApp</option>
                  </select>
                </div>
                  <div class="error"></div>
                </div>           

                <div class=" col-sm-4 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Fecha de gestión</span>
                      </div>
                      <input id= "form_fecha" name= "form_fecha" type="date" class="form-control form-1" required placeholder="nombre.apellido.apellido@mep.go.cr">
                    </div>
                    <div class="error"></div>
                </div>
              </div>

              <div class="row">
                    <div class="col-sm-6 form-group">
                      <div class="input-group input-group-sm">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Tipo de atención</span>
                        </div>
                        <select id ="form_atencion" name="form_atencion" class="form-control custom-select form-1" required>
                            <!-- <option value="default" selected>Seleccione...</option> -->
                          <option value="default" selected="true" disabled="disabled">Seleccione...</option>
                          <option value="Pedagógica">Pedagógica</option>
                          <option value="Administrativa">Administrativa</option>
                          <option value="Técnica">Técnica</option>                          
                        </select>
                      </div>
                        <div class="error"></div>
                      </div>  
              </div>

              <div class="row">

              </div>
              
              <!--Objetivos -->
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <span class="badge badge-secondary p-2">Objetivos</span>
                    <textarea class="form-control" id="form_objetivos" name="form_objetivos" rows="3" required></textarea>
                  </div>
                  <div class="error"></div>    
                </div>
              </div>
              
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <span class="badge badge-secondary p-2">Observaciones</span>
                    <textarea class="form-control" id="form_observaciones" name="form_observaciones" rows="3" required></textarea>
                  </div>
                  <div class="error"></div>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <span class="badge badge-secondary p-2">Recomendaciones</span>
                    <textarea class="form-control" id="form_recomendaciones" name="form_recomendaciones" rows="3" required></textarea>
                  </div>
                  <div class="error"></div>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <span class="badge badge-secondary p-2">Recomendaciones de los participantes por DR</span>
                    <textarea class="form-control" id="form_recomendacionesDR" name="form_recomendacionesDR" rows="3"></textarea>
                  </div>                  
                </div>
              </div>

              <div class="row">
                  
                 <div class="container">
                    <span class="badge badge-secondary p-2">Archivo a adjuntar</span>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="lblInputFile">Archivo</span>
                        </div>
                        <div class="custom-file">
                          <input type="file" class="custom-file-input" id="form_url_file" aria-describedby="lblInputFile" name="form_url_file"  >
                          <label class="custom-file-label" id="lblFile" for="form_url_file">Clic para ajuntar archivo (No debe sobrepasar los 2 MB) </label>
                        </div>
                      </div>
                 </div>
              </div>


                <div class="row">
                    <button id="btn_asesorias" name ="form-1" type="submit" class="btn btn-enviar form-1" alt = "Guardar" title="Guardar"><i class='fas fa-save' style='font-size:30px'></i></button>
              </div>
    </form>
  </div>

  <div class="div-shadow invisible">
    <img class="img-ajax-loading" src="../../images/ajax-loader.gif" alt="Loading">
  </div>
  <div class="modal animated" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>      

  </body>
</html>
