var itemID=0,  //id del centro que existe
    // formCambio,
    arrayEquipo =['fonatel','transferencia','conectandonos','donacion'],
    sourceFile,  // Variable en caso de que el archivo de inventario no se actualice
    arrEquipamiento = [],
    correoUser,  // variable que controla si se realiza un cambio en los formularios
    tipo,  //tipo de usuario
    accion,  //accion que está ejecutando el usuario: agrear CE o editar CE
    validaExiste = false;
    modoActualizacion = false;

jQuery(document).ready(function($){  
  // session
  $('[data-toggle="tooltip"]').tooltip();
  saveSession();
  settingsIniciales();
});

function saveSession() {
  // establecer variables de sesión
  tipo = sessionStorage.getItem("tipo");
  correoUser = sessionStorage.getItem("correo");
}

function settingsIniciales() {
  $.extend($.validator.messages, {
    required: "Campo requerido",
    number: "Campo numérico"
  });

  var collectionForms = document.forms;
  for (let index = 0; index < collectionForms.length; index++) {
      collectionForms[index].reset();    
  }

  $("#divInfo").html('<a id="btnInicio" href="index.php" alt="Inicio"><i class= "fas fa-home"></i></a>&nbsp;&nbsp;&nbsp;&nbsp; <a href="#" class="acerca-de" data-toggle="tooltip" title="Acerca de"> <i class="fas fa-info-circle"></i></a>');
  $("#divUsuario").html('<i class="fas fa-user-alt"></i><span class="usuario"> </span>'+correoUser);
  $("#divSalir").html(
    '<a href="../server/login/logout.php" data-toggle="tooltip" title="Cerrar sesión"><i class="fas fa-sign-out-alt"></i></a>'
    );
  cargaModalAcercaDe();  
  
    // Add minus icon for collapse element which is open by default
  $(".collapse.show").each(function(){
    $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
  });

 
  // Toggle plus minus icon on show hide of collapse element
  $(".collapse").on('show.bs.collapse', function(){
    $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
  }).on('hide.bs.collapse', function(){
    $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
  });

  $('.collapse').collapse();
  $("#agregarInstitucion").hide();

  //llamado de settings para agregar-consultar
  setAccion();

}


function setAccion() {
  var events = $._data(document.getElementById('agregarInstitucion'), "events");
  var hasEvents = (events != null);
  // console.log("tiene eventos?", hasEvents);
  
  var accion = null;
  const currentURL =   window.location.href;
  const url = new URL(currentURL);
  accion = url.searchParams.get("accion");
  // console.log("Direccion actual:",  currentURL);                
  // console.log("Valor de acción:", accion);
  if (accion == null) {
    location = 'index.php';
  }
  if (accion != 'agregar' && accion != 'consultar'){
       location = 'index.php';
  }
  $("#miConsulta").on('focus', function () {  
      this.value='';
  });  

  $("#form_url_inventario").on('change', function () {  
    mostarNombreArchivo(  $("#form_url_inventario")  );
  });  

  switch (accion) {
    case "agregar":
      $("#agregarInstitucion").off( );
      $("#agregarInstitucion").on('click', checkDataForms);
      agregarCentro();
    break;
    case "consultar":
      consultaCentro(accion);
    break;

    default:
    break;
  }
}

function mostarNombreArchivo( archivoPdf ) {
  // Coloca el nombre del archivo en el input file del form-1
  $("#lblInputfile").text(archivoPdf[0].files[0].name);
}

function checkDataForms() { //chequea si existen información sin guardar
  let elementDeshabilitado = false;
      for (let index = 1; index <10; index++) {
        let element = '.btn-'+index;
        if($(element).prop('disabled') == false) {
          elementDeshabilitado = true;
          break;
        }
      };
      if(elementDeshabilitado){
        alertify.confirm('Aviso', 'Hay información sin guardar ¿Desea continuar?', 
        function(){ window.location.href = "formulario.php?accion=agregar";},
        function(){ }).set({
                labels : {
                    ok     : "SI",
                    cancel : "NO"
                }
        }); 
      }
      else {
        window.location.href = "formulario.php?accion=agregar";
      } 
}

function limpiarFormularios() {
  let collectionForms = document.forms;
  for (let index = 0; index < collectionForms.length; index++) {
    collectionForms[index].reset();   
    setEquipamiento(); 
  };
}

function setEquipamiento() {
  //desactiva los tab's por defecto activos
  for (let index = 0; index < arrayEquipo.length; index++) {
      $("#"+arrayEquipo[index]).removeClass("show active");
      let j =  index + 1
      $("#li"+j).removeClass("active show");
      $("#ali"+j).removeClass("active show");
      $("#li"+j).addClass("d-none");
  };
};

function agregarCentro() {
  let accion = 'agregar';
  $(".row-search").hide();  //oculta espacio de consulta
  $("#mensaje").hide();   //espacio div mensajes si existe centro educativo

  autocompleteArrays(accion);    

  $("#cerrarModal").on('click', function () { 
    location = 'index.php';     
  });
  $("#cancelarModal").on('click', function () { 
    location = 'index.php';     
  });

  $("#mdlAgregarCE").modal({backdrop: "static"});               
  $("#mdlAgregarCE").modal();
  
  $("#txtCentroEducativo").on( "focus", function () {
      if( $("#mensaje").is(":visible")) {
        $("#mensaje").hide();
      }
      $("#txtCentroEducativo").val('');
    });
 
  for (let index = 0; index < arrayEquipo.length; index++) {  //usa la variable global
      const element = 'form-4-'+arrayEquipo[index];
      formaBotonEnviar(element, false)  
  }
  for (let index = 1; index < 7; index++) {
    const element = 'form-'+ index;
    formaBotonEnviar(element, false)  
  }

  $( "#btnObtenerCE" ).click( function () {
    let tmp = $("#txtCentroEducativo").val();
    if (tmp != ""){      
      var regex = /(\d+)/g;
      var regExp = /\-([^-]+)\-/;
      var matches = regExp.exec(tmp);
      if (matches == null) {
        alertify.confirm('AGREGAR CENTRO EDUCATIVO', 'Este código no existe ¿Desea agregarlo?', 
        function(){console.log('Código nuevo / Institución nueva');
                    preparacionAgregar(accion, false);},
        function(){ }).set({
                labels : {
                    ok     : "SI",
                    cancel : "NO"
                }
        }); 
      }
      else {
        var valorinstitucion = matches[1];
        var regExp2 = /\(([^)]+)\)/;
            matches = regExp2.exec(tmp);
        var valorcod = matches[1];
            valorcod = valorcod.match(regex);
        if (!validaExiste) {
          validaExiste = true;
          let consSelect = "SELECT * FROM `centro_educativo` WHERE `cod_pres`= '"+valorcod+"' AND `institucion` = '"+valorinstitucion+"'";
          enviarFormDataAjax2( empaquetarConsulta(consSelect), buscaCentroEducativo, "../server/consultas_generales.php",accion, 'agregarCentro')
        }
        else {
          validaExiste = false;
          preparacionAgregar('agregar', true);
        }

        
      }  
    }
  });
};

function buscaCentroEducativo(stringArray, accion) {
  let dataset = JSON.parse(stringArray);
  const limite = dataset.length;
  // console.log("Limite en buscaCentroEducativo", limite);
      
  if(limite != 0) {
      
      $("#mensaje").html("<p>El centro educativo ya está registrado: <strong>"+dataset[0].institucion+"</strong> con el código presupuestario: <strong>"+dataset[0].cod_pres+" </strong>.</p>");
      $("#mensaje").show();  

  }
  else 
   {
    preparacionAgregar(accion, true);
  }
}

