<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    
    <title>Bsucar CE</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <script src="../../js/main.js"></script>
</head>
<body>
    <div class="jumbotron">
    <nav class="navbar">
  <ul class="nav navbar-nav" style="float: right; margin-right: 3%">
    <li><a href="#">Agregar</a></li>
    <li><a href="#">Editar</a></li>
  </ul>
</nav>
<form action="" id="buscadorCE" style="float: right; margin-right: 3%" method="post">
        <input type="text" name="codigo" id="codigo" placeholder="Digite el código">
        <input type="button" class="btn btn-success" id="btnBuscar" value="Buscar">
        
    </form>
</div>
    <h2 class="btn btn-primary" style="width: 100%" data-toggle="collapse" data-target="#infoBasica">Información básica</h2>
  
    <div id="visor">
    <div id="infoBasica" class="collapse in" aria-expanded="true">

    <form action="" style="margin-left:3%; margin-right:3%" id="formCE">
    <br>
    <label for="nombre">Centro educativo:</label>
    <input type="text" name="nombre" id="nombre" placeholder="Centro Educativo" disabled>
    <label for="provincia">Provincia:</label>
    <input type="text" name="provincia" id="provincia" placeholder="Provincia" disabled>
    <label for="canton">Cantón:</label>
    <input type="text" name="canton" id="canton" placeholder="Cantón" disabled>
    <label for="distrito">Distrito:</label>
    <input type="text" name="distrito" id="distrito" placeholder="Distrito" disabled>
    </form>
    </div>
    <br>
    

    <h2 data-toggle="collapse" style="width: 100%" data-target="#proyectos" class="btn btn-primary">Proyectos</h2>
  
    <div id="proyectos" class="collapse">
        <br>
    <form action="" style="margin-left:3%; margin-right:3%" id="formProy">
        <label for="nombreProyecto">Proyecto:</label>
        <input type="text" name="nombreProyecto" id="nombreProyecto" placeholder="Proyecto" disabled>
        <label for="inversion">Inversión:</label>
        <input type="text" name="inversion" id="inversion" placeholder="Inversión" disabled>
        <label for="patrocinador">Patrocinador:</label>
        <input type="text" name="patrocinador" id="patrocinador" placeholder="Patrocinador" disabled>
    </form>
    </div>
    </div>
</body>
</html>