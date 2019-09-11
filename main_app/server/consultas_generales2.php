<?php
$sql= "SELECT * FROM centro_educativo INNER JOIN proyectos ON centro_educativo.id=proyectos.id_CE INNER JOIN claves_booleanas ON claves_booleanas.id=centro_educativo.internet INNER JOIN estados_internet ON estados_internet.id=centro_educativo.estado_conexion INNER JOIN iniciativas ON iniciativas.id=proyectos.id_iniciativa INNER JOIN modalidad_educativa ON centro_educativo.id_modalidad_educativa=modalidad_educativa.id";
include "conexion.php";
sleep(1);
function desconectar($conexion){

    $close = mysqli_close($conexion);

        if($close){
            echo '';
        }else{
            echo 'Ha sucedido un error inexperado en la desconexion de la base de datos
';
        }

    return $close;
}

function obtenerArreglo($sql){
    //Creamos la conexion con la funcion anterior
  $conexion = conectarDB();

    //generamos la consulta

        mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

    if(!$resultado = mysqli_query($conexion, $sql)) die(); //si la conexión cancelar programa

    $arreglo = array(); //creamos un array

    //guardamos en un array todos los datos de la consulta
    $i=0;

    while($row = mysqli_fetch_assoc($resultado))
    {
        $arreglo[$i] = $row;
        $i++;
    }

    desconectar($conexion); //desconectamos la base de datos

    return $arreglo; //devolvemos el array
}

        $r = obtenerArreglo($sql);
        echo json_encode($r);

?>