function preparacionAgregar(accion, existe){
     let tmp = $("#txtCentroEducativo").val(),
         codigoConsulta;
    if (existe){
      var res = tmp.indexOf("[");
      codigoConsulta = tmp.substring(res + 4, tmp.length - 1); // id de tabla centros_educativos_mep
    }
    else{
      codigoConsulta = tmp;
    }

    $("#mdlAgregarCE").modal("hide");
    $('.collapse').collapse('show');
    $("#mensajeIniciativas").show();
    $("#mensajeEquipamiento").show();
    $("#form-iniciativas").hide();
    $("#agregarInstitucion").show();
    // $("#agregarInstitucion").removeClass('invisible')
    cambia_estado_forms(true);                //desactiva todos los forms
    $(".form-1").prop("disabled", false);     //activa solo el formulario 1
    deshabilitaBoton('form-1');
    cargaForm1(accion, codigoConsulta);
    validacionyEnvioForm1(accion);
}

//CONSULTAR 
function consultaCentro(accion) {  
  $(".row-search").show(); 
  console.log("Tipo", tipo);
  
  if (tipo == 2) {
    $("#btn-actualizar").hide()
  }
  else {
    $("#btn-actualizar").show()
  }
  $("#agregarInstitucion").hide(); 

  $("#miConsulta").on('focus', function () {  
    this.value='';
  });  

  $("#mensajeIniciativas").hide();
  $("#form-iniciativas").hide();
  $("#mensajeEquipamiento").hide();
 
  autocompleteArrays(accion); 
  cambia_estado_forms(true);

  $( "#btnSend" ).click( function () {
    $('.collapse').collapse('show')
    var valorConsulta = $("#miConsulta").val();
    limpiarFormularios();
    // if ($("#miConsulta").val() != "")
   if (valorConsulta != "")
    {
      let tmp = valorConsulta;
      var res = tmp.indexOf("[");
      let codigoConsulta = tmp.substring(res + 4, tmp.length - 1);
      itemID = codigoConsulta;
      
      cargaForm1(accion, codigoConsulta);
      cargaForm2(accion, codigoConsulta);
      cargaForm3(accion, codigoConsulta);
      cargaForm4(accion, codigoConsulta);
      setupForm5y6(accion,codigoConsulta);          // de Luisito
      cargaForm5(accion, codigoConsulta);
      cargaForm6(accion, codigoConsulta,"");
      cambia_estado_forms(true);

      $( "#btn-actualizar" ).click( function () {
        //Bandera modo actualizacion
        modoActualizacion=true;
        //redundancia para habilitar forms 5 y 6
        habilitaritarInput("form-5");
        habilitaritarInput("form-6");      

        // alert("actualizar")
        cargandoValidaciones (accion);
        cambia_estado_forms(false);
        preparacion_de_forms(accion);

      });
    }
    else {
      console.log("vacio");
    }
  });
}

function cargandoValidaciones (accion) {
  // llamado de validaciones para los formularios
  if (accion === 'consultar') {
    validacionyEnvioForm1(accion); //en agregar ya se llamó  
  }
  validacionyEnvioForm2(accion);
  validacionyEnvioForm3(accion);
  validacionyEnvioForms4(accion);  //equipamientos
} 

// validación y envío de formularios
function validacionyEnvioForm1(accion) {
  // Validación Formulario de Información General y llamado para INSERT O UPDATE
  var form = $( "#form-1" );
  $("form").off("submit");
  $("form").on("submit", function(event) {
        event.preventDefault();
  });

  form.validate({
    rules: {    },
    messages: {
          form_correo: { pattern: "Debe ser correo oficial" },
          // form_enlace_correo: { pattern: "Debe ser correo oficial" },

      },
      errorPlacement: function(error, element) {
         if ( element.is(":radio") || element.is(":input")) {
               error.appendTo(element.parent("div").next("div"));
             }
             else { // This is the default behavior of the script for all fields
                 error.insertAfter( element );
             }
         }
     });
    $("#btn-informacion-general").click(function () {
      if(form.valid()=== true){           
        $("#btn-informacion-general").prop("disabled", true);  
        
        envioDatosForm1(accion);
      }
      else {
          alertify.notify('El formulario no es válido','warning',3, null);
      }
   });
}

function envioDatosForm1(accionF) {
  
  $('#form-1 input[type=text]').each(function(){
    if($(this).val()==""){
      let elementEmpty = $(this)[0].id;      
      document.getElementById(elementEmpty).value=' ';
    }
  });
  $('#form-1 input[type=number]').each(function(){
    if($(this).val()==""){
      let elementEmpty = $(this)[0].id;      
      document.getElementById(elementEmpty).value=0;
    }
  });

  let id_del_centro_educativo = parseInt(itemID);  

  if(accionF =="agregar") {
           url = "../server/agregar_main.php?tabla=centro_educativo";
        }
        else {
          url = "../server/actualizar_main.php?tabla=centro_educativo&id=" +id_del_centro_educativo + "";
        }
  
      let data = new FormData($('#form-1')[0]); 
      

      var x = document.getElementById("form_url_inventario");
      var txt = "";
      if ('files' in x) {
        if (x.files.length != 0) 
          {
            var file = x.files[0];
            if ('name' in file) {
                    txt += "name: " + file.name + "<br>";
                    txt += "...LLEVA ARCHIVO"
                    data.append('lleva', 'true');
                  }
            }
            else{
              data.append('lleva', 'false');
              data.append('ruta_archivo', sourceFile); 
            }
          }
    guardarEquipamiento();
    // console.log("Enlace condición", $("#form_enlace_condicion").val());
    
    // if($("#form_enlace_condicion").val() is null=="" || $("#form_enlace_condicion").val()== null ){
    //   $("#form_enlace_condicion").val("ninguno")
    // };
    data.append("equipamiento", JSON.stringify(arrEquipamiento) );
    // for (var pair of data.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]); 
    // }
    
      if(accionF =="agregar")
      {
        let codigoP = $("#form_cod_pres").val(),
            nombreI =$("#form_institucion").val();
            var idx = 0; 

        for (let index = 0; index < arrEquipamiento.length; index++) {
            if (arrEquipamiento[index].chk == true) {
              // console.log("arrEquipamiento[index].chk", arrEquipamiento[index].chk);
              idx ++
            }        
        }
        // console.log("Total de select equipamiento",idx);
        
        if (codigoP!= '' && nombreI != '') {
          consulta = "SELECT * FROM `centro_educativo` WHERE `cod_pres`= '"+codigoP+"' AND `institucion` = '"+nombreI+"'";
          // console.log("CONSULTA...", consulta);
          enviarFormDataAjax( empaquetarConsulta(consulta), 
          function(dataF){
            datos = JSON.parse(dataF); 
            if (datos.length === 0) {
                // if (idx == 0){
                //   alert("no se eligió equipamiento")
                // }
              if (idx == 0) {
                alertify.confirm('Aviso - Equipamiento', 'No ha seleccionado ningún tipo de equipamiento ¿Desea continuar?', 
                    function(){ conectDataAjax(url, data, cargaForm);},
                    function(){ $("#btn-informacion-general").prop("disabled", false)}).set({
                      labels : {
                          ok     : "SI",
                          cancel : "NO"
                      }
                    });                
              }
              else {
                conectDataAjax(url, data, cargaForm);
              }
            }
            else {
              alertify.alert('AVISO', 'Ya esta institución con ese nombre y código presupuestario habían sido agregadas recientemente.')
            }
          }, 
          "../server/consultas_generales.php" );
        }
      }
      else {        
        conectDataAjaxModificar(url, data, accionF, id_del_centro_educativo);      
      }
}

function guardarEquipamiento () {   
  const chkEquipamiento = $(".chk-equipamiento");
  arrEquipamiento = [];
  for (let index = 0; index < chkEquipamiento.length; index++) {
      let obj = {
          "id" : chkEquipamiento[index].id,
          "chk" : chkEquipamiento[index].checked
      };
      arrEquipamiento.push(obj);        
  };   
  // console.log("arreglo equipamiento", arrEquipamiento);  
}

