<?php
$sql= "SELECT centro_educativo.id, centro_educativo.cod_pres, centro_educativo.coordenada_x, centro_educativo.coordenada_y, centro_educativo.institucion, centro_educativo.provincia, centro_educativo.direccion_regional, centro_educativo.telefono, centro_educativo.matricula_h, centro_educativo.matricula_m, centro_educativo.enlace_nombre, modalidad_educativa.modalidad, usuarios.nombre, claves_booleanas.valor FROM centro_educativo INNER JOIN modalidad_educativa ON modalidad_educativa.id=centro_educativo.id_modalidad_educativa INNER JOIN claves_booleanas ON claves_booleanas.id=centro_educativo.internet INNER JOIN usuarios ON usuarios.id=centro_educativo.id_asesor_enlace";
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