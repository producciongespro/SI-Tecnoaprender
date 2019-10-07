//Variables Globales
var usoProf = [];
var usoEst = [];
var idCentroEducativo, consulta;
var accion;


function setupForm5y6 (accion,itemID) {
	// Handler onload
       idCentroEducativo = itemID;
	   activaSelect(accion);          	    
        //console.log("---------------Accion en setup5y6", accion, "--------------");                      
       //console.log("idCentroEducativo", idCentroEducativo);	

       
	   //Se elimina manjeador de eventos residuales en memoria
	   $("#btn-aprovechamiento-tecnologico").off("click");
       $("#btn-aprovechamiento-tecnologico").click(function (e) {			
           e.preventDefault();   
			llenarEspacios();			
            guardarProfesor();           
		   guardarEstudiante();         
          
		   enviarFormDataAjax( empaquetarDatosAprovechamientoTec(), 
                        function () { 
                            // console.log("ACCION", accion);  
                            deshabilitaForm('form-5');
                        },  
                        "../server/agregar_main.php?tabla=uso_equipo&id="+idCentroEducativo );  
						
       });
   
	//Se eliminana eventos residuales
	$("#btn-usoTecPorProyecto").off("click");
       $("#btn-usoTecPorProyecto").click(function (e) { 
           e.preventDefault();
           $(this).prop("disabled", true);           
           enviarFormDataAjax( empaquetarDatosUsoTecProyecto(), 
                        function () { 
                            //CArga nuevamente la tqabla una vez realizado el update para que cargue los datos reicen agregados.
                            cargarJson (renderizarFormUsoTecnologiaProyecto, "../server/obtener_proyectos_tecnoaprender.php?tabla=uso_materias" );
                          }, 
                        "../server/agregar_main.php?tabla=uso_materias&id="+idCentroEducativo );           
       });

       
}

function activaSelect(accion) {
    accion=accion;
    // console.log("------------------Accion en activaSelect", accion);
    $("#selProyectosCE").empty();
    consulta = "SELECT id_CE,  id_iniciativa, iniciativas.nombre FROM proyectos INNER JOIN iniciativas ON iniciativas.id=proyectos.id_iniciativa WHERE `id_CE`="+ idCentroEducativo;
    enviarFormDataAjax( empaquetarConsulta(consulta), cargarSelect,  "../server/consultas_generales.php" );   
}


function deshabilitarInput(clase) {
    // console.log("DESACTIVANDO formulario", clase);    
    $("."+ clase).prop("disabled", true);  
    $("."+clase).addClass("disabled");       
}

function habilitaritarInput(clase) {
    // console.log("ACTIVANDO formulario", clase);    
    $("."+ clase).prop("disabled", false);  
    $("."+clase).removeClass("disabled");       
}



function guardarProfesor () { 
//Se limpia el array para que no haga duplicados :	
    usoProf = []; 
	const chkProfesor = $(".uso-tec-prof");
    for (let index = 0; index < chkProfesor.length; index++) {
        let obj = {
            "id" : chkProfesor[index].id,
            "chk" : chkProfesor[index].checked
        };
        usoProf.push(obj);        
    };
    // console.log("datos profesor guardados", usoProf);   
       
}

function guardarEstudiante () {
	//Se limpia el array para que no haga duplicados :
	usoEst  = [];
    const chkEstudiante = $(".uso-tec-est");
    for (let index = 0; index < chkEstudiante.length; index++) {
        let obj = {
            "id" : chkEstudiante[index].id,
            "chk" : chkEstudiante[index].checked
        };
        usoEst.push(obj);        
    };
    // console.log("datos estudiante guardados ");
    // console.log(usoEst);    
       
}

function empaquetarDatosAprovechamientoTec () {
    console.log($("#selTecnologiaPAT").val());
    
    var formData = new FormData();
   // formData.append("id_CE", idCentroEducativo);
    formData.append("total_docentes",  $("#numCantDocnetes").val()  );
    formData.append("indicador", $("#selTecnologiaPAT").val()  );
    formData.append("docente_ie", $("#numDocentesIE").val() );
    formData.append("cantidad_laboratorio_pronie", $("#numLabPRONIE").val() );
    formData.append("cantidad_laboratorio_innovacion", $("#numLabInnovacion").val() );
    formData.append("cantidad_laboratorio_inco", $("#numLabINCO").val() );
    formData.append("nombres_otros_laboratorios", $("#txtOtrosLaboratorios").val() );
    formData.append("ing_informatico", $("#numIngenieroInf").val() );
    formData.append("proyecto_tecnologia", $("#numProyTecnologia").val() );
    formData.append("organizacion_equipo", $("#selOrganizacionUsoEquipo").val() );
    formData.append("estudiantes_discapacidad", $("#numCantEstDiscapacidad").val() );
    formData.append("uso_general_docente", JSON.stringify(usoProf) );
    formData.append("uso_general_estudiantes", JSON.stringify(usoEst) );
    formData.append("otros_usos_estudiantes", $("#txtEstOtro").val() );
    formData.append("otros_usos_docentes", $("#txtProfOtro").val() );  
    
        // IMPORTANTE:
        // Display the key/value pairs
        
        /*
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
    */
   return formData;
}