function validacionyEnvioForm2(accionF) {
  var form = $( "#form-2" );
  
  var id_del_centro_educativo = parseInt(itemID);  

  $("form").off("submit");
  $("form").on("submit", function(event) {
        event.preventDefault();
  });
  form.validate({
    // FALTA VALIDACIÓN SI SE REQUIERE
    // regla de que no esté vacío el código
  });
  
  $('#btn-datos-proyectos').click(function(e){
    if(form.valid()=== true){   

      if (id_del_centro_educativo != 0) {
      if (accionF == 'agregar') {
            e.preventDefault();
            var searchIDs = $("#proyectosCE input:checkbox:checked").map(function(){
              return $(this).attr("id");
            }).get(); // <----
            // console.log("searchIDs",searchIDs);
            // var url = "../server/agregar_main.php?tabla=proyectos&id=" +id_del_centro_educativo + "";
            var url = "../server/actualizar_main.php?tabla=proyectos&id=" +id_del_centro_educativo + "";
            let datosDesde = searchIDs.length;  
            $(".div-shadow").removeClass("invisible");          
            $.ajax({
              type: "POST",
              url: url,
              data: {'array': JSON.stringify(searchIDs)},//capturo array     
              success: function(data){
                $(".div-shadow").addClass("invisible");
                cargaForm6(accionF, id_del_centro_educativo, datosDesde);
                $(".form-2").prop("disabled", true);
                deshabilitaBoton('form-2');
                $('#btn-datos-proyectos').blur();
               },
               error: function(data){
                $(".div-shadow").addClass("invisible");
                console.log("Error al actualizar");
              }

            });
          }
          else {
            e.preventDefault();
            var searchIDs = $("#proyectosCE input:checkbox:checked").map(function(){
              return $(this).attr("id");
            }).get(); // <----
            
            var url = "../server/actualizar_main.php?tabla=proyectos&id=" +id_del_centro_educativo + "";
            // console.log("url actualizar",url);
            let datosDesde = searchIDs.length;
            $(".div-shadow").removeClass("invisible");
            $.ajax({
              type: "POST",
              url: url,
              data: {'array': JSON.stringify(searchIDs)},//capturo array     
              success: function(data){
                $(".div-shadow").addClass("invisible");
                deshabilitaBoton('form-2');
                $('#btn-datos-proyectos').blur();
                // alertify.notify('La información ha sido actualizada','warning',3, null);
                cargaForm6(accionF, id_del_centro_educativo, datosDesde);
                // console.log('actualizados');  
              },
              error: function(data){
                $(".div-shadow").addClass("invisible");
                console.log("Error al actualizar");
              }
            });
          };
      };
    }
    else {
        alertify.notify('El formulario no es válido','warning',3, null);
    }
  });  
}

function validacionyEnvioForm3(accionF) {       //Infraestructura
  
  var form = $( "#form-3" );
  var id_del_centro_educativo = parseInt(itemID);  

  $("form").off("submit");
  $("form").on("submit", function(event) {
        event.preventDefault();
  });
  form.validate({
    // FALTA VALIDACIÓN SI SE REQUIERE
    // regla de que no esté vacío el código
  });
  $('#btn-infraestructura').click(function(e){
    if(form.valid()=== true){   
      if (id_del_centro_educativo != 0) {  
        let data = new FormData($('#form-3')[0]); 
        var internet=["#chkOficinas","#chkred","#chkbib","#chkinsti"];
        var names=["chkOficinas","chkred","chkbib","chkinsti"];
        var url;
        for (let index = 0; index < 4; index++) {
          var oficinas = $(internet[index]);
          data.delete(names[index]);        
        if (oficinas.is(":checked")){
            data.append((names[index]), 'true');    
        }
          else {
            data.append((names[index]), 'false'); 
          } 
        }
        if (accionF == 'agregar') {
            url = "../server/agregar_main.php?tabla=infraestructura&id=" +id_del_centro_educativo + "";
        }
        else {
            url = "../server/actualizar_main.php?tabla=infraestructura&id=" +id_del_centro_educativo + "";
        }
        conectDataAjaxSimple(url, data);    
        if (accionF == 'agregar') {
          $(".form-3").prop("disabled", true);
          deshabilitaBoton('form-3');
          $('#btn-infraestructura').blur();          
        }  
        else {
          deshabilitaBoton('form-3');
          $('#btn-infraestructura').blur();
        }
      }
      else {
        console.log("El código viene vacío");
      }
    }
    else {
        alertify.notify('El formulario no es válido','warning',3, null);
    }
  });
}

function validacionyEnvioForms4(accion) {
  actualizaForm4(accion,'fonatel');
  actualizaForm4(accion,'transferencia');
  actualizaForm4(accion,'donacion');
  actualizaForm4(accion,'conectandonos');
}

function actualizaForm4(accionF,tipoEquipo) {  
  let idForm = "#form-4-"+tipoEquipo,
      idBtn =  "#btn-equipamiento-"+tipoEquipo;

  var form = $(idForm);
  
  // var form = $( "#form-4-fonatel" );
  var id_del_centro_educativo = parseInt(itemID);  

  $("form").off("submit");
  $("form").on("submit", function(event) {
        event.preventDefault();
  });
  form.validate({
    // FALTA VALIDACIÓN SI SE REQUIERE
    // regla de que no esté vacío el código
  });
  $(idBtn).click(function(e){
    // valores de la tabla y clase se pierden cuando se agrega
    var tipoEquipamiento = idBtn.slice(18),
     nombreTabla = "equipamiento_"+tipoEquipamiento,
     nombreClase = '.form-4-'+tipoEquipamiento;
    
    if(form.valid()=== true){ 

      if (id_del_centro_educativo != 0) {  
        let data = new FormData($(idForm)[0]); 
        
      //   for (var pair of data.entries()) {
      //     console.log(pair[0]+ ', ' + pair[1]); 
      // }
        var url;
        if (accionF === 'agregar') {
          url = "../server/agregar_main.php?tabla="+nombreTabla+"&id=" +id_del_centro_educativo + "";
          
        }
        else {
            url = "../server/actualizar_main.php?tabla="+nombreTabla+"&id=" +id_del_centro_educativo + "";
            // url = "../server/actualizar_main.php?tabla=equipamiento_fonatel&id=" +id_del_centro_educativo + "";
        }
        conectDataAjaxSimple(url, data);    
        if (accionF === 'agregar') {
          $(nombreClase).prop("disabled", true);
          $(idBtn).prop("disabled", true);  //se deshabilita por ID, porque los 4 btn's  llevan el mismo name
          $(idBtn).blur()
        }
        else {
          $(idBtn).prop("disabled", true);
          $(idBtn).blur()
        }
      }
      else {
        console.log("El código viene vacío");
      }
    }
    else {
        alertify.notify('El formulario no es válido','warning',3, null);
    }
  });
}

// fin de validación y envío de formularios


function preparacion_de_forms(accion) {
  deshabilitaBotonesGuardar()

   // lanza el evento onChange para cada formulario de equipamiento
  for (let index = 1; index < 7; index++) {
    let elementButton = 'button[name=form-'+ index+']',
        elementClass = '.form-'+index;
        $(elementClass).on('change', function () { 
          // console.log("entré",index,'clase', elementClass);
          
          // formCambio = true;
          $(elementButton).prop("disabled", false);
        })
  }
  
  let arregloEquip = arrayEquipo; //variable global
  for (let index = 0; index < arregloEquip.length; index++) {
      elementClass = '.form-4-'+arregloEquip[index];
      let nameClass = "form-4-"+ arregloEquip[index];
      let elementButton = 'button[name='+nameClass+']';
        $(elementClass).on('change', function () { 
          $(elementButton).prop("disabled", false);
        });
  };
}

