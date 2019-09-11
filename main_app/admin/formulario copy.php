<?php
// if (isset($_GET['nombre'])){
//   $nombre= $_GET['nombre'];
//   $codigo= $_GET['codigo'];
//   $id= $_GET['id'];
// }

  session_start();
  if(!isset($_SESSION["usuario"])){ //Si no ha iniciado sesión redirecciona a index.php
  header("Location: ../../index.php");
  }
  if (isset($_GET['nombre'])) {
   $nombre=$_GET['nombre'];
   $codigo=$_GET['codigo'];
   $id=$_GET['id'];
  }
  // $arreglo = [1,8];

  // if (!in_array($_SESSION['tipo_usuario'], $arreglo)) {
  //   header("Location: ../../index.php");
  // }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css"> -->


  <!-- <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script> -->

<link rel="stylesheet" href="../../vendor/bootstrap-4.1.3/css/bootstrap.min.css">

<link rel='stylesheet' href='../../lib/fontawesome/css/all.css'>
<link rel="stylesheet" href="https://jqueryvalidation.org/files/demo/site-demos.css">
<link rel="stylesheet" href="../../vendor/alertify/css/alertify.min.css">
<link rel="stylesheet" href="../../vendor/alertify/css/themes/default.css">

<script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.js" charset="utf-8"></script>

<script src="../../vendor/jquery-3.4.1/jquery.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="../../vendor/bootstrap-4.1.3/js/bootstrap.min.js" charset="utf-8"></script>
<script src="../../vendor/dist/jquery.validate.js"></script>
<script src="../../vendor/dist/additional-methods.min.js"></script>
<script src="../../vendor/alertify/alertify.min.js"></script>

<link rel="stylesheet" href="../../vendor/animate/animate.css">

<!-- customizer -->
<link rel="stylesheet" href="../../css/style_forms.css">
<script src="../../js/formulario_ce.js"></script>
<script  src="../../js/acercade.js"></script>
<script src="../../js/aprovechamiento_tecnologico.js"></script>

  <title>Formulario Centros Educativos</title>
