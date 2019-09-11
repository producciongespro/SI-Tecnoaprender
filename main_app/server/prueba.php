<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="../../vendor/jquery/jquery.js"></script>
    <link rel="stylesheet" type="text/css" media="screen" href="main.css">
    <script>
        function realizaProceso(valorCaja1, valorCaja2){
                var parametros = {
                        "valorCaja1" : valorCaja1,
                        "valorCaja2" : valorCaja2,
                        "consulta": "SELECT centro_educativo.institucion FROM centro_educativo INNER JOIN proyectos ON centro_educativo.id=proyectos.id_CE INNER JOIN iniciativas ON iniciativas.id=proyectos.id_iniciativa WHERE iniciativas.id="+ valorCaja2 +" AND centro_educativo.provincia='"+valorCaja1+"'"
                };
                $.ajax({
                        data:  parametros, //datos que se envian a traves de ajax
                        url:   'consultas_generales.php', //archivo que recibe la peticion
                        type:  'post', //método de envio
                        beforeSend: function () {
                                $("#resultado").html("Procesando, espere por favor...");
                        },
                        success:  function (response) { //una vez que el archivo recibe el request lo procesa y lo devuelve
                                $("#resultado").html(response);
                        }
                });
        }
    </script>

</head>

<body>
        <form action="agregar_main.php?tabla=centro_educativo" method="post">
        
        <input type="hidden"  name="variable2" value="Proyecto nuevo" />
        <input type="text" name="variable1" value="" />
        <input type="submit" value="Enviar CE" />
        </form>
        <br>
        <hr>
        <br>
        <form action="agregar_main.php?tabla=proyectos" method="post">
            <input type="text" name="codigo" value="" /> 
            <input type="text" name="variable2" value="" />
        <input type="submit" value="Enviar proyecto" />
        </form>
        <br>
        <hr>
        <br>
        <form action="" method="post">
            <select id="provincia" name="provincia">
                <option value="SAN JOSE">San José</option>
                <option value="HEREDIA">Heredia</option>
                <option value="ALAJUELA">Alajuela</option>
                <option value="CARTAGO">Cartago</option>
            </select>
            <select id="proyecto" name="proyecto">
                <option value="13">Robotica</option>
                <option value="1">Tecno@prender en preescolar</option>
            </select>
            <input type="button" href="javascript:;" onclick="realizaProceso($('#provincia').val(), $('#proyecto').val());return false;" value="Consultar"/>
        </form>
        <div id="resultado"></div>

        <br>
        <hr>
        <br>
        <form action="" method="post">
            <select id="criterio1" name="criterio1">
                <option value="provincia">San José</option>
                <option value="regional">Dirección Regional</option>
                <option value="proyecto">Proyecto</option>
                <option value="conectividad">Conectividad</option>
            </select>

            <input type="button" href="javascript:;" onclick="realizaProceso($('#provincia').val(), $('#proyecto').val());return false;" value="Consultar"/>
        </form>
</body>
</html>