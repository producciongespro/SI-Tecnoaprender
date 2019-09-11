<?php
  session_start();
?>

<!DOCTYPE html>
<html lang="en" >

<head>
  <meta charset="UTF-8">
  <title>Sistema de Información - Tecno@prender</title>
		
		<link rel="stylesheet" href="vendor/bootstrap-4.1.3/css/bootstrap.min.css">
				
	    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
        <script src="vendor/bootstrap-4.1.3/js/bootstrap.min.js"></script>

	
		<link href='https://fonts.googleapis.com/css?family=PT+Sans:400,700' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/reset.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
		<link rel="stylesheet" href="https://jqueryvalidation.org/files/demo/site-demos.css">
		<link rel="stylesheet" href="vendor/alertify/css/alertify.min.css">
		<link rel="stylesheet" href="vendor/alertify/css/themes/default.css">
		<link rel='stylesheet' href='../../lib/fontawesome/css/all.css'>
		
		
		<script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js" type="text/javascript"></script>

	
		<script src='vendor/jquery/jquery.min.js'></script>

		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.js"></script>
		
		<script src="vendor/dist/jquery.validate.js"></script>
		<script src="vendor/dist/additional-methods.min.js"></script>
		<script src="vendor/alertify/alertify.min.js"></script>
	
	<!-- customizer -->
		<link rel="stylesheet" href="css/style.css">
		<script>
			//Especifica como "parametro" el tipo de registro:
				var tipoRegistro = "administrador";
		</script>
		<script  src="js/registro/registro.js"></script>

</head>

<body>
	<header role="banner">
		<div id="cd-logo"><a href="#0"><img src="images/logo-tecnoaprender.png" alt="Logo"></a></div>

		<nav class="main-nav">
			<ul>
				<!-- inser more links here -->
				<li><a class="cd-signup" href="#0" id="crear" >Crear una cuenta</a></li>
			</ul>
		</nav>
	</header>
	<div class="cd-user-modal"> <!-- this is the entire modal form, including the background -->
		<div class="cd-user-modal-container"> <!-- this is the container wrapper -->
			<!-- <ul class="cd-switcher">
			    <li><a href="#0" id="modal-ingresar">Ingresar</a></li> 
				<li><a href="#0" id="modal-crear">Crear una cuenta</a></li>
			</ul> -->

			<div id="cd-signup"> <!-- sign up form -->
				<form id= "form-singup" class="cd-form">
					<p class="text-center">Formulario de inscripción</p>
					<hr>
					<p class="fieldset">
						<label class="image-replace cd-username" for="signup_nombre">Nombre completo</label>
						<input class="full-width has-padding has-border" id="signup_nombre"  name="signup_nombre" type="text" placeholder="Nombre apellido1 apellido2" required>
						<span class="cd-error-message">¡Error en el nombre!</span>
					</p>

					<p class="fieldset">
						<label class="image-replace cd-pencil" for="signup_cedula">Cédula</label>
						<input class="full-width has-padding has-border" id="signup_cedula" name="signup_cedula" type="text" placeholder="Número de cédula - 9 dígitos" required>
						<span class="cd-error-message">¡Error en el número de cédula!</span>
					</p>

					<p class="fieldset">
						<label class="image-replace cd-user" for="signup_sexo">Sexo</label>
            	 <select id="signup_sexo" class="full-width has-padding has-border custom-select select-icon" name="signup_sexo">
								<option value="default" selected>Seleccione el sexo...</option>
								<option value="mujer">Mujer</option>
								<option value="hombre">Hombre</option>
							</select>
					</P>

					<p class="fieldset">
						<label class="image-replace cd-email" for="signup_email">Correo electrónico</label>
						<input class="full-width has-padding has-border" id="signup_email" name="signup_email" type="email" placeholder="nombre.apellido1.apellido2@mep.go.cr" required>
						<span class="cd-error-message">¡Error en el correo!</span>
					</p>

					<p class="fieldset">
						<label class="image-replace cd-password" for="signup_password">Contraseña</label>
						<input class="full-width has-padding has-border" id="signup_password" name="signup_password" type="password"  placeholder="Contraseña">
						<a href="#0" class="hide-password">Mostrar</a>
						<span class="cd-error-message">La contraseña está incorrecta, por favor intenta de nuevo</span>
					</p>

					<p class="fieldset">
						<label class="image-replace cd-password" for="signup_password-2">Confirmar contraseña</label>
						<input class="full-width has-padding has-border" id="signup_password-2" name="signup_password_2" type="password"  placeholder="Confirmar contraseña">
						<a href="#0" class="hide-password">Mostrar</a>
						<span class="cd-error-message">La contraseña está incorrecta, por favor intenta de nuevo</span>
					</p>
					<div class="loading"></div>
					<p class="fieldset">
						<input id="signup-submit" name="registro_administrador" class="full-width has-padding" type="submit" value="Crear cuenta">
					</p>
				</form>

				<!-- <a href="#0" class="cd-close-form">Close</a> -->
			</div> <!-- cd-signup -->
				<p class="cd-form-bottom-message"><a href="registro_asesores.php">Regresar</a></p>
			</div> <!-- cd-reset-password -->
			<a href="#0" class="cd-close-form">Cerrar</a>
		</div> <!-- cd-user-modal-container -->
	</div> <!-- cd-user-modal -->


	  
</body>

</html>
