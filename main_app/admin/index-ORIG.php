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

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="../../vendor/bootstrap-4.1.3/css/bootstrap.min.css">

    <link rel='stylesheet' href='../../lib/fontawesome/css/all.css'>
    <link rel="stylesheet" href="https://jqueryvalidation.org/files/demo/site-demos.css">
    <link rel="stylesheet" href="../../vendor/alertify/css/alertify.min.css">
    <link rel="stylesheet" href="../../vendor/alertify/css/themes/default.css">


<script>
      var idCE = '<?php echo $_SESSION["id_CE"]?>';      
            console.log("id CE", idCE);      
      var tipo = '<?php echo $_SESSION["tipo_usuario"]?>';
          console.log("tipo", tipo);      

</script>



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
<script src="../../js/menu_admin.js" charset="utf-8"></script>
<script  src="../../js/acercade.js"></script>
<link rel="stylesheet" href="../../css/main.css">

  <head>
    <meta charset="utf-8">
    <title>Administración</title>
  </head>
	
<body>
  <div class="container-fluid">
    <div class="row row-header">
      <div class="col-sm-2">
        <div class="col clearfix">
          <span id="cd-logo" class="float-left"><a href="#0"><img src="../../images/logo-tecnoaprender.png" alt="Logo"></a></span>
          <!-- <span class="text-center">Sistema de Información</span> -->
        </div>
      </div>
      <div class="col-sm-8">
        <br>
        <div class="col clearfix"><span class="text-white text-center text-uppercase ">SISTEMA DE INFORMACION</span>
        </div>
      </div>
      <div id="divInfo" class="text-white text-right logout col-sm-2">
      </div>
      </div>
    </div>
    <div class="row credenciales-inicio">
      <div class="col-sm-12 clearfix">
        <span id="divUsuario"  class="float-left"></span>
        <span id="divCerrar" class="float-right"></span>
      </div>
    </div>
  <div class="row "> 
      <div class="col-sm-12 col-img">
        <img class="img-row" src="../../images/computer-plus.jpg" alt="imagen de fondo">
      </div>
  </div>
  <div class="row row-opciones">
    <div class="col col-tab-menu">
      <div class="titulo-tab">CENTRO EDUCATIVO</div>
      <div class="opciones">
        <p><a href="#" class="botones_menu" id="consultar">Consultar/Editar</a></p>
         <?php
                if ($_SESSION["tipo_usuario"]  != "2"  ) {
                    echo "<p><a href='#' class='botones_menu' id='agregar'>Agregar</a></p>";
                }
        ?>
      </div>
    </div>
    <div class="col col-tab-menu">
      <div class="titulo-tab">ASESORÍA</div>
      <div class="opciones">

      <?php
        //Si es director renderiza el link para validar visitas
            if ($_SESSION["tipo_usuario"]  != "2"  ) {
              echo "<p><a href='#' class='botones_menu' id='agregarAsesoria'>Ingresar registro</a></p>";
            }
        ?>
        

        <?php
        //Si es director renderiza el link para validar visitas

        switch ($_SESSION["tipo_usuario"] ) {
          case "1":
              //admin El administrador puede ver todos los resportes de visita de todos los asesores
                echo "<p><a href='#' class='botones_menu' id='verAsesorias'>Ver registros</a></p>";
             break;   
          case "2":
              //Director lo envía a validar asesoria
              echo " <p><a href='../directores/validar_asesoria.php' class='botones_menu' id='validarAsesorias'>Validar asesorías</a></p>";
              break;
          case "6":
            //Al asesor lo envia a ver los informes solamente de él
            echo "<p><a href='../asesores/reporte_asesorias.php' class='botones_menu'>Ver mis registros</a></p>";
              break;
          case "8":
            // Super usuario  El administrador puede ver todos los resportes de visita de todos los asesores
              echo "<p><a href='#' class='botones_menu' id='verAsesorias'>Ver registros</a></p>";
              break; 
          default:
              echo "Opción fuera de rango";
      } 
      ?>


        
      </div>
    </div>
    <div class="col col-tab-menu">
      <div class="titulo-tab">REPORTES</div>
      <div class="opciones">
           <?php
                if ($_SESSION["tipo_usuario"]  != "2"  ) {
                    echo "<p><a href='reportes.php'  id='reportes' class='botones_menu' >General</a></p>";
            }
        ?>
        <p><a href="#" id="usos" class="botones_menu">Usos por materia</a></p>
         <?php
                if ($_SESSION["tipo_usuario"]  != "2"  ) {
                    echo "<p><a href='#' id='centros' class='botones_menu'>Centros educativos</a></p>";
            }
        ?>
      </div>
    </div>
    <div class="col col-tab-menu">
      <div class="titulo-tab">MANTENIMIENTO</div>
      <div class="opciones">
        <!-- <?php if ($_SESSION["id_tipo"]==7) {  ?> -->
          
          <!-- <?php } ?> -->
          <?php
                if ($_SESSION["tipo_usuario"]  != "2"  ) {
                    echo "<p><a href='#' id='usuarios' class='botones_menu'>Usuarios</a></p>";
                    echo "<p><a href='#' id='iniciativas' class='botones_menu'>Iniciativas</a></p>";
                    echo "<p><a href='#' id='modalidades' class='botones_menu'>Modalidades</a></p>";
                }
        ?>
      </div>
    </div>
    <div class="col col-tab-menu">
      <!-- <div class="p-2 flex-option bg-c2"> -->
      <div class="titulo-tab">CAPACITACIONES Y EVENTOS</div>
      <div class="opciones">
          <?php
                if ($_SESSION["tipo_usuario"]  != "2"  ) {
                    echo "<p><a href='#' id='capacitaciones' class='botones_menu'>Ver/Agregar capacitaciones</a></p>";
                }
        ?>
        <!-- <p id="" class="botones_menu">Agregar participantes</p> -->
      </div>      
    </div>
  </div>
  <div class="row">
    <div class="col clearfix">
  </div>
  <div class="modal animated" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>      

</body>
</html>