function deshabilitaBotonesGuardar() {
    for (let index = 1; index < 7; index++) {
      //deshabilita los botones de guardar hasta que se modifique un campo.
      let element = 'form-'+ index;
      deshabilitaBoton(element)
    }
    let arregloEquip = arrayEquipo;
    for (let index = 0; index < arregloEquip.length; index++) {
      const element = 'form-4-'+arregloEquip[index];
      deshabilitaBoton(element);
    }
  // } 
}

function deshabilitaBoton(nameButton) {    
  // Deshabilita el botón de guardar del formulario
  let element = 'button[name='+nameButton+']';
  $(element).prop("disabled", true);  
}

function cambia_estado_forms(estado) {
  //  habilita o deshabilita los campos de los formularios
  for (let index = 1; index < 7; index++) {
    let element = ".form-"+ index;
    // console.log("element desable", element);
    $(element).prop("disabled", estado);
  }
  let arregloEquip = arrayEquipo;
  for (let index = 0; index < arregloEquip.length; index++) {
      let element = ".form-4-"+ arregloEquip[index];
      $(element).prop("disabled", estado);
  };
 };

function cargaForm1(accion, codigo) {
  // llena el formulario1 Datos Generales
  let  tabla="";
  $("#row-pdf").attr('display', 'none');
  if(accion == 'agregar') {
    tabla="centros_educativos_mep";
    $("#btn-informacion-general").prop("disabled", false);  
  }
  else{
    tabla="centro_educativo";
  }
  let url= "../server/obtener_datos.php?id="+codigo+"&tabla="+tabla;   
  cargarJson2( renderizarFormDatosGenerales,accion, url);
};

function cargaForm2(accion, codigo) {
  // llena el formulario2 Proyectos
  let tabla="proyectos",
      url= "../server/obtener_datos.php?id="+codigo+"&tabla="+tabla;  
  cargarJson2( renderizarFormProyectos, accion, url);
}

function cargaForm3(accion, codigo) {
  // llena el formulario3 Infraestructura
  let tabla="infraestructura",
      url= "../server/obtener_datos.php?id="+codigo+"&tabla="+tabla;  
  cargarJson2( renderizarFormInfraestructura, accion, url);
}

function cargaForm4(accion, codigo) {   // EQUIPAMIENTO
  let url= "../server/obtener_datos.php?id="+codigo+"&tabla=centro_educativo",
      jsonEquipamientos = [], 
      equipos = [], 
      primerTab;
      
  cargarJson2( function (data) {
    if(data.length !== 0)   {
        $.each(data, function(i, field){
          equipos.push(field);  
          if (equipos[0].equipamiento != "") {

              jsonEquipamientos = JSON.parse( equipos[0].equipamiento);
            
              let existeEquipamiento = false;
              for (let index = 0; index < jsonEquipamientos.length; index++) {  //revisa si viene en false el equipamiento
                if(jsonEquipamientos[index].chk) {
                  existeEquipamiento = true;
                  primerTab = index;
                  break;
                }    
              }
              if (existeEquipamiento){
                $("#mensajeEquipamiento").hide();
                if(accion == 'consultar') {
                  activaTabs(accion,codigo,jsonEquipamientos,primerTab)
                }
                else {
                  activaTabsAgregar(jsonEquipamientos,primerTab)
                }
              }
              else {
                $("#mensajeEquipamiento").show();
              }
            }
            else {
              $("#mensajeEquipamiento").show();
              // console.log("no hay información de equipamiento");
          }
        });
    }
  }, accion, url);
}

function activaTabs(accion,codigo,jsonEquipamientos, tabActivo) {  
  
    let json1, json2, json3, json4, consulta = "", tagLi;
    for (let index = 0; index < jsonEquipamientos.length; index++) {
      if(jsonEquipamientos[index].id == 'chkfonatel' && jsonEquipamientos[index].chk)
      { 
        //  console.log("dataJSon1 FONATEL");
        tagLi = "ali1";
        consulta = "SELECT * FROM `equipamiento_fonatel` WHERE `id_CE`= '"+codigo+"'";
        enviarFormDataAjax( empaquetarConsulta(consulta), 
        function(data){
          json1 = JSON.parse(data); 
          $("#li1").removeClass("d-none");
          renderizarEquipamientoFonatel(json1, accion); 
        }, 
        "../server/consultas_generales.php" );
      }
      if(jsonEquipamientos[index].id == 'chktransferencia' && jsonEquipamientos[index].chk) 
      { 
        // console.log("dataJSon TRANSFERENCIA");
        tagLi = "ali2";
        consulta = "SELECT * FROM `equipamiento_transferencia` WHERE `id_CE`= '"+codigo+"'";
        enviarFormDataAjax( empaquetarConsulta(consulta), 
        function(data){
          json2 = JSON.parse(data); 
          $("#li2").removeClass("d-none");
          // console.log("primer tab TRANSFERENCIA", primerTab);
          renderizarEquipamientoTransferencia(json2, accion)  
        },
        "../server/consultas_generales.php" );
      }
      if(jsonEquipamientos[index].id == 'chkconectandonos' && jsonEquipamientos[index].chk)
      {
        //  console.log("dataJSon1 CONECTANDONOS");
        tagLi = "ali3";
        consulta = "SELECT * FROM `equipamiento_conectandonos` WHERE `id_CE`= '"+codigo+"'";
        enviarFormDataAjax( empaquetarConsulta(consulta), 
        function(data){
          json3 = JSON.parse(data); 
          $("#li3").removeClass("d-none");
          renderizarEquipamientoConectandonos(json3, accion)
        },
          "../server/consultas_generales.php" );
      }
      if(jsonEquipamientos[index].id == 'chkdonacion' && jsonEquipamientos[index].chk)
      { 
        // console.log("dataJSon1 DONACION");
        tagLi = "ali4";
        consulta = "SELECT * FROM `equipamiento_donacion` WHERE `id_CE`= '"+codigo+"'";
        enviarFormDataAjax( empaquetarConsulta(consulta), 
        function(data){
          json4 = JSON.parse(data);
          $("#li4").removeClass("d-none");
          renderizarEquipamientoDonacion(json4, accion)     
        },
        "../server/consultas_generales.php" );
      }
      
      if (index == tabActivo) {
        let checkEquipamiento = jsonEquipamientos[index].id;
        let primerTab = checkEquipamiento.slice(3),
           j = index + 1;        
        
        $("#"+primerTab).addClass("active show");
        //  $("#ali"+j).addClass("show active");
         $("#"+tagLi).addClass("show active");
      }
    } //end del for
    

}

function activaTabsAgregar(jsonEquipamientos, tabActivo) {  
  let accion = 'agregar';
  
    let tagLi;
    for (let index = 0; index < jsonEquipamientos.length; index++) {
      if(jsonEquipamientos[index].id == 'chkfonatel' && jsonEquipamientos[index].chk)
      { 
        //  console.log("dataJSon1 FONATEL");
        tagLi = "ali1";
          $("#li1").removeClass("d-none");
      }
      if(jsonEquipamientos[index].id == 'chktransferencia' && jsonEquipamientos[index].chk) 
      { 
        // console.log("dataJSon TRANSFERENCIA");
        let consulta = 'SELECT * FROM `transferencia_estado` ORDER BY id';
        enviarFormDataAjax2( empaquetarConsulta(consulta), llenarSelectEstadoCompra,  "../server/consultas_generales.php", "","transferencia Activa Estados")
        tagLi = "ali2";
        $("#li2").removeClass("d-none");
      }
      if(jsonEquipamientos[index].id == 'chkconectandonos' && jsonEquipamientos[index].chk)
      {
        //  console.log("dataJSon1 CONECTANDONOS");
        tagLi = "ali3";
        $("#li3").removeClass("d-none");
      }
      if(jsonEquipamientos[index].id == 'chkdonacion' && jsonEquipamientos[index].chk)
      { 
        // console.log("dataJSon1 DONACION");
        tagLi = "ali4";
          $("#li4").removeClass("d-none");
      }
      
      if (index == tabActivo) {
        let checkEquipamiento = jsonEquipamientos[index].id;
        let primerTab = checkEquipamiento.slice(3),
           j = index + 1;                
        $("#"+primerTab).addClass("active show");
        //  $("#ali"+j).addClass("show active");
         $("#"+tagLi).addClass("show active");
      }
    } //end del for
}

