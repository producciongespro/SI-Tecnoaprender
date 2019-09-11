var dataJson, correoUser;

// $(document).ready(function () {
jQuery(document).ready(function($){
  $('[data-toggle="tooltip"]').tooltip();
  saveSession();
  setHeight_screen();
  $(window).resize(function(){
       setHeight_screen();
    });
    
    $("#divInfo").html('<br><a href="#" class="acerca-de acerca-de-inicio" data-toggle="tooltip" title="Acerca de"> <i class="fas fa-info-circle"></i></a>');
    $("#divUsuario").html('<i class="fas fa-user-alt"></i><span class="usuario"></span> '+correoUser);
    $("#divCerrar").html('<a href="../server/login/logout.php" data-toggle="tooltip" title="Cerrar sesión"><i class="fas fa-sign-out-alt"></i>&nbsp;&nbsp;</a>');
    cargaModalAcercaDe();  
  
    // código Oscar

  $( "#reportes" ).click(function() {
    window.location.href = "reportes.php";
  });
  $( "#consultar" ).click(function() {
      window.location.href = "formulario.php?accion=consultar";
  });
  $( "#agregar" ).click(function() {
      window.location.href = "formulario.php?accion=agregar";
  });

  $( "#usos" ).click(function() {
      window.location.href = "reporteUsos.php";

  });

  $( "#usuarios" ).click(function() {
      window.location.href = "usuarios.php";

  });
  $( "#iniciativas" ).click(function() {
      window.location.href = "iniciativas.php";

  });

  $( "#modalidades" ).click(function() {
      window.location.href = "modalidades.php";

  });

  $( "#capacitaciones" ).click(function() {
      window.location.href = "capacitaciones.php";

  });
  $( "#verAsesorias" ).click(function() {
      window.location.href = "reporte_asesorias.php";
  });
  $( "#agregarAsesoria" ).click(function() {
      window.location.href = "asesorias.php";
  });
  $( "#centros" ).click(function() {
      window.location.href = "centrosEducativos.php";
  });
  // fin del código de Oscar
});

function saveSession() {
    let tipo = sessionStorage.getItem("tipo");
    correoUser = sessionStorage.getItem("correo");
    console.log("tipo", tipo);
    console.log("correo", correoUser);
}

function setHeight_screen() {
  var alto_fila;
//   console.log(" $(window).height() ",  $(window).height() );
   if ( $(window).height()>600){
    alto_fila = 300;
   }
   else {
    alto_fila = $(window).height() - 220;
   }
    $(".img-row").height(alto_fila);
//   console.log("alto fila", alto_fila);
 
 };
