<?php
header("Content-type:text/html;charset=\"utf-8\"");
$elemento = $_POST['id_elemento'];
$donde = $_POST['tabla'];
//$elemento = "10";
//$donde = "consultas";
$sql = "DELETE FROM `capacitaciones` WHERE `cod_cap` = '$elemento'";
//echo $elemento;
$servername = "localhost";
$username = "prueba_gespro";
$password = "Hola123Gespro";
$dbname = "prueba_tecnoaprender";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if ($conn->query($sql) === TRUE) {
    echo json_encode(array('error'=>'false','msj'=>"Elemento eliminado satisfactoriamente."));
} else {
    echo json_encode(array('error'=>'true','msj'=>"Error al intentar borrar $elemento de $donde el elemento. Por favor intente más tarde."));
}

$conn->close();
?>