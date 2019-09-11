$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  saveSession();
  $.extend($.validator.messages, {
    required: "Campo requerido",
    number: "Por favor introduce un valor numérico."
  });

  var collectionForms = document.forms;
  // console.log("Coleccion de formularios", collectionForms);
  
  for (let index = 0; index < collectionForms.length; index++) {
      collectionForms[index].reset();    
  }

  autocompleteCentrosEducativos()
  selectModalidades();
  // selectMediador();
    $('.close').click(function() {
      $('.alert').hide();
    
     })
      realizaProceso();
      $(document).on('click', '.btn-edit', function(){
        var capacitacion_id = $(this).attr("capacitacion_id");  
        CapacitacionTemp = capacitacion_id;
        console.log("Capacitacion #: "+$(this).attr("element")); 
          $("#capacitacionCambiada").val($(this).attr("element"));
          $("#capacitacionFecha").val($(this).attr("fecha"));
          console.log("Capacitacion modalidad : "+$(this).attr("modalidad")); 
          $("#capacitacionModalidad2").val($(this).attr("modalidad"));
          $("#capacitacionMediador2").val($(this).attr("mediador"));
          $("#capacitacionHoras").val($(this).attr("horas"));
        $('#dataModal').modal('show'); 
      });
      $(document).on('click', '.btn-del', function(){
        var capacitacion_id = $(this).attr("id_elemento");  
        console.log("Capacitacion No.: "+capacitacion_id); 
        $("#elimina-a").text("¿Está seguro que desea eliminar la capacitacion "+$(this).attr("element")+"?");
        CapacitacionTemp = capacitacion_id;
        $('#mi-modal').modal('show'); 
      });

      $(document).on('click', '.ver-participantes', function(){
        var capacitacion_id = $(this).attr("id_elemento");  
        console.log("Capacitacion No.: "+capacitacion_id); 
        CapacitacionTemp = capacitacion_id;
        obtenerParticipantes(capacitacion_id);
        $('#participantesModal').modal('show'); 
      });

      $(document).on('click', '.agregar-participantes', function(){
        document.getElementById("form-participantes").reset();
        var capacitacion_id = $(this).attr("id_elemento");  
        CapacitacionTemp = capacitacion_id;
        console.log("Capacitacion No.: "+CapacitacionTemp); 
        $('#participantesAgregarModal').modal('show'); 
      });
      

      $("#modal-btn-si").click(function (e) { 
        e.preventDefault();
        eliminarCapacitacion(CapacitacionTemp,"capacitaciones");
        $('#mi-modal').modal('hide');
      });

      validacionyEnvioFormActualizarCap();
      validacionyEnvioFormCapacitaciones();
      validacionyEnvioFormAgregarPartipantes();
      // $("#btn-agregarParticipante").click(function (e) { 
      //   e.preventDefault();
      //   var cedula = $("#cedulaParticipante").val(); 
      //   // var centroEducativo = $("#ceParticipante").val();
      //   if (cedula == "") {
      //     console.log("Debe ingresar el número de cédula");
      //     $("#mensajeError").show();
      //   } else {
      //     let tmp = $("#ceParticipante").val();
      //     var res = tmp.indexOf("[");
      //     let codigoConsulta = tmp.substring(res + 4, tmp.length - 1);
      //     centroEducativo = codigoConsulta;
      //     console.log("cap: "+CapacitacionTemp);
      //     agregarParticipante(CapacitacionTemp, cedula, centroEducativo, "capacitaciones_participantes");
      //     $('#participantesAgregarModal').modal('hide');
      //   }
        
      // });
  
      $("#agregarCapacitacion").click(function (e) { 
        document.getElementById("formCap").reset();
        e.preventDefault();
        $('#formCap').trigger("reset");
        $("#capacitacionNueva").val("");
        $('#agregarModal').modal('show');
      });
  });
  
  function saveSession() {
    let tipo = sessionStorage.getItem("tipo");
    correoUser = sessionStorage.getItem("correo"); 
    // $("#divInicio").html('<a href="../server/login/logout.php"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</a>')
    // $("#divUsuario").html('<i class="fas fa-user-alt"></i> '+correoUser)
    
    $("#divInfo").html('<a id="btnInicio" href="index.php" alt="Inicio"><i class= "fas fa-home"></i></a>&nbsp;&nbsp;&nbsp;&nbsp; <a href="#" class="acerca-de" data-toggle="tooltip" title="Acerca de"> <i class="fas fa-info-circle"></i></a>');
    $("#divUsuario").html('<i class="fas fa-user-alt"></i><span class="usuario"> </span>'+correoUser);
    $("#divSalir").html('<a href="../server/login/logout.php" data-toggle="tooltip" title="Cerrar sesión"><i class="fas fa-sign-out-alt"></i></a>');
    cargaModalAcercaDe();  
  }
  
  function editarCapacitacion(element,tabla) {
    console.log("Editando a "+element+" de "+tabla);
    // let data = new FormData($('#formCapEdit')[0]);
    data= new FormData();
    data.append("capacitacionNueva",$("#capacitacionCambiada").val());
    data.append("capacitacionFecha",$("#capacitacionFecha").val());
    data.append("capacitacionModalidad",$("#capacitacionModalidad2").val());
    data.append("capacitacionHoras",$("#capacitacionHoras").val());
    data.append("capacitacionMediador",$("#capacitacionMediador2").val());
    // console.log("Capacitación formdata", data);
    
      $.ajax({
      url: "../server/actualizar_main.php?id="+element+"&tabla="+tabla,
      type: 'POST',
      data: data,
      //dataType:'json',
      cache: false,
      contentType: false,
      processData: false,
      beforeSend: function(){
      console.log("En proceso");    
      }, success: function(response){
        console.log("Enviado satisfactoriamente");
        console.log(response);
        realizaProceso();
      }, error: function(response){
        console.log("Error al enviar");
          console.log(response.error);
          console.log(response.msj);     
      }
    });
  }
  
  function eliminarCapacitacion(element,tabla) {
    console.log("Borrando a "+element+" de "+tabla);
    data= new FormData();
    data.append("id_elemento",element);
    data.append("tabla",tabla);
    $.ajax({
      url: "../server/eliminar_capacitacion.php",
      type: 'POST',
      data: data,
      //dataType:'json',
      cache: false,
      contentType: false,
      processData: false,
      beforeSend: function(){
      console.log("En proceso");    
      }, success: function(response){
        console.log("Enviado satisfactoriamente");
        console.log(response);
        realizaProceso();
      }, error: function(response){
        console.log("Error al enviar");
          console.log(response.error);
          console.log(response.msj);     
      }
    });
  }
  
  
  function agregarCapacitacion(element,tabla) {
    // collectionForms[index].reset();    
    console.log("Agregando a "+element+" a "+tabla);
    let data = new FormData($('#formCap')[0]);
    for (var pair of data.entries()) {
          console.log(pair[0]+ ', ' + pair[1]); 
      }
     $.ajax({
      url: "../server/agregar_main.php?id="+element+"&tabla="+tabla,
      type: 'POST',
      data: data,
      //dataType:'json',
      cache: false,
      contentType: false,
      processData: false,
      beforeSend: function(){
      console.log("En proceso");    
      }, success: function(response){
        console.log("Enviado satisfactoriamente");
        console.log(response);
        realizaProceso();
      }, error: function(response){
        console.log("Error al enviar");
          console.log(response.error);
          console.log(response.msj);     
      }
    });
  }
  
  function agregarParticipante(cod_cap, cedula, id_CE,tabla) {
    console.log("Agregando a "+cedula+" a "+tabla+" en la capacitación " +cod_cap);
    // let data = new FormData($('#formCap')[0]);
    data= new FormData();
    data.append("cod_cap",cod_cap);
    data.append("cedula",cedula);
    data.append("id_CE",id_CE);
    data.append("tabla",tabla);
     $.ajax({
      url: "../server/agregar_main.php?id="+cod_cap+"&tabla="+tabla,
      type: 'POST',
      data: data,
      //dataType:'json',
      cache: false,
      contentType: false,
      processData: false,
      beforeSend: function(){
      console.log("En proceso");    
      }, success: function(response){
        console.log("Enviado satisfactoriamente");
        console.log(response);
        realizaProceso();
      }, error: function(response){
        console.log("Error al enviar");
          console.log(response.error);
          console.log(response.msj);     
      }
    });
  }

  function obtenerParticipantes(cap){
     url= '../server/obtener_participantes.php?codigo='+cap;
     console.log(url);
     
     fetch( url)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            // dibujarTabla (myJson, '#visor');
            console.log(myJson);
            if (myJson.length>0) {
              tablaParticipantes(myJson)
            } else {
              $(visorParticipantes).empty();
              $("#visorParticipantes").append("<p>No se han ingresado participantes a esta capacitación</p>");
            }
           
        })
      } 

  function tablaParticipantes(array) {
    $(visorParticipantes).empty();
     
    var limite = array.length, row,
    htmlTable = $(
      "<table  id='tblReportes' class='table table-striped'>" +
      "<thead>" +
      "<tr>" +
        "<th class='text-center' scope='col'>Cédula</th>" +
        "<th class='text-center' scope='col'>Institución</th>" +
       "</tr>" +
      "</thead>" +
      "</table>"
    ), tBody = $("<tbody></tbody>");

            for (let index = 0; index < limite; index++) {
              let fowNumb = index + 1;
              row = $(
                "<tr>" +
                  "<td class='text-center'>"+ array[index].cedula+ "</td>" +
                  "<td class='text-center'>" +
                    array[index].institucion +
                  "</td>" +
                 "</tr>"
            );
              $(tBody).append(row);
          }
    $(htmlTable).append(tBody);
     $(visorParticipantes).html(htmlTable);
  }
  
  function realizaProceso(){
  
  const data = new FormData();
   url= '../server/consultar_capacitaciones.php';
   fetch( url)
      .then(function(response) {
          return response.json();
      })
      .then(function(myJson) {
          dibujarTabla (myJson, '#visor');
      })
    }  
    
    function dibujarTabla (array, visor) {
      console.log(array);
      moment.locale('es'); 
         $(visor).empty();
     
         var limite = array.length, row,
         htmlTable = $(
           "<table  id='tblReportes' class='table table-striped'>" +
           "<thead>" +
           "<tr>" +
             "<th scope='col'>Código</th>" +
             "<th class='text-center' scope='col'>Capacitacion</th>" +
             "<th class='text-center' scope='col'>Fecha</th>" +
             "<th class='text-center' scope='col'>Modalidad</th>" +
             "<th class='text-center' scope='col'>Duración</th>" +
             "<th class='text-center' scope='col'>Mediador</th>" +
             "<th class='text-center' scope='col'>Participantes</th>" +
             "<th class='text-center'>Editar</th>" +
             "<th class='text-center'>Eliminar</th>" +
            "</tr>" +
           "</thead>" +
  
           "</table>"
         ), tBody = $("<tbody></tbody>");
     
                 for (let index = 0; index < limite; index++) {
                   let fowNumb = index + 1;
                   row = $(
                     "<tr>" +
                     "<td class='text-center'>"+ array[index].cod_cap+ "</td>" +
                     "<td class='text-center'>" +
                        array[index].nombre +
                     "</td>" +
                     "<td class='text-center'>" +
                     moment(array[index].fecha_implementacion).format('L') +
                  "</td>" +
                  "</td>" +
                  "<td class='text-center'>" +
                  array[index].modalidad +
               "</td>" +
               "</td>" +
               "<td class='text-center'>" +
               array[index].duracion +
            "</td>" +
            "</td>" +
            "<td class='text-center'>" +
            array[index].mediadores +
         "</td>" +
         "</td>" +
         "<td class='text-center'>" +
         "<i id_elemento='"+ array[index].cod_cap +"' class='ver-participantes fas fa-eye lnk-ico'></i> <i id_elemento='"+ array[index].cod_cap +"'class='agregar-participantes fas fa-user-plus'></i>" +
      "</td>" +
                     "<td class='btn-edit-del'>" +
                     "<i horas='"+ array[index].duracion+ "'modalidad='"+ array[index].modalidad+ "'mediador='"+ array[index].mediadores+ "'fecha='"+ array[index].fecha_implementacion + "'element='"+ array[index].nombre+ "'capacitacion_id='"+ array[index].cod_cap+ "'id='faiEdt"+ index +"'class='fas fa-pencil-alt lnk-ico editores btn-edit'></i>" +
                   "</td>" +
                   "<td class='btn-edit-del'>" +
                       "<i element='"+ array[index].nombre+ "'id_elemento='"+ array[index].cod_cap +"'id='faiDel"+ index +"'class='far fa-trash-alt editores lnk-ico btn-del'></i>" +
                   "</td>" +
                     "</tr>"
                 );
                   $(tBody).append(row);
               }
         $(htmlTable).append(tBody);
          $(visor).html(htmlTable);
          cambiarClases();
        loadDataTable();
       }
  
      function loadDataTable() {
          var table = $('#tblReportes').DataTable({
            dom: 'Blfrtip',
            buttons: [
                {extend: 'copy',text: '<i class="far fa-copy"></i> Copiar'},
                {extend: 'excel',text: '<i class="far fa-file-excel"></i> Exportar a Excel'},
                {extend: 'pdf',text: '<i class="far fa-file-pdf"></i> Exportar como PDF'},
                {extend: 'print',text: '<i class="fas fa-print"></i> Imprimir'}
            ],
            "language": {
              "emptyTable":			"No hay datos disponibles en la tabla.",
              "info":		   			"Del _START_ al _END_ de _TOTAL_ ",
              "infoEmpty":			"Mostrando 0 registros de un total de 0.",
              "infoFiltered":			"(filtrados de un total de _MAX_ registros)",
              "infoPostFix":			"(actualizados)",
              "lengthMenu":			"Mostrar _MENU_ registros",
              "loadingRecords":		"Cargando...",
              "processing":			"Procesando...",
              "search":				"Buscar:",
              "searchPlaceholder":	"Dato para buscar",
              "zeroRecords":			"No se han encontrado coincidencias.",
              "paginate": {
                  "first":			"Primera",
                  "last":				"Última",
                  "next":				"Siguiente",
                  "previous":			"Anterior"
              },
              "aria": {
                  "sortAscending":	"Ordenación ascendente",
                  "sortDescending":	"Ordenación descendente"
              }
          },
          "lengthMenu":				[[5, 10, 20, 25, 50, -1], [5, 10, 20, 25, 50, "Todos"]],
              "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "Todas"] ]
       
          });
          $('#tblReportes tfoot th').each( function () {
            var title = $(this).text();
            $(this).html( '<input type="text" placeholder="Buscar '+title+'" />' );
        } );
       
          // Apply the search
          // table.columns().every( function () {
          //     var that = this;
       
          //     $( 'input', this.footer() ).on( 'keyup change', function () {
          //         if ( that.search() !== this.value ) {
          //             that
          //                 .search( this.value )
          //                 .draw();
          //         }
          //     } );
          // } );
  
      }

     
      function selectModalidades() {
        $.ajax({
          type: "GET",
          url: '../server/consultar_modalidades_capacitacion.php', 
          dataType: "json",
          success: function(data){
            console.log("datos de modalidades",data);
            
            $.each(data,function(key, registro) {
              $("#capacitacionModalidad").append('<option value='+registro.nombre+'>'+registro.nombre+'</option>');
              // let consSelect = 'SELECT id, cod_pres, institucion FROM centro_educativo ORDER BY cod_pres';
              // enviarFormDataAjax( empaquetarConsulta(consSelect), cargarCentrosEducativos, "../server/consultas_generales.php")
              
              $("#capacitacionModalidad2").append('<option value='+registro.nombre+'>'+registro.nombre+'</option>');
            });        
          },
          error: function(data) {
            alert('error');
          }
        });
      }

      function selectMediador() {
        $.ajax({
          type: "GET",
          url: '../server/obtener_asesores.php', 
          dataType: "json",
          success: function(data){
            console.log(data);
            
            $.each(data,function(key, registro) {
              $("#capacitacionMediador").append('<option value='+registro.correo+'>'+registro.correo+'</option>');
              $("#capacitacionMediador2").append('<option value='+registro.correo+'>'+registro.correo+'</option>');
            });        
          },
          error: function(data) {
            alert('error');
          }
        });
      }

      function autocompleteCentrosEducativos() {
        // crea  los arreglos de codigos e instituciones para el autocomplete de la consulta del header
          
        let consSelect = '';
        consSelect = 'SELECT id, cod_pres, institucion FROM centro_educativo ORDER BY cod_pres';
        enviarFormDataAjax( empaquetarConsulta(consSelect), cargarCentrosEducativos, "../server/consultas_generales.php")
      }
      function enviarFormDataAjax  ( formData, mCallBack, url) { 
    
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
            console.log("Enviado satisfactoriamente");
            //console.log(response);
            mCallBack(response);      
      
          }, error: function(response){
            console.log("Error al enviar");
          }
        });
      }

      function empaquetarConsulta(c) { 
        // c recibe como parámetro la consulta a empaquetar para luego mandarla por Ajx    
        var formData = new FormData();               

        formData.append("consulta", c );
        return formData;
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
    
      $( "#ceParticipante" ).autocomplete({
        source: availableCentros
      });
    }

    function validacionyEnvioFormCapacitaciones() {
      // Validación y envío de formulario agregar capacitación
      var form = $( "#formCap" );

      $.validator.addMethod("valueNotEquals", function(value, element, arg){
        console.log("avalue", value,"arg", arg);
        
        return arg !== value;
        }, "Inserta el nombre");
    
      form.validate({
        rules: { 
          capacitacionModalidad : {
            required: true,
            valueNotEquals: "default",
          },
        },
        messages: {
          capacitacionModalidad : {
              required: 'Por favor selecciona una modalidad',
              valueNotEquals: "Por favor selecciona una modalidad"
              },
          },
          errorPlacement: function(error, element) {
              if ( element.is(":input")) {
                  error.appendTo(element.parent("div").next("div"));
                }
                else { // This is the default behavior of the script for all fields
                    error.insertAfter( element );
                }
            }
         });
        $("#btn-agregar").click(function () {
          if(form.valid()=== true){   
            // $("#btn-agregar").click(function (e) { 
              var capacitacion = $("#capacitacionNueva").val(); 
              // e.preventDefault();
              // if (capacitacion == "") {
              //   console.log("Debe ingresar un valor");
              //   $("#mensajeError").show();
              // } else {
                agregarCapacitacion(capacitacion,"capacitaciones");
                $('#agregarModal').modal('hide');
              // }             
            // });
          }
          else {
              alertify.notify('El formulario no es válido','warning',3, null);
          }
       });
    };

    
