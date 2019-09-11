<?php

    require 'funcs/conexion.php';
    require_once 'funcs/funcs.php';

	
    $errors = array();
	$msj = array();
    if(!empty($_POST))
    {
		 $email = $mysqli->real_escape_string($_POST['email']);

        if(!isEmail($email))
        {
        	$errors[] = "Debe ingresar un correo electrónico válido";
		}
		
		if(emailExiste($email))
        {
			$user_id = getValor('id', 'correo', $email);
            $nombre = getValor('nombre', 'correo', $email);
			$token = generaTokenPass($user_id);

			$url = 'http://'.$_SERVER["SERVER_NAME"].'/SI-Tecnoaprender/main_app/server/login/cambia_pass.php?id='.$user_id.'&val='.$token;
            $txtasunto = 'Recuperar contraseña - Sistema de Usuarios';
			$asunto = utf8_decode($txtasunto);
			$cuerpo = "Hola ".utf8_decode($nombre).": <br /><br />Se ha solicitado un reinicio de contrase&ntilde;a. <br/><br/>Para restaurar la contrase&ntilde;a, d&#233; clic en el siguiente enlace: <a href='$url'>Recuperar contrase&ntilde;a</a>";
			
			// if(enviarCorreo($email, $asunto, $cuerpo)){
			if(enviarEmail($email, $nombre, $asunto, $cuerpo)){
				$mensaje[]= 'Se ha enviado un correo electrónico a la dirección '.$email.'. Para restablecer su contraseña siga las instrucciones que ahí se le indican';
				echo json_encode(array('error'=>false,'msj'=>$mensaje));
				exit;
            }
		} 
		else {
				$errors[] = "La direccion de correo electrónico no existe";
				echo json_encode(array('error'=>true, 'msj'=>$errors ));

        }
		
	}
?>