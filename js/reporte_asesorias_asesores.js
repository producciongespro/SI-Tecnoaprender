var arregloDatos=[];
var correo = correoUser = sessionStorage.getItem("correo");


$(document).ready(function () { 
  console.log("****correo", correo);
  console.log("tipo usuario", tipoUsuario);
  
  
  
  $("#divInfo").html('<a id="btnInicio" href="../admin" alt="Inicio"><i class= "fas fa-home"></i></a>&nbsp;&nbsp;&nbsp;&nbsp; <a href="#" class="acerca-de" data-toggle="tooltip" title="Acerca de"> <i class="fas fa-info-circle"></i></a>');
  $("#divUsuario").html('<i class="fas fa-user-alt"></i><span class="usuario"> </span>'+correo);
  $("#divSalir").html('<a href="../server/login/logout.php" data-toggle="tooltip" title="Cerrar sesión"><i class="fas fa-sign-out-alt"></i></a>');
  cargaModalAcercaDe();  
  cargarApp();



  $("#btn-exportar").click(function (e) { 
          e.preventDefault();
          exportPDF();
    });
});
  
  
  
  function cargarApp(){

    //CArga el ajax loader    
    $(".div-shadow").removeClass("invisible");
  
  const data = new FormData();
   url= '../server/consultar_asesorias.php?id_CE=x&correo='+correo+'&tipo_usr='+ tipoUsuario; 
   fetch( url)
      .then(function(response) {
          return response.json();
      })
      .then(function(myJson) {
          console.log(myJson);
          arregloDatos=myJson;
          if (myJson.length>0) {
            dibujarTabla (myJson, '#visor');
            $(".div-shadow").addClass("invisible");
          } else {
              $("#visor").append("<br><br><h2>No se han ingresado asesorías al sistema.</h2>");
              $(".div-shadow").addClass("invisible");
          }
          
      })
    }  
  
  
    function mostrarDetalle(id, array) {

      console.log(array);      
        
        $("#visorAsesorias").empty(); 


        for (let index = 0; index < array.length; index++) {
          if (array[index].id_visita == id  ) {
            $("#visorAsesorias").append("<span class='t1'><b>Asesor:</b></span> <span>"+array[index].correo_asesor+"</span>");
            $("#visorAsesorias").append("<br><span class='t1'><b>Estado de la Asesoría:</b></span> <span>"+array[index].estado_asesoria+"</span>");
            $("#visorAsesorias").append("<br><span class='t1'><b>Institución: </b></span> <span>"+array[index].institucion+"</span>");
            $("#visorAsesorias").append("<br><span class='t1'><b>Fecha de la asesoría: </b></span> <span>"+ moment(array[index].fecha).format('L') + "</span>");
            $("#visorAsesorias").append("<br><span class='t1'><b>Medio:</b> </span> <span>"+ array[index].medio_visita+"</span>");
            $("#visorAsesorias").append("<br><span class='t1'><b>Tipo de atención: </b></span> <span>"+ array[index].tipo_atencion+"</span>");
            $("#visorAsesorias").append("<br><span class='t1'><b>Objetivos:</b> </span><br><span>"+array[index].objetivos+"</span>");
            $("#visorAsesorias").append("<br><span class='t1'><b>Observaciones:</b> </span><br><span>"+array[index].observaciones+"</span>");
            $("#visorAsesorias").append("<br><span class='t1'><b>Recomendaciones de los participantes por Dirección Regional:</b></span><br><span>"+array[index].recomendacion_dr+"</span>" );
            $("#visorAsesorias").append("<br><span class='t1'><b>Recomendaciones de los asesores DRTE-PNTM: </b></span><br><span>"+array[index].recomendacion_asesor+"</span>" );

            if (array[index].observaciones_director.length > 1 ) {
              $("#visorAsesorias").append("<br><span class='t1'> Observaciones del Director: </span><br><span>"+array[index].observaciones_director+"</span>" );  
            }

            if (array[index].url_archivo != "pepito") {
              $("#visorAsesorias").append("<hr><a href="+ array[index].url_archivo +" class='t1' target='_blank' > <i class='fas fa-paperclip'></i> Archivo adjunto </a><br>");  
            }
            
          }
          
        }
        
       
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
             "<th class='text-center' scope='col'>Centro educativo</th>" +
             "<th scope='col'>Medio</th>" +
             "<th class='text-center'>Asesor a cargo</th>" +
             "<th class='text-center'>Fecha de asesoría</th>" +
             "<th class='text-center'>Fecha de registro</th>" +
             "<th class='text-center'>Tipo de atención</th>" +
             "<th class='text-center'>Estado</th>" +             
             "<th class='text-center'>Ver detalles</th>" +
            "</tr>" +
           "</thead>" +
           "<tfoot> <tr><th>centro educativo</th><th>medio</th> <th>asesor</th> <th>fecha asesoría</th> <th>fecha registro</th> <th>tipo atención</th><th>estado</th><th class='buscador'>asdf</th>"+
           "</tr></tfoot>"+
           "</table>"
         ), tBody = $("<tbody></tbody>");
     
                 for (let index = 0; index < limite; index++) {
                   let fowNumb = index + 1;
                   row = $(
                     "<tr>" +
                     "<td class=''>" +
                        array[index].institucion +
                     "</td>" +
                     "<td class=''>"+ array[index].medio_visita+ "</td>" +
                     "<td class='text-center'>" +
                        array[index].correo_asesor  +
                    "</td>" +
                    "<td class='text-center'>" +
                        moment(array[index].fecha).format('L') +
                    "</td>" +
                    "<td class='text-center'>" +
                        moment(array[index].fecha_ingreso).format('L') +
                "</td>" +
                    "<td class='text-center'>" +
                          array[index].tipo_atencion  +
                    "</td>" +
                    "<td class='text-center'>" +
                    array[index].estado_asesoria  +
                  "</td>" +
                   "<td class='text-center' >" +
                       "<i id='"+ array[index].id_visita +"'  class='fas fa-eye lnk-ico  btnVerDetalles'></i>" +
                   "</td>" +
                     "</tr>"
                 );
                   $(tBody).append(row);
               }
         $(htmlTable).append(tBody);
          $(visor).html(htmlTable);
     
        loadDataTable();



        //Se agrega el manejador de eventos en el botón ver detalles
        $(".btnVerDetalles").click(function (e) { 
          e.preventDefault();
          let idItem = e.target.id;
          console.log("id BOTON:", idItem);
          mostrarDetalle(idItem, arregloDatos);
          $('#asesoriasModal').modal(); 
        });



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
      
    //   function exportHTML(){
    //     var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
    //          "xmlns:w='urn:schemas-microsoft-com:office:word' "+
    //          "xmlns='http://www.w3.org/TR/REC-html40'>"+
    //          "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    //     var footer = "</body></html>";
    //     var sourceHTML = header+document.getElementById("visorAsesorias").innerHTML+footer;
        
    //     var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    //     var fileDownload = document.createElement("a");
    //     document.body.appendChild(fileDownload);
    //     fileDownload.href = source;
    //     fileDownload.download = 'document.doc';
    //     fileDownload.click();
    //     document.body.removeChild(fileDownload);
    //  }

    function exportPDF() {
      var doc = new jsPDF();      
      doc.setFontStyle('arial');
      doc.setFontSize(16);
      var elementHTML = $('#employee_detail').html();
      var specialElementHandlers = {
          '#elementH': function (element, renderer) {
              return true;
          }
      };
      doc.fromHTML(elementHTML, 15, 0, {
          'width': 170,
          'elementHandlers': specialElementHandlers
      });
      doc.text(20, 20, 'Reporte de asesoría');
      doc.addImage(imgData, 'JPEG', 28, 22, 28, 16)
      // Save the PDF
      doc.save('asesoria.pdf');
     }