function enviarFormDataAjax  ( formData, mCallBack,  url ) { 
    
  $.ajax({
    url: url,
    type: 'POST',
    data: formData,
    //dataType:'json',
    cache: false,
    contentType: false,
    processData: false,
    beforeSend: function(){
    //console.log("En proceso");    
    }, success: function(response){
      console.log("Enviado satisfactoriamente");
    //   alertify.notify('La información ha sido enviada','warning',2, null);      //console.log(response);
      mCallBack(response);      


    }, error: function(response){
      console.log("Error al enviar");
        console.log(response.error);
        console.log(response.msj);     
    }
  });
 }


function cargarJson ( mCallBack, url  ) {
    //console.log("rl id idCentroEducativo", url + "&id=" + idCentroEducativo);

         fetch( url + "&id=" + idCentroEducativo )
                .then(response => response.json())
                .then(data => {                    
                    mCallBack (data );                
                })
                .catch(error => console.error(error))                 
     
}

function renderizarFormAprovechamientoTec (dataset ) {
    let registros = false;
        dataset = dataset[0];        
       deshabilitarInput("form-6");
   if(dataset !== undefined) {
       
    //console.log(dataset);
        
        usoProf = JSON.parse( dataset.uso_general_docente );
        usoEst = JSON.parse( dataset.uso_general_estudiantes );
        //console.log(usoProf);



        for (let index = 0; index < usoProf.length; index++) {
            let tmpChk =  document.getElementById( usoProf[index].id );
            tmpChk.checked = usoProf[index].chk;             
            
        }

        for (let index = 0; index < usoEst.length; index++) {
            let tmpChk =  document.getElementById( usoEst[index].id );
            tmpChk.checked = usoEst[index].chk;             
            
        }

        $("#numCantDocnetes").val(dataset.total_docentes );
        $("#selTecnologiaPAT").val(dataset.indicador);
        $("#numDocentesIE").val(dataset.docente_ie);
        $("#numLabPRONIE").val(dataset.cantidad_laboratorio_pronie);
        $("#numLabInnovacion").val(dataset.cantidad_laboratorio_innovacion);
        $("#numLabINCO").val(dataset.cantidad_laboratorio_inco);
        $("#txtOtrosLaboratorios").val(dataset.nombres_otros_laboratorios);

        $("#numIngenieroInf").val(dataset.ing_informatico);
        $("#numProyTecnologia").val(dataset.proyecto_tecnologia );
        $("#selOrganizacionUsoEquipo").val(dataset.organizacion_equipo); 
        
        $("#numCantEstDiscapacidad").val(dataset.estudiantes_discapacidad);
        $("#txtEstOtro").val(dataset.otros_usos_estudiantes);
        $("#txtProfOtro").val(dataset.otros_usos_docentes);
        registros = true;
        deshabilitarInput("form-5");  
    } 
   
    let formulario = "form-5";
    formaBotonEnviar(formulario,registros);
}