function cargaForm5(accion, codigo) {
  cargarJson( renderizarFormAprovechamientoTec, "../server/obtener_datos.php?tabla=uso_equipo" );
  if (accion =="agregar") {
    $(".form-5")
  }
}

function cargaForm6(accion, codigo, dataFrom) {
  if (dataFrom != ""){
    // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXX  Cargar form-6  XXXXXXXXXXXXXXXXXX");
    activaSelect(accion); //actualiza el select, por si se ha modificado los proyectos
    llamaRenderForm6(dataFrom, accion )
  }
  else {
    let tabla="proyectos",
        url= "../server/obtener_datos.php?id="+codigo+"&tabla="+tabla;  
        cargarJson2( function(data) { llamaRenderForm6(data.length,accion)}, accion, url);
  };
}

function llamaRenderForm6(largo,accionF) {
  if(largo !== 0){
    // if (accionF = 'agregar') {
    if (accionF == 'agregar') {
      // console.log("Cargar form-6 desde accioón = agregar");
     activaSelect(accion); //actualiza el select, por si se ha modificado los proyectos desde agregar
    };
    $("#mensajeIniciativas").hide();
    $("#form-iniciativas").show();
    cargarJson (renderizarFormUsoTecnologiaProyecto, "../server/obtener_proyectos_tecnoaprender.php?tabla=uso_materias" );
  }
  else {
    $("#mensajeIniciativas").show();
    $("#form-iniciativas").hide();
  }
}

function renderizarFormDatosGenerales(data, accion) {
  var institucion=[],
      registros=false,
      modalidad = "",
      asesor = 0,
      regional, provincia, canton,distrito;
  
  if(data.length !== 0)   {     
    $.each(data, function(i, field){
      institucion.push(field);     

      $("#form_cod_pres").val(institucion[i].cod_pres);
      $("#form_institucion").val(institucion[i].institucion);
      $("#form_id_modalidad_educativa").val(institucion[i].id_modalidad_educativa);
      $("#form_direccion_regional").val(institucion[i].direccion_regional);        
      $("#form_circuito").val(institucion[i].circuito);
      $("#form_provincia").val(institucion[i].provincia);
      $("#form_canton").val(institucion[i].canton);
      $("#form_distrito").val(institucion[i].distrito);
      $("#form_poblado").val(institucion[i].poblado);
      $("#form_telefono").val(institucion[i].telefono);
      $("#form_fax").val(institucion[i].fax); 
      $("#form_centro_indigena").val(institucion[i].centro_indigena); 
      $("#form_coordenada_x").val(institucion[i].coordenada_x);  
      $("#form_coordenada_y").val(institucion[i].coordenada_y);      
      $("#form_correo").val(institucion[i].correo); 
      $("#form_actualizado_por").val(correoUser);

      provincia = institucion[i].provincia;
      canton = institucion[i].canton;
      distrito = institucion[i].distrito;
      regional = institucion[i].direccion_regional;   
  
      if(accion == 'consultar')       //completar el resto de datos si se está editando
      {            
        modalidad = institucion[i].id_modalidad_educativa;
        asesor = institucion[i].id_asesor_enlace;
        
        if (data[i].equipamiento != "") {

          equipamiento = JSON.parse( data[i].equipamiento );

          for (let index = 0; index < equipamiento.length; index++) {
              let tmpChk =  document.getElementById( equipamiento[index].id );
              tmpChk.checked = equipamiento[index].chk;
          }
        }
        else
        {
          console.log("esta vacío equipamiento");
          
        }
        
        $("#form_correo").val(institucion[i].correo);
        $("#form_coordenada_x").val(institucion[i].coordenada_x);
        $("#form_coordenada_y").val(institucion[i].coordenada_y);
        $("#form_velocidad").val(institucion[i].velocidad);
        $("#form_matricula_h").val(institucion[i].matricula_h);
        $("#form_matricula_m").val(institucion[i].matricula_m);
        $("#form_cantidad_grupos").val(institucion[i].cantidad_grupos);
        $("#form_cantidad_docentes").val(institucion[i].cantidad_docentes);
        $("#form_total_pabellones").val(institucion[i].total_pabellones);
        $("#form_total_aulas").val(institucion[i].total_aulas);
            
        // selects
        $("#form_centro_indigena").val(institucion[i].centro_indigena);
        $("#form_bachillerato_internacional").val(institucion[i].bachillerato_internacional);
        $("#form_internet").val(institucion[i].internet);
        $("#form_edificio_compartido").val(institucion[i].edificio_compartido);
        $("#form_estado_conexion").val(institucion[i].estado_conexion);
        $("#form_enlace_nombre").val(institucion[i].enlace_nombre);
        $("#form_enlace_cedula").val(institucion[i].enlace_cedula);
        $("#form_enlace_telefono").val(institucion[i].enlace_telefono);
        $("#form_enlace_correo").val(institucion[i].enlace_correo);
        $("#form_enlace_especialidad").val(institucion[i].enlace_especialidad);
        $("#form_enlace_condicion").val(institucion[i].enlace_condicion);
        // $("#form_id_asesor_enlace").val(institucion[i].id_asesor_enlace);
  
        //archivo de inventario
        sourceFile = institucion[i].url_inventario;        
        
        if(sourceFile.trim() !=="" && sourceFile !== 'undefined'){
          $(".row-pdf").css('display','flex');
          $("#namePDF").html('<span>Inventario actual: <span> <a href='+institucion[i].url_inventario+' target="_blank" >Inventario</a>');
        }
        else {
          if(sourceFile === 'undefined') {
            $(".row-pdf").css('display','flex');
            $("#namePDF").html('<span>Inventario actual:  El archivo no ha sido enviado</span>');
          }  
        }            
        registros = true;
      }          
    }); 
  }
  else {
    $("#form_cod_pres").val($("#txtCentroEducativo").val());
    regional="";
    provincia = "";
    canton = "";
    distrito = "";
    asesor="";
    modalidad="";
  }
  
  //tabla provisional --- la consulta debe hacerse en Usuarios
    // let consulta = "SELECT  id,nombre FROM `usuarios` WHERE `id_tipo`='asesor enlace'  ORDER BY nombre"; 
    let consulta = "SELECT * FROM `usuarios` WHERE `id_tipo`='1' OR `id_tipo`='6' OR `id_tipo`='7' ORDER BY nombre";
    enviarFormDataAjax2( empaquetarConsulta(consulta), llenarSelectAsesores,  "../server/consultas_generales.php", asesor,"asesores select" );
    
    consulta = 'SELECT * FROM `modalidad_educativa` ORDER BY id';
    enviarFormDataAjax2( empaquetarConsulta(consulta), llenarSelectModalidad,  "../server/consultas_generales.php", modalidad,"modalidad select" );
    
    consulta = 'SELECT * FROM `direcciones_regionales` ORDER BY id';
    enviarFormDataAjax2( empaquetarConsulta(consulta), llenarSelectRegional,  "../server/consultas_generales.php", regional,"direcciones reg select" );
        
    cargaDatosSelectPCD(provincia,canton,distrito,accion);

   let formulario = "form-1";
   formaBotonEnviar(formulario,registros);
}

