var arregloDatos=[];
var idVisitaActual;


$(document).ready(function () {    

console.log("id desde js", idCE);
$('[data-toggle="tooltip"]').tooltip();
saveSession();

  cargarApp();

  $("#btn-exportar").click(function (e) { 
          e.preventDefault();
          exportPDF();
    });
});
  

function saveSession() {
  // establecer variables de sesión
  let tipo = sessionStorage.getItem("tipo");
  correoUser = sessionStorage.getItem("correo");
  $("#divInfo").html('<a id="btnInicio" href="../admin/index.php" alt="Inicio"><i class= "fas fa-home"></i></a>&nbsp;&nbsp;&nbsp;&nbsp; <a href="#" class="acerca-de" data-toggle="tooltip" title="Acerca de"> <i class="fas fa-info-circle"></i></a>');
  $("#divUsuario").html('<i class="fas fa-user-alt"></i><span class="usuario"> </span>'+correoUser);
  $("#divSalir").html('<a href="../server/login/logout.php" data-toggle="tooltip" title="Cerrar sesión"><i class="fas fa-sign-out-alt"></i></a>');
  cargaModalAcercaDe();  
}

  
  function cargarApp(){

    //CArga el ajax loader    
    $(".div-shadow").removeClass("invisible");
  
  const data = new FormData();
  
   url= '../server/consultar_asesorias.php?id_CE='+idCE+'&correo=vacio&tipo_usr=2';
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
            $("#visorAsesorias").append("<span class='t1'>Asesor:</span> <span>"+array[index].correo_asesor+"</span>");
            $("#visorAsesorias").append("<br><span class='t1'>Estado de la Asesoría:</span> <span>"+array[index].estado_asesoria+"</span>");
            $("#visorAsesorias").append("<br><span class='t1'>Institución: </span> <span>"+array[index].institucion+"</span>");
            $("#visorAsesorias").append("<br><span class='t1'>Fecha de la asesoría: </span> <span>"+ moment(array[index].fecha).format('L') + "</span>");
            $("#visorAsesorias").append("<br><span class='t1'>Medio: </span> <span>"+ array[index].medio_visita+"</span>");
            $("#visorAsesorias").append("<br><span class='t1'>Tipo de atención: </span> <span>"+ array[index].tipo_atencion+"</span>");
            $("#visorAsesorias").append("<br><span class='t1'>Objetivos: </span><br><span>"+array[index].objetivos+"</span>");
            $("#visorAsesorias").append("<br><span class='t1'>Observaciones: </span><br><span>"+array[index].observaciones+"</span>");
            $("#visorAsesorias").append("<br><span class='t1'>Recomendaciones de los participantes por Dirección Regional:</span><br><span>"+array[index].recomendacion_dr+"</span>" );
            $("#visorAsesorias").append("<br><span class='t1'>Recomendaciones de los asesores DRTE-PNTM: </span><br><span>"+array[index].recomendacion_asesor+"</span>" );

            if (array[index].observaciones_director.length > 1 ) {
              $("#visorAsesorias").append("<br><span class='t1'> Observciones del Director: </span><br><span>"+array[index].observaciones_director+"</span>" );  
            }

            if (array[index].url_archivo != "pepito") {
              $("#visorAsesorias").append("<hr><a href="+ array[index].url_archivo +" class='t1' target='_blank' > <i class='fas fa-paperclip'></i> Archivo adjunto </a><br>");  
            }
            
          }
          
        }
        
       
      }


    
