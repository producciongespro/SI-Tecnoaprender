
"use strict";
var consultaCentroEducativo = "./formulario.php?accion=consultar&nombre=";
//objeto centro educativo cuando carga el ajax
var item; 
  
$(document).ready(function () {
    console.log("READY CE");    
    if (tipo == "2") {
        console.log("Cargando CE");        
        cargarApp();    
    }    
});  


function cargarApp(){      
  
  const url = "../server/obtener_centro.php?id="+ idCE  +"&tabla=centro_educativo";   
   fetch( url)
      .then(function(response) {
          return response.json();
      })
      .then(function(myJson) {
          item = myJson[0];                 

        //Evento clic del botón conlutar Centro educativo en director:

        $("#btnConsultaDirector").click(function (e) { 
            e.preventDefault();
            //console.log(item); 
            consultaCentroEducativo = consultaCentroEducativo + item.institucion + "&codigo=" + item.cod_pres + "&id=" + item.id;
            console.log(consultaCentroEducativo);
            location.href = consultaCentroEducativo;            
        });



      })
    
    
    
    
    
    }  