function llenarSelectAsesores(arreglo,idAsesor) {
  let array = JSON.parse(arreglo);
  // console.log("asesor enlace", idAsesor);
  
  var textSelect = "";
  var dropdown;
    dropdown = $('#form_id_asesor_enlace');
    dropdown.empty();
    dropdown.append("<option value ='0' selected>--- Seleccione una opción ---</option>");
    for (let index = 0; index < array.length; index++) {
      if (idAsesor == array[index].id  )    {
        
       textSelect = "<option  value='"+ array[index].id  +"' selected name = '" +  array[index].nombre  + "'   >" +  array[index].nombre  + "</option>";  
      }
      else {
       textSelect = "<option  value='"+ array[index].id  +"' name = '" +  array[index].nombre  + "'   >" +  array[index].nombre  + "</option>";
      }
      dropdown.append(textSelect);
    };     
};

function llenarSelectRegional(arreglo,regional) {
  let array = JSON.parse(arreglo);
  // console.log("asesor enlace", idAsesor);
  
  var textSelect = "";
  var dropdown;
    dropdown = $('#form_direccion_regional');
    dropdown.empty();
    dropdown.append("<option value ='0' selected>--- Seleccione una opción ---</option>");
    for (let index = 0; index < array.length; index++) {
      if (regional == array[index].nombre  )    {
        
       textSelect = "<option  value='"+ array[index].nombre  +"' selected name = '" +  array[index].nombre  + "'   >" +  array[index].nombre  + "</option>";  
      }
      else {
       textSelect = "<option  value='"+ array[index].nombre  +"' name = '" +  array[index].nombre  + "'   >" +  array[index].nombre  + "</option>";
      }
      dropdown.append(textSelect);
    };     
};

function llenarSelectModalidad(arreglo,idModalidad) {
  let array = JSON.parse(arreglo);
  var textSelect = "";
  var dropdown;
    dropdown = $('#form_id_modalidad_educativa');
    dropdown.empty();
    dropdown.append("<option value='0' disabled selected>--- Seleccione una opción ---</option>");
    for (let index = 0; index < array.length; index++) {
      if (idModalidad == array[index].id  )    {
        
       textSelect = "<option  value='"+ array[index].id  +"' selected name = '" +  array[index].modalidad  + "'   >" +  array[index].modalidad  + "</option>";  
      }
      else {
       textSelect = "<option  value='"+ array[index].id  +"' name = '" +  array[index].modalidad  + "'   >" +  array[index].modalidad  + "</option>";
      }
      dropdown.append(textSelect);
    };     
};

function renderizarFormProyectos(data, accion) {
    var proyecto=[],
        registros;

    if(data.length !== 0)   {
      $.each(data, function(i, field){
        proyecto.push(field);  
        let id_iniciativa = proyecto[i].id_iniciativa;
        $("#"+id_iniciativa+"").prop("checked", true);
      });
      registros = true;
      
      $(".form-6").prop("disabled", false);
    }
    else {
      // $("#mensajeIniciativas").hide();
      $(".form-6").prop("disabled", true);
      registros = false;
    }
    var formulario = "form-2";
    formaBotonEnviar(formulario,registros);
 };

function renderizarFormInfraestructura(data, accion) {
  var registros,
      infraestructura=[];

  if(data.length !== 0)   {
      $.each(data, function(i, field){
        infraestructura.push(field);  
        $("#inputGroupCondpasi").val(infraestructura[0].pasillos);
        $("#inputGroupCondAula").val(infraestructura[0].aulas);
        $("#inputGroupEstEsp").val(infraestructura[0].espacio_resguardo);
        $("#inputGroupBiblio").val(infraestructura[0].biblioteca);        
        $("#inputGroupIlumAul").val(infraestructura[0].iluminacion);
        $("#inputGroupTomPolar").val(infraestructura[0].tomas);
        $("#inputGroupCondElec").val(infraestructura[0].condicion_electrica);
        $("#inputGroupBibliEle").val(infraestructura[0].instalacion_biblioteca);
        $("#inputGroupPaneSol").val(infraestructura[0].panel_solar);
        $("#inputGroupSeg").val(infraestructura[0].seguridad_general);
        $("#inputGroupSegEqui").val(infraestructura[0].seguridad_equipo);
        $("#inputGroupCuidAlum").val(infraestructura[0].cuido_equipo_estudiante);
        $("#inputGroupRespMan").val(infraestructura[0].cuido_equipo_docente);
        document.getElementById('chkOficinas').checked = JSON.parse(infraestructura[0].internet_solo_oficinas); 
        document.getElementById('chkred').checked = JSON.parse(infraestructura[0].red_interna); 
        document.getElementById('chkbib').checked = JSON.parse(infraestructura[0].internet_biblioteca); 
        document.getElementById('chkinsti').checked = JSON.parse(infraestructura[0].internet_toda_institucion); 
      });
      registros = true;
      
      $(".form-5").prop("disabled", false);
    }
    else {
      $(".form-5").prop("disabled", true);
      registros = false;
    }
  let formulario = "form-3";
  formaBotonEnviar(formulario,registros);
 };

 function renderizarEquipamientoFonatel(data, accion)
 {
 var equipamiento=[],
      registros= false;
 
   if(data.length !== 0)   {
    registros = true;
       $.each(data, function(i, field){
         equipamiento.push(field);  
         $("#fonatel_tipo_cartel").val(equipamiento[0].tipo_cartel);
         $("#fonatel_monto_inversion").val(equipamiento[0].monto_inversion);
         $("#fonatel_fecha").val(equipamiento[0].fecha);
         $("#fonatel_cantidad_docentes").val(equipamiento[0].cantidad_docentes);
         $("#fonatel_que_falta").val(equipamiento[0].que_falta);
         $("#fonatel_tipo_cartel").val(equipamiento[0].tipo_cartel);    
         $("#fonatel_cantidad_equipo").val(equipamiento[0].cantidad_equipo);      
         $("#fonatel_requiere_soporte").val(equipamiento[i].requiere_soporte);   
       });
   };
   let formulario = "form-4-fonatel";
   formaBotonEnviar(formulario,registros);

 }
 
 function renderizarEquipamientoTransferencia(data, accion)
 {
   let equipamiento=[],
        estado = '';
       registros= false;
   
   if(data.length !== 0)   {
      registros= true;
       $.each(data, function(i, field){
         
         equipamiento.push(field);
         estado = equipamiento[0].estado_compra,
        //  consulta = 'SELECT * FROM `transferencia_estado` ORDER BY id';
        //  enviarFormDataAjax2( empaquetarConsulta(consulta), llenarSelectEstadoCompra,  "../server/consultas_generales.php", estado )
         $("#transferencia_fecha_transferencia").val(equipamiento[0].fecha_transferencia);
         $("#transferencia_monto").val(equipamiento[0].monto);
         $("#transferencia_recibido").val(equipamiento[0].recibido);
         $("#transferencia_fecha_recibido").val(equipamiento[0].fecha_recibido);
         $("#transferencia_pago_empresa").val(equipamiento[0].pago_empresa);
         $("#transferencia_fecha_pago").val(equipamiento[0].fecha_pago);
         $("#transferencia_en_uso").val(equipamiento[0].en_uso);
         $("#transferencia_remanente").val(equipamiento[0].remanente);
         $("#transferencia_monto_remanente").val(equipamiento[0].monto_remanente);
         $("#transferencia_razones").val(equipamiento[0].razones);
         $("#transferencia_fecha_contrato_recibido").val(equipamiento[0].fecha_contrato_recibido);
         $("#transferencia_cantidad_docentes").val(equipamiento[0].cantidad_docentes);
         $("#transferencia_que_falta").val(equipamiento[0].que_falta);
         $("#transferencia_tipo_cartel").val(equipamiento[0].tipo_cartel);     
         $("#transferencia_cantidad_equipo").val(equipamiento[0].cantidad_equipo);      
         $("#transferencia_requiere_soporte").val(equipamiento[i].requiere_soporte);   
       });
   };
   consulta = 'SELECT * FROM `transferencia_estado` ORDER BY id';
   enviarFormDataAjax2( empaquetarConsulta(consulta), llenarSelectEstadoCompra,  "../server/consultas_generales.php", estado,"tranferencia estado" )
   let formulario = "form-4-transferencia";
   formaBotonEnviar(formulario,registros);
 }
 
 function llenarSelectEstadoCompra(arreglo,idEstado) {
   let array = JSON.parse(arreglo);
   
   var textSelect = "";
   var dropdown;
     dropdown = $('#transferencia_estado_compra');
     dropdown.empty();
     dropdown.append("<option disabled selected>--- Seleccione una opción ---</option>");
     for (let index = 0; index < array.length; index++) {
       if (idEstado == array[index].id  )    {
         
        textSelect = "<option  value='"+ array[index].id  +"' selected name = '" +  array[index].descripcion  + "'   >" +  array[index].descripcion + "</option>";  
       }
       else {
        textSelect = "<option  value='"+ array[index].id  +"' name = '" +  array[index].descripcion  + "'   >" +  array[index].descripcion  + "</option>";
       }
       dropdown.append(textSelect);
     };     
 };
 
 function renderizarEquipamientoConectandonos(data, accion)
 {
 let equipamiento=[],
     registros = false;
 
   if(data.length !== 0)   {
      registros = true;
       $.each(data, function(i, field){
         equipamiento.push(field);  
         $("#conectandonos_equipo_inventariado").val(equipamiento[0].equipo_inventariado);
         $("#conectandonos_anno").val(equipamiento[0].anno);
         $("#conectandonos_cantidad_docentes").val(equipamiento[0].cantidad_docentes);
         $("#conectandonos_que_falta").val(equipamiento[0].que_falta);
         $("#conectandonos_tipo_cartel").val(equipamiento[0].tipo_cartel);     
         $("#conectandonos_cantidad_equipo").val(equipamiento[0].cantidad_equipo);     
         $("#conectandonos_requiere_soporte").val(equipamiento[i].requiere_soporte);    
       });
   };
   let formulario = "form-4-conectandonos";
   formaBotonEnviar(formulario,registros);
 }
 
 function renderizarEquipamientoDonacion(data, accion)
 {
   let equipamiento=[],
   registros = false;
 
   if(data.length !== 0)   {
      registros = true;
       $.each(data, function(i, field){
         equipamiento.push(field);  
         $("#donacion_anno").val(equipamiento[0].anno);
         $("#donacion_empresa_donacion").val(equipamiento[0].empresa_donacion);
         $("#donacion_cantidad_docentes").val(equipamiento[0].cantidad_docentes);
         $("#donacion_que_falta").val(equipamiento[0].que_falta);
         $("#donacion_tipo_cartel").val(equipamiento[0].tipo_cartel);      
         $("#donacion_cantidad_equipo").val(equipamiento[0].cantidad_equipo); 
         $("#donacion_requiere_soporte").val(equipamiento[i].requiere_soporte);   
       });
   };
   let formulario = "form-4-donacion";
   formaBotonEnviar(formulario,registros);
 }
 
 function cargarJson2 ( mCallBack, accion, url  ) {
 
   fetch( url)
          .then(response => response.json())
          .then(data => { 

              mCallBack (data,accion );                
          })
          .catch( 
            error => {
              // aquí
              console.error(error)
            })                 
 };
 

 function formaBotonEnviar(formulario,registros) {  // cambia el texto e imagen del botón
  
   
  let elementButton = 'button[name='+formulario+']';
   if (registros) { //no tiene informacion
    $(elementButton).html("<i class='fas fa-save' style='font-size:30px'></i> Guardar");
    $(elementButton).val("guardar");
   }
   else {
    $(elementButton).html("<i class='far fa-edit' style='font-size:30px'></i> Agregar");
    $(elementButton).val("agregar");
   };       
 }

