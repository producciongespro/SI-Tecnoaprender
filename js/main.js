$( document ).ready(function() {
    console.log("listo");
    eventos();
});


function eventos() {  
var centroEducativo = [];

$("#btnBuscar").click(function(){
    var cpresup = $("#codigo").val();
    console.log(cpresup);
    $.getJSON("../server/obtener_ce.php?id="+cpresup+'"', function(result){
        if (result.length === 0){
            $('#formCE').trigger("reset");
            $('#formProy').trigger("reset");
            //$("#formCE")[0].reset();
            $("#nombre").val("No encontrado");
            
            
        }
        else{
            $.each(result, function(i, field){
                centroEducativo.push(field);
                $("#nombre").val(centroEducativo[i].nombre);
                $("#provincia").val(centroEducativo[i].provincia);
                $("#canton").val(centroEducativo[i].canton);
                $("#distrito").val(centroEducativo[i].distrito);
              });
              buscarProyectos(cpresup);
        }
     
    });
  });
}


function buscarProyectos(codigo) {
    console.log ("Buscando proyectos de: " +codigo);
    var proyectos=[];
    $.getJSON("../server/obtener_proyectos.php?id="+codigo+'"', function(result){

            $.each(result, function(i, field){
                proyectos.push(field);
                $("#nombreProyecto").val(proyectos[i].nombre);
                $("#inversion").val(proyectos[i].inversion);
                $("#patrocinador").val(proyectos[i].cod_patrocinador);
            });
          console.log(proyectos);   
    });
}