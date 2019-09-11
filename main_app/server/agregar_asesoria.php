<?php
  include "conexion.php";
   $fecha=strftime( "%Y-%m-%d-%H-%M-%S", time() );
   $id_CE = utf8_decode($_POST['id_CE']);
   $medio_visita = utf8_decode($_POST['medio_visita']);
   $fecha = utf8_decode($_POST['fecha']);
   $objetivos = utf8_decode($_POST['objetivos']);
   $observaciones = utf8_decode($_POST['observaciones']);
   $recomendacion_asesor = utf8_decode($_POST['recomendacion_asesor']);
   $correo_asesor = utf8_decode($_POST['correo_asesor']);

   $recomendacion_dr = utf8_decode($_POST['recomendacion_dr']);
   $tipo_atencion = utf8_decode($_POST['tipo_atencion']);
   if ($_POST['llevaArchivo']=="true"){
    $info = new SplFileInfo($_FILES['archivo']['name']);
    $extension = $info->getExtension();
    $archivo  = $fecha.basename($_FILES['archivo']['name'], ".$extension");
    echo $archivo;
    $directorio = "../../visitas/";
 
   $archivo = preg_replace("/[^A-Za-z0-9_-]/", "", $archivo).".$extension";
      if(move_uploaded_file($_FILES['archivo']['tmp_name'], $directorio.$archivo)) {
      $urlArchivo = $directorio.$archivo;
 }
   }
    else {
      $urlArchivo = "pepito"; 
  }


/*$urlArchivo = $directorio.$archivo;*/
  $mysqli = conectarDB();
    mysqli_query($mysqli,"INSERT INTO asesoria2 (id_CE, medio_visita, fecha, objetivos, observaciones, recomendacion_asesor, correo_asesor, url_archivo, recomendacion_dr, tipo_atencion, estado_asesoria, observaciones_director ) VALUES 
    ( '$id_CE', '$medio_visita', '$fecha',  '$objetivos', '$observaciones', '$recomendacion_asesor', '$correo_asesor', '$urlArchivo', '$recomendacion_dr', '$tipo_atencion', 'pendiente', ' ')") or die ("Problemas al añadir elementos a la BD".mysqli_error($mysqli)); 
		$errors = array();
?>