function autocompleteArrays(tipo_accion) {
  // crea  los arreglos de codigos e instituciones para el autocomplete de la consulta del header
    
  let consSelect = '';
  
  if(tipo_accion == "agregar")
  {
    consSelect = 'SELECT id, cod_pres, institucion FROM centros_educativos_mep ORDER BY cod_pres';
    inputwithComplete = 'txtCentroEducativo';
  }
  else 
  {
    consSelect = 'SELECT id, cod_pres, institucion FROM centro_educativo ORDER BY cod_pres';
    inputwithComplete = 'miConsulta';
  };
  enviarFormDataAjax2( empaquetarConsulta(consSelect), cargarCentrosEducativos, "../server/consultas_generales.php", inputwithComplete,"autocomplete" )
}

function enviarFormDataAjax2  ( formData, mCallBack,  url, input, callFrom) { 
  $(".div-shadow").removeClass("invisible");
  $.ajax({
    url: url,
    type: 'POST',
    data: formData,
    //dataType:'json',
    cache: false,
    contentType: false,
    processData: false,
    beforeSend: function(){
    console.log("En proceso");    
    }, success: function(response){
      $(".div-shadow").addClass("invisible");
      // console.log("Enviado satisfactoriamente", callFrom);
      console.log("Enviado satisfactoriamente");
      //console.log(response);
      mCallBack(response,input);      

    }, error: function(response){
      $(".div-shadow").addClass("invisible");
      console.log("Error al enviar");
    }
  });
}


function cargarCentrosEducativos(stringArray,inputwithComplete) {
  let data = JSON.parse(stringArray),
      availableCentros=[];
  // console.log(dataset);    
  //Renderiza el formulario de acuerdo al valor seleccionado por el usuario:
  const maxCentros = data.length;

  for (var index = 0; index < maxCentros; index++) { 
    availableCentros.push( "(COD: " + data[index].cod_pres + ") -"+    data[index].institucion    +  "- [ID: " + data[index].id  + "]");
   }

  $( "#"+inputwithComplete+"" ).autocomplete({
    source: availableCentros
  });
   if(inputwithComplete == 'txtCentroEducativo') { //mejorar el despliegue del complete UI
    $( "#"+inputwithComplete+"" ).autocomplete( "option", "appendTo", ".inputComplete" );    //resuelve problema de posicionamiento del autocomplete en modales
   }
}

function  conectDataAjaxSimple (path, formData) {
  // agregar para centro educativo
    $(".div-shadow").removeClass("invisible");
    jQuery.ajax({
        url: path,
        type:'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend:function(){
            console.log("enviando");
        },
        success: function(mensaje){
             $(".div-shadow").addClass("invisible");
              console.log("success");
              // alertify.notify('La información se ha guardado','warning',2, null);
              console.log(mensaje);
        },
        error: function(mError){
          $(".div-shadow").addClass("invisible");
            console.log(mError);
        }
      });
}

function conectDataAjaxModificar ( path, formData, accionE, idCE) {
  $(".div-shadow").removeClass("invisible");
  // Modificar para centro educativo
    jQuery.ajax({
        url: path,
        type:'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend:function(){
            console.log("enviando");
        },
        success: function(){
              console.log("success",);
              $(".div-shadow").addClass("invisible");
              deshabilitaBoton('form-1');
              $("#btn-informacion-general").blur(); 
              setEquipamiento();  //reinicia las clases de los tab's
              cargaForm4(accionE, idCE);
        },
        error: function(mError){
            $(".div-shadow").addClass("invisible");
            console.log(mError);
        }
      });
}

