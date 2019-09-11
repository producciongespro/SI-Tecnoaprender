<?php
  header("Content-type:text/html;charset=\"utf-8\"");
  require 'conexion.php';
  include 'registrar_evento.php';
  // $id_usuario = $_POST['id_usuario'];
  // $id_intervencion = $_POST['id_intervencion'];
  // $id_solicitante = $_POST['id_solicitante'];
  // $id_solicitud = $_POST['id_solicitud'];
  // $id_respuesta = $_POST['id_respuesta'];
  // $tema = utf8_decode($_POST['tema']);
  // $fecha_solicitud = $_POST['fecha1'];
  // $fecha_respuesta = $_POST['fecha2'];

  $id_usuario = 1;
  $id_intervencion = 2;
  $id_solicitante = 2;
  $id_solicitud = 1;
  $id_respuesta = 3;
  $tema = "Prueba";
  $fecha_solicitud = "2019-03-11";
  $fecha_respuesta = "2019-03-12";

sleep(1);
    $mysqli = conectarDB();

      mysqli_query($mysqli,"INSERT INTO consultas (id_usuario,id_intervencion,id_solicitante,id_solicitud,id_respuesta,tema,fecha_solicitud,fecha_respuesta) VALUES
                                              ('$id_usuario','$id_intervencion','$id_solicitante','$id_solicitud','$id_respuesta','$tema','$fecha_solicitud','$fecha_respuesta')") or die ("Problemas al a���adir elementos a la BD".mysqli_error($mysqli));

    $rs = mysqli_query($mysqli,"SELECT id_consulta, id_usuario from consultas ORDER BY id_consulta DESC LIMIT 1");
        if ($row = mysqli_fetch_row($rs)) {
        $id_ultimo = trim($row[0]);
        $usuario = trim($row[1]);
        }

registrarBitacora($mysqli,$usuario,"Ingreso",$id_ultimo,"Consulta");

mysqli_close($mysqli);
?>
