<?php
  
   function actualizarCentro($valores,$tabla,$id,$conexion,$archivo)
   {
     $archivo_inventario = $archivo;
     $cod_pres = $valores[ 'form_cod_pres'];
     $institucion =  utf8_decode($valores[ 'form_institucion']); 
     $regional =  utf8_decode($valores[ 'form_direccion_regional']);
     $circuito = $valores[ 'form_circuito'];  
     $correo = $valores[ 'form_correo'];
     $provincia =  utf8_decode($valores[ 'form_provincia']);
     $canton =  utf8_decode($valores[ 'form_canton']);
     $distrito =  utf8_decode($valores[ 'form_distrito']); 
     $poblado = $valores[ 'form_poblado'];
     $coordenada_x = $valores[ 'form_coordenada_x'];
     $coordenada_y = $valores[ 'form_coordenada_y']; 
     $telefono = $valores[ 'form_telefono']; 
     $fax = $valores[ 'form_fax'];
     $modalidad_educativa = $valores['form_id_modalidad_educativa'];
     $centro_indigena = $valores[ 'form_centro_indigena'];
     $bachillerato_internacional = $valores[ 'form_bachillerato_internacional'];
     $edificio_compartido  = $valores['form_edificio_compartido'];
     $internet = $valores[ 'form_internet'];
     $velocidad = $valores[ 'form_velocidad'];
     $estado_conexion = $valores[ 'form_estado_conexion'];
     $matricula_h = $valores[ 'form_matricula_h'];
     $matricula_m = $valores[ 'form_matricula_m'];
     $cantidad_grupos = $valores['form_cantidad_grupos']; 
     $cantidad_docentes = $valores[ 'form_cantidad_docentes'];
     $total_pabellones = $valores[ 'form_total_pabellones']; 
     $total_aulas = $valores[ 'form_total_aulas'];
     $enlace_nombre = utf8_decode($valores[ 'form_enlace_nombre']);
     $enlace_cedula = $valores[ 'form_enlace_cedula'];
     $enlace_telefono = $valores[ 'form_enlace_telefono'];
     $enlace_correo = $valores[ 'form_enlace_correo'];
     $enlace_especialidad = utf8_decode($valores[ 'form_enlace_especialidad']);
     $enlace_condicion = utf8_decode($valores[ 'form_enlace_condicion']);
     $id_asesor_enlace = $valores[ 'form_id_asesor_enlace'];
     $equipamiento =  $valores[ 'equipamiento'];
     $actualizado_por =  $valores[ 'form_actualizado_por'];
    
     mysqli_query($conexion,"UPDATE `$tabla` SET `cod_pres`='$cod_pres',`institucion`='$institucion',`id_modalidad_educativa`='$modalidad_educativa',`centro_indigena`='$centro_indigena',`bachillerato_internacional`='$bachillerato_internacional',`provincia`='$provincia',`canton`='$canton',`distrito`='$distrito',`poblado`='$poblado',`coordenada_x`='$coordenada_x',`coordenada_y`='$coordenada_y',`internet`='$internet',`velocidad`='$velocidad',`matricula_h`='$matricula_h',`matricula_m`='$matricula_m',`cantidad_grupos`='$cantidad_grupos',`cantidad_docentes`='$cantidad_docentes',`direccion_regional`='$regional',`circuito`='$circuito',`telefono`='$telefono',`fax`='$fax',`correo`='$correo',`total_pabellones`='$total_pabellones',`edificio_compartido`='$edificio_compartido',`total_aulas`='$total_aulas',`estado_conexion`='$estado_conexion',`ultima_actualizacion_por`='$actualizado_por',`enlace_nombre` = '$enlace_nombre',`enlace_cedula` = '$enlace_cedula',`enlace_telefono` = '$enlace_telefono',`enlace_correo` = '$enlace_correo',`enlace_especialidad` = '$enlace_especialidad',`enlace_condicion` = '$enlace_condicion', `id_asesor_enlace` = '$id_asesor_enlace',`url_inventario` ='$archivo_inventario', `equipamiento`='$equipamiento' WHERE `id`= '$id'") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
    
    }

 function actualizarProyecto($valores, $tabla,$id, $conexion)
 {
  mysqli_query($conexion,"DELETE FROM `$tabla` WHERE `id_CE`= $id");
  $data = json_decode($valores['array']);
  var_dump($data);
  for ($i=0; $i < sizeof($data) ; $i++) { 
    mysqli_query($conexion,"INSERT INTO $tabla (`id_CE`,`id_iniciativa`) VALUES ('$id','$data[$i]')") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
  }  
 }


 function actualizarInfraestructura($valores, $tabla,$id,$conexion)
 {
  $id_ce=$id;
  $pasillos= $valores['inputGroupCondpasi'];
  $aulas= $valores['inputGroupCondAula'];
  $espacio_resguardo= $valores['inputGroupEstEsp'];
  $biblioteca= $valores['inputGroupBiblio'];
  $iluminacion= $valores['inputGroupIlumAul'];
  $tomas= $valores['inputGroupTomPolar'];
  $condicion_electrica= $valores['inputGroupCondElec'];
  $instalacion_biblioteca= $valores['inputGroupBibliEle'];
  $panel_solar= $valores['inputGroupPaneSol'];
  $seguridad_general= $valores['inputGroupSeg'];
  $seguridad_equipo= $valores['inputGroupSegEqui'];
  $cuido_equipo_estudiante= $valores['inputGroupCuidAlum'];
  $cuido_equipo_docente= $valores['inputGroupRespMan'];
  $internet_solo_oficinas= $valores['chkOficinas'];
  $red_interna= $valores['chkred'];
  $internet_biblioteca= $valores['chkbib'];
  $internet_toda_institucion= $valores['chkinsti'];
  mysqli_query($conexion,"UPDATE `$tabla` SET `pasillos`='$pasillos',`aulas`='$aulas',`espacio_resguardo`='$espacio_resguardo',`biblioteca`='$biblioteca',`iluminacion`='$iluminacion',`tomas`='$tomas',`condicion_electrica`='$condicion_electrica',`instalacion_biblioteca`='$instalacion_biblioteca',`panel_solar`='$panel_solar',`internet_solo_oficinas`='$internet_solo_oficinas',`internet_biblioteca`='$internet_biblioteca',`internet_toda_institucion`='$internet_toda_institucion',`red_interna`='$red_interna',`seguridad_general`='$seguridad_general',`seguridad_equipo`='$seguridad_equipo',`cuido_equipo_estudiante`='$cuido_equipo_estudiante',`cuido_equipo_docente`='$cuido_equipo_docente' WHERE `id_CE`=$id_ce") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
 }

 function actualizarUsuario($valores, $tabla,$id,$conexion){
    $id_usuario = $id;
    $telefono_movil= $valores['telefono_movil'];
    $id_tipo = $valores['puesto'];
    mysqli_query($conexion,"UPDATE `$tabla` SET `telefono_movil`='$telefono_movil',`id_tipo`='$id_tipo'  WHERE `id`=$id_usuario") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
 }
 
 function actualizarModalidad($valores, $tabla,$id,$conexion){
  $id_modalidad = $id;
  $modalidad= utf8_decode($valores['modalidad']);
  mysqli_query($conexion,"UPDATE `$tabla` SET `modalidad`='$modalidad' WHERE `id`=$id_modalidad") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
}

