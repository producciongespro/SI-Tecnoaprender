<?php
  header("Content-type:text/html;charset=\"utf-8\"");
  // require 'conexion.php';

function registrarBitacora($mysqli,$usuario,$evento,$id_registro,$nombre){

    // $mysqli = conectarDB();

      mysqli_query($mysqli,"INSERT INTO bitacora (usuario,evento,id_registro,nombre) VALUES
                                              ('$usuario','$evento','$id_registro','$nombre')") or die ("Problemas al añadir elementos a la BD".mysqli_error($mysqli));



}
?>