function validacionyEnvioFormActualizarCap() {
    // Validación y envío de formulario de Actualización de capacitación
    var form = $( "#formCapEdit" );
    
    $.validator.addMethod("valueNotEquals", function(value, element, arg){
      console.log("avalue", value,"arg", arg);
      
      return arg !== value;
      }, "Inserta el nombre");
  
    form.validate({
      rules: { 
          capacitacionModalidad2 : {
          required: true,
          valueNotEquals: "default",
        },
      },
      messages: {
        capacitacionModalidad2 : {
            required: 'Por favor selecciona una modalidad',
            valueNotEquals: "Por favor selecciona una modalidad"
            },
        },
      errorPlacement: function(error, element) {
        if ( element.is(":input")) {
            error.appendTo(element.parent("div").next("div"));
          }
          else { // This is the default behavior of the script for all fields
              error.insertAfter( element );
          }
      }
    });
      $("#btn-actualizar").click(function () {
        if(form.valid()=== true){   
          editarCapacitacion(CapacitacionTemp,"capacitaciones");
          $('#dataModal').modal('hide');
        }
        else {
            alertify.notify('El formulario no es válido','warning',3, null);
      }
    });
}


$("#btn-agregarParticipante").click(function (e) { 
  e.preventDefault();
  var cedula = $("#cedulaParticipante").val(); 
  // var centroEducativo = $("#ceParticipante").val();
  if (cedula == "") {
    console.log("Debe ingresar el número de cédula");
    $("#mensajeError").show();
  } else {
    let tmp = $("#ceParticipante").val();
    var res = tmp.indexOf("[");
    let codigoConsulta = tmp.substring(res + 4, tmp.length - 1);
    centroEducativo = codigoConsulta;
    console.log("cap: "+CapacitacionTemp);
    agregarParticipante(CapacitacionTemp, cedula, centroEducativo, "capacitaciones_participantes");
    $('#participantesAgregarModal').modal('hide');
  }
  
});

