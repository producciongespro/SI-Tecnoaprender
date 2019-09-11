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
          console.log("tipo de usuario", tipo);            
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

<script src="../../js/centro_educativo_director.js"></script>

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
    <div class="jumbotron jumbotron-header">
      <br>
      <h1 class="display-6 jumbotron-title float-right">SISTEMA DE</h1>  
      <br>
      <h1 class="display-6 jumbotron-title font-blue float-right">INFORMACION</h1>  
      <hr class="hr-white my-6">
    </div>
    <nav class="navbar navbar-main navbar-expand-lg navbar-dark titulo-tab">
    <a class="navbar-brand" href="#"><img src="../../images/logo-mep.png" height="45" class="d-inline-block align-top" alt="mdb logo"></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          CENTRO EDUCATIVO
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">

          <?php
            if ($_SESSION["tipo_usuario"]  == "2"  ) {
              echo "<a class='dropdown-item' href='#' class='botones_menu' id='btnConsultaDirector'>Consultar mi institución</a>";
            } else {
              echo "<a class='dropdown-item' href='#' class='botones_menu' id='consultar'>Consultar</a>";
            }

          ?>

            
            <?php          

                  switch ($_SESSION["tipo_usuario"]) {
                    case "1":
                          echo "<a class='dropdown-item' href='#' class='botones_menu' id='agregar'>Agregar</a>";  
                        break;
                    case "7":
                          echo "<a class='dropdown-item' href='#' class='botones_menu' id='agregar'>Agregar</a>";  
                        break;
                    case "8":
                          echo "<a class='dropdown-item' href='#' class='botones_menu' id='agregar'>Agregar</a>";  
                        break;
                    case "9":
                        echo "<a class='dropdown-item' href='#' class='botones_menu' id='agregar'>Agregar</a>";  
                      break;                     
                    default:
                        //Fuera de rango
                }


            ?>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          ASESORÍA</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown1">
            <?php
            //Si es director renderiza el link para validar visitas
              if ($_SESSION["tipo_usuario"]  != "2"  ) {
                echo "<a href='#' class='dropdown-item' id='agregarAsesoria'>Ingresar registro</a>";
              }
            ?>
            <?php
              //Si es director renderiza el link para validar visitas

                switch ($_SESSION["tipo_usuario"] ) {
                  case "1":
                      //admin El administrador puede ver todos los resportes de visita de todos los asesores
                        echo "<a href='#' class='dropdown-item' id='verAsesorias'>Ver registros</a>";
                    break;   
                  case "2":
                      //Director lo envía a validar asesoria
                      echo "<a href='../directores/validar_asesoria.php' class='dropdown-item' id='validarAsesorias'>Validar asesorías</a>";
                      break;
                  case "6":
                    //Al asesor lo envia a ver los informes solamente de él
                    echo "<a href='../asesores/reporte_asesorias.php' class='dropdown-item'>Ver registros</a>";
                      break;
                  case "8":
                    // Super usuario  El administrador puede ver todos los resportes de visita de todos los asesores
                      echo "<a href='#' class='dropdown-item' id='verAsesorias'>Ver registros</a>";
                      break;
                  case "9":
                      // Super usuario  El administrador puede ver todos los resportes de visita de todos los asesores
                        echo "<a href='#' class='dropdown-item' id='verAsesorias'>Ver registros</a>";
                        break;  
                  default:
                      echo "Opción fuera de rango";
              } 
            ?>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          REPORTES
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown2">
            <?php
                  if ($_SESSION["tipo_usuario"]  != "2"  ) {
                      echo "<a class='dropdown-item' href='reportes.php'  id='reportes' class='botones_menu' >General</a>";
              }
            ?>
            <a href="#" class='dropdown-item' id="usos" class="botones_menu">Usos por materia</a>
            <?php
                  if ($_SESSION["tipo_usuario"]  != "2"  ) {
                      echo "<a class='dropdown-item' href='#' id='centros' class='botones_menu'>Centros educativos</a>";
              }
            ?>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          MANTENIMIENTO
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown3">
      
            <?php          

              switch ($_SESSION["tipo_usuario"]) {
                case '1':
                case '8':
                    echo "<a href='#' class='dropdown-item ' id='usuarios' >Usuarios</a>";
                    echo "<a href='#' class='dropdown-item ' id='iniciativas' >Iniciativas</a>";
                    echo "<a href='#' class='dropdown-item ' id='modalidades' >Modalidades</a>";  
                break;
                case '6':
                  echo "<a href='#' class='dropdown-item' >  Función no disponible </a>";  
                break; 
                case '9':
                echo "<a href='#' class='dropdown-item' >  Función no disponible </a>";  
                break;                  
                
                default:
                    echo "<a href='#' class='dropdown-item' >  Función no disponible </a>";  
                break;
              }

            
        
          ?>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown4" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          CAPACITACIONES Y EVENTOS
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown4">
          <?php
               //echo $_SESSION["tipo_usuario"];
                switch ($_SESSION["tipo_usuario"]) {
                  case '1':
                  case '8':
                      echo "<a href='#' class='dropdown-item' id='capacitaciones'>Ver/Agregar capacitaciones</a>";
                  break;                  
                  case '6':                  
                    echo "<a href='#' class='dropdown-item' id='capacitaciones' >Ver capacitaciones</a>";
                  break;
                  case '9':
                    echo "<a href='#' class='dropdown-item' id='capacitaciones'>Ver/Agregar capacitaciones</a>";
                  break; 
                  
                  default:
                      echo "<a href='#' class='dropdown-item' >  Función no disponible </a>";  
                    break;
                }
        ?>        
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link acerca-de" href="#">ACERCA DE</a>
        </li>

        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          <i class="fas fa-user"></i></a>
        <div class="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
          <a  class="dropdown-item" href="#">
              <i class="fas fa-tag"></i>
                Tipo de usuario:
                <?php
                         switch ($_SESSION["tipo_usuario"]) {
                          case "1":
                                echo '<span>Administrador</span>';
                              break;
                            case "2":
                              echo '<span>Director</span>';
                            break;
                            case "4":
                              echo '<span>Bibliotecólogo</span>';
                            break;
                            case "6":
                                echo '<span>Asesor pedagógico</span>';
                              break;
                          case "7":
                                echo '<span>Secretario</span>';
                              break;
                          case "8":
                                echo '<span>Super administrador</span>';
                              break;
                          case "9":
                              echo '<span> Asesor Editor </span>';
                            break;                     
                          default:
                              echo '<span>Usuario desconocido</span>';
                      }
                
                ?>
            </a>
          <a class="dropdown-item" id="divUsuario" href="#"></a>          
          <a  class="dropdown-item"  href="../server/login/logout.php" title="Cerrar sesión"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</a>
        </div>
      </li>
      </ul>
    
    </div>
  
    <!-- </div> -->
  </nav>
  <img class="img-body" src="../../images/logo-tecnoaprender.png" alt="Logo">
</div>
<div class="modal animated" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>      
</body>
</html>

