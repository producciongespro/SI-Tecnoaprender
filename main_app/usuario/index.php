<?php
  session_start();
 if(!isset($_SESSION["usuario"])){ //Si no ha iniciado sesión redirecciona a index.php
   		header("Location: ../../index.php");
   }
  //  elseif ($_SESSION['tipo'] != 2) {  //debe ser tipo administrador
  //      	header("Location: ../../index.php");
  //      }
?>

<!DOCTYPE html>
<html lang="es" dir="ltr">
<meta charset="utf-8">

<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet" href="../../vendor/bootstrap-4.1/css/bootstrap.min.css">
<!-- <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.5.0/css/all.css' integrity='sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU' crossorigin='anonymous'> -->
<link rel='stylesheet' href='../../lib/fontawesome/css/all.css'>
<link rel="stylesheet" href="https://jqueryvalidation.org/files/demo/site-demos.css">
<link rel="stylesheet" href="../../vendor/alertify/css/alertify.min.css">
<link rel="stylesheet" href="../../vendor/alertify/css/themes/default.css">
<!-- <link rel="stylesheet" href="../../css/default.css"> -->

<script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.js" charset="utf-8"></script>
<script src="../../vendor/jquery-3.3.1/jquery-3.3.1.min.js" charset="utf-8"></script>
<script src="../../vendor/bootstrap-4.1/js/bootstrap.min.js" charset="utf-8"></script>
<script src="../../vendor/dist/jquery.validate.js"></script>
<script src="../../vendor/dist/additional-methods.min.js"></script>
<script src="../../vendor/alertify/alertify.min.js"></script>

    <script src="../../js/menu_admin.js" charset="utf-8"></script>

  <head>
    <meta charset="utf-8">
    <title>Administración</title>
  </head>
  <body>
    <div class="container">
      <div class="container" id="container-menu">
      </div>
      <div class="container">
        <footer class="py-3 bg-footer">
          <div class="container col-sm-12">
            <div class="row">
              <div class="col-sm-12 text-right col-sm-offset-1 jumbotron jumbo-header">
                  <span class="creditos-footer" id="text-footer">©2019 Ministerio de Educacion Pública de Costa Rica. Todos los derechos reservados<br>Desarrollado por DRTE-GESPRO</span>
              </div>
            </div>
          </div>
        </footer> <!-- Footer -->
      </div>
    </div>
  </body>
</html>
