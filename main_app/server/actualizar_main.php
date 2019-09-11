<?php
include "actualizar_seccion.php";
include "actualizarGenerico.php";
include "conexion.php";
function desconectar($conexion){

   $close = mysqli_close($conexion);

       if($close){
           echo '';
       }else{
           echo 'Ha sucedido un error inexperado en la desconexion de la base de datos';
       }

   return $close;
}
$tabla = $_GET['tabla'];
$id = $_GET['id'];
$conexion = conectarDB();

switch ($tabla) {
    case "centro_educativo":
    $archivo= $_POST['lleva'];
    if ($archivo=="true") {
          $archivoInventario = normalizarNombre($_FILES['form_url_inventario']['name']);
       } else {
        $archivoInventario=$_POST['ruta_archivo'];   
       }
       actualizarCentro($_POST,$tabla,$id,$conexion,$archivoInventario); 
           
        break;
    case "proyectos":
            actualizarProyecto($_POST, $tabla,$id,$conexion);
        break;

        case "infraestructura":
            actualizarInfraestructura($_POST, $tabla,$id,$conexion);
    break;
    case "usuarios":
            actualizarUsuario($_POST, $tabla,$id,$conexion);
    break;
    case "modalidad_educativa":
        actualizarModalidad($_POST, $tabla,$id,$conexion);
    break;
        case "iniciativas":
        actualizarIniciativas($_POST, $tabla,$id,$conexion);
    break;

    case "equipamiento_conectandonos":
        actualizarConectandonos($_POST, $tabla,$id,$conexion);
    break;
    case "equipamiento_donacion":
        actualizarDonacion($_POST, $tabla,$id,$conexion);
    break;
        case "equipamiento_fonatel":
        actualizarFonatel($_POST, $tabla,$id,$conexion);
    break;
        case "equipamiento_transferencia":
        actualizarTransferencia($_POST, $tabla,$id,$conexion);
    break;
        case "capacitaciones":
        actualizarCapacitaciones($_POST, $tabla,$conexion,$id);
    break;
        case "asesoria2":
        actualizarAsesoria($_POST, $tabla,$conexion,$id);
    break;

    default:
    echo "valor fuera de rango..";
}
desconectar($conexion); 

function normalizarNombre($archivo)
{
   $fecha=strftime( "%Y-%m-%d-%H-%M-%S", time() );
   $nombreArchivo  = $fecha.basename($archivo, ".pdf");
   $directorio = "../../files/";

   $nombreArchivo = preg_replace("/[^A-Za-z0-9_-]/", "", $nombreArchivo).".pdf";
   if(move_uploaded_file($_FILES['form_url_inventario']['tmp_name'], $directorio.$nombreArchivo)) {
            return $directorio.$nombreArchivo;
   }
}
?>