function mosatrarModalValidar () {

  
  $("#mdlValidar").modal();
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
             "<th scope='col'>Medio</th>" +
             "<th class='text-center'>Asesor a cargo</th>" +
             "<th class='text-center'>Fecha de asesoría</th>" +
             "<th class='text-center'>Fecha de registro</th>" +
             "<th class='text-center'>Tipo de atención</th>" +
             "<th class='text-center'>Estado</th>" +             
             "<th class='text-center'>Ver detalles</th>" +
             "<th class='text-center'>Validar</th>" +
            "</tr>" +
           "</thead>" +
           "<tfoot> <tr><th>medio</th> <th>asesor</th> <th>fecha asesoría</th> <th>fecha registro</th> <th>tipo atención</th><th>estado</th><th class='buscador'>asdf</th><th class='buscador'>xyz</th>   "+
           "</tr></tfoot>"+
           "</table>"
         ), tBody = $("<tbody></tbody>");
     
                 for (let index = 0; index < limite; index++) {
                   let fowNumb = index + 1;
                   var htmlValidar;
                   if (array[index].estado_asesoria == "pendiente" ) {
                        htmlValidar =     "<td class='text-center' >" +
                        "<i tar='"+ array[index].id_visita +"'  <i class='fas fa-pencil-alt btn-validar lnk-ico'></i>" +
                        "</td>";
                   } else {
                    htmlValidar =     "<td class='text-center' >" +
                    " <i class='fas fa-ban'></i> " +
                    "</td>";
                   }
                  
                   row = $(
                     "<tr>" +
                     "<td class=''>"+ array[index].medio_visita+ "</td>" +
                     "<td class='text-center'>" +
                        array[index].correo_asesor  +
                    "</td>" +
                    "<td class='text-center'>" +
                        moment(array[index].fecha).format('L') +                        
                    "</td>" +
                    "<td class='text-center'>" +
                        moment(array[index].fecha_ingreso).fromNow() +
                "</td>" +
                    "<td class='text-center'>" +
                          array[index].tipo_atencion  +
                    "</td>" +
                    "<td class='text-center'>" +
                    array[index].estado_asesoria  +
                  "</td>" +
                   "<td class='text-center' >" +
                       "<i tar='"+ array[index].id_visita +"'  class='fas fa-eye lnk-ico  btn-detalles'></i>" +
                   "</td>" +              
                      htmlValidar + 
                     "</tr>"
                 );
                   $(tBody).append(row);
               }
         $(htmlTable).append(tBody);
          $(visor).html(htmlTable);
     
        loadDataTable();



        //Se agrega el manejador de eventos en el botón ver detalles
        $(".btn-detalles").click(function (e) { 
          e.preventDefault();
          let idItem = $(e.target).attr("tar");          
          console.log("tar BOTON:", idItem);
          mostrarDetalle(idItem, arregloDatos);
          $('#asesoriasModal').modal(); 
        });

        //Manejador de eventos para renderizar contenido modal vbalidar

        $(".btn-validar").click(function (e) { 
          e.preventDefault();
          idVisitaActual = $(e.target).attr("tar");  
          mosatrarModalValidar();
          
        });

        handlerValidarInforme();


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


  function handlerValidarInforme () {
    let tmpEstado;

    $("#formEstado_asesoria").change(function (e) { 
      e.preventDefault();
      tmpEstado = e.target.value;
      console.log(tmpEstado);

        if (tmpEstado=="disconforme") {
            $("#visorAlerta").html(
              "<div class='alert alert-danger' role='alert'> Es importante que escriba en la caja de texto el por qué está disconforme con la asesoría. </div>"
            );        
        }    
    });

    $("#btnEnviarValidacion").click(function (e) { 
      e.preventDefault();
      alertify.confirm("Tecnoaprender", "¿Desea realmente enviar la validación? Una vez enviada no podrá ser cambiada.",
  function(){    
      //Ajax envio
      envioAjax( tmpEstado );
     //Cierra el modal
     $("#mdlValidar").modal('hide');

  },
  function(){
    console.log("Cancelar");
    
  });


    
    });
    
  }


  function envioAjax(tmpEstado) {
    let txtObservaciones_director = $("#txtObservaciones_director").val();
    // console.log(txtObservaciones_director.length);     
     if (txtObservaciones_director.length==0) {
       txtObservaciones_director = "N/A";
     }

         //Empaquetar datos para Ajax
         console.log("idVisitaActual", idVisitaActual);
         let urlPhp = "../server/actualizar_main.php?tabla=asesoria2&id="+ idVisitaActual + "";
         
         let formData = new FormData();
         formData.append( "estado_asesoria", tmpEstado);
         formData.append( "observaciones_director", txtObservaciones_director);
   
         //Ajax
        
     $.ajax({
       url: urlPhp,
       type: 'POST',
       data: formData,    
       cache: false,
       contentType: false,
       processData: false,
       beforeSend: function(){
       console.log("En proceso");    
       }, success: function(response){     
         $(".div-shadow").addClass("invisible");
                   alertify
                     .alert("Tecnoaprender", "Datos enviados satisfactoriamente" , function(){
               console.log("ok");
               cargarApp();
             });
         console.log(response);
        
        }, error: function(response){
         $(".div-shadow").addClass("invisible");    
         console.log("Error al enviar");
         //alert (response.error)
           console.log(response);      
           console.log(response.error);
           console.log(response.msj); 
           
       }
     }); 
    
  }