var arregloDatos=[];
$(document).ready(function () {
  saveSession(); 
  $("#divInfo").html('<a id="btnInicio" href="index.php" alt="Inicio"><i class= "fas fa-home"></i></a>&nbsp;&nbsp;&nbsp;&nbsp; <a href="#" class="acerca-de" data-toggle="tooltip" title="Acerca de"> <i class="fas fa-info-circle"></i></a>');
  $("#divUsuario").html('<i class="fas fa-user-alt"></i><span class="usuario"> </span>'+correoUser);
  $("#divSalir").html('<a href="../server/login/logout.php" data-toggle="tooltip" title="Cerrar sesión"><i class="fas fa-sign-out-alt"></i></a>');
  cargaModalAcercaDe();  
  cargarApp();



  $("#btn-exportar").click(function (e) { 
          e.preventDefault();
          exportPDF();
    });
});
  
function saveSession() {
  let tipo = sessionStorage.getItem("tipo");
  correoUser = sessionStorage.getItem("correo"); 
  // $("#divInicio").html('<a href="../server/login/logout.php"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</a>')
  // $("#divUsuario").html('<i class="fas fa-user-alt"></i> '+correoUser)


}
  
  
  function cargarApp(){

    //CArga el ajax loader    
    $(".div-shadow").removeClass("invisible");
  
  const data = new FormData();
   url= '../server/consultar_asesorias.php?id_CE=x&correo=x&tipo_usr=8';
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
            $("#visorAsesorias").append("<br><span class='t1'><b>Institución:</b> </span> <span>"+array[index].institucion+"</span>");
            $("#visorAsesorias").append("<br><span class='t1'><b>Fecha de la asesoría: </b></span> <span>"+ moment(array[index].fecha).format('L') + "</span>");
            $("#visorAsesorias").append("<br><span class='t1'><b>Medio: </b></span> <span>"+ array[index].medio_visita+"</span>");
            $("#visorAsesorias").append("<br><span class='t1'><b>Tipo de atención: </b></span> <span>"+ array[index].tipo_atencion+"</span>");
            $("#visorAsesorias").append("<br><span class='t1'><b>Objetivos:</b> </span><br><span>"+array[index].objetivos+"</span>");
            $("#visorAsesorias").append("<br><span class='t1'><b>Observaciones: </b></span><br><span>"+array[index].observaciones+"</span>");
            $("#visorAsesorias").append("<br><span class='t1'><b>Recomendaciones de los participantes por Dirección Regional:</b></span><br><span>"+array[index].recomendacion_dr+"</span>" );
            $("#visorAsesorias").append("<br><span class='t1'><b>Recomendaciones de los asesores DRTE-PNTM:</b> </span><br><span>"+array[index].recomendacion_asesor+"</span>" );

            if (array[index].observaciones_director.length > 1 ) {
              $("#visorAsesorias").append("<br><span class='t1'> Observciones del Director: </span><br><span>"+array[index].observaciones_director+"</span>" );  
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
      var imgData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBaRXhpZgAATU0AKgAAAAgABQMBAAUAAAABAAAASgMDAAEAAAABAAAAAFEQAAEAAAABAQAAAFERAAQAAAABAAASdFESAAQAAAABAAAXEQAAAAAAAYagAACxj//bAEMAAgEBAgEBAgICAgICAgIDBQMDAwMDBgQEAwUHBgcHBwYHBwgJCwkICAoIBwcKDQoKCwwMDAwHCQ4PDQwOCwwMDP/bAEMBAgICAwMDBgMDBgwIBwgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIANcBTwMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP38zijNNK4Wo3l8tWZjtUDJNFrhtqybNGayf+Ev03/oKWf/AH9Wj/hL9N/6Cln/AN/VrX6vV/lf3HN9dw//AD8X3o1icf8A6qCcD/61Y7eLtLLD/iZWf/f1ac3i3TAP+QlZn/tstP6vV/lf3MX17D/zr70au76/lRu+v5Vk/wDCYaZ/0ErP/v6tH/CYaZ/0ErP/AL+rR9Xq/wAr+4Pr2G/5+L70aokB/vf98ml35/vflWRB4n0+aXampWzMx2qqyqcmqsXjSOPxZLpM3+uVFkT3U96ylGUXaSav3NqdanP4JJ+h0O76/lRu+v5UoORRSNBN31/Kjd9fypaKAE3fX8qN31/KlooATd9fyo3fX8qWigBN31/Kjd9fypaKAE3fX8qN31/KlooATd9fyo3fX8qWigBN31/Kjd9fypaKAE3fX8qN31/KlooAb5gz/F+Ro3/735GmsNtDduKE1ewa7j931/Kk8wf7X5Gm78Jn8KN22jrYLofu+v5Ubvr+VMLADv0oU704/WjrYB+76/lRu+v5Ui8jmlPWgA3fX8qN31/KlooATd9fyo3fX8qWigBN31/Kjd9fypaKAGj7vNY/jjQpPEvhPVNNhlMEl9aS2yyD/lmXRlDfhnNbWMmq2o2bXNqyxtskboaqMnF3RnVpKpBwlsz8+B/wRs8YDP8AxcabH/XF/wD45S/8Ob/GH/RRpf8Avy//AMcr7TuvCvirzm8vWnC9htFR/wDCK+Lv+g5J/wB8Cvslx9nCVlKP/gK/yPy+Xg3w23dxn/4Gz4v/AOHNvi4N/wAlGm/GJ/8A4uvFfAH7HuveP/2o9f8AhfH4vuba70GOSRr1t7CYIY+ibuP9YO/av1O8IaJrmnakW1LUmuoNjYUqBg/Lj+tfGX7M64/4K4fEQf8ATtc5x3/eQda+jyHi/MsRQxU6sleFPmXure6R8Hxj4a5JgMVl9PDxlarWUZe+9nFmR/w5t8X54+I03TB/cv8A/HKP+HNvjD/oosv/AH5f/wCLr6i8MeKPFPjPx/r1jDqjwW9jeSRRrsHyqGIArrf+EU8W/wDQcf8A74FfOf6/5x/NH/wFf5H3n/EG+G/5Jf8AgbPkz4af8Ek/FXgj4iaHrUvxAmuI9Jv4bt4WibEqowJT7/fFfR+t3izftKW8MMnmfZbGOOYD+E5Y/wBa6I+EPFrIV/tyTnPRBSfDv4NL4U1ubUrmaS5vJjuaRyWZjjFeDm2dYnMpqeKd2trKx9fw1wjl+RU6lLLk7T3u7/dc9EXpRTSfl60ibscmvJPpR9FFFABRRRQAUU3k0ZxQA6imKSO+aUMaAHUUU05FADqKbvxQG+WgB1FN3cUb8etADqKbv4qMzMnUHnvjpQAeZlv8815j8bv2qvDvwTvIdPuftWqa5eLug0ywTzbhh/eI6KPcmtrXPjp4XsfHH/CJ/wBvabD4kmQmG2kk6MR8ue2fbqa+RPit8PvEHwu8YXEGtXGpSX+uOst/q2mjF74gnkc+Vp1mxw0UaqMsRtwK+gyHLaOJrctd2W9tr/P+v1Pz7jLibE4LDXyxKUr8spLVQfmr7s9Xsv8AgoDf6Vcm48R/DrxLpGj4ybuN47houeNyKcjjmvoDwL4+0r4leGbTWdFvI77T7xd0U0Z+Vvb2xXxHpvwL8V+GddsW/wCEb1HwfcajeJa2upaVqcuoBWZuPtsTMwdW+6zYOMntXqX7Rn7Q91+wXbeEbHTfDmm3Gg6mJPtohQw4n3BnKBfly2WOK7M6y3BJQjg/ifn/AMF/n8j57hri7MqNOtis8aVGFrvlel/PS/pbQ9C/bG/aisf2XPho+qSBbjVrxvKsLbP+tfGdx/2V6mu1+B3xAb4rfCPw/wCIJFWObVLOOWZF6LJjDge24Gvhr9vy7m/aW1bwvr2i/aLjTL7TIYtLgUFmmuZ5G3x7R12iMk4/u19qfs3+CX+GPwP8M+H7iSP7bp9hHHcKGB2yHLMOPRiRn2rxcRhlTw8X9q56+QcSYnMOIsVSv/s8IxUezb6r1/I7t5RFj16fSnqdwH0r51/antviF8UUupPhzqLWMvg2ZZGUMU/tS5A3NECeCEQr1+Ul8djjb/Y+/a5j/aC0u70nVLGfSPGGhLt1OxkjZNuG271yOnTjqM+hFaTyWr9T+twaaT95LePZtdmfRU+KsP8A2p/ZtSMouXwSa92bW6i+687eR7nRQp+WivJPqQooooAKKKKACgiiigAooooAjIyK+C/2aP8AlLn8RP8Ar2uf/RkFfenb8K+C/wBmj/lLn8RP+va5/wDRkFfX8L/7tjv+vT/9KR+XeIn++5T/ANhEf/SWfSPwJ/5Kt4t/7CEw/wDHzXs9eMfAnj4q+Lf+wjL/AOhmvZTIoHWvkD9RGmVYuvegTKwyGyO2K83/AGh/2ovCH7M/hz+0PE2px28kg/c2yfNPOf8AZX+pwPevknU/+CrHxA+I2qrH8P8A4d3l1atIEjmmjeQyZ6ZIBQfXdXvZbw1jsdD21KNofzSaivvZ8Zn3HmT5TVWGxE26nWME5SXyV2ffhmC/wu34UwX0KlV3YZuVB6mvgpf2s/2otPMtxcfDdJLXG7ZsTco/A1f8Bf8ABXG88N6rDpvxM8F6hoPnEI1xHG236lWC8f7ua9CfBWYqN6TjUfaMk39yPFpeK2SOpGOJVSkn9qdOUV97R92JKH+7TycCuD8E/EvSfiP4Vh8Q+E9Uh1fS5V3FYm3bfXjqD7HBrqvD/iO38Q2KzQsMnhh/dPvXytSjUpzdOommt090fo+HxFKvSjWoSUoyV01qmu6ZpUA8U0TK3esnxn470f4e+GbvWNc1G00vS7FDJPc3EgSOMD1J/l1qYxcmoxV29jSc4wTlN2SNTzwSfbtR5qt2b69q/O34/wD/AAcH+B/B+vz6P8O/DeqeOr6JiPPRTHbtg87Ry5+u3Fedv/wXc+L0M/8AaUnwNv8A+xNu5WMVzke+7y8V9NS4OzWceZwUX2k0n9zPka3HOURlaE3Nd4ptH6pC7jkyFYNj0NPjOR3r88P2fP8Ag4I+H3xC12HR/iB4f1LwPfTEI1y6+ZbRsTjDH76/UrX3Jo/jK11bw9a69oeoQa1od5GJUuIJRIhQ/wASkHkV4+ZZPjcBLlxUOVd919+x7GU59gMyjzYKrzW6bP7jr19qaZf+A9uah03Uo9Ts1miZWVuQRXi3i39u3wX4R/a90f4KXkeqN4w1q2F1bssQNsFILYL5yOB6Vy0cPVqtqmr2V3bol1PQxGKpUEnVaV3ZX6t7L1PbBKCT3+nUU7zAOn6VwXxV+Mnhn9mXwJf+IvGniC10vSIWLB52+Y/7CAfMx9gK+CPin/wcWaSdeks/h38PtX8UWtu21rm5BjEg6blWPc3X1Ar0MvyPHY73sLC8e70X3vQ8vNuIsBlztiqlnvZK7+4/TJbhQu4/L9aQXUc4+Vg3uvavyjtv+DgL4naIzSat8F5hbTN+6KLcx7R7ny8dO9fRP7In/Bar4V/tU61beH9W+1eCvE1wwSGHUCFhlk6YSUEgHPQNtruxnCOZ4aDqzhdLfladvuPOwfGuUYmapRqcrei5k43+8+1d/K/L94dq+OP+CqPxz8ZfC/8A4RvT/Dc95ptnqIeWe6g6s6sAEzjjjmvqYeJ38PavDa33zQ3XEE/UN7GvGP8AgpV8Rh8PP2bLy5Wztbu4vJ0t4XnQOtuW6uM9wOhrxcHb20YtGHiBTnLIMRKFV07K/Mt9OnzPmv4jeGbi81n4R/EjxTOdDkuLZZdb1Hbh55I3ymV/vGMe1fcfg/xn4X/aB8J2uuaJeWWqxWrl7afaGa0m2kZ9mGa+Nv8Agn78F/HPxn0+/wBW8ZXU0/w+1CF4Ws9QJkOoHHDorf6tV4ww544r0/xR+2V8Gf2JNK/4RPwrapqOoRn57PSUEjSSerycBm98k16OLvKpyU9ZRfTax+e8F4yGDws8yzBqlh66TfP8bkkldJb332udR+xl+z946+DvjbxnfeMNbbVLXVrotZR+cZfMG4t5uD9w4ONo4r0b9oz4CaR+0Z8OZtF1TdbyQsJrS52/NaygcN9D0Psa+UdX/wCCpHxK8QWSyeH/AIU6gtvIx2TSQytuXsOF61HpH/BUT4oeG7eSbXPhXfSQxkFpI4plCjv1TmnjHisTX+szaT0WllayPUwfFPDWHwDypqpUoyvdyjJ3u76tq/8AkdF+0X4A1L9m74CaXpOh3Vw7TXU8wlsLPz5IJZF4jRiT5UfLHOCcHAI61wH7DXw48ceHtRk8ZaxfapCs6tp+jWl3cuRqFzKNofDHlUGWPupr3n4H/wDBTj4dfGjUV0vUpLjwvrE52eRqCiNS2cABxkA/72K1f2z/AIA618aPCej3nh3WpNP1jw7Kb3S5Yn2xzuQBgsD8rEZCt05OSK2wFROpGhimoqT1k1dLt+O55+IyPA4iX9s5JWdVUklGlF21Wmt9b2va/U9m8J6Ha/DXwPBbNJmKziaW5uH/AOWjH5pJD7lixxXN/Bjwla3+qat40ksYre98TbTCVTa32Rc+Vu/2myXP+8B2rxn9nT42eKv2j9OufA3ibRdS0q+0OcLrVzLHtW6t1PEec/6x8ANjI25OTX1PDAsESxoNqooUADAAA7Vy5hRq4Kc6M3eUnrZ3TXy013P0bJMTh82p0sXTg1CnrFSVmpbPR7NbX7lhRhaKReFpa8c+sCiiigAooooAKKKKACiiigCPt+FfBf7NP/KXL4if9etz/wChwV96dvwr4L/Zo/5S5fET/r2uf/RkFfX8L/7tjv8Ar0//AEpH5d4if77lP/YRH/0ln0j8Cv8Akqni3/sIzf8AoRrf/ac+Oun/ALOfwf1fxRqBVvssey1ty+03M7fcjHuTyfYGsP4CR7/if4yP92/lA/77NfNf/BS/VZvjl+1N8OfhPbyMLOSdLm9VDyxkbnP0jVv++687hnLI4/Hxp1dIRTlL0jq/v2Pf494gqZTlE8RR1qztCC/vT0X3Xv8AIp/skfsgal+2H4hPxa+LE1xfWupytLpmmM58qSPPynb1VAOijGepzX3R4b8D6P4O02O00vTbPT7eMALHBCsajHsAKm8N6BbeGNCs9Ns4UgtbKFIYo1GFRVXAFaA5Y/1qc6z3EY+s7PlprSMVoox/z8w4U4PweUYVXjz1pazm9ZSk99e3ZdgaJWX7tcd8VPgP4U+NGgzaf4i0Wyv4ZlK5eMeYmf7rD5lPuDXZnjGKG4FeTRr1aM1Upyafkz6fFYHD4mm6WIpqUX0aR+cOpaT4i/4JR/tC2dxb3NxqHwv8TzBHV/m8pc/MMD/lomc/7S19pDxJbaDr+laxp8izaH4lQSIyH5A7Ddu/4EDn8Kw/29fg7b/Gr9mDxLYvCsl5p9ub+0dh/q5Ystx/wEEfjXjP/BP7x5cfFv8AYdfS7iRrjUfB139mRs5cBGBT/wAcbFfYZtKOaZTHM5L99TfJNrqmvdk/Poz8w4dhLh7iOeQK/wBWrRdSkm78jXxxXl1S6I+w73U4dM0ua8uJY4ba3jMskknyqigZLE+gFfkJ8cPiR4+/4LXftcXnw98F3l1o/wAKPDExNzcxgrC6KxUzy/3mcghE6YGcdTX1J/wW9/abuvgF+xXD4d0+5dNe8fMulKy/fWAAGYjvyCqf8CrT/YZ+B9v/AME/f2GdDtUtY/8AhNPFqre3jEfN58q5A9dsaEAe9Z5Ry5bgJZpKKdWb5aafS3xS+XQ9zPOfNsy/sanJxpwSlUtu7/DG/nudd8Ff2Svgd+wp4Yt9L03QtP1DWlQCe6ngW7vp37lsg+WD6KAK9ZsvinoeqaZ5P/CPzfY8AeU1uuzH+7jFYXwT+ConhXWNaaS8vLrMrNJ6mvWrfQrS0i2xwxgfSvla+MrV5c9WbcvU+ywuXYahD2VKmkvRHzJ+1d/wTT+Ev7bvg+4/4k9r4e8SeWWt9TsLdbeaFyOPMQDa4z1DDOO9fD//AAT8/aB8af8ABND9sK4+A/xMmkPhTW7sW1s07E29rI/EVxCT0hk4DL0BPGDX69HRIY5BJEoSReQa+Nf+CxH7Aesftk+APDOreCbWH/hOvD+oRxxTs3ln7M7DcWb0RgHxX1GQ537SMsszB3oz2b+xLpJPt5Hx/EfD/JUjmuVx5a8NWlopLrG3c+nfB80ng/xvd6K7O1rcKLm0JORtJ5A/lX59ftR+IrXwf/wXs8F6xqE8dtYaT4e+1zyt0SNIHZs++BX3VpOmX3hL/hWWk6xfR3/iK1thb3s8Q2rcFIQGcjrjcMj3r8n/APgupY32sf8ABRyz0/TJJI77VtFsbGIx/eZpW2bfxzWvBOFjWzKrh5S0cJpvystTPxAxlSjldLFRXvKpBpeZ6F8NfhH4s/4LlftI6r418XXmoaP8FfDF01rpdpE5VbxVPROxZuC7nOAcDFfd/gPwJ8Ff2btPXQ/C/hXR2a3AjYW1ktxKcdd0jBmP51jaT4Bh/Za/Zp8D/Crwyv2O4+xxx3LxDa7cZkY/7TOT+FesfCf4K2PhfRoZLiFZLphkkjNeVnOeVcRP6vh3yUo6RitNur7tnrZBw5RoUvrWIXPXnrKT1evTXZLyKsfjbwvraxw3PhhTbtwBLYI6oD227elfLf8AwUN/4JG+B/2j/h1feLPhzp9r4b8cadG11A1ivlw3zIN3lPGOFc4wGUAg19zDQbQbR5Ef5VJbadHZMfLQDfwQK4cvzbFYKoqtGTut9dH6o9TMslweOoOjVgtV21T7pnwH/wAEef2u9U/aj/Z/174b+Lrib/hOvh/8iSXJzcTQqSqbz1LRsCjH6V9Pa98L9H/ax+E9jpPiL7Q0NhfJJKiMAztGfunj7ueDXwd4S0v/AIZN/wCDgG40uxj+z6R8QYzJ5S/Kjm4jJP5SLn8a/QfxLqP/AAof4a+PPEc+1YbLz72D6BMj82NetxJhoU8bCvhlaNaKmvJvdfefL5DiIVcorYTM/eVByjO/VR1/Kx87/thfHnXPHnxB034DfCTbZ3jKIdUu7YhFsolAzECPugLyxGDjHIrvvhB+yF8Lf2QNCgm1e3ttZ8SXCB5bu7QTTTSd9qHhRnvj8a8z/wCCY+groHwr8afGDXcT6trt1Kscj/MxUHcVH+87Y+i17V8G/h7cfE3VpvEmvO08t0/mKp+6nsPYV5GKreybo03tu+rPP4PyWGaxWf5jFSnO/s4v4YQWyS2u11OqtvjnbMqR6T4ZupIMYBAWNR+GK1Lf4mx6hAy6l4dniiYhSCFkDDvxiuysPDdppkIWKGMYHpViSyhlXb5aY+lcHNLufpH1elbl5Vb0R8+/H79hX4d/tPaBcTWtlb6LryKTFe2kYhkjfqu9Oh+pGfQ14n+yR8f/ABR+zZ8Z2+CfxQka6s7phBpF7MxIGc7AGPLI/QZJ2kYzX3I2iQxuJIR5cing18nf8FcPgxH4i+Dtj46so/L1fwjcpI86DDCBnAY/8Bba3/ATXdhK7qS+r1dujPzji/I1lsf7fylclWlrNLRTh9pNbXtqmfQPhy8/4RLx1d6TdCM/aALiCcJ886dMMf4mHI+ld8OR/UV87+FPibJ8Vv2c/h748Vj9sVI4bxvV/wDVyZ+rrn8a9+0bUF1PSredeRMoPH0rkrc6m+d3Z9/l+Io4jDU69BLlmlJW7PUvDpRQOBRWR3BRRRQAUUUUAFFFFABRRRQBH2/Cvgv9mn/lLl8RP+vW5/8AQ4K+9O34V8F/s0f8pcviJ/17XP8A6Mgr6/hf/dsd/wBen/6Uj8u8RP8Afcp/7CI/+ks+lvgN83xL8Yj/AKiEx/8AHv8A69fIXin4o6P4L/4K36tr3iq8t7HS9FUwpcSj5UYWqBR9Tlq+vPgKcfE7xl/1/wA3/odfJFv8N/DXxd/4Kx+MPD/irTbfVtPu4XkS3mztMqxQkNwRyBurp4JdFPFzrJtexlfl3Wq2ucfi4sRKOXQw3L7T6xTtzX5W0m1e2u59Sr/wUX+D4/5m/T//AB7/AApT/wAFGPg+R/yOGn/r/hWZJ+w38A4LmSF/C/h9ZomKOhkbcpBxjr60f8MN/AP/AKFjw/8A9/G/+Krz/wDjHuvtf/Jf8z1v+M43tQ/8n/yNP/h4z8IP+hw0/wD8e/wo/wCHjXwgP/M4af8A+Pf4Vmf8MN/AP/oWPD//AH8b/wCKo/4Ya+AX/QseH/8Av43/AMVQv9Xl/wA/f/Jf8xcvG/ah/wCT/wCRNr3/AAUC+Dus6VeWcni7T5IbyF4nB3cqykHt6GvBv+CLuswy6x8StMi2tZ/aobqPns25Rn8FFe5j9hv4Aj/mV/D/AP38b/Gu1+CPwU+HPwX1O8HgzT9N0241RQZxbsSZVTpnJPTNdks3yihluIwWCU26vLrK1k4yv0Z51PhziXFZ7g80zN0lGg56Q5r2lG3VH5+/8FJIZP2lv+CxPwg+GsiNNpmgC3ubiLqjAk3Dkj6Ior7b+IsI8dftCWOkp/x6aHCi7MfKD1P8wPwr4r+DiWvxL/4OHfGF08kzf2BY3BiBbO2SKKGEgeg+Y8V9ufBwLr/xx8U6hzj7W6oT2AOMVy8T+7TwmFW0acX/AOBav7z6Xg/95WxmLe8qr+6OiXyParG0WztY41GFUAAelT44oxRXyp9puBXIrH8WXV5pejzS2Mcc1xg7EfP3q2KaU3CgDyf4W/DLVrjxtN4k8QXDzX2cRKx4jX0UdAPpX55/t8+Go/F3/Bdz4X2E0PnxSf2c7pnrt3N+mAa/WRRjj0r8zf2hYEuf+Dhb4bhl3KukxOB7iJ8Gvq+Eajp4ivJf8+p/kj4vjil7TDUI/wDT6n+Z9h+IYD4m/ahaKRVMenwxque2Rk17dHCqIoA6DHFeOeF2+1/tMa8zKG8llQceiivZq+Ueqsz7QRk3UbKWigD8sf8AgpZpUuk/8FoPgTqCuyC9+yIu04PyTEH+dfYn/BUPWptD/Yy8TeU2PtXlQPjurSAEV8n/APBUcE/8Fcf2cfaaP/0eK+rP+CqGmzan+xr4j8ldwheGaT2RZASa+0zaV6GX3/k/9uPyXF3jgc7cN7y/9JOR+EGkNoH/AAT68D2cIWIag0Zl2jG7dIzZ+vTmvpr4a6Qmk+DLGNVAHljpXzb8H9T/ALe/YL+HdwqhhA8SPg524dlGa+nvCMqzeG7Nl+6YhXyOIf75o+84XjD+xsK4bckfyRrDlaMZoorE94jEap0rzf8Aa80G38Rfsx+OrW5TfFJo9wxGfSMn+Yr0hlyfxrz39qrUYtM/Zu8dSzyCONdGuQWPb92a0o6VI27o8jPeX+zcQp7ckv8A0lnzH+wBrC69/wAE7tWiZ2eXSdQlckn7v3JBj8zxX1t8IL06j4A09t27dCMn3r5B/wCCfWmpov8AwTt8SXUjbW1K9mGPRgscYH519bfAqPyfhxYKf+eYrbGRtXm13PF8P5SfDmD9pvyI7NBtUUtIhyopa5T7EKKKKACiiigAooooAKKKKAI+34V8F/s0f8pc/iJ/17XP/oyCvvTt+FfBf7NH/KXL4if9e1z/AOjIK+v4X/3bHf8AXp/+lI/LvET/AH3Kf+wiP/pLPpT4DcfEvxn6/wBozflvb/61fMf7RVz/AMKB/wCCrHhHxNMBb6Z4mjiR5GAVMuhgbn2IQ/iK+mvgS+34peLx/e1CYY/4Ga4P/gqF+zfcfG/4ILrGkws+v+EWa+txGMvJF1dV/wBr5VYf7tYcIYyFDHujXdoVoyhL/t/b7nY7/EzLK+JyhYnCrmqYecKsUt3yO7Xq1c7bU/AdjafHm7a6jU22sRrdxMfu5Iwf/Hhn8a9A/wCFQ6H/AM+6/wDfNfP/AOxD+09pf7XHwpsdL1S4W08ceGY0jmDcPNtwvmqP4lbHPoTX0po99PBa+TfR+XJH8u/+CQfWvHzTL62BxMsLiI8so6evmvI+pyDPMNm+Cp47CSvGa+afVNdGnoZZ+D+iAf8AHuv/AHzQvwg0Rv8Al3X/AL5rpsrs60u/CfeUe9efqeze25y0vw08P2FqzSW9vGoIBeQhQM8dak0DwjZ+GdcjMNqqySJIVlU8Accfyr5D/wCClf7Rtx8QNc0n4NeAbia81/WL1BqL2jsTbYO5Y9yngg/Ow7Ba+nvh7ct8KdK8G+C7y7uNW1L7AEubuZ8uSigb2P8AtMCPwr2Mbk08Jg6OIrSSdS9o9bLaXoz5PK+KKWY5liMDhYXhRspVL6cz3iu7XXsfnh+xpE0H/Bfr4rCRTuMWp4OMf8tIDX3h+zxEj+NvEbfxfa5CMdssa+IPD11N8KP+DifVY5IoYYfFmnMsZLYDLJbxvuH+0WjNfcnwlt/7A+Nfimz2+XHJdM6r6huRXpcWXdTD1O9KH5WOfgm0aOJpreNWa/G57EKKAc0V8qfaCbhQGyaaeDSKcilqHkODYFfmf8ff+Vhf4c/9geP/ANFPX6WpIGz6ivzS+PrZ/wCDhb4c/wDYHj/9FPX1HC2tWvb/AJ9T/JHyPGWlHDr/AKfU/wAz7I8Ctj9pHxN/12H8hXtVeK+B+P2kPE3/AF3H/oIr2qvmD64KKKKAPzF/4Ki8/wDBXH9nP/rrH/6PFfeXx68NW/xt+Efjjwmqbpms2g2nuzIWQ/mK+Df+CovP/BXL9nP/AK7R/wDo8V9x6P4hl0/9pnXLLP8Ao91ZwllH97nDV9bnsmsJgZL+T/24+FybCwxGIzOhPac7P5xsfNn/AATG8UL4+/Z98UfDW/k8nW9BuZHiR+GALdQPaRSPxr62+D+utc+G1s7j93dWZ8uRD1VhwRXxx+1z8JPEf7GH7Qkfxm8DWslzol/LnWbKMZWMn75IHSN8df4W5719Jfs+ftKeCv2mNKh1Tw/qEVrqzIDeWEjBJkOBkOvXGejDGa8LGUud+2p6p7+R53BOcRwMXw/mD5atJ2jfTnh9lpvfzPZzIBR5gzj8arxSuV/eLHx3VutOWTC54/OuDrY/SeZbpkjyfMMfjXy//wAFXfi1D4H/AGZLjRY5A2o+LJ00+KMH5mjzmQgf7ox+NezfGv8AaE8K/ATw1NqniPVbSzSNC8cRkHmzsP4VXqxr47+DvhTXP+Cjf7S9v8RPEdhPY/Dnwy5XTLafKrPtOQB65YKWPYDHFd2EouL9tPRLX1Pz7jXOo1qLyPA+9Xr+7ZfZi/ilLtZHrHhrwTJ8Ff2J/BPhOZQupaoYnuFC4Ys5858+4yAfpX0V8NtM/svwZYQ7SCIhnPWvG9cvv+F2fG2FbXMmj+HwYYmX7jsPvsPrwB/u17/Z24tbaONf+WYx9a46k+ecpd2fa5bgo4PB08JDaEVH7kSrwKKKKg7gooooAKKKKACiiigAoppbFNV8H/GgNg7fhXwX+zR/yly+In/Xtc/+jIK+8myVOD+NfBv7NS4/4K5fET2t7r/0ZBX13C7X1bHf9en/AOlI/L/EKN8blVv+giP/AKSz6Q+BfHxU8Xf9hGb/ANCNevTjarHqrDBFeQ/Asbvil4u/7CMv4/Oa9k2rg+9fH/3Ufp7UXofEv7VX/BN7UrbxofiB8INQ/sPX43+0SWUTeUsjk5Zo2HQsONvT3rj9F/4KVfFj4JxtpvxC8B3l7c2wCC5jhaEuffaGX/x6vvbU7O5s8zWbbudzRP8Acbtx6fhXOa94tsbmza31zQZJI1OSjRC4U/hg19lh+KozpRw2Z0lWjHRN6TS/xH5hjvDeVLEyxmQYmWFctZRWsG+/L0vufKGof8FnbBdKjaz8CeIJL5vvRyR7Yx9GGT+lc/qv7T/7QX7YMraT4K8Ky+ENJuT5cmozbkaND3DEAr+ANfWV/rngHTVST/hH7VpOwGlrkf8AjtN1T43aleJ9l8O+H5F4ws067UH0FV/rBlVB82Cwa5ujlLmS+WxEuC+IMZ+6zLMpOn1UIqLfzTPMf2cP2SfCv7EHhybxN4huv7c8Y3YIlu3Hzszc+XEDzyerV23wV0XUvHXxAuvFuqBo3fmBD0hXoFH/AAGrPhv4K6l4y1uPVvE11JdSjhFY/Kg68DoK9d0nSLfR7NYIY1WNAAAB0r5nHZhiMZWeIxEryf3W7Ltboff5LkeEynCrB4KCjFfe+7b6t9Wfl5/wWWspP2b/ANv74LfGeGHbYNNFa30g6EwyYfP/AGxk4/3a+8NS1CHTfito3iK3ZZNN8TWiFZF+6x2jBz7gg/jXBf8ABVz9k5v2uf2P9e0eyhE3iDQ1/tbSQBzJLECWjH+8hYY7nbXif/BH39rC3/ao/Zni+GuvXX2fx58PlWKAT/LJNAhKxSY6naBsb6A+lfSYqn9eyWliKesqDcZd+Vu8X6dD5nB1P7Nz6rhqvuwxFpQfRyS95ep+g0UnmIGH3WGadXNeCtbmaz+xXitHfWxKMpHDY7j1FdEG4618e2j7oQjbmuE/aS+Omm/s0/BDxH441aOSbT/DtqbmSOMjfLggbV9zmu380lsHrmvzX/4LpftHXPxEv/Cv7PHgyQ3viLxVqEL6ktudxgXdiOJ8cgnO8j+6BmvUyPLvr2MhSfw7yfRRW7Z4fEWa/wBn4GddfFa0V3k9kfbvwC+Peh/tJ/C3w3488K3EjaL4jAIE0ZR885GOzBgRn2r4e+Pf/Kwp8Of+wPH/AOinr7B+EngK0/Z68HfCz4a6btC6LaJ9pKj7+1MFj7lyTXx/8fUx/wAHCvw5H/UHj/8ART17XDvIsXilS+H2dS3pY8TiT2jwODlW+L2lO/rc+yfBA/4yS8Tf9dx/6CK9qrxXwP8A8nI+J/8ArsP/AEEV7QCcV8ifb6dB1FNDc80qtmgD8xv+Cow/425fs5/9do//AEeK+0Ief2r9Q/69Yf5Gvi//AIKin/jbj+zj7Sx/+jxX2hHz+1fqGP8An1i/ka+qz5/7Fgv+vb/M+N4bsswzDX/l4v8A0lHqmuW1rd2Ulrfwx3FncAo6um5dp6gj0r5L+Nf/AASj0bxLrsmvfDnXLrwfqUjGTy4XP2cMeflxyg9QAc19ibfNyrDIPB461h6l4RmMoksbyWzbdnhshvbB4r5uliJU3eLPWzrhvLs3goY2F7bNaNPye5+d/wActU/aM/Y18PW9xrXjiG80m7uvsdtOsjSyM20t0IGBhTxW58L9G/ah/aO+H1jrGl+MLWz0XVjmKYytFMFDYJ4B44Neif8ABZiNo/gZ4PWRt0n9tAMRxk+RJmuk/Zc8cah4F/4J/wDgW705ljuZGMG4qG4aZ/WvWliP9ljU5Fe/Y/GcHw/KpxXWyR4qqqEKcZJc7vd26nMfDX/gljZQ6+viL4r+LLvxXdRt5rxSSFbfcM8lifmHqMDNeseNPiJHrWkJ4O8B2621gqi2kuIYdkcaDjZGPoOtaun/AAj1r4hWkNxrmqXNxDJ85i3bI8Hn7q4B616L4P8Ahxpvg21EdtCFPHP4V5NTEzq6y+5H7JkfDGXZVBrCQ1e7esn6vcyvgv8AC6H4f6Ag2fvm5OeT+ddwDxTV+RcDtRu/zmsT3h1FFFABRTWNBJFADqKarc9aC1ADqKTdxSGVQT7UANc9OPy7U0t8vHtXM/Fr4u6B8FvB0+ueItSh0+xt+jO3Mjf3VUcsfYA1+fX7Rn/BWDxX49ubiz8Fxr4b0ncVW6fDXko7Njov55rx82zzDYCN6ru+3U+u4X4JzXPJ/wCxw9zrJ6RXz6n6Q3ms2+mr/pFxbwjpl5Aor4X/AGZ3Vv8AgrT8QpfNhaP7NcsGDgqRvgPXpXyiJvif8aZZJ9/jbxBvbzXZWnMbe69iPYVQvPBfjr4W3v2+XTfFOg3Misxu0ilRiowSC689h970rhyzxKlg6VeP1aXLVjy36bo97iD6O9HNK+EdTMacalCop8q66W7+Z+tvgn4e3ngLxprGpTMtxa6lcvcK0XLIGJPzD0Gev6V30d/HcD5Pm+h/Gvy3/Z8/4Ke+O/hPfRwa7cHxbou7Ekc+BdRDplX6k+xNfoV8DPi/4b+Pvhm28SeFdRV7WU4ubcKNyOB91x1U+/cV1ZVn+Gx/uw0l26nkcU8B5nkT5sSuan0nHVP17fM9CaddvPpwKjltoLn/AFkaP9RXhvxG/bt8O/Dr9oyy+Gt1pmpS6tfT28Czqi+SDMoKnrnjitj9o39sPwX+y9Y7dYu2n1W4TfDp1v8AvJnHYkfwg+pwK7JZnhownOUklF2euz7HiU+HcyqVKVOFFt1VzQSWrXf08z0+bQbCQh2t4zj+Lb0qSHTrOD544YlI6MBjFfBHiX/gtPqYvwNK8H2KW3/T5dbZCf8AgJIrvPg7/wAFd/CnjXUobHxZpNx4f87CfalImt1Y8ckElR7kAV5tLijLp1PZxnb5H0eJ8L+I8PR9vLDvl7Jpv7k7/gfZCncvHakL7P8AGuXg8VQwWVrqlrcx32h3eGWeNwwjUrw2fQnvXIftT/tUaP8AsseEtP1jWLS+vLXUpzbxi1Clshd2TkjivcrYiFKn7ST079D43C4DEYnELCUItzbsl1v2sepSFW5yu0E7jn0r8yP+CkX/AATy8Z/AX43r+0B8A1uLfUopTeazpdmOQ/VpUQcPG/8AGnHcg19yw/tYeCrH4O6L441jUk0XTdYtRdW8dw375lYfd2DJY5wOM15RL/wVm8A3vie30nRtJ17WJLuVILcwW+0TO5AAAbB4J5yOnNdGX8W0MqrqXOveWsW90+jX5MxzHw7zHO8POnGhP923aaVuRrdp+VtUePfsv/8ABe74f+PtMt9J+Klhc+C/E0BW3uZTETaO+cFgThlB9CDX0Yf+Cof7PNrEzL8VfDJ2gnHnseB+FZf7Wv7E/wCz/wDEPw9L4q+I3hfQ9NYIHnv4wLW4ckZ2lkwWbPGOTmvzd+IHwR/Zr8O+Jmbwp4S8Va5FDNu36hqUkNrMvoF37se5Fe5js64SpL2uKnOjJ68qs/u6nhcP8H8eY39xl1OFeK055Xjb1eiPo79rT/gvbpFxZSeF/gfpd74m8T6j/o8N+YD5UDNwCiDJdu4yQK1f+CY3/BPHWfg7r2pfHz43Xc15451BHntoLk+ZJYh+TK5/56sOAAAFFeP/AAD/AGq/Dn7Muo+b4M+E3gzT5OnntmS6x6eaRu/HNfS/wz/4K6+H/F06af468Ntpdtc4SSaEfaLY57kHLED1xXj1fEjJVSeX5VeClpKUvikvXoj6n/iA/FsasczzmKquGsYwaai/8N7troz3L4KpefE34pah4suwY4Y222qf3E6Aflz9a+Pfj+WH/Bwr8Oflk/5AyEMEO3/VP3r708Ba3ocnhCPWPCM1vqWiXK+Z/ozBvl6nH09OtYvxn8YeCvhh4HuPitqHh+z1C60uFWjvUso2vkUnaArsNw64xmurK84p4BVK71U4SjfyaWp4GbZBiMwq0sJFNTjUi7W1untbuUfBVvJF+0V4jkaNgskwKnHBAUV7E84CLgFt3SvB/h9+3F4B8c/B+6+IGob9D02xuntQ14i+fI69QgGSx+leE/EP/gs/DbXksfhnws1xAjYSe/lEayL64ByPxFfL4riDA0IqdSpe/Q+8y7gXPMdUlSoUHeDtJvRX7Xelz7sFwu77/PoRUm7C8c+4r4T+HP8AwWYtdQvI4PFHhX7JBI2GnsZfOVF9SCd35CvrLwd8VtL+IPgq38UeF76PVNHmXc6ocsgHXjqGHoea0wOcYLF60J3fY5c+4RzbJmvr9Fxi+u6v2utD4B/4KjPt/wCCuX7OXyv/AK6PopOP346mvtSCFpP2sNQ2qf8Aj1iJP/ATXXNp/g/4ieKNO1K40bTdS1axG60vLizWSW2xz8khBIwfQ1x/7Q/7Tvw//ZXkuNS1yaOTXtQQGKztl8y6mA6HA+6vucCvrsZmDxtGhhoRd6Ubet3e5+a0qdHJpYnH4uqoxqS5rvRJWtb5nsjXAUdz6kDpSfaQR95etfn94o/4LWX8eoMuk+DbRbfOAb262u3/AHySK7L4Qf8ABYfwv4q1CG08XaLdaD5mFN3EfPgjY9jglh164rjlluIUdEeDh/FXhqtW9hCvZ92mo/fsT/8ABaHn4I+E/wDsN/8AtCSr/wAAxn/gnv8AD7/r5T/0c9YX/BX3xJp/i39nfwXqGl3UN5Y3WsK8M0ThkkUwSYIIrd+AR/417/D8d/tK/wDo+SuiomsDFS7s8HKqkZ8f4mpB3Tows1t0PqnwgP8AinLT/rmP5VpBtp/iP9KydHvrfw/4Tt5bqaO3hhgDySSHaqjGeSa+Xvjt/wAFavCPgDVLjT/CtnN4pu4SUM0fy2qsOPvHBYe65FfNY7M8Pg4c+Jkon71k3D2YZtVdPA0nNre2y9Xsj628zHrSLOpB/h74Ir84tS/4LHeNri5jeHw7odvGD80ZkZtw+uM11HgX/gsvcG9VPE3hFY7RiAZbGYuyDuSGIOPpXkU+L8tm+VSt5tOx9liPCXialS9p7FS8lJN/mffSSq6gqd2ehHenA5rzL4RfHjwz8f8Awsuq+DdWhuGiXdLbP8skJPVWQ8j8Riu18M+KI9chkSRfJuLdvLkjPVT6fp+VfQUa9OrBTpyTT6o/PcVha2GqOjiIuMlo01Z3NNn+fHTnHWkWTe3bn3r58+If/BQzwz8Pf2g1+HdzperTapJd29p5sSL5RaYDaeueMgV0Xxm/bR+Hf7Pl5Laa1ritqO7DWcAa4kT2IUHb9DiuV5thIqXPNLldnd7PsekuGs0lKnCnQk3UXNGyese68vM9jV1HtjuaC+ehGfrXzz+zf+39oP7TXxCPh3QtE1pZI7drme4mjUQQIDgZOepJ4FeieAvHkmo/EDXtIz5kOnzYQjnA54/Ct8LiqWIhz0XddzjzHK8TgK31fGRcJdnuj0I8Csfxr400/wAAeE9Q1rVLiO1sNNhaa4lc8Kq9TWwRx1zXwb/wV++PzLJpfw50+YqsqLqOrbT95dxEMR/4EC//AAFa5c4zCGCwkq0t+nqetwjw9UzvNKeAhs3dvtFat/dovM+cv2kP2h/FH7aXxghjt4Lme1knNtoujxZIwT8pYd3fuf4a+wf2Rf8AgmDofw8sLTXPHUUeteIHVZBat/x7WZ/u4/jb3PHtXO/8Elv2ZY9K0KX4katblr7VA0GkKy/8e8AYhpR7ueP91fevsjxd4v0vwN4dudT1i+t9P0+1RpJp5m2qigf54r5fIMnVSP8AaeYazl71nsl3P0njrjCeHn/q5kH7ulTtFuPxSfVL5/NstaZ4dsdDt1js7O1tY0AVVhiVAv0AFO1HQrLVoGjurS3uI2G0rLGHBz6givif40f8Fh7LTb2az8D6HJqSx/KNQvGEcTN6qvJI+uK8/t/+CxHj5biNptB0OSEHcyrKytj/AL5r0qnFWV05ez5r/LQ+ewfhfxPiaf1hU+X/ABOz+49r/bH/AOCaGh/EvSbrXvBEEOi+JIVZzbRjFvfY52kfwtnuOPavjL9lf9ofWP2TPjPDeSi6t9OE32TW9PkBUhAdrtt/56KefwxX3p+x9/wUQ0n9qPxO3hybR73SdeS2e6xkPBLGG25VuvcdQK+Z/wDgrP8AAeHwF8WdP8WWMKx2XixGS7AHAuo+pP1Qqf8AgJrwM7wtFUo5zlrs07u35279z77gvNMZHEVOEOJk2qkbR5tWvK/4p+Rg/tv/ABIh8Nft62/i6zVb6Gxj0/UoMP8ALMBDlfw5FVP2bP2bPEn/AAUB+LOreKPEV9Mmkrcbr++H3pGJ3LBDngBR1PQeleAa74hvfEL2zXEjXE1vbx2cOeSY0GIx/IV+nXhvw8/7NH7K/hTwjpK+Tq+qwr58qD597DdNJ+JavPyPCyzbHVJ1Halfna7t7I97jbHrhbJaFHDJfWXFUoze6jHdr1/U0/DH7JHwP+HkUmmjS9DuJvuy/apjJKDj68V5l+0l/wAEs/C/jLwnNq/w426bqsKFktRJvtrsDnZznDH1zj2r6C+EXwPs9K0CGa9j82eQbju7132l+HLfQOLVdkbfeT196/QMVkeBq0vYumku63P5/wAv4zznCYr63DEScut22peqPz6/4Ji/tHX3hHx3dfCzxNJI9hqRdLKK6bP2SdP9ZDk/wt29CK9N/wCCySbfgj4TQLgf2sVA9P3deJf8FKfAj/AH9rPS/GGjqbOPU/K1aPYMD7RC48z/AL6A/wDHq9b/AOCsHiFPFv7NHgHVo+Yr+9W4H/Aoc/1r4+VSpDLcVltd3lT2fdXVj9ejhcPX4jyvPcHHlhiNWu04xd1/XVM+W/2fPgV4u/bR8eafon264/sfw/bpC91KpMGnQjoiL0Ln3+vNfdXwl/4J4fDb9m3VrbxdNNfXV/4fikuGuryYGKPC8vtAAyBnFc9+yBpy/AX9hbRdQsIY/wC2vE0/nNKP4nlJKsfogxU3/BRHxxcfCP8AYstdHiuJPt3iSSKzlmZvmYH55D+PA/Gu7L8pw+Cy76/X9+aSlr+CPH4h4ozDOc//ALBy2bpUOf2do9VdqUn3urs+PP2qf2jfEP7ZPxj+yWCXV1pP2r7NoumRZ/fDOFkZe7H73sK+hPgT/wAEfra60q3vvH2rXX2qRQx0+xIWOIY+6XIJP4YrL/4I+/A621vWNa8dX1v5z6dINP05iMhWxmRv12/hX6BZOO3vUZBkqxkf7Rx3vOWy8jo4642rZNUWQZA/ZQpJKTW7fX/gve583n/glX8JDpv2f+y77PTzftB8wfj0/SvEv2iv+CRp0LS7rUvh9qF1dNCpc6ZeOD5igdEfAwfbBr9AA2DSMce9e/iOGsvr0+SVJLzR+f5f4iZ9g6yrLESku0ndH5M/sPftVat+y78VodL1KaZPDN/dfZdSsZif9CkJ2lxn7uD1Ffc//BQ1bdP2JfFgs9v2aS2jkiKfdKl1OR9a+VP+Ct/wMt/AfxZ0/wAUWNusNp4qhaO5VBj/AEhO/wCI5r0TUPifJ8U/+CRGoXFxN515plqLCdj3MUij+WK+VwNatho4rKq7vyxk4vy/qx+oZ5g8JmVXK+KMFHl9pUhGol0lzL8rNeZ8jfBD4aeJP2kvGWi+A9MuZFtfOe7AYZgtAf8AWSkd29M19++Bf+Cenwb+D2nWlvri2+p6pjc81/P80h7kKMDH4V5L/wAEldDt/DngP4geNpFja6t8WkZKfNGEXdj8SRX0F8Cvhz/wsN7jxBrLNcXF4/mMW7ewru4TyWi8HHE1lzOXfouh4vipxpjVm1TLcDN06dPdR0bla7bfqcj8Wv8Agm98Mfi74UvJvCdvDpOr8mG5spTsDgZCsCSNp9sV87/8E6fiZrH7P37T178OdbkeKw1i4ksZ7Z/9XHdL9119N47dwc1+jWi+D7Lw7I0lrH5bEc+9fnF+2jpMngT/AIKS6XfWO23lvrvT7tCv94ttatM+wVPBVKOOwy5ZKSTS2dzn4FzjE5xh8XkeYSdSMqUpxctXGUezZ9rfGHx7pv7JHwQ8QeIbtlm+y7zZx/xSu5/dxr9WP5Cvz7/Zy/Zy8U/8FA/i/rGveINQmgsFm8zUb8/N8zdLeHPAAHHHSvZ/+CzXxLkebwf4Qt2+WQyajOo6u3Cxg/ic/hXrnw78OH9l39kbwv4f0xBDr3iCNZZ3X74klUNI/wBQCF/Cv06nL6vhPa/al+R/FubYJ8UcVyyuvd4XCxTkk/ik+j9P0Nbwx+x58DfhtE2m/wBlaLNdKoWU3cxklPuef5CvOf2kf+CW3g/xz4LuNW+HaLpesRRl4YEkLWt4OTtwckEnvmvevg98DbXTdES6vozJcTDcS3UnrmvQ9L8P2+gqfs6+WrffUd64Y4ytCXNe5+gZhwPkmKwv1V0I22VlZrzR+LGtfEHxFZ/DpvAGqGZbPRtUa6jguDmSwlVWR0H+wST+NfpR+wx4NTxr+xd8PbeVlENs5uHH98LK+BXyj/wVm+D8Pw8/aDt9es4VjtfFlqZJQo/5eIsAt+KkflX1B+yr48j+F/8AwTT0/wAQu20aVo91OrH1DyYr0s0xEFgVW6as/IfCnJ8XhuNMTllSTlOEVBN9U2uX8DwT/gp1+2NdeLPF1x8O/Dty1vo2jso1OWB9rXc2P9TuHRUGM+p4rL/ZZ/4JZax8VPD1nrvi67m8P6TdIJbezjULcSJ2LZHy5HbFcF+wN8KG/aI/amsJNaU3UFnI+t6kW581w24A+xkKj6V+s0MQhXZ8oVRwB0Ar8hybL3m1aWYY3WN/dXQ/0M4u4ilwjhaXD+S2jU5U6k7atvt6/gtj5v0X/glR8JdLtdsmn394WH3prj5v0Arg/i9/wR98M6pp0s3gzU7/AEjUFBZIrhxNBIf7p4BHp1r7OK7Tle9O7Yr6ipw7l84crpI/LsLx9xBQre3jipOXZu6+aPxz0DWPG/7C/wAfFaWOXTdY0uQG4tsn7NqcGcH/AHlZejdjX6hfCbxzZ/GrQPDPjbQW/wBB1aE/bIT95CVIKn/aVxg+wrw3/grn8E7fxX8FofGUEONU8LzKJZAOWtpDtYfgxU/hXN/8EaviPLeeHPFnhGaTcmnzpqVsM/dWT5HA/wCBKD+NfOZS55bmcssm7wlrHy/rY/Q+LZYfiXhqPESgliKTUaluvn+Ka9T56/4KBaxdeHP23/Et9asyXmnyWk8LL1R0iVlI96679j7/AIJ7an+09bzeMvGGpahZ6TeSmaKUnF3qDZ+aQswICnnjH0xWH+2z4cXxv/wUM1HR2YRx6tf6daMW/h3hUYfirGvtv4wXlxYaronw/wDD5axs7a0QyrFwdgyqr9MLXJk+TxxuPxFSu/djN3Xd9z2uKOMsTk/DuX0cD7tWpSV5JaqCtovVlfwl8GfBP7DngPXJPCsbnUdadRGs03mSyPjYvPZFyWPvXVfsz+BrjStOm1S83fatQZpXZurknn+daHhz9nvTbSKGS6Xzpkw3PY16FYWUem26wxLtVBgD0r9CoYenRpqjRVkj+fcZjsRiqzxGJm5zlu3uOndYYmZiq7Vz9K/G742eI7z9pL9qnWJ4GaSTxJri2Fpg52Rb/JQj6KM1+s/x18R/8Id8GPFGqeZ5TWel3Mqv/dYRsRX5X/8ABPzw2vin9r3wTHPH5nk3Ml6/s6ROd35mvieL5e2rYfB/zS/4B+z+EdNYTBZhnDWtOFl9zk/yR+sXgTwnZ+A/BOl6TZRpDZ6VaR20KrwFVECj+VfmR/wUQ/a4u/j58TLnw/pt06+E/D87QxRxNhb+ZDh5Wx1APCg8H0NffH7bPxRl+EH7M3inWLeTyrv7Iba2YHG2WUiNPyLZ/CvyP8D+Ebjx74z0rQrU5vNavIrJG77nYKT+Ckn8Kx4wx04Knl1HRtdPwXzOvwdyGjWq1s/x2qpvRvo7Xk/krfez0/8AZd/Ym8WftUTzXGmeTpeh27lJdQuE+R2A+6i9T79ab+1x+yJdfsmaro1ne67a6zcawjyhIUKNEqEAk59d36V+q3wo+Gem/B/wBpfh/SIVt7HTbdIUAGN2BjJ9z3Nfnv8A8Ffte/tH9orRtP2rt03R1KsDyd8rsQfptx75rz824bwuAyz2kr+0dlfpc93hPxGzPPeJ/qtJ8uGXM1GyvZLRt73vYvf8EcfDK6n8cfEmqNHIw03SUhjf+HMsmT+kYr37/grR4Tj1n9lmTUDtEmj6lbzoSOTvJiI/Hfn8K89/4Iu6B5fhzxzqp3bpryC1xj5SEj3Eg/WTH4V6x/wVRnVf2OtbVioL3loI/r5wP8ga9bLcOocOy5usZP8AyPluI8dKp4i03Tfw1Kcfwjf82fmj8I9I/wCEh+LvhWxVPMN1rNqmzGd481CR+lfqZ8TLF9Z/aB0Gxf8A1NpYRlF9yxzX5d/AnWh4e+OPgy/27hba1bMQPQyKv9f0r9UPFRA/aU0+QggTadEd3Y5Zqx4BUXRqye90d3j5KbxuET+FRl990exW0KxWyLjAUYAFOMSk0KcKPpTq/Qj8BPiH/gtJ4fS48BeDNS6SQ309tjHXegP/ALKa8+/bC1BtU/4Jz/BuZ5GkY+WGJPXEBr0v/gtBqsUXwp8I2e8LPJqUkyr6qsfP8/1ry39rK2Np/wAE5Pg4o+YMUYfQwk1+b5x/veMS2UI/of0NwbJyy3JufdVqlvS0j6C+E0Sy/sYfCVWXcrtaBge42mvLf+Czusxpa+A9LU4bNxdbO23Crn9K9U+EhA/Yy+EvorWhJ/4Ca8q/4LPaGhh8B6ltYyfv7YnHG35Wxn8a9rOr/wBhO38q/Q+S4JUP9eYufWpU+/3rHj37L/8AwUM1X9l/4aL4bsfDdnqUa3Mk7TySFSxc56AivRn/AOCzXiNz/wAibpn/AH/b/wCKroP2CP2Mfhr+0B+zvp+ua1oZuNWjuJra4k83bvKOQDjHpivaR/wS++D7N/yLrY/67H/CvFy3A528LTnh6q5baeX4H1fEmdcF080rQx2EnKspNSaeja3a1PnYf8FnvEg/5kzTf+/7f/FUN/wWd8SMP+RN03/v+3/xVfRP/Drn4Pn/AJl4/wDf7/61KP8Aglz8Hwf+ReP/AH+P+FehHLuIVtXj93/APF/t7w//AOgKf3/8E+Hf2r/26L/9rDwrpum6j4dtdKbSbr7TFcRzFiQV2kYyetdh8D9Vlu/+CX3xQtG2eXY34CBWHGSpP+TX1a//AATB+D6Nx4dx65mP+Fcz+1X+z/4U/Z//AGEvH1j4Vs/slpfBLmYbt2996j2rhlkuPpTq43F1IybhJO2nQ9iHGmQ4ihhclymlKC9vTkk9Uve11u2cl/wTkhWz/YZ8YTKP3k19NubucYFfUn7P1usXw5s/l6qK+Xf+CeA/4wN8Wf8AX9Of1Wvqf4Cf8k3sv90V9Zw5/wAi2j6I/L/EL/kpMb/jf6Halcha/N//AIKKrj/goN4S/wB2w/8AR1fpB/Cv1r84P+Ci3/KQfwn/ALth/wCjq4eLP9zh/jh+Z7HhX/yNqn/Xmp+Rj/8ABR69j8V/t+aLpkis0NtHp9tKM/e3ybj+lfY3xXsRrHxx8M6bj9zY2YZR254H8q+N/wBv3TJNG/4KL6TdSELHeNpk6En5Qofac/jX2v42Tb+0TpEjD93NZKUPfgkf1r7zGfwaXofy34fJvO84cl73trfLWx6/awLFbxqq7QqgAelPEYAxS54FLXln60fEv/BafRoG+GXg6+Ef+kxas0AfPIRonJH4lR+VYOtavcaV/wAEbrP7O/l/aLcQSYH3ka5IYfiDXTf8Fpp1/wCFOeEU3Dc2t8Dv/qZK5nW9Ln1P/gjbZ+SoPkQLNJk9EW6JJ/ACtM8v/Yc31tI/P+AFH/iLeu1qV/vifOP7Jn7V11+yd4g1bUrHQ7fVrrVrdLbdPIyeSgYsQMEZz8p/CvdD/wAFnPEkkf8AyJumf9/25/8AHq43/gmj+zp4M/aL8R+KbHxZYrfSafBDPaKH2soLMGJ/HFfXg/4JffB9kz/wjrc9P33/ANavyrIcHm88HF4Sqow6XR/bXHWccI0c5qwzXCTlVVrtPRq2nXsfOo/4LOeJAP8AkTdN/wDAhv8A4qnD/gs94kA/5E3TP+/7f/FV9D/8Ouvg+f8AmXj/AN/v/rUf8Oufg/8A9C8f+/3/ANavaeX8QvevH7v+AfH/ANu+H/8A0BT+/wD4J8nfGr/gqTrXxq+F+teF7rwvptnb63bPbNMsrM0W4Yzgt65q5/wR2uVg/aJ12L5h52hNt+b0mjIJHt0/GvqKX/gmF8H16eHWB+7zN/8AWrsvgn+xt4C+AHii41rwvpJsdQuIDbSSF92UJDEfmoNZYfIszeNp4vF1ItQ+82zDjnhqnkeIyrKKE6ftl111Vtb38j4V/aeXH/BUCFf+o3pQ/wDRdfbGuqP+GrQ38X9nw/zb/Gvif9pzI/4KgW+ev9uaVn/yHX21rv8AydV/3D4v5tXdwzrXxb/6eHi+I3/Ivyr/AK8L80e0CMClCAHNLRX1x+Unk/7bBJ/ZT8fAf9Ae46f7hr89/wDgl7dQ237YOheYyr51ldqgPdzGDgf8BBr9MPjh4Y/4TT4O+KNL8vzWv9LuYkT1YxMB+pFfk1+xf4tj+H/7UvgW+uhtWPUltJWJxs8xWh3fmwr8/wCKP3eZ4StLZNfg7n7x4aQ+scMZphI/FZv74v8AyPuT/gr3qs1j+zDZ20bfu7/W7eKT3ASSQf8AjyrXxT+wnDa3H7X3gP7ZgQ/by6bv+egikK/juxX6Af8ABTD4cXHxF/ZM1xrWLzrnRXi1REA+bZE37zb7+WXr8svDXiC68LeILHVdPmNve6bOl1bzD+CRCGB/HGPxryuLZ+wzenXn8Puv7j6rwppxxnCmJwFKSU5OcX5c0bJvyP3MmnWJSzY2qu7JPAAr8ff22/ixD8Zv2mvFGrWsm+xinFlaMD8rRwrsyP8AeIJHrmvR/i5/wVS8afFD4XHw/b6fa6FdXcHk319DIS7DuI/7hb3zXhPi74Taz4G8BeF9e1G3kt7LxVFNPZq6/NsjYLkn/aBDj2o4oz6OYUVRwqbjFpye1rB4Y8D18hxUsVmrSq1LxpxutVu/vS08j9Dv+CROhHSv2WzdfIf7S1W5nBx0AYIB/wCO1yv/AAWS+I8Fj8OPDfhVJt11qd61/KgPSGJSoJ9tzf8AjtebfsSf8FEPDv7OnwIm8M+ILS+mvbC4llsBbR7kuFkO/aW/hO4sO9eD/Fn4keKP20/j6l19mkk1TXJo7PTbFSSlnEDgD6D77fjXRis6of2PSwdB3nJJW6ruedlnBmO/1wr5zmMfZ0KUpTUns/5bfnf5HnFpfyaXew3duzC4tZUmQqcYZW3r+or9ZX8UxePvBngHx9p7LNaXFrGtwVPQOoIB+jFh7Hivzx/ad+AzfDf4/WfgTR4WvL2Gws7dVHDXVw0RZm/4E24V7F/wTu/bI0/4X21z8N/HbfZ9FuJmWyuJxhbKRjh4ZPRSeQexrm4Xxn9m4ueHxG0na/Zo9PxQyl8Q5PRzLLlzShafL9pwlbVLfS35n6M6Xfx31jDKrblkQEEdDVnzFFc/4Tm0+102P7HqkF5a/eRzIGIB6cjA/SuB/aY/bC8Kfs4eEJ7y+vre91R1ZbTT4XBlnfsD6DPU1+nV8ZRpU3VnJKK8z+acHleLxeIjhsPTcpt2sl/Vj4//AOCwPj0+MPjX4c8I2LebNpdvllTBPn3DAKv127a7D/gpz4TXwD+x98NtHjUKumzRwBV4HEAH+NeW/sP/AAv1j9r79rK48ca+puNP0m7/ALTvpm5SSbnyYV9l6/8AARXun/BZiPy/gl4XUdP7Vb/0XX59aWIweMzCSsqlreiaR++xlTy/Osn4eg1KVC7n/inFtr5fqdJ8OH8r9iD4WnoP9FGfbaak/wCConwzm+In7J8eqWsbSXXhqaK/woy3l42v+hBP0qL4fnP7DXwt/wB21/8AQTX0UdIt/FXgv+z76JZrXULUwTRsPldWGD+YNfYrCLFZYqD2lFfkfkH9qSy3iKWOj9iq5W9Jar5o+Fv+CQPx+tNC1fWPAmoXaxf2iwv9L81uHbGHQe/GffNfoIDjbX5C/tV/s3a9+x78YQ1q11HprT/a9F1SIEeWAcqpP95ehHcV9FfAD/gr1b2emw2PxE024NxboFOoaem5JvqnY/jXy/D+ewwcfqGOfI47N7H6Zx3wRUzmouIshXtIVVeUVun1dvPqt0z70Mm0dqBJnuOOuK+dpv8AgqH8IE0f7QuvTNJs3fZ1gzN9MZrwz9ob/grpHq+l3Gn/AA+025jknQx/2jeLsMQI5Kx/3h7mvo8TxHl9Gn7T2il6an51lvh9n2MrKlHDyin9qSsl82dZ+2X/AMFJNQ+Avx7tdC8O21jrGnaVBnWIpPvGRjlURuzAep713P7Z3jGT4hf8E8tc1p7GXTG1TToLoWsuN0G5lO04r41/Yn/ZT139qn4sw69q0dxL4cs7sXep39z/AMv8gO4IueuT1PavuH/goc1uf2JPFi2vltbraxxxhPuja6gAfTFeJgsTi8VgsTjK2kJJ8q6pWPuc4yzKMrzbLMswKUq8JQ9pJdXzLR+e/orHkf8AwTu/5MK8Vf8AX7cfzWvqf4Cf8k3sf90V8s/8E7z/AMYFeLPX7dcfzWvqX4Cn/i29j/uive4dX/CZRa7I+F8QU/8AWPGN/wA7O08wYFfnD/wUXOP+Cg3hP/dsP/R1fo6Wzivzi/4KLf8AKQfwj/u2H/o6uHixr6pD/HH8z2PCv/kbVdP+XNT8ib/gsX4Nl0X4peD/ABVFExS4tDbM/PMsRDoM+uM19PWXiqP4kfDX4f8Aj6xYTRm2ijuWUZK7gA35OCPapv2+P2epf2hv2d76wsUVtc0s/b9OOM5kQZ2/8CGR+NfJX/BOX9srTfhHbXnw88cN9k0C9mcWs1wflsZScPC5/hBOcH1FffRi8ThE4fFFbH8mSxsOHOM6ssW7UcYk1J7Ka6X8z9I9Mv472xjlVtyyAEGrAmUnrXO+Ep9Pt9KjfT9RtrmzZQ0JEgbC/XPSuJ/aP/az8K/s3+C59Q1TULefUGQ/Y7KJw011JjhQPr1PYV5tOlOb5UtT9Xxmb4PCYd4qvVioJXvc+PP+CynxKh1z4p+G/C9vLubRrWS8ugDwjyfKmffAb8694/ZW8Ar8VP8Agmfp/h9lD/2ro91AgP8AeLyY/Wvzm+JvizXvjD4l1zxvq0chOqXwjnmUbo4JGUlIVPoqrX6WfsI+Mrfwl+xh4AmuRshvC1s7f8890r4NetmuFSwKoPr+p+F+F/EE8fxxic0h7t0nFeSa5X5nxB+wP8Yv+Gb/ANpuzGtN9lsrxpNG1Nm48lt2AzfR1H4c1+tcdwssCtGyurgFSDww9RX5y/8ABTr9jW78GeKrr4ieHLSSfQ9Uffq0UK5a0mxgzAD+FsDPv9azf2Tv+CoGsfBzQ7XQfFlrJ4g0e3wtveRPm4hTpgn+IAdOAfevyDJ8z/smvLLsamo3un0P9BuLeHv9bsLSz7JbSqcqjUhfW6/Vfij9LhLkdvwp2/6V846B/wAFR/hDrGn+dJrdxYtk4jng2ufwzXn/AMXf+CwHhTStLmi8H6bf6vqPKxvMnlQJ6NnncO+Bivq6nEOWwjzutF+S1Z+W4XgPP69b2MMLNPa7Vl97O+/4KE/tgz/sxeD9Kg0NrObxNql4pignO5UgU5kdh1A4wD6muu/Yy/aTuP2pvhQfEVxo0mjyQ3DWbISClwyqCzJ/s5OP06g1+a2g6L46/bx+Po8xmvtU1FwLm52EW+mW4xkY7Ko7ZyTX6a/DrSdN+AkXgv4b6EpMNvCxuJCBu2KjEs3+075NeXkeY4nH4yeIV1R2SfU+q404fyzIcpoZfO08Y3zTafwp9P682fCf7TjZ/wCCn9uT/wBBzS8/+Q6+2NdP/GVQ/wCwfF/Nq+J/2nuP+CoFv/2HNK/9p19sa7/ydXz/ANA+L+bVPDMv3+Lv/OT4j/7hlSt/y4X5o9sopE+7S19gflJDOm9GXsy4r8cv2uvhXdfAj9pHxHpcYa3iW8Oo6bJjkRO3mIQf9k5H/Aa/Y9hkV8q/8FNv2TZvjh4Et/E2g2vm+JPDiMTGoy17b9Wj/wB5SNw/EdDXyvFmVyxWE5qa96Dv+Gp+m+FfEkMqzZU8Q/3Vb3ZdvJv8vmerfssfGux/aX+Amka1+5kmmt/smp25GfLmUbHUj0PUezCvlr4/f8EiLy78T3GpeAdVsrfT7iQudOu9w8jd1CEA/L9cV8+fseftdax+yn45knjjlvfD+ptt1GxJ5yuAJFH8MijIK/pwK/T/AOC/7RfhL47eHItS8O6ta3Xmpl4C22eM+jKeR+NcOCr4DOsNGlin+8ikn/wD3c8wGd8F5nUxWUt/V6j0drxte9penR/ifKf7Pf8AwSHXSdatdT+IGqW2owW/zjTbQMY2OejswBZf9nFfRP7U37Jeh/tNfCeDQX26ZdaWwk0q5jTAs2C7QAP7hXgrXr6ICo/iX61R1zxHpvhqye41C7t7OCMZaSaQIg/E8V71HJcFh6EqEYrle7fX1Z8Hj+Ms6x+Op46pVbqQd420S9F+D77H5yW3/BH34gPrzQTa5oKWO4j7Qu9jjt8u2vqz9lL9ijwf+yreRyLcJqniq/Qq93cY83bjJVB/CtdN4g+N1j8Tfg9q+t+Btaiuk0m6NtLPDhlLIQrKCcjjcDn2qX4IfDiSS7h8SahfT315IDsMjbtuVwcVz5bw/l9B+2oRUt9f8ju4i4+z7MKcsHjanL0lFLlbXn/kfGX7UY2/8FYfD/p/aOmf+izXsX7ZP/BMez+NOvXHijwjcQaPrd0d95bSL/ot43dsDo3qcV49+1Idn/BV/wAO/wDYR0z/ANFmvsLxp4q1qw+PEWn6feeVbz2MbmJuUY5OcjtwM8V5eV5bQxc8VTrr/l4/kfUcRcQY3KKeU4vL52l7CKfZ9012PgBv2I/j54EZrPT7TU44JPl/0LUAItv/AH0K634Tf8EofiB8QNfW68ZX8Oi2e4ecxm8+6lUdh1H61993HiHxPp6Kn2OxuSOCwVl5z069h6etc3rMXjrxb5luk8em2znBNsuGx9Tk10Q4NwfMpVG5JdG9DhxHi9nVSL9nGEJNWclHX/gHNzR+H/2dPAdn8P8AwJBHHeMuyWSPloyfvO7Dq7VQ/b4/Zi8RftPfCzw/peg3NjBdafdC4la7JAIMe04wDzzXo/w4+A9n4Ol+1XB+03TNvdnO5t3XJJrqfF2l6jdWqrplw9q/GcBSuPxFfRVsBRq4Z4Rq0GrWR+f4HOsXhcwWaQlzVU73eurvr+J4dqHw/uvhD+zJ8P8AwrqMkMupaXLBbyGM/K5RTuK1754aTPh+17ZjXHtXnd98G9U8X+J7O+1jUJLiOzP7tGACr+AFepWlqtpbRx/3BgVvRoxpQUI7Lb7jhxOIlXqyr1Pik236vc5j4j+BNA+JvhyfQvE9ha32n3Q2lJl3K3vn+E18hfFP/gjnY6jqT3Hg7xJLYW0jblt7xfNSMf7LDJP0Ir7ivNPjvoGjdVZW65rmr3wPfWbhtO1C4t1znYPmH65rix2UYTG64iCb79T2sj4szXKHfAVXFPdbr7mfn1af8Ef/AIiT6n5cmsaDHa78eb85O3/d216x8Iv+CRXhvwhOmo+OtefWEt23m2j/AHFqf948Fh7EV9NXOg+Lt7CPVpFXt+7T/CsKb4F6t4pnVta1i8uI+coXwv4gYFebh+FMvpS50m/V3Ppcd4qcRYql7F1uSP8AdST+8xPEnxFs9J0WPwf8PLGK3t4l8hpoI9kUCdMIO5q58c/gHqnxJ/ZDvvAumTQRandWqQpJcEhdwYMScA9a9G8G/C3TPBkKrBCpYdDjmtPxJaXVxpzLZStDN2YAH+de5Ww1OpSdFq0WmrLsz4TC46rQxMMZF+/GXNd66p3Vz5r/AGe/gBrH7L37IviTQvEdxZTXU08s6tbElGDkYHIFe4fAdDH8ObFWGPkFc94r+FHiDx7Hb2+qalJJZxuHaPAUNjpnAFejeGdBj8OaNDaR8pCoXPrU4PCQw1GNGnslYvNcyrZhi6mNxHxzd36l7oMd6+Rf2uP2HvF3xv8A2qdA8aaVdabFpemraiVJWbzT5cm44GMdPevrnIcdfY1y3inSdeuL3dp99NDEf4SqED8xUY7AUsXD2dXa6fzR0ZLneJyqu8RhLczi46q+ktzA174j3Hhr442els3mWN1YqJ416xPn5W/LivEP2xP+CZGk/HXVrjxN4RuLfQ/EFy3m3MTLi1vm/wBoLnDe4Fe3eBfgxcaf4yuNb1a5kvLyY5Z3xxjoB2rtNV0S4DtLYTPBL1KnlG/P+lelRrToy56e/XsfHZ9w/gc4w7wuPhzQ3XdPumfluf2GPj74CkNrplrqSwNmMGx1MLFt+m4fyrqPhR/wSj+I3xG8Qrc+ML6HRbPIE0jz/aLqZPRcZA/Ov0Eu9e8T6ZCqrZWc7ZJLbG5/I1zet/8ACd+LDNbxzQ6bbv8AKTbr82O/JzXfLNKjV0kmfndHwZyaNROtOc4J35XJ2PHf2nf+Cen/AAkv7PvhrwX8PRY6auk6l9snluCf9IPlMjSMQDucse/TFb2k/Cm/+BX7Ivg3wnq81vJqmn3qIzQ/cdvMd+PwIr1rw58P9e8KeF47O31e4Z0bIMuHwp9yM5zWVqXwc1jxp4is7zWb6S4jtCGSNgAqnvwMc1x1MVUnTVKWx9xl/COXYLHvMMNHlk4qNltZeR2ekww3HhC3t76ETWtxbiKRZF3DaV5BHoa+ZPjf/wAEm/B/xGuZtT8J6g/hu6my7QRqJbVmPP3f4fwFfW1tYLBZxwY+VV2/gBWJq3gpneWWxuprGZwclDx04OOmfwrysdl2HxcPZ143XfqfoGT8QZhlNR1MvquF+2zXZrZn576v/wAEfviFbX22z1vQbqHA+dt6Y9eNvNdp8O/+CNkkV9HN4s8VKbSMBngsY8Z9QXOCB7ivr670HxRHIqw6pMsef4lTI6DrisPVPhb4m8Vuy6hrV19nYDMcbBf1XFeNR4Ry2E+fkv5N6H2WJ8XOJK1L2KqqPmopP7zntFbwT+y14WHhvwJpVvNqLjBEXzMzdN8kn8Rz2zW38DPhzfHWpvE2tSNNqd0xf5x90EdB7V0Pgv4FaX4SPmeX502csWG7J65/X9K7lLdI4gqrtCjgV9FTpQpwUIJJLsfnWIxFWvUdWtNylLVt6tnxb8aP2BfGnj39tOHx9Z3ukpo66lY3nlyu4lCQhd44XHJHHNe16ywn/atwmH8vT4lbB4U5bOffBFd14m0XxBcXzf2fqE0MLA4G1CFP4isj4bfBmXw94kutW1C4a5vbpizux5JPH+cVy4PL6OHnOdP7Tu/U9XNeIMVmNKjSxNrUY8kbLoejR/cFOoHSiu48MjB49qr3EaxO0jHcrD5lx19/y4/KrADEfhzR5fNFtNBHxp+2V/wTKs/ife3PinwC1tputXGZbmyYbbe9Y5JcY+65z6HNfDniv4XeN/gT4hZdQ0vXfD15Cf8AXQhgCc44Zciv2avtNuLRWms2WNi2ShGVb/D8K5/W/E9ncwNFrmhmdVPAeJZo39wDn9a+RzThGhiajr0XyS8v6/I/V+GfFnMcuoLBYyCr01tzb27X7ep+TcX7WPxUjXYvjTxV/wB9Nn+VUpb34lfH/U/JebxV4mmnJTZ8/lsR9cAfnX6tTf8ACuYHLN4f0vevU/2Uv/xNVF+MGi+HbLy/D/huVvMyQkNusMYPYsMD9K82PBteTtUxEuXtd/q7H0VTxiwMI82Ey6EZ92o/ornjf7AX7O/i74CfA/xpb+Mo7exs9ZR7qG0D7ntwYNr7uAASQDgZr3b9mnWX1L4doHBHknaMnNcrf6Z4w+M3+j37LpuluSWt4eAw44J6kdeK9V8CeDIfBXh6OyhUYUfN719pgcHHC4eGHg9In43nWbVszxtTH10lKb1tsfnt+1LIv/D13w8rMgb+0dM4zzyhAr6K/a78f6l8J/FGpeINKMS6hp9lZeQZF3LmS5SNgR/uk49a9E8WfAH4Z6/8U4fGWrWWlv4ks5I5lu5LjbIjRjCEDPavDf22NWh+JPg/xxeWfmNp0EFjZeen8Q+1w5YH1BY4NceV5bLDVa8pu/tJOR7XE3EFLMcPg6NGLj7GmoO/V9z239p/4w6z8JtD8A3GkfZfN8R+LNO0W686PcDBOshfbzw3yjn2rqPC/wC0J4L8a+Nbrw5pPiLTr3XLPd51mjESLtOG6gA4PXBNfL37T37OOm/BK1+GHiCPxF4v1Yp420tWt9Q1SW6i2hJnJWNmI3fLgY9T61wvxP8AGWteMPFXw18baO3hDR7zxHc6rJouk6VBFHqCqbSYBppFG5nbAypJG8AYzXsHyJ9afFH9pnw+NI8QaP4Z8ZeG7Xxlp8LiIXjM1vaurDJkwMcDORmt4/tEeDtI8V2PhfUvE2kp4muUjX7KGK+Y7KCAOMc5yATnmvl/xFpnw+P/AAS3vrrQY9DbVLjw+Fmumji/tCW58xPP3t98vvzuzXLftCeM7r4oeAtW1a0i8J+H9O8H+JNK0kb7aP8AtjVrqOWBGkMuMqvzZXaQxA5oA+9rrxRYWWv2uly3UKajeRNNBblvnkRMBmA9BkVhat8evBug/aftviLTLb7HcS2k2+TGyWMbnT/eUHJArzP4qa1Z+GP2xvhTfalcRWdveaNqdlFNM4RZJiIX8vJ77QTXzp4J0vQfit+0lZx3EdprWj3nxY1q4QYWWCcLaIVJ9Rnt0NAH2Wv7SngWX4fN4rXxLpreHVl+ztfKzGNZP7hGN272xW14d+Knh7xZ4JPiTTdWs7zQVjeVr2N8xBUHzE9xjuDzXx/eeJYPhz8fPiJ4I0HR/DsTeKvFFlBp8ep2qHStNk+xiSScxkbdxH3QByc4qb9nqF7H9mH9oyxe/wBP1GOx1bVEWXT41itGPkZYxxrhVXdk4UAUAfUXhr9pHwL4x8RS6VpfijSb7UILc3bwQy7m8oDJccYIA5OCa10+Kfh9/DmnayurWZ0rVpUhs7nf+7uHc4RVPqSCK+NPEfwx0TwL8D/2d7rw7otjpmqXsn2UzQRCOe5E9lJuR2HzOGOOCTVWXxjpqfsEfBfRbO/s5Nct/EtnBHZCRWkSeCWbcrDtsbbnNAH2BdftG+B7Pxnc+HZPE2mLrVmrvNaeYd6BBlu2CQOSAc+1a158UfD+m+HLHWJ9Ws49L1JkS1uS+UuCwJUL65wfyr4j+CXwT1742/DXQFn1T4b6W9r4ke71G4ETDWxcCZxPC7nkO6krjPK47U7wx4n/AOEf1K18HataXF5Y/AObWNevbYIWWaFCRYR4I+YEOfXgUAfZPw7+Pvg/4s6jeWfhvX7DVrvT+biGFjvjGcZIYDjPGRmk8b/H3wd8OfENvpOueIdP03VLwDyLaRiZHycDgA4yfWvlP4P32on9uT4YapeXPhK1k8U+GL+8bTNAt44ltIGCvGsrKMyYJ6knnNd5+zBb+Gdc+LPxam8ZQaLP40tfEzgrqaRNLb2YRfsxh38iMjuvGfegD1z4J/EafX9Dis9c8QaDq2v3dxdvANNyI3gjlKgYP8SDAb3rU134++DfDnh281e+1/TrbTdPuzY3Fw7nbFODgxYxkt7AV8d/sS69p/h34p/D6a8u7WztrpfFMEMkjqkbSi+DFQx4ztGevas34Ban4d8YftJaXJrk9lqHhO+8V+IWsGuWD2N1fgIE3A/Izbd20H8KAPob4T/tW6Tc+JfiZquveJ7D/hEtL1a1ttJuuTGqSQbiowCTlvavUL34/wDg2x+HUfi6bxFpsfhuUgJfmT905J27QMZLZ7YzXyD4e8aaT4c+KPjzw34P03wncReMPHcNhZTahAkmmacyWheSRExtLZBCgDGc1zXwD0zTovjr4Z0bxRe6Xq3haHxtrkasY0j0me/FshiCxYEY53bRjqD3oA+oPh7+1Lo1z4u+Imq6t4k0/wD4RDSbjT00665MaCaJyRwMliw6Y4r0OH4/+C5fB9pr6+JNL/sW+D/Z7sy4jlKKWYDjOQoJx1r5Nf4geH/A3xZ8deHvB2m+FbxPGPjOw0q1a/hSXTNPufsrvLLtwV+XbhQvG7PFcd4Q8LWN/wDEHwnoOoXOk69YQ/GGdJPskCpYzt/ZpZ1WIDYE3DBUDBZTQB9c+P8A44w+OvhdZ33w98TaAra1qkOmRanOxMVuzOA+ExlpMcBTjr1rpvB/7QPg7xl4wn8M6X4k0/UNesAyTWqkrJuTh+owcEHOCcV8efHXRdP+Hfxf8T2em28Nlpdv498NaiLW3QLHG7rIZNiDgZ8sHgdRTm8X33jr47/A3xqreE9It/FHiq4+x6VpdtEl9FalZlaS4kUbmLFfmGdu5h3oA+w/il8dfCvwmaG11/xBp+k32oRsbSOdzukIHoAcDOOTgV5D+xz8c/FHxB8H+GdW8Q69ocumXGkahdXiSnbeM8V4UWbd90QrHwTnuKy9N0zwvq/7V3xobx9b6PNew6bZDS11VUaNdMELlmiEnGfOzuK/7Oea+W9IMq/s5aB/ZYm+wnwJfLdeQCrDTzrsQmxjnHl9fbNAH3tdftP+EPHPhfVofCPjDw/NrC2twbV5nYxxyJGzl3GM7Fxkkds1y/wv/bj8O638SrjwXq+taM2qaVo1jdTX0DuIL+5kiLSiNdvCDbuBJ6N7V4X+1jF8OYPiZ4ZXwOnh5Zk8D+IGnOkeWAtv/Z5Ee/Zxn03c4zVX4XeJvDvwaufFHia+0HR9Rm0n4UeHdRgtZ4Ig9y/2VlcqSM4OQGYfjQB79+0F+1Vo+pfst+PvEXw88S2N9qnhzT2kEsBO62c/dYggHB9envXt3hi6kvvDmn3ErFpJrWN3JGMkqCTX53/GfSrrSn+I0l7f+F5LzVvhLNdy6foNrHb2tgjXtsYlYIBv4ZgGbJxnHBr9DPBv/In6TyW/0OHk9/kFAGjtpcUUUAFFFFABRRRQAVDNYw3P+sjVvqKKKAKcnhSwkY5toufapIPDVjbAbLeJcei0UUAW4oVhQBVA+gp9FFAGHrXw/wBP124aSeMMzdeBVG++Dnh/VPD91pd5ptvdafeFTNbuvyvtcMucEdCAfwoooAt+Kvh1o/jeHTY9W02C+j0e8j1C0WT7sFxGCI5F56jcRz+VcxoH7KPw98L+Jl1fT/CunWuoR3hv45l3ExzndllBJC53McDAyelFFAFW6/Y3+Gt7rWpahJ4Q037RrCut2Qzqk2/G87A20E7R0Aq1q37Kfw/1vxPc6xdeFdPuNQukRJZWLYk2bdp2527hsXnGflHNFFAGx8Tfgj4Y+MWh2mneJdFs9WtLGYTW6SllMLAYDKynI+Xg881X8P8A7PPg3wlqFrdab4c0+znsbt763eIFfKmdBG0g56lAAfpRRQBD4t/Zp8D+Ojqzat4csbxtcuIru+ZiytPNEu2OTcGyGVeOCKueHfgV4T8J+GdU0XTdAsbPStcBF/bR5C3IKbDu55yvBOaKKALFx8GvDN1pvh+zk0a1a18KypPpMZJxYuo2qU57A45zXOxfsj/DuLxTcawvhHSxqN1eLqEkw3ZNwrbhIBnAOeTgDNFFAFqT9mDwK/xK/wCEu/4RuzHiAzfaTdK7rmUDHmFQdpb3IrbtfhP4ftfEGuaquj2a6h4kiWDU5tu5rxFG0K/bGCemKKKAMD4f/sq+AfhbrVtqWgeF9P03ULMSCCdGdpIRJw6qWJwpHbpVjxz+zX4J+JXjG18Qa14ds7zWLMKI7osyOQpyobaRuAPPOaKKAK+tfsp/D7xB4Ws9Fu/Cuny6Xp98+o28GWUQ3Dks8gIIILEnIzg03U/2U/h/qnhCXQZPCem/2RcXg1B7ePcgW4AA81SDkNgDoRRRQAXv7KHw91Dw5No8vhTTW0+aaK4aIbk/eRAhHBB3BgCRnPPenah+yx4B1PwfceH5vCunNpF1cJdyQDcuZlAUSAg5D4HUEZ70UUAR3P7JPw7u/C9zor+E9M/s26khmliG5d8kWRG+QdwZcnkHJ75q7oP7NvgnwxeWc9j4bsbeaxvRqUDrnMdyI/K87r9/YSue9FFAFzXfgX4U8UazNqGoaDZ3V5cXdtfSSPnLTW+7yX69U3HHbmsjQv2T/h74a8UprVj4V06DU47z7fHON+6KbJJdRuwuSScAAc9KKKAND4j/ALPng/4t67p+p+IvD9nqmoaXkW08hYMinBK/KRuUkdGyKp6j8FdE8DeHLy78MeFdJm1a1065tbK3dvKhkSVvMeEk5Co7gE8dfSiigDxn4K/sxt4v+KMOsah4E8P+CfCOl6XeWB0u1uheS6rcXiqk5dxjbGqZCr6t2r2rU/2Y/Aut6hpN1eeGdOmm0PTf7IsiQ2IrTaFEOM4ZQowA2aKKAKOkfsi/DvQNCudMtfCWnrZXlnJp86FnZprd9paJiWyVJReM8beMV6Ra2yWdrHDGoSOJQiqOigDAFFFAElFFFABRRRQB/9k=';
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