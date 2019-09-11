<?php
  session_start();
?>

<!DOCTYPE html>
<html lang="en" >

<head>
  <meta charset="UTF-8">
  <title>Tecnoaprender</title>
		
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
		
		
		<script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js" type="text/javascript"></script>

	
		<script src='vendor/jquery/jquery.min.js'></script>
		<script src="vendor/dist/jquery.validate.js"></script>
		<script src="vendor/dist/additional-methods.min.js"></script>
		<script src="vendor/alertify/alertify.min.js"></script>
	
	<!-- customizer -->
		<link rel="stylesheet" href="css/style.css">
		
		<script  src="js/registro/index.js"></script>  
		<script  src="js/registro/ingreso.js"></script>

</head>

<body>
	<header role="banner">
		<div id="cd-logo"><a href="#0"><img src="images/logo-tecnoaprender.png" alt="Logo"></a></div>

		<nav class="main-nav">
			<ul>
				<!-- inser more links here -->
				<li><a class="cd-signin" href="#0" id="ingresar" >Ingresar</a></li>
				<li><a class="cd-signrecover" href="#0" id="recuperar" >Recuperar contraseña</a></li>
				<li><a class="cd-acercade" href="#0" id="acercade">Acerca de</a></li>
			</ul>
		</nav>
	</header>

	<div class="cd-user-modal"> <!-- this is the entire modal form, including the background -->
		<div class="cd-user-modal-container"> 			<!-- this is the container wrapper -->
			<!-- <ul class="cd-switcher">
				<li><a href="#" id="modal-ingresar" class="text-center">Ingresar</a></li> -->
				<!-- <li><a href="#0" id="modal-crear">Crear una cuenta</a></li> -->
			<!-- </ul> -->

			<div id="cd-login"> <!-- log in form -->
				<form id= "form-login" class="cd-form">
					<p class="text-center">Ingresar</p>
					<p class="fieldset">
						<label class="image-replace cd-email" for="signin-email">Correo electrónico</label>
						<input class="full-width has-padding has-border" id="signin-email" name="signin_email" type="email" placeholder="nombre.apellido1.apellido2@mep.go.cr" required>
						<!-- <span class="cd-error-message">Correo incorrecto</span> -->
					</p>

					<p class="fieldset">
						<label class="image-replace cd-password" for="signin-password">Contraseña</label>
						<input class="full-width has-padding has-border" id="signin-password" name="signin_password" type="password"  placeholder="Contraseña">
						<a href="#0" class="hide-password">Mostrar</a>
						<span class="cd-error-message">Contraseña incorrecta</span>
					</p>
					<p class="loading"></p>
					<!-- <p class="fieldset">
						<input type="checkbox" id="remember-me" checked>
						<label for="remember-me">Recordarme</label>
					</p> -->

					<p class="fieldset">
						<input id="submit-login" class="full-width" type="submit" value="Ingresar">
					</p>
				</form>

				<p class="cd-form-bottom-message"><a href="server/login/recupera.php">¿Olvidó su contraseña?</a></p>
				<!-- <a href="#0" class="cd-close-form">Close</a> -->
			</div> <!-- cd-login -->

			<!-- <div id="cd-signup"> // sign up form
				<form id= "form-singup" class="cd-form">
					<p class="fieldset">
						<label class="image-replace cd-username" for="signup-nombre">Nombre completo</label>
						<input class="full-width has-padding has-border" id="signup-nombre"  name="signup_nombre" type="text" placeholder="Nombre apellido1 apellido2" required>
					</p>
					<p class="fieldset">
						<label class="image-replace cd-email" for="signup-cedula">Cédula</label>
						<input class="full-width has-padding has-border" id="signup-cedula" name="signup_cedula" type="email" placeholder="nombre.apellido1.apellido2@mep.go.cr" value ="ana.araya.salazar@mep.go.cr" required>
						<span class="cd-error-message">¡Error en el número de cédula!</span>
					</p>

					<p class="fieldset">
						<label class="image-replace cd-email" for="signup-email">Correo electrónico</label>
						<input class="full-width has-padding has-border" id="signup-email" name="signup_email" type="email" placeholder="nombre.apellido1.apellido2@mep.go.cr" value ="ana.araya.salazar@mep.go.cr" required>
						<span class="cd-error-message">¡Error en el correo!</span>
					</p>

					<p class="fieldset">
						<label class="image-replace cd-email" for="signup-email">Correo electrónico</label>
						<input class="full-width has-padding has-border" id="signup-email" name="signup_email" type="email" placeholder="nombre.apellido1.apellido2@mep.go.cr" value ="ana.araya.salazar@mep.go.cr" required>
						<span class="cd-error-message">¡Error en el correo!</span>
					</p>
					<p class="fieldset">
						<label class="image-replace cd-password" for="signup-password">Contraseña</label>
						<input class="full-width has-padding has-border" id="signup-password" name="signup_password" type="password"  placeholder="Contraseña">
						<a href="#0" class="hide-password">Mostrar</a>
						<span class="cd-error-message">La contraseña está incorrecta, por favor intenta de nuevo</span>
					</p>

					<p class="fieldset">
						<label class="image-replace cd-password" for="signup-password-2">Confirmar contraseña</label>
						<input class="full-width has-padding has-border" id="signup-password-2" name="signup_password_2" type="password"  placeholder="Confirmar contraseña">
						<a href="#0" class="hide-password">Mostrar</a>
						<span class="cd-error-message">La contraseña está incorrecta, por favor intenta de nuevo</span>
					</p>

					<p class="fieldset">
						<input id="signup-submit" class="full-width has-padding" type="submit" value="Crear cuenta">
					</p>
				</form>

				 <a href="#0" class="cd-close-form">Close</a> 
			</div> cd-signup -->

			<div id="cd-acercade"> 
			<form id= "form-acercade" class="cd-form">
			<p class="cd-form-message"> Acerca de</p><hr>
			<p class="cd-form-message"> Ministerio de Educación Pública de Costa Rica <br>
				Dirección de Recursos Tecnológicos - Depto. Gestión y Producción GESPRO <br>
					Desarrolladores: Luis Chacón, Óscar Pérez, Patricia Hernández, Ana Araya <br>
					Diseño Gráfico: </p><hr>
			<p class="cd-form-message">Derechos reservados © 2019</p>
				</p>
			</form>
			<!-- <a href="#0" class="cd-close-form">Close</a>  -->
		</div> 

			<div id="cd-reset-password"> <!-- reset password form -->
				<p class="cd-form-message">¿Olvidó su contraseña? Por favor introduzca su correo. Usted recibirá un enlace para crear una nueva contraseña.</p>

				<form id= "form-reset-password" class="cd-form">
					<p class="fieldset">
						<label class="image-replace cd-email" for="reset-email">Correo electrónico</label>
						<input class="full-width has-padding has-border" id="reset-email" name="reset_email" type="email" placeholder="nombre.apellido1.apellido2@mep.go.cr">
						<span class="cd-error-message">¡Correo incorrecto!</span>
					</p>
					<p class="loading"></p>
					
					<p class="fieldset">
						<input id="reset-password-submit" class="full-width has-padding" type="submit" value="Recuperar contraseña">
					</p>
				</form>

				<p class="cd-form-bottom-message"><a href="#0" >Regresar</a></p>
			</div> <!-- cd-reset-password -->

			<a href="#0" class="cd-close-form">Cerrar</a>
		</div> <!-- cd-user-modal-container -->
	</div> <!-- cd-user-modal -->
</body>

</html>