function validacionyEnvioFormAgregarPartipantes() {
  // Validación y envío de formulario de agregar participantes
  var form = $( "#form-participantes" );
  
  $.validator.addMethod("valueNotEquals", function(value, element, arg){
    console.log("avalue", value,"arg", arg);
    
    return arg !== value;
    }, "Inserta el nombre");

  form.validate({
    rules: { 
    },
    messages: {
    },
    errorPlacement: function(error, element) {
      if ( element.is(":input")) {
          error.appendTo(element.parent("div").next("div"));
        }
        else { // This is the default behavior of the script for all fields
            error.insertAfter( element );
        }
    }
  });
  $("#btn-agregarParticipante").click(function () {
    if(form.valid()=== true){   
      var cedula = $("#cedulaParticipante").val(); 
        let tmp = $("#ceParticipante").val();
        var res = tmp.indexOf("[");
        let codigoConsulta = tmp.substring(res + 4, tmp.length - 1);
        centroEducativo = codigoConsulta;
        console.log("cap: "+CapacitacionTemp);
        agregarParticipante(CapacitacionTemp, cedula, centroEducativo, "capacitaciones_participantes");
        $('#participantesAgregarModal').modal('hide');
    }
    else {
        alertify.notify('El formulario no es válido','warning',3, null);
    }
  });
}

function cambiarClases(){
  if (sessionStorage.getItem("tipo")==6){
      $( ".editores" ).removeClass( "btn-edit btn-del" ).addClass( "btn-inactivo" );
      console.log("Usuario asesor");
  }
 }