function actualizarIniciativas($valores, $tabla,$id,$conexion){
   $id_iniciativa = $id;
   $nombre= utf8_decode($valores['nombre']);
   mysqli_query($conexion,"UPDATE `$tabla` SET `nombre`='$nombre' WHERE `id`='$id_iniciativa'") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
 }

 function actualizarConectandonos($valores, $tabla,$id,$conexion){
   $id_CE = $id;
   $equipo_inventariado=utf8_decode($valores['conectandonos_equipo_inventariado']);
   $anno = $valores['conectandonos_anno'];
   $conectandonos_cantidad_docentes = utf8_decode($valores['conectandonos_cantidad_docentes']);
   $conectandonos_cantidad_equipo = utf8_decode($valores['conectandonos_cantidad_equipo']);
   $conectandonos_que_falta= utf8_decode($valores['conectandonos_que_falta']);
   $conectandonos_requiere_soporte= utf8_decode($valores['conectandonos_requiere_soporte']);
   mysqli_query($conexion,"UPDATE `$tabla` SET `equipo_inventariado`='$equipo_inventariado',`anno`='$anno',`cantidad_equipo`='$conectandonos_cantidad_equipo',`que_falta`='$conectandonos_que_falta',`cantidad_docentes`='$conectandonos_cantidad_docentes',  `requiere_soporte`='$conectandonos_requiere_soporte'  WHERE `id_CE`='$id_CE'") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
 }

 function actualizarDonacion($valores, $tabla,$id,$conexion){
   $id_CE = $id;
   $donacion_anno = $valores['donacion_anno'];
   $donacion_empresa_donacion = utf8_decode($valores['donacion_empresa_donacion']);
   $donacion_cantidad_docentes = utf8_decode($valores['donacion_cantidad_docentes']);
   $donacion_cantidad_equipo= utf8_decode($valores['donacion_cantidad_equipo']);
   $donacion_que_falta= utf8_decode($valores['donacion_que_falta']);
   $donacion_requiere_soporte= utf8_decode($valores['donacion_requiere_soporte']);
   mysqli_query($conexion,"UPDATE `$tabla` SET `anno`='$donacion_anno',`empresa_donacion`='$donacion_empresa_donacion',`cantidad_equipo`='$donacion_cantidad_equipo',`que_falta`='$donacion_que_falta',`cantidad_docentes`='$donacion_cantidad_docentes',`requiere_soporte`='$donacion_requiere_soporte'  WHERE `id_CE`='$id_CE'") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
 }

 function actualizarTransferencia($valores, $tabla,$id,$conexion){
   $id_CE = $id;
   $transferencia_fecha_transferencia= utf8_decode($valores['transferencia_fecha_transferencia']);
   $transferencia_monto= utf8_decode($valores['transferencia_monto']);
   $transferencia_estado_compra= utf8_decode($valores['transferencia_estado_compra']);
   $transferencia_razones= utf8_decode($valores['transferencia_razones']);
   $transferencia_recibido= utf8_decode($valores['transferencia_recibido']);
   $transferencia_pago_empresa= utf8_decode($valores['transferencia_pago_empresa']);
   $transferencia_fecha_recibido= utf8_decode($valores['transferencia_fecha_recibido']);
   $transferencia_fecha_pago= utf8_decode($valores['transferencia_fecha_pago']);
   $transferencia_remanente= utf8_decode($valores['transferencia_remanente']);
   $transferencia_monto_remanente= utf8_decode($valores['transferencia_monto_remanente']);
   $transferencia_fecha_contrato_recibido= utf8_decode($valores['transferencia_fecha_contrato_recibido']);
   $transferencia_en_uso= utf8_decode($valores['transferencia_en_uso']);
   $transferencia_cantidad_docentes= utf8_decode($valores['transferencia_cantidad_docentes']);
   $transferencia_cantidad_equipo= utf8_decode($valores['transferencia_cantidad_equipo']);
   $transferencia_que_falta= utf8_decode($valores['transferencia_que_falta']);
   $transferencia_requiere_soporte= utf8_decode($valores['transferencia_requiere_soporte']);
   mysqli_query($conexion,"UPDATE `$tabla` SET `fecha_transferencia`='$transferencia_fecha_transferencia',`monto`='$transferencia_monto',`estado_compra`='$transferencia_estado_compra',`recibido`='$transferencia_recibido',`fecha_recibido`='$transferencia_fecha_recibido',`pago_empresa`='$transferencia_pago_empresa',`fecha_pago`='$transferencia_fecha_pago',`en_uso`='$transferencia_en_uso',`remanente`='$transferencia_remanente',`monto_remanente`='$transferencia_monto_remanente',`razones`='$transferencia_razones',`fecha_contrato_recibido`='$transferencia_fecha_contrato_recibido',`cantidad_docentes`='$transferencia_cantidad_docentes',`cantidad_equipo`='$transferencia_cantidad_equipo',`que_falta`='$transferencia_que_falta',`requiere_soporte`='$transferencia_requiere_soporte' WHERE `id_CE`='$id_CE'") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
 }
  // agregado por Ana T revisar
 function actualizarFonatel ($valores, $tabla,$id, $conexion){
  $id_CE=$id; 
  $fonatel_tipo_cartel=utf8_decode($valores['fonatel_tipo_cartel']);  
  $fonatel_monto_inversion=$valores['fonatel_monto_inversion']; 
  $fonatel_fecha=$valores['fonatel_fecha']; 
  $fonatel_cantidad_docentes=$valores['fonatel_cantidad_docentes']; 
  $fonatel_cantidad_equipo=$valores['fonatel_cantidad_equipo']; 
  $fonatel_que_falta=utf8_decode($valores['fonatel_que_falta']); 
  $fonatel_requiere_soporte= utf8_decode($valores['fonatel_requiere_soporte']);
  mysqli_query($conexion,"UPDATE `$tabla` SET `tipo_cartel`= '$fonatel_tipo_cartel',`monto_inversion`= '$fonatel_monto_inversion',`fecha`='$fonatel_fecha',`cantidad_docentes`='$fonatel_cantidad_docentes',`cantidad_equipo`='$fonatel_cantidad_equipo',`que_falta`='$fonatel_que_falta',`requiere_soporte`='$fonatel_requiere_soporte' WHERE `id_CE`=$id_CE") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
 }

 function actualizarCapacitaciones ($valores, $tabla, $conexion, $id){
  $cod_cap = $id; 
  $nombre=utf8_decode($valores['capacitacionNueva']); 
  $fecha_implementacion= date("Y/m/d", strtotime($valores['capacitacionFecha'])); 
  $modalidad=utf8_decode($valores['capacitacionModalidad']); 
  $duracion=$valores['capacitacionHoras']; 
  $mediadores=utf8_decode($valores['capacitacionMediador']);  
  mysqli_query($conexion," UPDATE `$tabla` SET `nombre`='$nombre',`fecha_implementacion`= '$fecha_implementacion',`modalidad`='$modalidad',`duracion`='$duracion',`mediadores`='$mediadores' WHERE `cod_cap`='$cod_cap'") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
 }


 function actualizarAsesoria($valores, $tabla,$conexion,$id){
  $id_visita = $id;
  $estado_asesoria= $valores['estado_asesoria'];
  $observaciones_director = utf8_decode($valores['observaciones_director']);
  mysqli_query($conexion,"UPDATE `$tabla` SET `estado_asesoria`='$estado_asesoria',`observaciones_director`='$observaciones_director'  WHERE `id_visita`=$id_visita") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
}

?>