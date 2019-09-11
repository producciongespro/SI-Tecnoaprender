<?php
function actualizar_tabla($tabla, $id, $valores, $conexion) {
    $tableName = $tabla;
    //do some validation here to check if proper data is being passed like
    if(!isarray($valores)) {
        throw new Exception('argument two $columns should be an associative array');
    }
    include_once 'conexion.php';
    $query  = 'UPDATE ' . $tableName;
    foreach($valores as $column => $data) {
        $query .= ' SET ' . $column . ' = ' . $data . ', ';
    }
    //remove last comma from the update query string
    $query = substr($query, 0, -1);
    $query .= ' WHERE ' . $id['column'] . ' = ' . $id['value'];
    mysqli_query($conexion,$query);
    //$execute = DatabaseConnector::ExecuteQuery($query);
}

?>