function renderizarFormUsoTecnologiaProyecto(dataset) {

dataset.reverse();
//    console.log("Desde proyecto render",dataset);  
    
    
     //Renderiza el formulario de acuerdo al valor seleccionado por el usuario:
    
   
     const limite = dataset.length;
	$("#selProyectosCE").off("change");
    $("#selProyectosCE").change(function (e) { 
        e.preventDefault();
        const opcion = e.target.value;
        console.log(opcion); 
        //Habilita el form para poder cargar los datos
        habilitaritarInput("form-6");

        //resetea el form
        $(".form-6").val("No se utiliza");
        // resetea el textarea
        $("#txaDetalleProyecto").val("");
        



        for (let index = 0; index < limite; index++) {
            
            if (opcion == dataset[index].id_iniciativa  ) {
                //Llena todos los select desde el objeto
                $("#matEstudiosSociales").val(  dataset[index].uso_est);
                $("#matMate").val(  dataset[index].uso_mat );
                $("#matCiencias").val(  dataset[index].uso_cie );
                $("#matBiologia").val(  dataset[index].uso_bio );
                
                $("#matFisica").val(  dataset[index].uso_fis  );
                $("#matQuimica").val(  dataset[index].uso_qui  );
                $("#matEsp").val(  dataset[index].uso_esp );

                $("#matArtesPlast").val(  dataset[index].uso_apl  );
                $("#matArtesInd").val(  dataset[index].uso_ain  );
                $("#matHogar").val(  dataset[index].uso_eph  );
                $("#matCivica").val(  dataset[index].uso_civ  );
                $("#matMusica").val(  dataset[index].uso_mus  );
                $("#matReligion").val(  dataset[index].uso_rel  );
                $("#matBiblio").val(  dataset[index].uso_bib  );

                $("#matBibliocra").val(  dataset[index].uso_bib_cra  );
                $("#matBiblioDigital").val(  dataset[index].uso_bib_digital  );
                $("#matVocacional").val(  dataset[index].uso_incluir_plan_vocacional  );
                $("#matCindea").val(  dataset[index].uso_incluir_modulos_cindea_ipec  );
                $("#txaDetalleProyecto").val(dataset[index].practicas_proyectos);                             
            }
            
        }

    //console.log("modoActualizacion", modoActualizacion );
    console.log("accion en clic",  accion);

    if (accion != "agregar") {
        if (modoActualizacion != true ) {
            deshabilitarInput("form-6");
        }        
    } 
    
       
        

    });



 

   
    
}


function llenarEspacios() {
    const arrayNum = $(".input-tec-num");
    const arrayTexto = $(".input-tec-txt");

    for (let index = 0; index < arrayNum.length; index++) {
     // console.log(  arrayNum[index].id,  arrayNum[index].value ); 
    // console.log(arrayNum[index].value.length );

      if (arrayNum[index].value.length == 0) {
        arrayNum[index].value = 0;
      }
                      
    }

    for (let index = 0; index < arrayTexto.length; index++) {
        //console.log(  arrayTexto[index].id,  arrayTexto[index].value ); 
        if (arrayTexto[index].value.length == 0) {
            arrayTexto[index].value = " ";
          }        
    }
}


function empaquetarDatosUsoTecProyecto () {
   
    var formData = new FormData();       
    formData.append("id_iniciativa", $("#selProyectosCE").val()  );    
    formData.append("consulta", consulta );
    formData.append("uso_est", $("#matEstudiosSociales").val() );
    formData.append("uso_mat", $("#matMate").val() );
    formData.append("uso_cie", $("#matCiencias").val() );
    formData.append("uso_bio", $("#matBiologia").val() );
    formData.append("uso_fis", $("#matFisica").val() );
    formData.append("uso_qui", $("#matQuimica").val() );
    formData.append("uso_esp", $("#matEsp").val() );
    formData.append("uso_apl", $("#matArtesPlast").val() );
    formData.append("uso_ain", $("#matArtesInd").val() );
    formData.append("uso_eph", $("#matHogar").val() );
    formData.append("uso_civ", $("#matCivica").val() );
    formData.append("uso_mus", $("#matMusica").val() );
    formData.append("uso_rel", $("#matReligion").val() );
    formData.append("uso_bib", $("#matBiblio").val() );
    formData.append("uso_bib_cra", $("#matBibliocra").val() );
    formData.append("uso_bib_digital", $("#matBiblioDigital").val() );
    formData.append("uso_incluir_plan_vocacional", $("#matVocacional").val() );
    formData.append("uso_incluir_modulos_cindea_ipec", $("#matCindea").val() );
    formData.append("practicas_proyectos", $("#txaDetalleProyecto").val() );  
    
    
           // IMPORTANTE:
        // Display the key/value pairs
        
       /* 
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
    */
    

   return formData;
}

function empaquetarConsulta(c) { 
    // c recibe como parámetro la consulta a empaquetar para luego mandarla por Ajax    
    
        var formData = new FormData();               
        formData.append("consulta", c );
/*
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
*/
        return formData;
}

function cargarSelect(stringArray) {
let dataset = JSON.parse(stringArray);
    //  console.log(dataset);      
     //Renderiza el formulario de acuerdo al valor seleccionado por el usuario:  
     const limite = dataset.length;
    //console.log(limite);    
    $("#selProyectosCE").empty();
    $("#selProyectosCE").append("  <option value=0 selected > Seleccione el proyecto </option>  ");
     for (let index = 0; index < limite; index++) {
        let tmpOption = $( "<option value='"+  dataset[index].id_iniciativa  +"'  >" +  dataset[index].nombre   + "</option>"     );        
        $("#selProyectosCE").append(tmpOption);
     }

}