</head>
  <body>
    <div class="row" id="encForm">
      <div class="col-sm-12">
        <div class="">
          <div class="d-flex flex-row">
            <div class="p-2 border-logo"><img class ="logo" src="../../images/logo-tecnoaprender.png" alt="logo tecnoaprender"></div>
            <div class="p-2 align-self-center"><span class="tit-header-opt">Centros educativos</span></div>
            <div id="divInfo" class="p-2 ml-auto logout"></div>
          </div>
          <div class="d-flex justify-content-end">
            <div id="divUsuario" class="p-2 logout"></div>
            <div id="divSalir" class="p-2 logout"></div>
          </div>
        </div>
      </div>
    </div>
        <div id="agregarInstitucion" class="text-right invisible" >
          <br>
          <h5><i class="fa fa-plus-square" style="font-size:24px"></i> Agregar centro educativo</h5>
          <hr>
        </div>
        <br>
        <div class="row row-search">
          <div id="#headAcion" class="col-sm-12"></div>

          <div class="col-sm-6">
              <input id="miConsulta" class="form-control m-1 " type="text" name="miConsulta" placeholder="Digite el código a buscar" aria-label="Default" required>
          </div>
          <div class="col-sm-3">
            <button id="btnSend" type="submit" class="btn btn-info m-1" alt = "Buscar" title="Buscar">Buscar <i class='fas fa-search'></i></button>
          </div>
          <div class="col-sm-3">
            <input id="btn-actualizar" type="button" class="btn btn-info m-1" value="Actualizar">
          </div>
        </div>

       <!-- Button trigger modal -->


      <!-- Modal -->
      <div class="modal fade" id="mdlAgregarCE" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel">Agregar Centro Educativo</h5>
              <button type="button" id= "cerrarModal" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form id="form-modal" name="form-modal">
                <div class="form-group">
                  <label for="txtCentroEducativo">Digite el código o el nombre del Centro Educativo: </label>
                  <input type="text" class="form-control" id="txtCentroEducativo" aria-describedby="emailHelp" placeholder="Código o nombre del centro educativo">
                </div>
              </form>
              <div id="mensaje"></div>
            </div>
            <div class="modal-footer">
              <button type="button" id="cancelarModal" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-primary"  id="btnObtenerCE"  >Aceptar</button>
            </div>
          </div>
        </div>
         </div>
      <!-- fin del modal de Agregar -->

      <div id="titulo"></div>
      <div id="accordion">

          <!-- collapseOne Información General -->
        <div class="card">
          <div class="card-header card-header-form" id="#info-general">
            <h5 class="mb-0">
                <button class="btn btn-link-form text-uppercase" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Información general <i class="fa fa-plus"></i>
                </button>
            </h5>
          </div>
          <div id="collapseOne" class="collapse show" aria-labelledby="#info-general" data-parent="#accordion">

            <div id="div-form-info-general" class="card-body card-body-form">

              <form  id="form-1" class="" novalidate>
                <div class="row">
                  <div class="col-sm-12 form-group">
                      <div class="input-group input-group-sm">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Código presupuestario</span>
                        </div>
                        <input id="form_cod_pres" name="form_cod_pres" type="text" class="form-control form-1" aria-label="Default" required>
                      </div>
                      <div class="error"></div>
                  </div>
                </div>

                <div class="row">
                  <div class=" col-sm-12 form-group">
                      <div class="input-group input-group-sm">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Institución</span>
                        </div>
                        <input id= "form_institucion" name= "form_institucion" type="text" class="form-control form-1" required>
                      </div>
                      <div class="error"></div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-12 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Dirección Regional de Educación</span>
                      </div>
                      <select id ="form_direccion_regional" class="form-control custom-select form-1" name="form_direccion_regional" required>
											</select>
                      <!-- <input id="form_direccion_regional" name="form_direccion_regional" type="text" class="form-control form-1" aria-label="Default" required> -->
                    </div>
                    <div class="error"></div>
                  </div>
                </div>

                <div class="row">

                  <div class="col-sm-6 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Circuito</span>
                      </div>
                      <input id= "form_circuito" name= "form_circuito"  type="text" class="form-control form-1" required>
                    </div>
                    <div class="error"></div>
                  </div>

                  <div class="col-sm-6 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Provincia</span>
                      </div>
                      <select id ="form_provincia" class="form-control custom-select form-1" name="form_provincia" required>
											</select>
                      <!-- <input id="form_provincia"  name="form_provincia" type="text" class="form-control form-1" aria-label="Default" required>
                      <div class="invalid-feedback">Requerido</div> -->
                    </div>
                    <div class="error"></div>
                  </div>

                </div>

                <div class="row">

                  <div class="col-sm-6 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Cantón</span>
                      </div>
                      <select id ="form_canton" class="form-control custom-select form-1" name="form_canton" required>
													<option value="default" selected>--- Seleccione una opción ---</option>
											</select>
                      <!-- <input id= "form_canton"  name= "form_canton" type="text" class="form-control form-1" required> -->
                    </div>
                    <div class="error"></div>
                  </div>

                  <div class="col-sm-6 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Distrito</span>
                      </div>
                      <!-- <input id= "form_distrito" name= "form_distrito" type="text" class="form-control form-1" required> -->
                      <select id ="form_distrito" class="form-control custom-select form-1" name="form_distrito" required>
													<option value="default" selected>--- Seleccione una opción ---</option>
											</select>
                    </div>
                    <div class="error"></div>
                  </div>

                </div>

                <div class="row">

                <div class="col-sm-6 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Poblado</span>
                      </div>
                      <input id="form_poblado" name="form_poblado" type="text" class="form-control form-1" aria-label="Default" required>
                    </div>
                  </div>

                  <div class="col-sm-6 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Modalidad Educativa</span>
                      </div>
                      <select id ="form_id_modalidad_educativa" class="form-control custom-select form-1" name="form_id_modalidad_educativa" required>
                      </select>
                    </div>
                    <div class="error"></div>
                  </div>

                </div>

                <div class="row">

                  <div class="col-sm-6 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Coordenada X</span>
                      </div>
                      <input id= "form_coordenada_x" name = "form_coordenada_x" type="text" class="form-control form-1" required>
                    </div>
                    <div class="error"></div>
                  </div>

                  <div class="col-sm-6 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Coordenada Y</span>
                      </div>
                      <input id= "form_coordenada_y" name= "form_coordenada_y" type="text" class="form-control form-1" required>
                    </div>
                    <div class="error"></div>
                  </div>

                </div>

                <div class="row">

                  <div class="col-sm-6 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Teléfonos</span>
                      </div>
                      <input id="form_telefono" name="form_telefono" type="text" class="form-control form-1" aria-label="Default" required>
                    </div>
                    <div class="error"></div>
                  </div>

                  <div class="col-sm-6 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Fax</span>
                      </div>
                      <input id= "form_fax" name= "form_fax" type="text" class="form-control form-1" required>
                    </div>
                    <div class="error"></div>
                  </div>

                </div>

                <div class="row">

                  <div class="col-sm-12 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Correo</span>
                      </div>
                      <input class= "form-control form-control-sm form-1"  id="form_correo" name="form_correo" type="text" placeholder="escuela.nombreinstitucion@mep.go.cr" pattern ="((?:[a-z][a-z1-9]+))(\.)((?:[a-z][a-z1-9]+))(@)(mep\.go\.cr)" required/>
                    </div>
                    <div class="error"></div>
                  </div>

                </div>

                <div class="row">

                  <div class="col-sm-6">
                    <div class="input-group input-group-sm">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Centro indígena</span>
                        </div>
                        <select id ="form_centro_indigena" class="form-control custom-select form-1" name="form_centro_indigena" required>
                          <option value="" disabled selected>Seleccione...</option>
                          <option value="1">Si</option>
                          <option value="0">No</option>
                      </select>
                    </div>
                    <div class="error"></div>
                  </div>

                  <div class="col-sm-6">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Bachillerato Internacional</span>
                      </div>
                        <select id ="form_bachillerato_internacional" class="form-control custom-select form-1" name="form_bachillerato_internacional" required>
                            <option value="" disabled selected >Seleccione...</option>
                            <option value="1">Si</option>
                            <option value="0">No</option>
                        </select>
                    </div>
                    <div class="error"></div>
                  </div>

                </div>
                <hr>

                <div class="row">

                  <div class="col-sm-6">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Edificio compartido</span>
                      </div>
                        <select id ="form_edificio_compartido" class="form-control custom-select form-1" name="form_edificio_compartido" required>
                            <option value="" disabled selected>Seleccione...</option>
                            <option value="1">Si</option>
                            <option value="0">No</option>
                        </select>
                    </div>
                    <div class="error"></div>
                  </div>

                  <div class="col-sm-6 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Estado de conexión</span>
                      </div>
                        <select id ="form_estado_conexion" class="form-control custom-select form-1" name="form_estado_conexion" required>
                          <option value="0" disabled selected>Seleccione...</option>
                          <option value="1">Excelente</option>
                          <option value="2">Muy buena</option>
                          <option value="3">Buena</option>
                          <option value="4">Regular</option>
                          <option value="5">Deficiente</option>
                          <option value="6">No aplica</option>
                        </select>
                      </div>
                      <div class="error"></div>
                  </div>

                </div>
                <hr>

                <div class="row">

                  <div class="col-sm-6">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Internet</span>
                      </div>
                      <select id ="form_internet" class="form-control custom-select form-1" name="form_internet" required>
                        <option value="" disabled selected>Seleccione...</option>
                        <option value="1">Si</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div class="error"></div>
                  </div>

                  <div class="col-sm-6 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Velocidad</span>
                      </div>
                      <input id= "form_velocidad"  name= "form_velocidad" type="text" class="form-control form-1" required>
                    </div>
                    <div class="error"></div>
                  </div>

                </div>
                <hr>
                <div class="row">

                  <div class="col-sm-6 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Matrícula hombres</span>
                      </div>
                      <input id="form_matricula_h" name="form_matricula_h" type="number" class="form-control form-1" aria-label="Default" min="0" required>
                    </div>
                    <div class="error"></div>
                  </div>

                  <div class="col-sm-6 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Matricula de mujeres</span>
                      </div>
                      <input id= "form_matricula_m" name= "form_matricula_m" type="number" class="form-control form-1" min="0" required>
                    </div>
                    <div class="error"></div>
                  </div>

                </div>

                <div class="row">

                  <div class="col-sm-6 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Cantidad de grupos</span>
                      </div>
                      <input id= "form_cantidad_grupos" name= "form_cantidad_grupos" type="number" class="form-control form-1" min="0" required>
                    </div>
                    <div class="error"></div>
                  </div>

                  <div class="col-sm-6 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Cantidad de docentes</span>
                      </div>
                      <input id="form_cantidad_docentes" name="form_cantidad_docentes" type="number" class="form-control form-1" aria-label="Default"  min="0" required>
                    </div>
                    <div class="error"></div>
                  </div>

                </div>

                <div class="row">

                  <div class="col-sm-6 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Total de pabellones</span>
                      </div>
                      <input id= "form_total_pabellones" name= "form_total_pabellones" type="number"  min="0" class="form-control form-1" required>
                    </div>
                    <div class="error"></div>
                  </div>

                  <div class="col-sm-6 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Total de aulas</span>
                      </div> 
                      <input id= "form_total_aulas" name= "form_total_aulas" type="number" class="form-control form-1"  min="0" required>
                    </div>
                    <div class="error"></div>
                  </div>

                </div>

                <div class="row">
                  <div class="col-sm-12">
                    <span class="badge badge-secondary p-2">Equipamiento</span>
                  </div>
                </div>
                <hr>
                <div class="row mx-4">

                  <div class="col-sm-3" >
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input form-1 chk-equipamiento" id="chkfonatel" name="chkfonatel">
                      <label class="custom-control-label" for="chkfonatel">MEP-Fonatel</label>
                    </div>
                  </div>

                  <div class="col-sm-3" >
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input form-1 chk-equipamiento" id="chktransferencia" name="chktransferencia">
                      <label class="custom-control-label" for="chktransferencia">Transferencia</label>
                    </div>
                  </div>

                  <div class="col-sm-3" >
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input form-1 chk-equipamiento" id="chkconectandonos" name="chkconectandonos">
                      <label class="custom-control-label" for="chkconectandonos">Conectándonos</label>
                    </div>
                  </div>

                  <div class="col-sm-3" >
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input form-1 chk-equipamiento" id="chkdonacion" name="chkdonacion">
                      <label class="custom-control-label" for="chkdonacion">Donación</label>
                    </div>
                  </div>

                </div>
                <hr>
               <div class="row">
                  <div class="col-sm-12">
                    <span class="badge badge-secondary p-2">Datos del funcionario Enlace</span>
                  </div>

                </div>
                <hr>

                <div class="row">

                  <div class="col-sm-8 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Nombre </span>
                      </div>
                      <input id= "form_enlace_nombre" name= "form_enlace_nombre" type="text" class="form-control form-1">
                    </div>
                    <div class="error"></div>
                  </div>

                  <div class="col-sm-4 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Cédula</span>
                      </div>
                      <input id= "form_enlace_cedula" name= "form_enlace_cedula" type="text" class="form-control form-1">
                    </div>
                    <div class="error"></div>
                  </div>

                </div>

                <div class="row">

                  <div class="col-sm-6 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Correo </span>
                      </div>
                      <!-- <input id= "form_enlace_correo" name= "form_enlace_correo" type="text" class="form-control form-1" pattern ="((?:[a-z][a-z1-9]+))(\.)((?:[a-z][a-z1-9]+))(\.)((?:[a-z][a-z]+))(@)(mep\.go\.cr)" placeholder="nombre.apellido1.apellido2@mep.go.cr"> -->
                      <input id= "form_enlace_correo" name= "form_enlace_correo" type="text" class="form-control form-1" placeholder="nombre.apellido1.apellido2@mep.go.cr">
                    </div>
                    <div class="error"></div>
                  </div>

                  <div class="col-sm-6 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Teléfono</span>
                      </div>
                      <input id= "form_enlace_telefono" name= "form_enlace_telefono" type="text" class="form-control form-1">
                    </div>
                    <div class="error"></div>
                  </div>

                </div>

                <div class="row">

                  <div class="col-sm-6 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Especialidad</span>
                      </div>
                      <input id= "form_enlace_especialidad" name= "form_enlace_especialidad" type="text" class="form-control form-1">
                    </div>
                    <div class="error"></div>
                  </div>

                  <div class="col-sm-6">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Condición de nombramiento</span>
                      </div>
                      <select id ="form_enlace_condicion" class="form-control custom-select form-1" name="form_enlace_condicion">
                        <option value="ninguno" selected >Seleccione ....</option>
                        <option value="propiedad">Propiedad</option>
                        <option value="interino">Interino</option>
                        <option value="aspirante">Aspirante</option>
                        <option value="no disponible">No disponible</option>
                       </select>
                      <div class="error"></div>
                    </div>
                  </div>

                </div>

                <div class="row">

                  <div class="col-sm-8 form-group">
                    <div class="input-group input-group-sm">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Asesor Enlace</span>
                      </div>
                      <select id ="form_id_asesor_enlace" class="form-control custom-select form-1" name="form_id_asesor_enlace">
                      </select>
                    </div>
                    <div class="error"></div>
                  </div>

                </div>

                <hr>
                <div class="row row-pdf">

                  <div class="col-12 form-1" id="namePDF">
                  </div>
                  <hr>
                </div>

                <div class="row">

                  <div class="col-12">
                    <div class="input-group mb-3">
                       <div class="input-group-prepend">
                          <span class="input-group-text">Archivo PDF</span>
                       </div>
                       <div class="custom-file">
                          <input type="file" class="custom-file-input form-1" id="form_url_inventario" name="form_url_inventario"  accept='application/pdf'  >
                          <label class="custom-file-label" for="form_url_inventario" id="lblInputfile"  >Seleccione un archivo</label>
                       </div>
                    </div>
                    <input id="form_actualizado_por" name="form_actualizado_por" type="hidden">
                  </div>

                </div>
                <hr>
                <div class="row">
                    <button id="btn-informacion-general" name ="form-1" type="submit" class="btn btn-enviar btn-1 form-1" alt = "Guardar" title="Guardar" value=""><i class='fas fa-save' style='font-size:30px'></i></button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- fin del collapseOne Información general -->

        <!-- collapseTwo Datos de tecnoaprender -->
        <div class="card">
          <div class="card-header card-header-form" id="#datos">
            <h5 class="mb-0">
                <button class="btn btn-link-form text-uppercase" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                  Proyectos Tecnoaprender <i class="fa fa-plus"></i>
                </button>
            </h5>
          </div>

          <div id="collapseTwo" class="collapse" aria-labelledby="#datos" data-parent="#accordion">
            <div id="div-form-datos-tecnoaprender" class="card-body card-body-form">
                <form  id="form-2" class="" novalidate>

                  <div id="proyectosCE">
                    <div class="row">

                      <div class="col-sm-3" >
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input form-2" id="1" name="2">
                          <label class="custom-control-label" for="1">Tecnoaprender en Preescolar</label>
                        </div>
                      </div>

                      <div class="col-sm-3" >
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input form-2" id="2" name="2">
                          <label class="custom-control-label" for="2">Tecnoaprender en Primaria</label>
                        </div>
                      </div>

                      <div class="col-sm-3" >
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input form-2" id="3" name="3">
                          <label class="custom-control-label" for="3">Tecnoaprender en Secundaria</label>
                        </div>
                      </div>

                      <div class="col-sm-3" >
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input form-2" id="4" name="4">
                          <label class="custom-control-label" for="4">Tecnoaprender Jóvenes</label>
                        </div>
                      </div>

                    </div>
                    <br>
                    <div class="row">

                      <div class="col-sm-3" >
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input form-2" id="5" name="5">
                          <label class="custom-control-label" for="5">Tecnoaprender en Educación Especial</label>
                        </div>
                      </div>

                      <div class="col-sm-3" >
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input form-2" id="6" name="6">
                          <label class="custom-control-label" for="6">Tecnoaprender en BiblioCRA</label>
                        </div>
                      </div>

                      <div class="col-sm-3" >
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input form-2" id="7" name="7">
                          <label class="custom-control-label" for="7">Programa Nacional de Innovación</label>
                        </div>
                      </div>

                      <div class="col-sm-3" >
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input form-2" id="10" name="10">
                          <label class="custom-control-label" for="10">Pensalo</label>
                        </div>
                      </div>
                    </div>
                    <br>
                    <div class="row">

                      <div class="col-sm-3" >
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input form-2" id="11" name="11">
                          <label class="custom-control-label" for="11">PROFUTURO Primaria</label>
                        </div>
                      </div>

                      <div class="col-sm-3" >
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input form-2" id="12" name="12">
                          <label class="custom-control-label" for="12">PROFUTURO secundaria</label>
                        </div>
                      </div>

                      <div class="col-sm-3" >
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input form-2" id="13" name="13">
                          <label class="custom-control-label" for="13">Robótica Educativa</label>
                        </div>
                      </div>

                      <div class="col-sm-3" >
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input form-2" id="14" name="14">
                            <label class="custom-control-label" for="14">Conectándonos</label>
                        </div>
                      </div>

                    </div>

                  </div>
                  <!-- fin div proyectosCE -->
                  <hr>

                  <div class="row">
                    <button id="btn-datos-proyectos" name ="form-2" type="submit" class="btn btn-enviar btn-2 form-2" value="" alt = "Guardar" title="Guardar"><i class='fas fa-save' style='font-size:30px'></i></button>
                  </div>
                </form>

            </div>
          </div>

        </div>
        <!-- fin del collapseTwo Datos de tecnoaprender -->

        <!-- collapseThree  Infraestructura y seguridad -->
        <div class="card">
          <div class="card-header card-header-form" id="#infraestructura">
            <h5 class="mb-0">
                <button class="btn btn-link-form text-uppercase" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                  Infraestructura y seguridad <i class="fa fa-plus"></i>
                </button>
            </h5>
          </div>

          <div id="collapseThree" class="collapse" aria-labelledby="#infraestructura" data-parent="#accordion">
            <div id="div-form-infraestructura" class="card-body card-body-form">
              <form  id="form-3" class="" novalidate>
                <div class="row">
                  <div class="col-12 mb-4 ml-2 h6">
                    <span class="badge badge-secondary p-2">Evaluación de Planta Física</span>
                  </div>
                </div>

                <div  class="row">

                  <div class="input-group col-sm-8">
                    <div class="input-group-prepend">
                      <span class="input-group-text" for="inputGroupCondpasi">Condición actual de pasillos para traslado de carrito con computadoras</span>
                    </div>
                    <select class="custom-select form-3" id="inputGroupCondpasi" name="inputGroupCondpasi">
                      <option value="0" selected> Seleccione </option>
                      <option value="1"> Pésimo </option>
                      <option value="2">Malo</option>
                      <option value="3">Regular</option>
                      <option value="4">Bueno</option>
                      <option value="5">Excelente</option>
                    </select>
                  </div>

                </div>

                <div  class="row">
                  <div class="input-group input-group-sm col-sm-8">
                    <div class="input-group-prepend">
                      <span class="input-group-text" for="inputGroupCondAula">Condición de las aulas (ventilación, techo, paredes, piso, otros)</span>
                    </div>
                    <select class="custom-select form-3" id="inputGroupCondAula" name="inputGroupCondAula">
                      <option value="0" selected> Seleccione </option>
                      <option value="1"> Pésimo </option>
                      <option value="2">Malo</option>
                      <option value="3">Regular</option>
                      <option value="4">Bueno</option>
                      <option value="5">Excelente</option>
                    </select>
                  </div>

                </div>

                <div  class="row">

                  <div class="input-group col-sm-8">
                    <div class="input-group-prepend">
                      <span class="input-group-text" for="inputGroupEstEsp">Estado del espacio para resguardar equipo.</span>
                    </div>
                    <select class="custom-select form-3" id="inputGroupEstEsp" name="inputGroupEstEsp">
                      <option value="0" selected> Seleccione </option>
                      <option value="1"> Pésimo </option>
                      <option value="2">Malo</option>
                      <option value="3">Regular</option>
                      <option value="4">Bueno</option>
                      <option value="5">Excelente</option>
                    </select>
                  </div>

                </div>

                <div  class="row">
                  <div class="input-group col-sm-8">
                    <div class="input-group-prepend">
                      <span class="input-group-text" for="inputGroupBiblio">Si cuenta con biblioteca, estado de la misma.</span>
                    </div>
                    <select class="custom-select form-3" id="inputGroupBiblio" name="inputGroupBiblio">
                      <option value="0" selected> Seleccione </option>
                      <option value="1"> Pésimo </option>
                      <option value="2">Malo</option>
                      <option value="3">Regular</option>
                      <option value="4">Bueno</option>
                      <option value="5">Excelente</option>
                    </select>
                  </div>

                </div>
                <hr>

                <div class="row">
                    <div class="col-12 mb-4 ml-2 h6">
                        <span class="badge badge-secondary p-2">Evaluación instalación eléctrica</span>
                    </div>

                </div>

                <div  class="row">
                  <div class="input-group col-sm-8">
                    <div class="input-group-prepend">
                    <span class="input-group-text" for="inputGroupIlumAul">Iluminación de las aulas..</span>
                    </div>
                    <select class="custom-select form-3" id="inputGroupIlumAul" name="inputGroupIlumAul">
                      <option value="0" selected> Seleccione </option>
                      <option value="1"> Pésimo </option>
                      <option value="2">Malo</option>
                      <option value="3">Regular</option>
                      <option value="4">Bueno</option>
                      <option value="5">Excelente</option>
                    </select>
                  </div>

                </div>

                <div  class="row">
                  <div class="input-group col-sm-8">
                    <div class="input-group-prepend">
                    <span class="input-group-text" for="inputGroupTomPolar">Tomas polarizados para cargar equipo.</span>
                    </div>
                    <select class="custom-select form-3" id="inputGroupTomPolar" name="inputGroupTomPolar">
                      <option value="0" selected> Seleccione </option>
                      <option value="1"> Pésimo </option>
                      <option value="2">Malo</option>
                      <option value="3">Regular</option>
                      <option value="4">Bueno</option>
                      <option value="5">Excelente</option>
                    </select>
                  </div>

                </div>

                <div  class="row">
                  <div class="input-group col-sm-8">
                    <div class="input-group-prepend">
                    <span class="input-group-text" for="inputGroupCondElec">Condición eléctrica para el soporte de mantener conectados los equipos.</span>
                    </div>
                    <select class="custom-select form-3" id="inputGroupCondElec" name="inputGroupCondElec">
                      <option value="0" selected> Seleccione </option>
                      <option value="1"> Pésimo </option>
                      <option value="2">Malo</option>
                      <option value="3">Regular</option>
                      <option value="4">Bueno</option>
                      <option value="5">Excelente</option>
                    </select>
                  </div>

                </div>

                <div  class="row">
                  <div class="input-group col-sm-8">
                    <div class="input-group-prepend">
                    <span class="input-group-text" for="inputGroupBibliEle">Si cuenta con biblioteca, estado de su instalación eléctrica.</span>
                    </div>
                    <select class="custom-select form-3" id="inputGroupBibliEle" name="inputGroupBibliEle">
                      <option value="0" selected> Seleccione </option>
                      <option value="1"> Pésimo </option>
                      <option value="2">Malo</option>
                      <option value="3">Regular</option>
                      <option value="4">Bueno</option>
                      <option value="5">Excelente</option>
                    </select>
                  </div>

                </div>

                <div  class="row">
                  <div class="input-group col-sm-8">
                    <div class="input-group-prepend">
                    <span class="input-group-text" for="inputGroupPaneSol">Se cuenta con panel solar.</span>
                    </div>
                    <select class="custom-select form-3" id="inputGroupPaneSol" name="inputGroupPaneSol">
                      <option value="0" selected> Seleccione </option>
                      <option value="1"> Pésimo </option>
                      <option value="2">Malo</option>
                      <option value="3">Regular</option>
                      <option value="4">Bueno</option>
                      <option value="5">Excelente</option>
                    </select>
                  </div>

                </div>

                <hr>

                <div   class="row">
                  <div class="col-12 mb-4 ml-2 h6">
                    <span class="badge badge-secondary p-2">Evaluación Seguridad</span>
                  </div>

                </div>

                <div  class="row">

                  <div class="input-group col-sm-8">
                    <div class="input-group-prepend">
                      <span class="input-group-text" for="inputGroupSeg">Seguridad general de la institución</span>
                    </div>
                    <select class="custom-select form-3" id="inputGroupSeg" name="inputGroupSeg">
                      <option value="0" selected> Seleccione </option>
                      <option value="1"> Pésimo </option>
                      <option value="2">Malo</option>
                      <option value="3">Regular</option>
                      <option value="4">Bueno</option>
                      <option value="5">Excelente</option>
                    </select>
                  </div>
                </div>

                <div  class="row">

                  <div class="input-group col-sm-8">
                    <div class="input-group-prepend">
                    <span class="input-group-text" for="inputGroupSegEqui">Seguridad del lugar donde se resguardará el equipo</span>
                    </div>
                    <select class="custom-select form-3" id="inputGroupSegEqui" name="inputGroupSegEqui">
                      <option value="0" selected> Seleccione </option>
                      <option value="1"> Pésimo </option>
                      <option value="2">Malo</option>
                      <option value="3">Regular</option>
                      <option value="4">Bueno</option>
                      <option value="5">Excelente</option>
                    </select>
                  </div>

                </div>

                <div  class="row">

                  <div class="input-group col-sm-8">
                    <div class="input-group-prepend">
                      <span class="input-group-text" for="inputGroupCuidAlum">Condición general en relación con posible cuidado por parte de los alumnos</span>
                    </div>
                    <select class="custom-select form-3" id="inputGroupCuidAlum" name="inputGroupCuidAlum">
                      <option value="0" selected> Seleccione </option>
                      <option value="1"> Pésimo </option>
                      <option value="2">Malo</option>
                      <option value="3">Regular</option>
                      <option value="4">Bueno</option>
                      <option value="5">Excelente</option>
                    </select>
                  </div>

                </div>

                <div  class="row">

                  <div class="input-group col-sm-8">
                    <div class="input-group-prepend">
                      <span class="input-group-text" for="inputGroupRespMan">Condición general de cuidado y responsabilidad docente en manejo de equipo</span>
                    </div>
                    <select class="custom-select form-3" id="inputGroupRespMan" name="inputGroupRespMan">
                      <option value="0" selected> Seleccione </option>
                      <option value="1"> Pésimo </option>
                      <option value="2">Malo</option>
                      <option value="3">Regular</option>
                      <option value="4">Bueno</option>
                      <option value="5">Excelente</option>
                    </select>
                  </div>

                </div>

                <hr>

                <div   class="row">
                  <div class="col-12 mb-4 ml-2 h6">
                    <span class="badge badge-secondary p-2">Disponibilidad de acceso a Internet</span>
                  </div>

                </div>

                <div class="row mx-4">

                  <div class="col-sm-3" >
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input form-3" id="chkOficinas" name="chkOficinas">
                      <label class="custom-control-label" for="chkOficinas">Únicamente oficinas Administrativas</label>
                    </div>
                  </div>

                  <div class="col-sm-3" >
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input form-3" id="chkred" name="chkred">
                      <label class="custom-control-label" for="chkred">Red interna permite conexión expedita</label>
                    </div>
                  </div>

                  <div class="col-sm-3" >
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input form-3" id="chkbib" name="chkbib">
                      <label class="custom-control-label" for="chkbib">Biblioteca a disposición de Estudiantes</label>
                    </div>
                  </div>

                  <div class="col-sm-3" >
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input form-3" id="chkinsti" name="chkinsti">
                      <label class="custom-control-label" for="chkinsti">En toda la institución a disposición de estudiantes</label>
                    </div>
                  </div>

                </div>
                <hr>
                <div class="row">
                  <button id="btn-infraestructura" name ="form-3"  class="btn btn-enviar btn-3 form-3" value="" alt = "Guardar" title="Guardar"><i class='fas fa-save' style='font-size:30px'></i></button>
                </div>

              </form>
            </div>
          </div>
        </div>
        <!-- fin del collapseThree  Infraestructura y seguridad -->

        <!-- collapseFour Equipamiento -->
        <div class="card">
          <div class="card-header card-header-form" id="#equipamiento">
            <h5 class="mb-0">
                <button class="btn btn-link-form text-uppercase" data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                 Equipamiento <i class="fa fa-plus"></i>
                </button>
            </h5>
          </div>
          <div id="collapseFour" class="collapse" aria-labelledby="#equipamiento" data-parent="#accordion">

            <div id="div-form-equipamiento" class="card-body card-body-form">
              <div id="mensajeEquipamiento"><h4>No existe equipamiento asociado</h4></div>
                <div class="row">
                  <ul class="nav nav-tabs" id="menuLista" role="tablist">
                    <li id="li1" class='nav-item nav-equipamiento d-none'><a id="ali1" class='nav-link' data-toggle='tab' href='#fonatel' role='tab' aria-controls='home' aria-selected='false'>MEP-FONATEL</a></li>
                    <li id="li2" class='nav-item nav-equipamiento d-none'><a id="ali2" class='nav-link' data-toggle='tab' href='#transferencia' role='tab' aria-controls='home' aria-selected='false'>Transferencia</a></li>
                    <li id="li3" class='nav-item nav-equipamiento d-none'><a id="ali3" class='nav-link' data-toggle='tab' href='#conectandonos' role='tab' aria-controls='home' aria-selected='false'>Conectándonos</a></li>
                    <li id="li4" class='nav-item nav-equipamiento d-none'><a id="ali4" class='nav-link' data-toggle='tab' href='#donacion' role='tab' aria-controls='home' aria-selected='false'>Donación</a></li>
                  </ul>
                </div>

                <!-- inicia equipamiento FONATEL -->
                <div class="tab-content px-5" id="menuListaContent">

                  <div class="tab-pane fade" id="fonatel" role="tabpanel" aria-labelledby="fonatel-tab">
                    <!-- <div id="equipamiento_fonatel"> -->
                      <form  id="form-4-fonatel" class="form-4-equipamiento" novalidate>
                        <div class="row">
                          <div class="col-sm-12" >
                            <span class="badge badge-secondary p-2">Equipamiento Convenio MEP-FONATEL</span>
                          </div>
                        </div>
                        <div class="row">
                          <div class="input-group col-sm-6">
                            <div class="input-group-prepend">
                              <span class="input-group-text" for="fonatel_tipo_cartel">Cartel</span>
                            </div>
                            <select class="custom-select form-4-fonatel" id="fonatel_tipo_cartel" name="fonatel_tipo_cartel">
                                <option value="Sin definir"  selected> Seleccione </option>
                                <option value="Cartel 1">Cartel 1</option>
                                <option value="Cartel 2">Cartel 2</option>
                                <option value="Cartel 1 Ampliación">Cartel 1 Ampliación</option>
                                <option value="Cartel 2 Ampliación">Cartel 2 Ampliación</option>
                                <option value="Seleccionado Cartel 2">Seleccionado Cartel 2</option>
                            </select>
                          </div>
                          <div  class="col-sm-6">
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text" for="fonatel_fecha">Año</span>
                              </div>
                              <input type="date"  id="fonatel_fecha"  name="fonatel_fecha" class="form-control form-4-fonatel" >
                            </div>
                          </div>
                        </div>
                        <br>
                        <div class="row">

                          <div  class="col-sm-6">
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text" for="fonatel_monto_inversion">Monto Inversión</span>
                              </div>
                              <input type="text"  id="fonatel_monto_inversion" name="fonatel_monto_inversion" class="form-control form-4-fonatel" >
                            </div>
                          </div>

                          <div class="col-sm-6">
                            <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                <span class="input-group-text" for="fonatel_cantidad_docentes">Cantidad de docentes que utilizan el equipo</span>
                              </div>
                              <select class="custom-select form-4-fonatel" id="fonatel_cantidad_docentes" name="fonatel_cantidad_docentes">
                                <option value="0" disabled selected> Seleccione</option>
                                <option value="1">Ninguno</option>
                                <option value="2">de 1 a 5 </option>
                                <option value="3">de 5 a 10</option>
                                <option value="4">de 10 a 20</option>
                                <option value="5">Más de 20</option>
                              </select>
                            </div>
                          </div>

                        </div>

                        <div class="row">
                          <div class="col-sm-10">
                            <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                <span class="input-group-text" for="fonatel_cantidad_equipo">La cantidad de equipo disponible es</span>
                              </div>
                              <select class="custom-select form-4-fonatel" id="fonatel_cantidad_equipo"  name="fonatel_cantidad_equipo">
                                <option value="0" disabled selected> Seleccione</option>
                                <option value="suficiente">Suficiente</option>
                                <option value="insuficiente">Insuficiente</option>
                                <option value="otro">Otro</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-sm-5">
                            <div class="input-group input-group-sm">
                              <div class="input-group-prepend">
                                <span class="input-group-text">Requiere soporte</span>
                              </div>
                                <select id ="fonatel_requiere_soporte" class="form-control custom-select form-4-fonatel" name="fonatel_requiere_soporte">
                                    <option value="" disabled selected>Seleccione...</option>
                                    <option value="si">Si</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div class="error"></div>
                          </div>
                        </div>
                        <br>

                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label for="fonatel_que_falta">Indique qué hace falta:</label>
                              <textarea class="form-control form-4-fonatel" rows="3" id="fonatel_que_falta" name="fonatel_que_falta"></textarea>
                              <!-- <input class="form-control form-4" type="text" id="fonatel_que_falta" name="fonatel_que_falta"> -->
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <button id="btn-equipamiento-fonatel" name ="form-4-fonatel" type="submit" class="btn btn-enviar btn-4 form-4" value="" alt = "Guardar" title="Guardar"><i class='fas fa-save' style='font-size:30px'></i></button>
                        </div>
                      </form>
                  </div> <!-- fin div del tab-panel FONATEL -->

                  <div class="tab-pane fade" id="transferencia" role="tabpanel" aria-labelledby="transferencia-tab">

                    <form  id="form-4-transferencia" class="form-4-equipamiento" novalidate>

                      <div class="row">
                        <div class="col-sm-12" >
                          <span class="badge badge-secondary p-2">Equipamiento mediante transferencia</span>
                        </div>
                      </div>

                      <div class="row">
                        <div  class="col-sm-6">
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text" for="transferencia_fecha_transferencia">Fecha realizó transferencia</span>
                            </div>
                            <input id="transferencia_fecha_transferencia" name="transferencia_fecha_transferencia" type="date"  class="form-control form-4-transferencia" >
                          </div>
                        </div>

                        <div  class="col-sm-6">
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text" for="transferencia_monto">Monto</span>
                            </div>
                            <input id="transferencia_monto"  name="transferencia_monto" type="text"  class="form-control form-4-transferencia" >
                          </div>
                        </div>
                      </div>
                      <br>
                      
                      <div class="row">

                        <div class="col-sm-12">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" for="transferencia_estado_compra">Estado del proceso de compra</span>
                            </div>
                            <select class="custom-select form-4-transferencia" id="transferencia_estado_compra" name="transferencia_estado_compra">
                            </select>
                          </div>
                        </div>

                      </div>

                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="transferencia_razones">Indique las razones por las que no se ha realizado el proceso de contratación:</label>
                            <textarea class="form-control form-4-transferencia" rows="5" id="transferencia_razones" name="transferencia_razones"></textarea>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-sm-6">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" for="transferencia_recibido">Equipo Recibido</span>
                            </div>
                            <select class="custom-select form-4-transferencia" id="transferencia_recibido" name="transferencia_recibido">
                              <option value="0" disabled selected> Seleccione</option>
                              <option value="si">Si</option>
                              <option value="no">No</option>
                              <option value="no aplica">No aplica</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" for="transferencia_pago_empresa">Pago a la empresa</span>
                            </div>
                            <select class="custom-select form-4-transferencia" id="transferencia_pago_empresa" name="transferencia_pago_empresa">
                              <option value="0" disabled selected> Seleccione</option>
                              <option value="si">Si</option>
                              <option value="no">No</option>
                              <option value="no aplica">No aplica</option>
                            </select>
                          </div>
                        </div>

                      </div>

                      <div class="row">
                        <div class="col-sm-6">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" for="transferencia_fecha_recibido">Fecha recibido</span>
                            </div>
                            <input id="transferencia_fecha_recibido" name="transferencia_fecha_recibido" type="date"  class="form-control form-4-transferencia" >
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" for="transferencia_fecha_pago">Fecha de pago</span>
                            </div>
                            <input id="transferencia_fecha_pago" name="transferencia_fecha_pago" type="date"  class="form-control form-4-transferencia" >
                          </div>
                        </div>
                        <div class="col-sm-1">
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-sm-6">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" for="transferencia_remanente">Cuenta con remanente de la transferencia</span>
                            </div>
                            <select class="custom-select form-4-transferencia" id="transferencia_remanente" name="transferencia_remanente">
                              <option value="0" disabled selected> Seleccione</option>
                              <option value="si">Si</option>
                              <option value="no">No</option>
                              <option value="no aplica">No aplica</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" for="transferencia_monto_remanente">Monto del remanente:</span>
                            </div>
                            <input id="transferencia_monto_remanente" name="transferencia_monto_remanente" type="text"  class="form-control form-4-transferencia">
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-sm-6">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" for="transferencia_fecha_contrato_recibido">Año en que se concretó la contratación y los pagos</span>
                            </div>
                            <select class="custom-select form-4-transferencia" id="transferencia_fecha_contrato_recibido" name="transferencia_fecha_contrato_recibido">
                              <option value="0" disabled selected> Seleccione</option>
                              <option value="2010">2010</option>
                              <option value="2011">2011</option>
                              <option value="2012">2012</option>
                              <option value="2013">2013</option>
                              <option value="2014">2014</option>
                              <option value="2015">2015</option>
                              <option value="2016">2016</option>
                              <option value="2017">2017</option>
                              <option value="2018">2018</option>
                              <option value="2019">2019</option>
                              <option value="2020">2020</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" for="transferencia_en_uso">¿Está en uso del equipo actualmente?</span>
                            </div>
                            <select class="custom-select form-4-transferencia" id="transferencia_en_uso" name="transferencia_en_uso">
                              <option value="0" disabled selected> Seleccione</option>
                              <option value="si">Si</option>
                              <option value="no">No</option>
                              <option value="no aplica">No aplica</option>
                            </select>
                            </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-sm-6">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" for="transferencia_cantidad_docentes">Cantidad de docentes que utilizan el equipo</span>
                            </div>
                            <select class="custom-select form-4-transferencia" id="transferencia_cantidad_docentes" name="transferencia_cantidad_docentes">
                              <option value="0" disabled selected> Seleccione</option>
                              <option value="1">Ninguno</option>
                              <option value="2">de 1 a 5 </option>
                              <option value="3">de 5 a 10</option>
                              <option value="4">de 10 a 20</option>
                              <option value="5">Más de 20</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" for="transferencia_cantidad_equipo">La cantidad de equipo disponible es</span>
                            </div>
                            <select class="custom-select form-4-transferencia" id="transferencia_cantidad_equipo" name="transferencia_cantidad_equipo">
                              <option value="0" disabled selected> Seleccione</option>
                              <option value="suficiente">Suficiente</option>
                              <option value="insuficiente">Insuficiente</option>
                              <option value="otro">Otro</option>
                            </select>
                          </div>
                        </div>

                      </div>

                      <div class="row">
                          <div class="col-sm-5">
                            <div class="input-group input-group-sm">
                              <div class="input-group-prepend">
                                <span class="input-group-text">Requiere soporte</span>
                              </div>
                                <select id ="transferencia_requiere_soporte" class="form-control custom-select form-4-transferencia" name="transferencia_requiere_soporte">
                                    <option value="" disabled selected>Seleccione...</option>
                                    <option value="si">Si</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div class="error"></div>
                          </div>
                        </div>
                        <br>

                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="transferencia_que_falta">Indique qué hace falta:</label>
                            <textarea class="form-control form-4-transferencia" rows="5" id="transferencia_que_falta" name="transferencia_que_falta"></textarea>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <button id="btn-equipamiento-transferencia" name ="form-4-transferencia" type="submit" class="btn btn-enviar btn-5 form-4" value="" alt = "Guardar" title="Guardar"><i class='fas fa-save' style='font-size:30px'></i></button>
                      </div>
                    </form>
                  </div>
                  <!-- fin del tab-pane equipamiento por transferencia -->

                  <!-- div equipamiento por donación -->
                  <div class="tab-pane fade" id="donacion" role="tabpanel" aria-labelledby="donacion-tab">
                      <!-- <div id="equipamiento_donacion"> -->
                    <form  id="form-4-donacion" class="form-4-equipamiento" novalidate>
                      <div class="row">
                        <div class="col-sm-12" >
                          <span class="badge badge-secondary p-2">Equipamiento mediante donación</span>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" for="donacion_anno">Año de la donación</span>
                            </div>
                            <input  id ="donacion_anno"  name ="donacion_anno" type="text"  class="form-control form-4-donacion" >
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" for="donacion_empresa_donacion">Empresa/Organización</span>
                            </div>
                            <input id="donacion_empresa_donacion" name="donacion_empresa_donacion" type="text"  class="form-control form-4-donacion" >
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                            <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                <span class="input-group-text" for="donacion_cantidad_docentes">Cantidad de docentes que utilizan el equipo</span>
                              </div>
                              <select class="custom-select form-4-donacion" id="donacion_cantidad_docentes" name="donacion_cantidad_docentes">
                                <option value="0" disabled selected> Seleccione</option>
                                <option value="1">Ninguno</option>
                                <option value="2">de 1 a 5 </option>
                                <option value="3">de 5 a 10</option>
                                <option value="4">de 10 a 20</option>
                                <option value="5">Más de 20</option>
                              </select>
                            </div>
                          </div>
                        <div class="col-sm-6">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" for="donacion_cantidad_equipo">La cantidad de equipo disponible es</span>
                            </div>
                            <select class="custom-select form-4-donacion" id="donacion_cantidad_equipo" name="donacion_cantidad_equipo">
                              <option value="0" disabled selected> Seleccione</option>
                              <option value="suficiente">Suficiente</option>
                              <option value="insuficiente">Insuficiente</option>
                              <option value="otro">Otro</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                          <div class="col-sm-5">
                            <div class="input-group input-group-sm">
                              <div class="input-group-prepend">
                                <span class="input-group-text">Requiere soporte</span>
                              </div>
                                <select id ="donacion_requiere_soporte" class="form-control custom-select form-4-donacion" name="donacion_requiere_soporte">
                                    <option value="" disabled selected>Seleccione...</option>
                                    <option value="si">Si</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div class="error"></div>
                          </div>
                        </div>
                        <br>

                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="donacion_que_falta">Indique qué hace falta:</label>
                            <textarea class="form-control form-4-donacion" rows="5" id="donacion_que_falta" name="donacion_que_falta"></textarea>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <button id="btn-equipamiento-donacion" name ="form-4-donacion" type="submit" class="btn btn-enviar btn-6 form-4" value="" alt = "Guardar" title="Guardar"><i class='fas fa-save' style='font-size:30px'></i></button>
                      </div>
                    </form>
                  </div>
                  <!-- fin div equipamiento por donación -->

                  <!-- inicia div equipamiento mediante Conectándonos -->
                  <div class="tab-pane fade" id="conectandonos" role="tabpanel" aria-labelledby="conectandonos-tab">
                      <!-- <div id="equipamiento_conectandonos"> -->
                    <form  id="form-4-conectandonos" class="form-4-equipamiento" novalidate>
                      <div class="row">
                        <div class="col-sm-12" >
                          <span class="badge badge-secondary p-2">Equipamiento mediante conectándonos</span>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-sm-6">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" for="conectandonos_equipo_inventariado">Equipo inventariado</span>
                            </div>
                            <select class="custom-select form-4-conectandonos" id="conectandonos_equipo_inventariado" name="conectandonos_equipo_inventariado">
                              <option value="0" disabled selected> Seleccione</option>
                              <option value="1">Si</option>
                              <option value="2">No</option>
                              </select>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" for="conectandonos_anno">Año</span>
                            </div>
                                <input type="text"  id="conectandonos_anno" name="conectandonos_anno" class="form-control fform-4-conectandonos" >
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-sm-6">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" for="conectandonos_cantidad_docentes">Cantidad de docentes que utilizan el equipo</span>
                            </div>
                            <select class="custom-select form-4-conectandonos" id="conectandonos_cantidad_docentes" name="conectandonos_cantidad_docentes">
                              <option value="0" disabled selected> Seleccione</option>
                              <option value="1">Ninguno</option>
                              <option value="2">de 1 a 5 </option>
                              <option value="3">de 5 a 10</option>
                              <option value="4">de 10 a 20</option>
                              <option value="5">Más de 20</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" for="conectandonos_cantidad_equipo">La cantidad de equipo disponible es</span>
                            </div>
                            <select class="custom-select form-4-conectandonos" id="conectandonos_cantidad_equipo" name="conectandonos_cantidad_equipo">
                              <option value="0" disabled selected> Seleccione</option>
                              <option value="suficiente">Suficiente</option>
                              <option value="insuficiente">Insuficiente</option>
                              <option value="otro">Otro</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                          <div class="col-sm-5">
                            <div class="input-group input-group-sm">
                              <div class="input-group-prepend">
                                <span class="input-group-text">Requiere soporte</span>
                              </div>
                                <select id ="conectandonos_requiere_soporte" class="form-control custom-select form-4-conectandonos" name="conectandonos_requiere_soporte">
                                    <option value="" disabled selected>Seleccione...</option>
                                    <option value="si">Si</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div class="error"></div>
                          </div>
                        </div>
                        <br>

                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="conectandonos_que_falta">Indique qué hace falta:</label>
                            <textarea class="form-control form-4-conectandonos" rows="5" id="conectandonos_que_falta" name="conectandonos_que_falta"></textarea>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <button id="btn-equipamiento-conectandonos" name ="form-4-conectandonos" type="submit" class="btn btn-enviar btn-7 form-4" value="" alt = "Guardar" title="Guardar"><i class='fas fa-save' style='font-size:30px'></i></button>
                      </div>
                    </form>
                  </div>

                </div>  <!-- fin del tab-content -->

            </div>
          </div>  <!-- End div collapse four -->
        </div>   <!-- div en card four -->

        <!-- fin del collapseFour Equipamiento -->

        <!-- collapseFive Aprovechamiento Tecnológico -->
        <div class="card">
          <div class="card-header card-header-form" id="#aprovechamiento">
            <h5 class="mb-0">
              <button class="btn btn-link-form text-uppercase" data-toggle="collapse" data-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                Aprovechamiento Tecnológico <i class="fa fa-plus"></i>
              </button>
            </h5>
          </div>

          <div id="collapseFive" class="collapse" aria-labelledby="#aprovechamiento" data-parent="#accordion">

            <div id="div-form-aprovechamiento-tecnologico" class="card-body card-body-form">
              <form  id="form-5"  class="" novalidate>
                <div   class="row">
                  <div class="col-12 mb-4 h6">
                      <span class="badge badge-secondary p-2">Datos aprovechamiento tecnológico </span>
                  </div>
               </div>              

                <!--Fila 1 Datos generales-->
                <div class="row">

                  <div class="input-group col-6">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="numCantDocnetes">Cantidad de docentes que utilizan la tecnología</label>
                    </div>
                    <input type="number"  min="0"  value=0 id="numCantDocnetes" class="form-control input-tec-num form-5"  placeholder="Digite la cantidad">
                  </div>

                  <div class="input-group col-6">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="selOrganizacionUsoEquipo">Organización del uso del equipo</label>
                    </div>
                    <select class="custom-select form-5"  name="" id="selOrganizacionUsoEquipo">
                      <option value="No existe registro" selected> No existe registro </option>
                      <option value="1">Registro en una bitácora</option>
                      <option value="2">El equipo está solo en un aula</option>
                      <option value="3">Todas las aulas tienen equipo</option>
                      <option value="4">Préstamo por medio de boleta impresa</option>
                      <option value="5">Biblioteca digital</option>
                      <option value="6">Otro</option>
                    </select>
                  </div>

                </div>
                <br>
                <!--Fila 2 Datos generales-->
                <div class="row">

                  <div class="input-group col-6">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="selTecnologiaPAT">Incorporación de tecnología como indicador  PAT</label>
                    </div>
                    <select class="custom-select form-5"  name=""  id="selTecnologiaPAT">
                      <option value="2" selected> No </option>
                      <option value="1" > Si </option>
                    </select>
                  </div>

                  <div class="input-group col-6">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="numCantEstDiscapacidad">Cantidad estudiantes con discapacidad visual</label>
                    </div>
                    <input type="number" class="form-control input-tec-num form-5"  name=""  value=0 id="numCantEstDiscapacidad" min="0" placeholder="Digite la cantidad">
                  </div>

                </div>
                <hr>

                <div class="row">
                  <div class="col-12 mb-4 h6">
                    <span class="badge badge-secondary p-2">Usos que hace el profesorado de la tecnología: </span>
                  </div>
                </div>

                <!--Fila 1 Profesor -->
                <div class="row mx-4">

                  <div class="col-2" >

                      <div class="custom-control custom-checkbox form-5">
                          <input type="checkbox" class="custom-control-input uso-tec-prof form-5" id="profPlan">
                          <label class="custom-control-label" for="profPlan">Planeamiento</label>
                      </div>

                    
                  </div>

                  <div class="col-2" >

                  <div class="custom-control custom-checkbox form-5">
                          <input type="checkbox" class="custom-control-input uso-tec-prof form-5" id="profIndagar">
                          <label class="custom-control-label" for="profIndagar">Indagar información en Interne</label>
                      </div>

                    
                  </div>

                  <div class="col-2" >

                  <div class="custom-control custom-checkbox form-5">
                          <input type="checkbox" class="custom-control-input uso-tec-prof form-5" id="profFotos">
                          <label class="custom-control-label" for="profFotos">Tomar fotografías</label>
                      </div>

                    
                  </div>

                  <div class="col-2" >

                  <div class="custom-control custom-checkbox form-5">
                          <input type="checkbox" class="custom-control-input uso-tec-prof form-5" id="profProgramar">
                          <label class="custom-control-label" for="profProgramar">Programar</label>
                      </div>


                  
                  </div>

                  <div class="col-2" >

                  <div class="custom-control custom-checkbox form-5">
                          <input type="checkbox" class="custom-control-input uso-tec-prof form-5" id="profVideo">
                          <label class="custom-control-label" for="profVideo">Uso de cámara de video</label>
                      </div>

                   
                  </div>

                  <div class="col-2" >

                    <div class="custom-control custom-checkbox form-5">
                            <input type="checkbox" class="custom-control-input uso-tec-prof form-5" id="profAsistencia">
                            <label class="custom-control-label" for="profAsistencia">Control de lista y asistencia</label>
                        </div>

                  
                  </div>

                </div>
                <hr>

                <!--Fila 2 Profesor -->
                <div class="row mx-4">

                  <div class="col-2 " >


                  <div class="custom-control custom-checkbox form-5">
                      <input type="checkbox" class="custom-control-input uso-tec-prof form-5" id="profProyectarVideos">
                      <label class="custom-control-label" for="profProyectarVideos">Proyectar Videos en clase</label>
                  </div>
                
                  </div>

                  <div class="col-2 " >
                      <div class="custom-control custom-checkbox form-5">
                          <input type="checkbox" class="custom-control-input uso-tec-prof form-5" id="profHacerVideos">
                          <label class="custom-control-label" for="profHacerVideos">Hacer y editar videos</label>
                      </div>                    
                  </div>

                  <div class="col-2 " >

                  <div class="custom-control custom-checkbox form-5">
                          <input type="checkbox" class="custom-control-input uso-tec-prof form-5" id="profGrabarVideos">
                          <label class="custom-control-label" for="profGrabarVideos">Grabar y editar videos</label>
                  </div> 
                    
                   
                  </div>

                  <div class="col-2 " >

                      <div class="custom-control custom-checkbox form-5">
                              <input type="checkbox" class="custom-control-input uso-tec-prof form-5" id="profCelular">
                              <label class="custom-control-label" for="profCelular">Uso educativo del celular</label>
                      </div> 
                      
                
                  </div>

                  <div class="col-2 " >

                  <div class="custom-control custom-checkbox form-5">
                              <input type="checkbox" class="custom-control-input uso-tec-prof form-5" id="profPpt">
                              <label class="custom-control-label" for="profPpt">Hacer presentacion de PorPoint</label>
                      </div> 
                  
                    
                  </div>

                  <div class="col-2 " >

                  <div class="custom-control custom-checkbox form-5">
                              <input type="checkbox" class="custom-control-input uso-tec-prof form-5" id="profMapas">
                              <label class="custom-control-label" for="profMapas">Hacer mapas conceptuales</label>
                      </div> 
                  
                  
                  </div>

                </div>
                <hr>

                <!--Fila 3 Profesor -->
                <div class="row mx-4">

                  <div class="col-2" >
                    <div class="custom-control custom-checkbox form-5">
                            <input type="checkbox" class="custom-control-input uso-tec-prof form-5" id="profblog">
                            <label class="custom-control-label" for="profblog">Hacer blogs</label>
                        </div>
                      
                    
                  </div>

                  <div class="col-2" >
                    <div class="custom-control custom-checkbox form-5">
                            <input type="checkbox" class="custom-control-input uso-tec-prof form-5" id="profGeogebra">
                            <label class="custom-control-label" for="profGeogebra">Utilizar Geogebra</label>
                        </div>

                  </div>

                  <div class="col-2" >
                    <div class="custom-control custom-checkbox form-5">
                              <input type="checkbox" class="custom-control-input uso-tec-prof form-5" id="profRedes">
                              <label class="custom-control-label" for="profRedes">Uso educativo de redes sociales</label>
                          </div>                   
                  </div>

                  <div class="col-2" >
                    <div class="custom-control custom-checkbox form-5">
                                <input type="checkbox" class="custom-control-input uso-tec-prof form-5" id="profWord">
                                <label class="custom-control-label" for="profWord">Hacer documentos de Word</label>
                            </div>                   
                  </div>

                  
               

                  <div class="col-2" >

                  <div class="custom-control custom-checkbox form-5">
                                <input type="checkbox" class="custom-control-input uso-tec-prof form-5" id="profImg">
                                <label class="custom-control-label" for="profImg">Editar imágenes</label>
                            </div> 
                  </div>

                  <div class="col-2" >
                      <div class="custom-control custom-checkbox form-5">
                                    <input type="checkbox" class="custom-control-input uso-tec-prof form-5" id="profWeb">
                                    <label class="custom-control-label" for="profWeb">Hacer páginas web</label>
                                </div> 

                   
                  </div>

                </div>
                <hr>

                <!--Fila 4 Profesor -->
                <div class="row mx-4">

                  <div class="col-2" >
                    <div class="custom-control custom-checkbox form-5">
                                      <input type="checkbox" class="custom-control-input uso-tec-prof form-5" id="profProyector">
                                      <label class="custom-control-label" for="profProyector">Uso del proyector</label>
                                  </div>                    
                  </div>

                  <div class="col-2 text-right">
                    Otro:
                  </div>

                  <div class="col-8" >
                    <input type="text"  id="txtProfOtro" class="form-control input-tec-txt form-5" placeholder="Escriba otro uso no tipificado" >
                  </div>

                </div>
                <hr>

                <!--ESTUDIANTE-->
                <div   class="row">

                  <div class="col-12 mb-4 ml-2 h6">
                    <span class="badge badge-secondary p-2">Usos que hace el estudiantado de la tecnología: </span>
                  </div>
                </div>

                  <!--Fila 1 estudiante -->
                <div class="row ml-4">

                  <div class="col-2" >
                          <div class="custom-control custom-checkbox form-5">
                              <input type="checkbox" class="custom-control-input uso-tec-est form-5" id="estIndagar">
                              <label class="custom-control-label" for="estIndagar">Uso del proyector</label>
                           </div>                    
                  </div>

                  <div class="col-2" >
                            <div class="custom-control custom-checkbox form-5">
                              <input type="checkbox" class="custom-control-input uso-tec-est form-5" id="estExcel">
                              <label class="custom-control-label" for="estExcel">Hacer Documentos en Excel</label>
                           </div>                     
                  </div>

                  <div class="col-2" >
                          <div class="custom-control custom-checkbox form-5">
                              <input type="checkbox" class="custom-control-input uso-tec-est form-5" id="estEditVideos">
                              <label class="custom-control-label" for="estEditVideos">Hacer y editar videos</label>
                           </div> 
                   
                  </div>

                  <div class="col-2" >
                         <div class="custom-control custom-checkbox form-5">
                              <input type="checkbox" class="custom-control-input uso-tec-est form-5" id="estAudios">
                              <label class="custom-control-label" for="estAudios">Grabar y editar audios</label>
                           </div> 

                   
                  </div>

                  <div class="col-2" >
                          <div class="custom-control custom-checkbox form-5">
                              <input type="checkbox" class="custom-control-input uso-tec-est form-5" id="estCamaraVideo">
                              <label class="custom-control-label" for="estCamaraVideo">Uso de cámara de video</label>
                           </div> 
                   
                  </div>

                  <div class="col-2" >
                          <div class="custom-control custom-checkbox form-5">
                              <input type="checkbox" class="custom-control-input uso-tec-est form-5" id="estVerVideos">
                              <label class="custom-control-label" for="estVerVideos">Ver videos</label>
                           </div> 

                  
                  </div>

                      
                  </div>
               
                <hr>

                <!--Fila 2 estudiante -->
                <div class="row ml-4">

                  <div class="col-2" >

                  <div class="custom-control custom-checkbox form-5">
                              <input type="checkbox" class="custom-control-input uso-tec-est form-5" id="estMapas">
                              <label class="custom-control-label" for="estMapas">Hacer mapas conceptuales</label>
                           </div>                       
                  </div>

                  <div class="col-2" >
                  <div class="custom-control custom-checkbox form-5">
                              <input type="checkbox" class="custom-control-input uso-tec-est form-5" id="estBlogs">
                              <label class="custom-control-label" for="estBlogs">Hacer blogs</label>
                           </div>  

                      
                  </div>

                  <div class="col-2" >
                  <div class="custom-control custom-checkbox form-5">
                              <input type="checkbox" class="custom-control-input uso-tec-est form-5" id="estGeogebra">
                              <label class="custom-control-label" for="estGeogebra">Utilizar Geogebra</label>
                           </div>  
                      
                  </div>

                  <div class="col-2" >
                  <div class="custom-control custom-checkbox form-5">
                              <input type="checkbox" class="custom-control-input uso-tec-est form-5" id="EstCelular">
                              <label class="custom-control-label" for="EstCelular">Uso educativo del celular</label>
                           </div>  
                      
                  </div>

                  <div class="col-2" >
                  <div class="custom-control custom-checkbox form-5">
                              <input type="checkbox" class="custom-control-input uso-tec-est form-5" id="estPpt">
                              <label class="custom-control-label" for="estPpt">Hacer presentaciones PPT</label>
                           </div>  
                      
                  </div>

                  <div class="col-2" >
                  <div class="custom-control custom-checkbox form-5">
                              <input type="checkbox" class="custom-control-input uso-tec-est form-5" id="estImagenes">
                              <label class="custom-control-label" for="estImagenes">Editar imágenes</label>
                           </div> 
                     
                  </div>

                </div>

                <hr>

                <!--Fila 3 estudiante -->
                <div class="row ml-4">

                  <div class="col-2" >
                    <div class="custom-control custom-checkbox form-5">
                                <input type="checkbox" class="custom-control-input uso-tec-est form-5" id="estPaginasWeb">
                                <label class="custom-control-label" for="estPaginasWeb">Hacer páginas web</label>
                            </div>                      
                  </div>

                  <div class="col-2" >
                    <div class="custom-control custom-checkbox form-5">
                                <input type="checkbox" class="custom-control-input uso-tec-est form-5" id="estjugar">
                                <label class="custom-control-label" for="estjugar">Jugar</label>
                            </div>                       
                  </div>

                  <div class="col-2" >
                    <div class="custom-control custom-checkbox form-5">
                                <input type="checkbox" class="custom-control-input uso-tec-est form-5" id="estRedes">
                                <label class="custom-control-label" for="estRedes">Uso educativo redes sociales</label>
                            </div>
                     
                  </div>

                  <div class="col-2" >
                    <div class="custom-control custom-checkbox form-5">
                                  <input type="checkbox" class="custom-control-input uso-tec-est form-5" id="erstword">
                                  <label class="custom-control-label" for="erstword">Hacer documentos en Word</label>
                              </div>                        
                  </div>

                  <div class="col-2" >
                    <div class="custom-control custom-checkbox form-5">
                                    <input type="checkbox" class="custom-control-input uso-tec-est form-5" id="estFotos">
                                    <label class="custom-control-label" for="estFotos">Tomar fotografías</label>
                               </div>                      
                  </div>

                  <div class="col-2" >
                    <div class="custom-control custom-checkbox form-5">
                                      <input type="checkbox" class="custom-control-input uso-tec-est form-5" id="estProgramar">
                                      <label class="custom-control-label" for="estProgramar">Programar</label>
                                </div>  
                     
                  </div>

                </div>
                
                <hr>

                <!--Fila 4 estudiante -->
                <div class="row ml-4">

                  <div class="col-2" >
                  <div class="custom-control custom-checkbox form-5">
                                      <input type="checkbox" class="custom-control-input uso-tec-est form-5" id="estProyector">
                                      <label class="custom-control-label" for="estProyector">Uso del proyector</label>
                                </div>                     
                  </div>

                  <div class="col-2" >
                    <div class="custom-control custom-checkbox form-5">
                                        <input type="checkbox" class="custom-control-input uso-tec-est form-5" id="estRedesOtro">
                                        <label class="custom-control-label" for="estRedesOtro">Uso de redes sociales</label>
                                  </div>                                       
                  </div>

                  <div class="col-2 text-right" >
                    Otro:
                  </div>

                  <div class="col-6" >
                    <input type="text"  id="txtEstOtro" class="form-control input-tec-txt form-5" placeholder="Escriba otro uso no tipificado" >
                  </div>

                </div>
                <hr>

                <!--Fin de los forumLarios de docente y estudiante-->

                <!--REcursos de la institución-->

                <div   class="row">
                  <div class="col-12 mb-4 ml-2 h6">
                      <span class="badge badge-secondary p-2">Recursos con los que cuenta la institución </span>
                  </div>
                </div>

                <div class="row">

                  <div class="col-6">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-default">Docentes de informática Educativa</span>
                      </div>
                      <input type="number" placeholder="Digite la cantidad"   id="numDocentesIE"   min="0"  value=0 class="form-control input-tec-num form-5" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-default">Laboratorio PRONIE </span>
                      </div>
                      <input type="number" placeholder="Digite la cantidad"    id="numLabPRONIE"  min="0"  value=0  class="form-control input-tec-num form-5" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </div>
                  </div>

                </div>

                <div class="row">

                  <div class="col-6">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-default">Ingeniero de Informática</span>
                      </div>
                      <input type="number" placeholder="Digite la cantidad"  id="numIngenieroInf" min="0" value=0 class="form-control input-tec-num form-5"  aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-default">Proyecto de tecnología </span>
                      </div>
                      <input type="number" placeholder="Digite la cantidad"  id="numProyTecnologia" min="0"  value=0  class="form-control input-tec-num form-5" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </div>
                  </div>

                </div>

                <div class="row">

                  <div class="col-6 input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroup-sizing-default">Laboratorio de innovación</span>
                    </div>
                    <input type="number" placeholder="Digite la cantidad" id="numLabInnovacion" min="0" value=0 class="form-control input-tec-num form-5" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                  </div>

                  <div class="col-6 input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text" >Laboratorio INCO</span>
                    </div>
                    <input type="number" placeholder="Digite la cantidad"  id="numLabINCO" min="0" value = 0 class="form-control input-tec-num form-5" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                  </div>

                </div>
                <br>

                <div class="row">

                  <div class="col-6 input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroup-sizing-default">Nombre de otros laboratorios</span>
                    </div>
                    <input type="text" placeholder="Escriba el nombre" id="txtOtrosLaboratorios" min="0"  class="form-control input-tec-txt form-5" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                  </div>

                  <div class="col-6 input-group">
                  </div>

                </div>
                <br>
                <hr>

                <div class="row">
                  <button id="btn-aprovechamiento-tecnologico" name ="form-5"  class="btn btn-enviar btn-8 form-5" alt = "Guardar" title="Guardar"><i class='fas fa-save' style='font-size:30px'></i></button>
                </div>

              </form>
            </div> <!-- end div card-body -->
          </div>  <!-- div collapseFive -->
        </div>   <!-- div en card five -->

        <!-- fin del collapseFive Aprovechamiento Tecnológico -->

        <!-- Inicio del collapseSix Uso de Tecnología por Iniciativa -->
        <div class="card">

          <div class="card-header card-header-form" id="#iniciativa">
            <h5 class="mb-0">
              <button class="btn btn-link-form text-uppercase" data-toggle="collapse" data-target="#collapseSix" aria-expanded="true" aria-controls="collapseSix">
              Uso de Tecnología por iniciativa <i class="fa fa-plus"></i>
              </button>
            </h5>
          </div>

          <div id="collapseSix" class="collapse" aria-labelledby="#iniciativa" data-parent="#accordion">

            <div id="div-form-tecnologia-iniciativa" class="card-body card-body-form">
              <div id="mensajeIniciativas"><h4>No existen iniciativas asociadas</h4></div>
                <div id="form-iniciativas">
                  <form  id="form-6"  class="" novalidate>
                    <div class="row" >
                      <div class="col-6">
                        <span class="badge badge-secondary p-2">Materias o servicios que más emplean tecnología y frecuencia de uso  </span>
                      </div>
                      <div class="col-1">
                      </div>
                      <div class="col-5">
                        <select class="custom-select" id="selProyectosCE">

                        </select>
                      </div>

                    </div>
                    <br>
                        <!--Fila 1-->
                    <div class="row">

                      <div class="col-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="matEstudiosSociales">Estudios Sociales</label>
                          </div>
                          <select class="custom-select form-6" id="matEstudiosSociales">
                            <option value="No se utiliza" selected> No se utiliza </option>
                            <option value="Una vez por semana">Una vez por semana</option>
                            <option value="Dos veces por semana">Dos veces por semana</option>
                            <option value="Tres veces por semana">Tres veces por semana</option>
                            <option value="Diariamente">Diariamente</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="matFisica">Física</label>
                          </div>
                          <select class="custom-select form-6" id="matFisica">
                            <option value="No se utiliza" selected> No se utiliza </option>
                            <option value="Una vez por semana">Una vez por semana</option>
                            <option value="Dos veces por semana">Dos veces por semana</option>
                            <option value="Tres veces por semana">Tres veces por semana</option>
                            <option value="Diariamente">Diariamente</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="matArtesInd">Artes Industriales</label>
                          </div>
                          <select class="custom-select form-6" id="matArtesInd">
                            <option value="No se utiliza" selected> No se utiliza </option>
                            <option value="Una vez por semana">Una vez por semana</option>
                            <option value="Dos veces por semana">Dos veces por semana</option>
                            <option value="Tres veces por semana">Tres veces por semana</option>
                            <option value="Diariamente">Diariamente</option>
                          </select>
                        </div>
                      </div>

                    </div>

                    <!--Fila 2-->
                    <div class="row">

                      <div class="col-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="matMate">Matemática</label>
                          </div>
                          <select class="custom-select form-6" id="matMate">
                            <option value="No se utiliza" selected> No se utiliza </option>
                            <option value="Una vez por semana">Una vez por semana</option>
                            <option value="Dos veces por semana">Dos veces por semana</option>
                            <option value="Tres veces por semana">Tres veces por semana</option>
                            <option value="Diariamente">Diariamente</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="matQuimica">Química</label>
                          </div>
                          <select class="custom-select form-6" id="matQuimica">
                            <option value="No se utiliza" selected> No se utiliza </option>
                            <option value="Una vez por semana">Una vez por semana</option>
                            <option value="Dos veces por semana">Dos veces por semana</option>
                            <option value="Tres veces por semana">Tres veces por semana</option>
                            <option value="Diariamente">Diariamente</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="matHogar">Educación para el Hogar</label>
                          </div>
                          <select class="custom-select form-6" id="matHogar">
                            <option value="No se utiliza" selected> No se utiliza </option>
                            <option value="Una vez por semana">Una vez por semana</option>
                            <option value="Dos veces por semana">Dos veces por semana</option>
                            <option value="Tres veces por semana">Tres veces por semana</option>
                            <option value="Diariamente">Diariamente</option>
                          </select>
                        </div>
                      </div>

                    </div>

                    <!--Fila 3-->
                    <div class="row">

                      <div class="col-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="matCiencias">Ciencias</label>
                          </div>
                          <select class="custom-select form-6" id="matCiencias">
                            <option value="No se utiliza" selected> No se utiliza </option>
                            <option value="Una vez por semana">Una vez por semana</option>
                            <option value="Dos veces por semana">Dos veces por semana</option>
                            <option value="Tres veces por semana">Tres veces por semana</option>
                            <option value="Diariamente">Diariamente</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="matEsp">Español</label>
                          </div>
                          <select class="custom-select form-6" id="matEsp">
                            <option value="No se utiliza" selected> No se utiliza </option>
                            <option value="Una vez por semana">Una vez por semana</option>
                            <option value="Dos veces por semana">Dos veces por semana</option>
                            <option value="Tres veces por semana">Tres veces por semana</option>
                            <option value="Diariamente">Diariamente</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="matCivica">Cívica </label>
                          </div>
                          <select class="custom-select form-6" id="matCivica">
                            <option value="No se utiliza" selected> No se utiliza </option>
                            <option value="Una vez por semana">Una vez por semana</option>
                            <option value="Dos veces por semana">Dos veces por semana</option>
                            <option value="Tres veces por semana">Tres veces por semana</option>
                            <option value="Diariamente">Diariamente</option>
                          </select>
                        </div>
                      </div>

                    </div>

                    <!--Fila 4-->
                    <div class="row">

                      <div class="col-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="matBiologia">Biología</label>
                          </div>
                          <select class="custom-select form-6" id="matBiologia">
                            <option value="No se utiliza" selected> No se utiliza </option>
                            <option value="Una vez por semana">Una vez por semana</option>
                            <option value="Dos veces por semana">Dos veces por semana</option>
                            <option value="Tres veces por semana">Tres veces por semana</option>
                            <option value="Diariamente">Diariamente</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="matBiblio">Biblioteca</label>
                          </div>
                          <select class="custom-select form-6" id="matBiblio">
                            <option value="No se utiliza" selected> No se utiliza </option>
                            <option value="Una vez por semana">Una vez por semana</option>
                            <option value="Dos veces por semana">Dos veces por semana</option>
                            <option value="Tres veces por semana">Tres veces por semana</option>
                            <option value="Diariamente">Diariamente</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="matMusica">Música </label>
                          </div>
                          <select class="custom-select form-6" id="matMusica">
                            <option value="No se utiliza" selected> No se utiliza </option>
                            <option value="Una vez por semana">Una vez por semana</option>
                            <option value="Dos veces por semana">Dos veces por semana</option>
                            <option value="Tres veces por semana">Tres veces por semana</option>
                            <option value="Diariamente">Diariamente</option>
                          </select>
                        </div>
                      </div>

                    </div>

                    <!--Fila 5-->
                    <div class="row">

                      <div class="col-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="matReligion">Religión</label>
                          </div>
                          <select class="custom-select form-6" id="matReligion">
                            <option value="No se utiliza" selected> No se utiliza </option>
                            <option value="Una vez por semana">Una vez por semana</option>
                            <option value="Dos veces por semana">Dos veces por semana</option>
                            <option value="Tres veces por semana">Tres veces por semana</option>
                            <option value="Diariamente">Diariamente</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="matVocacional">Plan Vocacional</label>
                          </div>
                          <select class="custom-select form-6" id="matVocacional">
                            <option value="No se utiliza" selected> No se utiliza </option>
                            <option value="Una vez por semana">Una vez por semana</option>
                            <option value="Dos veces por semana">Dos veces por semana</option>
                            <option value="Tres veces por semana">Tres veces por semana</option>
                            <option value="Diariamente">Diariamente</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="matCindea">CINDEA e IPEC </label>
                          </div>
                          <select class="custom-select form-6" id="matCindea">
                            <option value="No se utiliza" selected> No se utiliza </option>
                            <option value="Una vez por semana">Una vez por semana</option>
                            <option value="Dos veces por semana">Dos veces por semana</option>
                            <option value="Tres veces por semana">Tres veces por semana</option>
                            <option value="Diariamente">Diariamente</option>
                          </select>
                        </div>
                      </div>

                    </div>

                    <!--Fila 6-->
                    <div class="row">

                      <div class="col-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="matArtesPlast">Artes Plásticas</label>
                          </div>
                          <select class="custom-select form-6" id="matArtesPlast">
                            <option value="No se utiliza" selected> No se utiliza </option>
                            <option value="Una vez por semana">Una vez por semana</option>
                            <option value="Dos veces por semana">Dos veces por semana</option>
                            <option value="Tres veces por semana">Tres veces por semana</option>
                            <option value="Diariamente">Diariamente</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="matBibliocra">BiblioCRA</label>
                          </div>
                          <select class="custom-select form-6" id="matBibliocra">
                            <option value="No se utiliza" selected> No se utiliza </option>
                            <option value="Una vez por semana">Una vez por semana</option>
                            <option value="Dos veces por semana">Dos veces por semana</option>
                            <option value="Tres veces por semana">Tres veces por semana</option>
                            <option value="Diariamente">Diariamente</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="matCimatBiblioDigitalvica">Biblioteca Digital </label>
                          </div>
                          <select class="custom-select form-6" id="matBiblioDigital">
                            <option value="No se utiliza" selected> No se utiliza </option>
                            <option value="Una vez por semana">Una vez por semana</option>
                            <option value="Dos veces por semana">Dos veces por semana</option>
                            <option value="Tres veces por semana">Tres veces por semana</option>
                            <option value="Diariamente">Diariamente</option>
                          </select>
                        </div>
                      </div>

                    </div>
                    <br>

                    <div class="row">
                      <div class="col-12">
                        <div class="form-group">
                          <label for="txaDetalleProyecto "> Descripción detallada del proyecto </label>
                          <textarea class="form-control input-tec-txt form-6" id="txaDetalleProyecto" rows="3"></textarea>
                        </div>
                      </div>

                    </div>
                    <br>

                    <div class="row">
                      <div class="col-12">
                        <button  id="btn-usoTecPorProyecto"  class="btn btn-enviar btn-9 form-6" alt = "Guardar" title="Guardar" disabled>
                          <i class='fas fa-save' style='font-size:30px'></i>
                        </button>
                      </div>

                    </div>
                    <br>

                  </form>
                </div>
            </div>

          </div> <!-- Fin del collapseSix Uso de Tecnología por Iniciativa -->

        </div> <!-- div en card Six -->

      </div>    <!-- fin del acordion-->

      <div class="div-shadow invisible">
        <img class="img-ajax-loading" src="../../images/ajax-loader.gif" alt="Loading">
      </div>
      
      <div class="modal animated" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>      
      
      <?php
      if (isset($_GET['nombre'])) { ?>
        <script type="text/javascript">
        
          var nombre = '<?php echo $nombre;?>'
          var codigo = '<?php echo $codigo;?>'
          var id = '<?php echo $id;?>'
          var completo = "(COD: "+codigo+") -"+nombre+"- [ID: "+id+"]";
          console.log(completo);
          $("#miConsulta").val(completo);
          setTimeout(
              function() 
              {
                $("#btnSend").trigger("click");
              }, 1000);
          
        </script>
         <?php 
         }
      ?>
    </body>
</html>
