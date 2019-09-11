$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  saveSession();
  $('.close').click(function() {
    $('.alert').hide();
  
   })
    realizaProceso();
    $(document).on('click', '.btn-edit', function(){
      var iniciativa_id = $(this).attr("iniciativa_id");  
      IniciativaTemp = iniciativa_id;
      console.log("Iniciativa #: "+iniciativa_id); 
      $("#iniciativa").val($(this).attr("element"));
      $('#dataModal').modal('show'); 
    });
    $(document).on('click', '.btn-del', function(){
      var iniciativa_id = $(this).attr("id_elemento");  
      console.log("Iniciativa No.: "+iniciativa_id); 
      $("#elimina-a").text("¿Está seguro que desea eliminar la Iniciativa "+$(this).attr("element")+"?");
      IniciativaTemp = iniciativa_id;
      $('#mi-modal').modal('show'); 
    });
    $("#modal-btn-si").click(function (e) { 
      e.preventDefault();
      eliminarIniciativa(IniciativaTemp,"iniciativas");
      $('#mi-modal').modal('hide');
    });
    $("#btn-actualizar").click(function (e) { 
      e.preventDefault();
      editarIniciativa(IniciativaTemp,"iniciativas");
      $('#dataModal').modal('hide');
    });

    $("#btn-agregar").click(function (e) { 
      var iniciativa = $("#iniciativaNueva").val(); 
      e.preventDefault();
      if (iniciativa == "") {
        console.log("Debe ingresar un valor");
        $("#mensajeError").show();
      } else {
        agregarIniciativa(iniciativa,"iniciativas");
        $('#agregarModal').modal('hide');
      }
     
    });

    $("#agregarIniciativa").click(function (e) { 
      e.preventDefault();
      $("#iniciativaNueva").val("");
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

function editarIniciativa(element,tabla) {
  console.log("Editando a "+element+" de "+tabla);
  data= new FormData();
  //data.append("id_elemento",element);
  //data.append("tabla",tabla);
  data.append("nombre",$("#iniciativa").val());
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

function eliminarIniciativa(element,tabla) {
  console.log("Borrando a "+element+" de "+tabla);
  data= new FormData();
  data.append("id_elemento",element);
  data.append("tabla",tabla);
  $.ajax({
    url: "../server/eliminar_registro.php",
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


function agregarIniciativa(element,tabla) {
  console.log("Agregando a "+element+" a "+tabla);
  data= new FormData();
  //data.append("id_elemento",element);
  //data.append("tabla",tabla);
  data.append("iniciativa",element);
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

function realizaProceso(){

const data = new FormData();
 url= '../server/consultar_iniciativas.php';
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
           "<th scope='col'>Id</th>" +
           "<th class='text-center' scope='col'>Iniciativa</th>" +
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
                   "<td class='text-center'>"+ array[index].id+ "</td>" +
                   "<td class='text-center'>" +
                      array[index].nombre +
                   "</td>" +
                   "<td class='btn-edit-del'>" +
                   "<i element='"+ array[index].nombre+ "'iniciativa_id='"+ array[index].id+ "'id='faiEdt"+ index +"'class='fas fa-pencil-alt lnk-ico btn-edit'></i>" +
                 "</td>" +
                 "<td class='btn-edit-del'>" +
                     "<i element='"+ array[index].nombre+ "'id_elemento='"+ array[index].id +"'id='faiDel"+ index +"'class='far fa-trash-alt lnk-ico btn-del'></i>" +
                 "</td>" +
                   "</tr>"
               );
                 $(tBody).append(row);
             }
       $(htmlTable).append(tBody);
        $(visor).html(htmlTable);
   cambiarClases()
      // loadDataTable();
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
        table.columns().every( function () {
            var that = this;
     
            $( 'input', this.footer() ).on( 'keyup change', function () {
                if ( that.search() !== this.value ) {
                    that
                        .search( this.value )
                        .draw();
                }
            } );
        } );

    }
    
           function cambiarClases(){
        if (sessionStorage.getItem("tipo")==6){
            $( ".lnk-ico" ).removeClass( "btn-edit btn-del" ).addClass( "btn-inactivo" );
            console.log("Usuario asesor");
        }
       }
    