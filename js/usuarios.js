var usuarioTemp;
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    saveSession();
    realizaProceso();
    $(document).on('click', '.btn-edit', function(){
      var usuario_id = $(this).attr("id");  
      usuarioTemp = usuario_id;
      console.log("Usuario: "+usuario_id); 
      $("#nombre").text($(this).attr("user"));
      $("#puesto").val($(this).attr("puesto"));
      $("#telefono").val($(this).attr("telefono"));
      $('#dataModal').modal('show'); 
    });
    $(document).on('click', '.btn-del', function(){
      var usuario_id = $(this).attr("id_usuario");  
      console.log("Usuario: "+usuario_id); 
      $("#elimina-a").text("¿Está seguro que desea eliminar a "+$(this).attr("user")+"?");
      usuarioTemp = usuario_id;
      $('#mi-modal').modal('show'); 
    });
    $("#modal-btn-si").click(function (e) { 
      e.preventDefault();
      eliminarUsuario(usuarioTemp,"usuarios");
      $('#mi-modal').modal('hide');
    });
    $("#btn-actualizar").click(function (e) { 
      e.preventDefault();
      editarUsuario(usuarioTemp,"usuarios");
      $('#dataModal').modal('hide');
    });
 
});

function editarUsuario(user,tabla) {
  console.log("Editando a "+user+" de "+tabla);
  data= new FormData();
  //data.append("id_elemento",user);
  //data.append("tabla",tabla);
  data.append("telefono_movil",$("#telefono").val());
  data.append("puesto",$("#puesto").val());
  $.ajax({
    url: "../server/actualizar_main.php?id="+user+"&tabla="+tabla,
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

function eliminarUsuario(user,tabla) {
  console.log("Borrando a "+user+" de "+tabla);
  data= new FormData();
  data.append("id_elemento",user);
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

function realizaProceso(){

const data = new FormData();
 url= '../server/consultar_usuarios.php';
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
           "<th scope='col'>#</th>" +
           "<th class='text-center' scope='col'>Nombre</th>" +
           "<th class='text-center' scope='col'>Puesto</th>" +
           "<th scope='text-center' >correo eléctrónico</th>" +
           "<th scope='text-center'>Teléfono</th>" +
           "<th scope='text-center'>Editar</th>" +
           "<th scope='text-center'>Eliminar</th>" +
           "<th class='text-center' scope='col'>Último ingreso</th>" +
         "</tr>" +
         "</thead>" +
         "<tfoot>" +
        " <tr>" +
        "<th class='buscador' scope='col'>#</th>" +
        "<th>nombre</th>" +
        "<th>puesto</th>" +
        "<th class=''>correo</th>" +
        "<th class=''>teléfono</th>" +
        "<th class='buscador'>editar</th>" +
        "<th class='buscador'>eliminar</th>" +
        "<th class='buscador'> fecha </th>" +
        " </tr>"+
        " </tfoot>"+
         "</table>"
       ), tBody = $("<tbody></tbody>");
   
               for (let index = 0; index < limite; index++) {
                 let fowNumb = index + 1;


                 let ultimoAcceso =  moment(array[index].last_session, "YYYYMMDD" ).fromNow();
                 console.log("Ultimo acceso", ultimoAcceso  );
                 if (ultimoAcceso == "Invalid date") {
                  ultimoAcceso = "nunca";
                 }
                 
                 row = $(
                   "<tr>" +
                   "<td class='text-center'>"+(index + 1)+"</td>" +
                   "<td class='text-center'>" +
                      array[index].nombre +
                   "</td>" +
                     "<td class='text-center'>" +
                       array[index].descripcion +
                     "</td>" +
                     "<td >" +
                       array[index].correo +
                     "</td>" +
                     "<td>" +
                       array[index].telefono_movil +
                     "</td>" +
                     "<td class='btn-edit-del'>" +
                     "<i user='"+array[index].nombre+"' puesto='"+array[index].id_tipo +"' telefono='"+array[index].telefono_movil +"'id='"+ array[index].id +"'class='fas fa-pencil-alt lnk-ico btn-edit'></i>" +
                   "</td>" +
                   "<td class='btn-edit-del'>" +
                       "<i id_usuario='"+array[index].id+"' user='"+array[index].nombre+"'id='faiDel"+ array[index].id +"'class='far fa-trash-alt lnk-ico btn-del'></i>" +
                   "</td>" +
                   "<td class='text-center'>" +
                       ultimoAcceso +                        
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
    