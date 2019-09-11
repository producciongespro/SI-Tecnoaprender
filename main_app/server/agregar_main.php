<?php
include "agregar_seccion.php";
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


echo ($tabla);
$conexion = conectarDB();

switch ($tabla) {
    case "centro_educativo":
            $archivo= $_POST['lleva'];
            if ($archivo=="true") {
                $archivoInventario = normalizarNombre($_FILES['form_url_inventario']['name']);
            } else {
                $archivoInventario=$_POST['ruta_archivo'];   
            }
            incluirCentro($_POST, $archivoInventario, $tabla, $conexion);
        break;
    case "proyectos":
            $id = $_GET['id'];
            incluirTecnoaprender($_POST, $tabla, $conexion, $id);
        break;
    case "uso_equipo":
            $id = $_GET['id'];
            incluirUsoEquipo($_POST, $tabla,$conexion,$id);
            
    break;
        case "infraestructura":
            $id = $_GET['id'];
            incluirInfraestructura($_POST, $tabla,$conexion, $id);
    break;

        case "uso_materias":
            $id = $_GET['id'];
            incluirUsoTecnologia($_POST, $tabla , $conexion, $id);
    break;
        case "iniciativas":
            incluirIniciativa($_POST, $tabla , $conexion);
    break;
        case "modalidad_educativa":
            incluirModalidad($_POST, $tabla , $conexion);
    break;

    case "equipamiento_conectandonos":
        $id = $_GET['id'];
        incluirConectandonos($_POST, $tabla , $conexion, $id);
    break;
    case "equipamiento_donacion":
        $id = $_GET['id'];
        incluirDonacion($_POST, $tabla , $conexion, $id);
    break;
    case "equipamiento_fonatel":
        $id = $_GET['id'];
        incluirFonatel($_POST, $tabla , $conexion, $id);
    break;
    case "equipamiento_transferencia":
        $id = $_GET['id'];
        incluirTransferencia($_POST, $tabla, $conexion, $id);
    break;
    case "capacitaciones":
        incluirCapacitaciones($_POST, $tabla , $conexion);
    break;
    case "capacitaciones_participantes":
        incluirParticipante($_POST, $tabla , $conexion);
    break;
    case "asesoria2":
    incluirAsesoria($_POST, $tabla , $conexion);
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
