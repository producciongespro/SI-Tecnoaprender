<?php
// function incluirCentro($valores, $archivoInventario, $tabla, $conexion)
function incluirCentro($valores,$archivoInventario,$tabla,$conexion)
 {

   $cod_pres = $valores[ 'form_cod_pres'];
   $institucion = utf8_decode($valores[ 'form_institucion']); 
		$sql="SELECT * FROM $tabla WHERE cod_pres='$cod_pres' AND institucion='$institucion'";

		$res=mysqli_query($conexion,$sql);

		if(mysqli_num_rows($res)>=1)

		{

			echo "El Centro Educativo ya se encuentra Registrado')";

		}

		else

		{ 
   $regional = utf8_decode($valores[ 'form_direccion_regional']);
   $circuito = $valores[ 'form_circuito'];  
   $correo = utf8_decode($valores[ 'form_correo']);
   $provincia = utf8_decode($valores[ 'form_provincia']);
   $canton = utf8_decode($valores[ 'form_canton']);
   $distrito = utf8_decode($valores[ 'form_distrito']); 
   $poblado = utf8_decode($valores[ 'form_poblado']);
   $coordenada_x = $valores[ 'form_coordenada_x'];
   $coordenada_y = $valores[ 'form_coordenada_y']; 
   $telefono = $valores[ 'form_telefono']; 
   $fax = $valores[ 'form_fax'];
   $modalidad_educativa = utf8_decode($valores['form_id_modalidad_educativa']);
   $centro_indigena = utf8_decode($valores[ 'form_centro_indigena']);
   $bachillerato_internacional = utf8_decode($valores[ 'form_bachillerato_internacional']);
   $edificio_compartido  = utf8_decode($valores['form_edificio_compartido']);
   $internet = utf8_decode($valores[ 'form_internet']);
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
   $equipamiento =  utf8_decode($valores['equipamiento']);
   $actualizado_por =  utf8_decode($valores[ 'form_actualizado_por']);
   $inventario = $archivoInventario;
       mysqli_query($conexion,"INSERT INTO $tabla (cod_pres,institucion,id_modalidad_educativa,centro_indigena,bachillerato_internacional,provincia,canton,distrito,poblado,coordenada_x,coordenada_y,internet,velocidad,matricula_h,matricula_m,cantidad_grupos,cantidad_docentes,direccion_regional,circuito,telefono,fax,correo,total_pabellones,edificio_compartido,total_aulas,estado_conexion,url_inventario, ultima_actualizacion_por,enlace_nombre,enlace_cedula,enlace_telefono,enlace_correo,enlace_especialidad,enlace_condicion,id_asesor_enlace, equipamiento)
                                          VALUES ('$cod_pres', '$institucion','$modalidad_educativa','$centro_indigena','$bachillerato_internacional','$provincia','$canton','$distrito','$poblado','$coordenada_x','$coordenada_y','$internet','$velocidad','$matricula_h', '$matricula_m','$cantidad_grupos','$cantidad_docentes','$regional', '$circuito','$telefono','$fax','$correo','$total_pabellones','$edificio_compartido','$total_aulas','$estado_conexion','$inventario','$actualizado_por','$enlace_nombre','$enlace_cedula','$enlace_telefono','$enlace_correo','$enlace_especialidad','$enlace_condicion','$id_asesor_enlace','$equipamiento' )") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
       printf($conexion->insert_id); 

    //  `enlace_nombre` = '$enlace_nombre',`enlace_cedula` = '$enlace_cedula',`enlace_telefono` = '$enlace_telefono',`enlace_correo` = '$enlace_correo',`enlace_especialidad` = '$enlace_especialidad',`enlace_condicion` = '$enlace_condicion', `id_asesor_enlace` = '$id_asesor_enlace'
    }
  }
   
 

 function incluirProyecto($valores, $tabla, $conexion)
 {
    
   echo ("Aquí irá código para agregar proyecto");
 }

 function incluirInfraestructura($valores, $tabla, $conexion, $id)
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
  mysqli_query($conexion,"INSERT INTO $tabla (`id_CE`, `pasillos`, `aulas`, `espacio_resguardo`, `biblioteca`, `iluminacion`, `tomas`, `condicion_electrica`, `instalacion_biblioteca`, `panel_solar`, `seguridad_general`, `seguridad_equipo`, `cuido_equipo_estudiante`, `cuido_equipo_docente`,`internet_solo_oficinas`,`red_interna`, `internet_biblioteca`, `internet_toda_institucion`) VALUES ('$id_ce','$pasillos','$aulas','$espacio_resguardo','$biblioteca','$iluminacion','$tomas','$condicion_electrica','$instalacion_biblioteca','$panel_solar','$seguridad_general','$seguridad_equipo','$cuido_equipo_estudiante','$cuido_equipo_docente','$internet_solo_oficinas','$red_interna','$internet_biblioteca','$internet_toda_institucion')") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
 }
 

 function incluirUsoEquipo($valores, $tabla, $conexion, $id){
  $total_docentes = $valores['total_docentes'];
  $indicador=$valores['indicador'];
  $docente_ie= $valores['docente_ie'];
  $ing_informatico = $valores['ing_informatico'];
  $proyecto_tecnologia = $valores['proyecto_tecnologia'];
  $organizacion_equipo = $valores['organizacion_equipo'];
  $cantidad_laboratorio_pronie=$valores['cantidad_laboratorio_pronie'];
  $cantidad_laboratorio_innovacion=$valores['cantidad_laboratorio_innovacion'];
  $cantidad_laboratorio_inco=$valores['cantidad_laboratorio_inco'];
  $nombres_otros_laboratorios=$valores['nombres_otros_laboratorios'];
  $estudiantes_discapacidad=$valores['estudiantes_discapacidad'];
  $uso_general_docente=$valores['uso_general_docente'];
  $uso_general_estudiantes=$valores['uso_general_estudiantes'];
  $otros_usos_estudiantes=$valores['otros_usos_estudiantes'];
  $otros_usos_docentes= $valores['otros_usos_docentes'];

  mysqli_query($conexion,"INSERT INTO $tabla (`id_CE`, `total_docentes`, `indicador`, `docente_ie`, `ing_informatico`,`proyecto_tecnologia`,`organizacion_equipo`,`cantidad_laboratorio_pronie`, `cantidad_laboratorio_innovacion`, `cantidad_laboratorio_inco`, `nombres_otros_laboratorios`, `estudiantes_discapacidad`, `uso_general_docente`, `uso_general_estudiantes`,`otros_usos_estudiantes`,`otros_usos_docentes`) VALUES ('$id','$total_docentes','$indicador','$docente_ie','$ing_informatico','$proyecto_tecnologia','$organizacion_equipo','$cantidad_laboratorio_pronie','$cantidad_laboratorio_innovacion','$cantidad_laboratorio_inco','$nombres_otros_laboratorios','$estudiantes_discapacidad','$uso_general_docente','$uso_general_estudiantes','$otros_usos_estudiantes','$otros_usos_docentes')") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
 
 }


 function incluirTecnoaprender($valores, $tabla, $conexion, $id){
  $data = json_decode($valores['array']);
  var_dump($data);
  for ($i=0; $i < sizeof($data) ; $i++) { 
    mysqli_query($conexion,"INSERT INTO $tabla (`id_CE`,`id_iniciativa`) VALUES ('$id','$data[$i]')") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
  }
 }

 function incluirUsoTecnologia($valores, $tabla, $conexion, $id){
  $id_iniciativa=$valores['id_iniciativa'];
  $id_CE=$id;
  $uso_est=utf8_decode($valores['uso_est']);
  $uso_mat=utf8_decode($valores['uso_mat']);
  $uso_cie=utf8_decode($valores['uso_cie']);
  $uso_bio=utf8_decode($valores['uso_bio']);
  $uso_fis=utf8_decode($valores['uso_fis']);
  $uso_qui=utf8_decode($valores['uso_qui']);
  $uso_esp=utf8_decode($valores['uso_esp']);
  $uso_apl=utf8_decode($valores['uso_apl']);
  $uso_eph=utf8_decode($valores['uso_eph']);
  $uso_ain=utf8_decode($valores['uso_ain']);
  $uso_civ=utf8_decode($valores['uso_civ']);
  $uso_mus=utf8_decode($valores['uso_mus']);
  $uso_rel=utf8_decode($valores['uso_rel']);
  $uso_bib=utf8_decode($valores['uso_bib']);
  $uso_bib_cra=utf8_decode($valores['uso_bib_cra']);
  $uso_bib_digital=utf8_decode($valores['uso_bib_digital']);
  $uso_incluir_plan_vocacional=utf8_decode($valores['uso_incluir_plan_vocacional']);
  $uso_incluir_modulos_cindea_ipec=utf8_decode($valores['uso_incluir_modulos_cindea_ipec']);
  $practicas_proyectos=utf8_decode($valores['practicas_proyectos']);
  mysqli_query($conexion,"INSERT INTO $tabla (`id_CE`, `id_iniciativa`, `uso_est`, `uso_mat`, `uso_cie`, `uso_bio`, `uso_fis`, `uso_qui`, `uso_esp`, `uso_apl`, `uso_ain`, `uso_eph`, `uso_civ`, `uso_mus`, `uso_rel`, `uso_bib`, `uso_bib_cra`, `uso_bib_digital`, `uso_incluir_plan_vocacional`, `uso_incluir_modulos_cindea_ipec`, `practicas_proyectos`) VALUES ('$id_CE','$id_iniciativa','$uso_est','$uso_mat','$uso_cie','$uso_bio','$uso_fis','$uso_qui','$uso_esp','$uso_apl','$uso_ain','$uso_eph','$uso_civ','$uso_mus', '$uso_rel','$uso_bib','$uso_bib_cra','$uso_bib_digital','$uso_incluir_plan_vocacional','$uso_incluir_modulos_cindea_ipec','$practicas_proyectos')") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
 }


 function incluirIniciativa($valores, $tabla, $conexion){
  $iniciativa=$valores['iniciativa'];  
  mysqli_query($conexion,"INSERT INTO $tabla (`nombre`) VALUES ('$iniciativa')") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
 }
 
 function incluirModalidad($valores, $tabla, $conexion){
  $modalidad=$valores['modalidad'];  
  mysqli_query($conexion,"INSERT INTO $tabla (`modalidad`) VALUES ('$modalidad')") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
 }

 function incluirConectandonos($valores, $tabla, $conexion, $id){
  $id_CE = $id;
  $equipo_inventariado=utf8_decode($valores['conectandonos_equipo_inventariado']);
  $anno = $valores['conectandonos_anno'];
  $conectandonos_cantidad_docentes = utf8_decode($valores['conectandonos_cantidad_docentes']);
  $conectandonos_cantidad_equipo = utf8_decode($valores['conectandonos_cantidad_equipo']);
  $conectandonos_que_falta= utf8_decode($valores['conectandonos_que_falta']);
  $conectandonos_requiere_soporte= utf8_decode($valores['conectandonos_requiere_soporte']);
  mysqli_query($conexion,"INSERT INTO $tabla(`id_CE`, `equipo_inventariado`, `anno`, `cantidad_equipo`, `que_falta`, `cantidad_docentes`, `requiere_soporte`) VALUES ('$id_CE','$equipo_inventariado', '$anno','$conectandonos_cantidad_equipo','$conectandonos_que_falta','$conectandonos_cantidad_docentes', '$conectandonos_requiere_soporte')") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
 }

 function incluirDonacion($valores, $tabla, $conexion, $id){
   $id_CE = $id;
   $donacion_anno = $valores['donacion_anno'];
   $donacion_empresa_donacion = utf8_decode($valores['donacion_empresa_donacion']);
   $donacion_cantidad_docentes = utf8_decode($valores['donacion_cantidad_docentes']);
   $donacion_cantidad_equipo= utf8_decode($valores['donacion_cantidad_equipo']);
   $donacion_que_falta= utf8_decode($valores['donacion_que_falta']);
   $donacion_requiere_soporte= utf8_decode($valores['donacion_requiere_soporte']);
  mysqli_query($conexion,"INSERT INTO $tabla(`id_CE`, `anno`, `empresa_donacion`, `cantidad_equipo`, `que_falta`, `cantidad_docentes`, `requiere_soporte`) VALUES ('$id_CE','$donacion_anno','$donacion_empresa_donacion','$donacion_cantidad_equipo','$donacion_que_falta','$donacion_cantidad_docentes', '$donacion_requiere_soporte')") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
 }

 function incluirFonatel($valores, $tabla, $conexion, $id){
  $id_CE=$id; 
  $tipo_cartel=utf8_decode($valores['fonatel_tipo_cartel']); 
  $monto_inversion=$valores['fonatel_monto_inversion']; 
  $fecha=$valores['fonatel_fecha']; 
  $cantidad_docentes=$valores['fonatel_cantidad_docentes']; 
  $cantidad_equipo=$valores['fonatel_cantidad_equipo']; 
  $que_falta=utf8_decode($valores['fonatel_que_falta']); 
  $requiere_soporte= utf8_decode($valores['requiere_soporte']);
  mysqli_query($conexion,"INSERT INTO $tabla(`id_CE`, `tipo_cartel`, `monto_inversion`, `fecha`, `cantidad_docentes`, `cantidad_equipo`, `que_falta`, `requiere_soporte`) VALUES ('$id_CE','$tipo_cartel','$monto_inversion','$fecha','$cantidad_docentes','$cantidad_equipo','$que_falta','$requiere_soporte')") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
 }

 function incluirTransferencia($valores, $tabla, $conexion, $id){
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
  mysqli_query($conexion,"INSERT INTO $tabla(`id_CE`, `fecha_transferencia`, `monto`, `estado_compra`, `recibido`, `fecha_recibido`, `pago_empresa`, `fecha_pago`, `en_uso`, `remanente`, `monto_remanente`, `razones`, `fecha_contrato_recibido`, `cantidad_docentes`, `cantidad_equipo`, `que_falta`, `requiere_soporte` ) VALUES ('$id_CE','$transferencia_fecha_transferencia','$transferencia_monto', '$transferencia_estado_compra','$transferencia_recibido','$transferencia_fecha_recibido','$transferencia_pago_empresa','$transferencia_fecha_pago','$transferencia_en_uso','$transferencia_remanente','$transferencia_monto_remanente','$transferencia_razones','$transferencia_fecha_contrato_recibido','$transferencia_cantidad_docentes','$transferencia_cantidad_equipo','$transferencia_que_falta', '$transferencia_requiere_soporte')") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
 }

 function incluirCapacitaciones($valores, $tabla, $conexion){
  $cod_cap=$valores['cod_cap']; 
  $nombre=utf8_decode($valores['capacitacionNueva']); 
  $fecha_implementacion= date("Y/m/d", strtotime($valores['capacitacionFecha'])); 
  $modalidad=utf8_decode($valores['capacitacionModalidad']); 
  $duracion=$valores['capacitacionHoras']; 
  $mediadores=utf8_decode($valores['capacitacionMediador']);  
  mysqli_query($conexion,"INSERT INTO `capacitaciones`(`cod_cap`, `nombre`, `fecha_implementacion`, `modalidad`, `duracion`, `mediadores`) VALUES ('$cod_cap','$nombre','$fecha_implementacion','$modalidad','$duracion','$mediadores')") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
 }


 function incluirParticipante($valores, $tabla, $conexion){
  $cod_cap=utf8_decode($valores['cod_cap']); 
  $cedula=utf8_decode($valores['cedula']); 
  $id_CE= utf8_decode($valores['id_CE']); 
  mysqli_query($conexion,"INSERT INTO `$tabla` (`cod_cap`, `cedula`, `id_CE`) VALUES ('$cod_cap','$cedula','$id_CE')") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
 }

 function incluirAsesoria($valores, $tabla, $conexion){
  $id_CE= utf8_decode($valores['form_idCE']); 
  $correo_asesor= utf8_decode($valores['form_correoAsesor']); 
  $medio_visita= utf8_decode($valores['form_medio']); 
  $fecha= date("Y/m/d", strtotime($valores['form_fecha'])); 
  $objetivos= utf8_decode($valores['form_objetivos']); 
  $observaciones= utf8_decode($valores['form_observaciones']); 
  $recomendacion_asesor= utf8_decode($valores['form_recomendaciones']); 

  mysqli_query($conexion,"INSERT INTO `$tabla`(`id_CE`, `correo_asesor`, `medio_visita`, `fecha`, `objetivos`, `observaciones`, `recomendacion_asesor`) VALUES ('$id_CE','$correo_asesor','$medio_visita','$fecha','$objetivos','$observaciones','$recomendacion_asesor')") or die ("Problemas al añadir elementos a la BD".mysqli_error($conexion));
 }
 
 function validaCampo($valor){
  if(isset($valor)){
     return 0;
  }else{
     return $valor;
  }
}
  
?>