function cargaForm(response) {
  // envía el id cuando se esta AGREGANDO un nuevo centro educativo
  alertify.alert('AVISO', 'La información ha sido agregada');
  
  // inicio obtener id
  let  texto = response,
       tipoAccion = 'agregar';
  // console.log("texto del response", texto);  
  var regExp = /(\d+)/g;
  texto = regExp.exec(response);
  itemID = parseInt(texto[0]);    
  // fin obtener id

  console.log("Código del nuevo Centro", itemID); 
  cambia_estado_forms(false);
  
  preparacion_de_forms('agregar');
  
  // deshabilita form-1 luego de guardar
  let element = ".form-1";    
  $(element).prop("disabled", true);
  deshabilitaBoton('form-1');
  $("#btn-informacion-general").blur(); 

  setEquipamiento();  //reinicia las clases de los tab's
  cargaForm4(tipoAccion, itemID);  //coloca los tab's y activa el 1°
  cargandoValidaciones(tipoAccion);
  setupForm5y6(tipoAccion,itemID);   
  cargaForm5(tipoAccion,itemID); 
}

function conectDataAjax ( path, formData, mCallBack) {
  // agregar para centro educativo
    $(".div-shadow").removeClass("invisible");
    jQuery.ajax({
        url: path,
        type:'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend:function(){
            console.log("enviando");
        },
        success: function(mensaje){
            $(".div-shadow").addClass("invisible");
              console.log("success");
              mCallBack(mensaje);
        },
        error: function(mError){
          $(".div-shadow").addClass("invisible");
            console.log(mError);
        }
      });
}

function deshabilitaForm(nameForm) {
  let classForm = "."+nameForm;
  $(classForm).prop("disabled", true);    
  deshabilitaBoton(nameForm);
  $(nameForm).blur(); 
}

// select provincia,canton,distrito
function cargaDatosSelectPCD(actualProvincia,actualCanton,actualDistrito,accion){
  // console.log("provincia",actualProvincia,"cantón",actualCanton,"distrito", actualDistrito);
  
  let arregloProvincias, arregloCantones=[], arregloDistritos=[],
      consSelect = "SELECT * FROM `cr_provincias`";   
      cargaJson( consSelect, function (data){arregloProvincias = data; 
        consSelect = "SELECT * FROM `cr_cantones`";
        cargaJson( consSelect, function (data){arregloCantones = data; 
            consSelect = "SELECT * FROM `cr_distritos`";
            cargaJson( consSelect, function (data){arregloDistritos = data;
              arraySelects();
                },"../server/consultas_generales.php");
        },"../server/consultas_generales.php");
      },"../server/consultas_generales.php");

function arraySelects(){
  let id_provincia = $.map( arregloProvincias, function( n, index ) {return  n.provincia === actualProvincia  ? n.id_provincia : null;});  
  let id_canton = $.map( arregloCantones, function( n, index ) {return  n.id_provincia == id_provincia && n.canton == actualCanton ? n.id_canton : null;});
  // let id_distrito = $.map( arregloDistritos, function( n, index ) {return  n.id_provincia == id_provincia && n.id_canton == id_canton && n.distrito == actualDistrito  ? n.id_distrito : null;});
  cargaProvincias(arregloProvincias,actualProvincia);
  cargaCantones(arregloCantones, id_provincia,actualCanton);
  cargaDistritos(arregloDistritos,id_provincia,id_canton,actualDistrito); 
 }  

  $( "#form_provincia" ).change(function() {
  //  let provincia_id = $( "#form_provincia option:selected" ).val();
   let provincia_id = $( "#form_provincia option:selected" ).attr('name');
   cargaCantones(arregloCantones, provincia_id,"");
   cargaDistritos(arregloDistritos,provincia_id,"","");
 });	

 $( "#form_canton" ).change(function() {
   let provincia_id = $( "#form_provincia option:selected" ).attr('name'),
       canton_id = $( "#form_canton option:selected" ).attr('name');
   cargaDistritos(arregloDistritos,provincia_id,canton_id,""); 
 });	
};

function cargaProvincias(arrayProvincia,nombreProvincia) {
  let dropdown = $('#form_provincia'),
      arrayTmp = [];
  var tmpOption; 
  dropdown.empty();
  if(nombreProvincia =="" || nombreProvincia == undefined)
  {
    tmpOption = $("<option value ='0' selected>--- Seleccione una opción ---</option>");
    arrayTmp.push(tmpOption);
  }
  for(key in arrayProvincia) {
    
      if (nombreProvincia === arrayProvincia[key].provincia  )    {	
          tmpOption = $("<option  value='"+ arrayProvincia[key].provincia  +"' selected name = '" +  arrayProvincia[key].id_provincia  + "'   >" +  arrayProvincia[key].provincia  + "</option>");  
      }
      else {
        tmpOption = $("<option  value='"+ arrayProvincia[key].provincia  +"' name = '" +  arrayProvincia[key].id_provincia  + "'   >" +  arrayProvincia[key].provincia  + "</option>");  
      }
    arrayTmp.push(tmpOption);
  }
  dropdown.append(arrayTmp);
}

function cargaCantones(arrayCantones, id_provincia,cantonActual) {
  let   dropdown = $('#form_canton'),
        arrayTmp = [];
  var tmpOption;
  var  cantones = $.map( arrayCantones, function( n, index ) {
    return  n.id_provincia == id_provincia  ? n : null;
  });
  
  dropdown.empty();
  if (cantonActual =="" || cantonActual == undefined)
  {
      tmpOption = $("<option value ='0' selected>--- Seleccione una opción ---</option>");
      arrayTmp.push(tmpOption);
  };
  for(key in cantones) {
      if (cantonActual == cantones[key].canton  )    {	    
        tmpOption = $("<option  value='"+ cantones[key].canton  +"' selected name = '" +  cantones[key].id_canton  + "'   >" +  cantones[key].canton  + "</option>");  
    }
    else {
      tmpOption = $("<option  value='"+ cantones[key].canton  +"' name = '" +  cantones[key].id_canton  + "'   >" +  cantones[key].canton  + "</option>");  
    }
    arrayTmp.push(tmpOption);
  }
  dropdown.append(arrayTmp);
 };

function cargaDistritos(arrayDistritos,id_provincia,id_canton,distritoActual) {

  let dropdown = $('#form_distrito'),
      arrayTmp = [];
  var tmpOption;
  distritos = $.map( arrayDistritos, function( n, index ) {
    return  n.id_provincia == id_provincia && n.id_canton == id_canton  ? n : null;
  });
  
  dropdown.empty();
  if (distritoActual =="" || distritoActual == undefined)
  {
    tmpOption = $("<option value ='0' selected>--- Seleccione una opción ---</option>");
    arrayTmp.push(tmpOption);
  }
  for(key in distritos) {
     if (distritoActual == distritos[key].distrito  )    {	

       tmpOption = $("<option  value='"+ distritos[key].distrito +"' selected name = '" +  distritos[key].id_distrito  + "'   >" +  distritos[key].distrito  + "</option>");  
     }
     else {
      tmpOption = $("<option  value='"+ distritos[key].distrito  +"' name = '" +  distritos[key].id_distrito  + "'   >" +  distritos[key].distrito  + "</option>");  
     }
    arrayTmp.push(tmpOption);
  }
  
  dropdown.append(arrayTmp); 
  if (accion == 'agregar') { //evita que permita modificar sin antes haber llenado los selects de Provincia, cantones
      $(".form-1").prop("disabled", false);     //activa solo el formulario 1
      // deshabilitaBoton('form-1');
  }
};

function cargaJson(c, mCallBack, url) {
  const data = new FormData();
  data.append('consulta', c);
  $(".div-shadow").removeClass("invisible");         
  fetch( url, {
  method: 'POST',
  body: data
  })  
  .then( r => r.json() )
  .then( data => {$(".div-shadow").addClass("invisible"); mCallBack(data); })
  .catch(err => {console.error('Caught error from : cargaJson ', err); $(".div-shadow").addClass("invisible");})
}    

// fin programación select provincias, cantones y distritos