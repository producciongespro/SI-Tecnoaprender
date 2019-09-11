var modalidadTemp;
var proyectos="";
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('.close').click(function() {
    $('.alert').hide();
  
   })
   saveSession();
    realizaProceso();
    $(document).on('click', '.btnVerDetalles', function(){
      var modalidad_id = $(this).attr("id");  
      modalidadTemp = modalidad_id;
      obtenerProyectos(modalidadTemp);
      console.log(proyectos);
      
      console.log("Ver detalles de: " + modalidadTemp); 
       $("#nombre").text($(this).attr("name"));
       $("#matricula").text($(this).attr("mat"));
       $("#internet").text($(this).attr("internet"));
       $("#asesor").text($(this).attr("asesor"));
       $("#enlace").text($(this).attr("enlace")); 
       $("#verCentro").attr("href","formulario.php?accion=consultar&nombre="+$(this).attr("name")+"&codigo="+$(this).attr("codigo")+"&id="+$(this).attr("id"));
       
       $('#ceModal').modal('show'); 
    });

    $(document).on('click', '.btnVerMapa', function(){
      var modalidad_id = $(this).attr("id"); 
      var equis = $(this).attr("equis");
      var ye = $(this).attr("ye");
      if (ye>equis) {
        var aux = ye;
        ye = equis;
        equis = aux;
      }
      if ((equis==0) || (ye==0)) {
        $("#coorX").text("");
        $("#coorY").text("");
        $("#visorMapa").html("<h2>No se han ingresado aun las coordenadas de este centro educativo</h2><br><img style='width:25%' src='../../images/sinUbicacion.png'>");
      } else { 
      var n = equis.indexOf(",");
      var m = ye.indexOf(",");
      console.log(n);
      if (n>0 || m>0) {
          equis= quitarComas(equis,n);
          ye= quitarComas(ye,m);

      }
   else{
    console.log("No tiene comas...");
   }
      var x = equis.indexOf(".");
      var y = ye.indexOf(".");
      cx = equis.slice(0, x);
      cy = ye.slice(0, y);
      var valido= validarUbicacion(cx,cy);
      modalidadTemp = modalidad_id;       
      console.log("Ver mapa de: " + modalidadTemp); 
      $("#coorX").text(equis);
      $("#coorY").text(ye);
      if (valido) {
        console.log("Dentro");
        $("#visorMapa").html("<iframe src='https://embed.waze.com/iframe?zoom=12&lat="+equis+"&lon="+ye+"' width='300' height='400'></iframe>");
      } else {
        console.log(valido);
        $("#visorMapa").html("<h2>Las coordenadas de este centro educativo deben actualizarse</h2><br><img style='width:25%' src='../../images/sinUbicacion.png'>");
      }
       
      }
       $('#mapaModal').modal('show'); 
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

function quitarComas(valor,p) {
  n=p;
  n = valor.slice(0, n);
  n = n + ".";
  var coma = valor.indexOf(",");
  var m = valor.slice((coma+1), valor.length);
  n = n + m;
  var res = n.replace(",","");
  return(res);
}

function validarUbicacion(x,y) {
  console.log("Valor de x: " +x);
  console.log("Valor de y: " +y);
  if ((x>12 || x<8) || (y>-81 || y<-87)) {
    return false;
  } else {
    return true;
  }
}


function obtenerProyectos(ce) {
  $("#proyectos").text("");
  const data = new FormData();
 url= "../server/obtener_proyectos.php?id="+ce;
 console.log(url);
 fetch( url)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        for (let index = 0; index < myJson.length; index++) {
          if ((index> 0) && (index < myJson.length)) {
            $("#proyectos").append(", ");
          }
          $("#proyectos").append(myJson[index].nombre);
        }  
        
    })
  }  




function realizaProceso(){

const data = new FormData();
 url= '../server/obtener_centros.php';
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
           "<th class='text-center'>Código</th>" +     
             "<th  scope='col'>Centro educativo</th>" +
             "<th  scope='col'>Modalidad</th>" +
             "<th scope='col'>Provincia</th>" +
             "<th class='text-center'>Regional</th>" +
             "<th class='text-center'>Teléfono</th>" +
             "<th class='text-center'>Mas información</th>" +            
             "<th class='text-center'>Mapa</th>" +            
            "</tr>" +
           "</thead>" +
           "<tfoot> <tr><th>código</th><th>centro educativo</th> <th>modalidad</th> <th>provincia</th> <th>dirección regional</th> <th>teléfono</th>  <th class='buscadores'>proyectos</th><th class='buscadores'>ubicacion</th>"+
           "</tr></tfoot>"+
           "</table>"
         ), tBody = $("<tbody></tbody>");
     
                 for (let index = 0; index < limite; index++) {
                   let fowNumb = index + 1;
                   row = $(
                     "<tr>" +
                     "<td class=''>" +
                        array[index].cod_pres +
                     "</td>" +
                     "<td class=''>"+ array[index].institucion+ "</td>" +
                     "</td>" +
                     "<td class=''>"+ array[index].modalidad+ "</td>" +
                     "<td class='text-center'>" +
                        array[index].provincia  +
                    "</td>" +
                    "<td class='text-center'>" +
                        array[index].direccion_regional  +
                    "</td>" +
                    "<td class='text-center'>" +
                    array[index].telefono  +
                  "</td>" +
                   "<td class='text-center' >" +
                       "<i codigo='"+ array[index].cod_pres +"'id='"+ array[index].id +"'enlace='"+ array[index].enlace_nombre +"'asesor='"+ array[index].nombre +"'mat='"+ (parseInt(array[index].matricula_h) + parseInt(array[index].matricula_m)) +"'internet='"+ array[index].valor +"'name='"+ array[index].institucion +"'  class='fas fa-eye lnk-ico  btnVerDetalles'></i>" +
                   "</td>" +
                   "<td class='text-center' >" +
                      "<i id='"+ array[index].id +"'equis='"+ array[index].coordenada_x +"'ye='"+ array[index].coordenada_y +"'  class='fas fa-map-marker-alt  btnVerMapa'></i>" +
                  "</td>" +
                     "</tr>"
                 );
                   $(tBody).append(row);
               }
         $(htmlTable).append(tBody);
          $(visor).html(htmlTable);
     
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
      
      function exportHTML(){
        var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
             "xmlns:w='urn:schemas-microsoft-com:office:word' "+
             "xmlns='http://www.w3.org/TR/REC-html40'>"+
             "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
        var footer = "</body></html>";
        var sourceHTML = header+document.getElementById("visorAsesorias").innerHTML+footer;
        
        var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        var fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'document.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);
     }