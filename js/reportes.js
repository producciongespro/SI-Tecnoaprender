var checked = [];
var titulos;
var filas=[];
var canColumnas=[];
var buscadores;

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    saveSession(); 
});


function realizaProceso(){
  if (checked.length==0){
    $("#alerta").css("visibility","visible");
     // alert("Debe seleccionar al menos un elemento para el informe")
  }
  else{
   if ( $("#tblReportes").length > 0 ) {
       var table = $('#myTable').DataTable();
       table.destroy();
       
       $("#resultado").empty();
       console.log("la tabla existe");

   }
   
   fetch('../server/consultas_generales2.php')
       .then(function(response) {
          
           return response.json();
       })
       .then(function(myJson) {
           dibujarTabla (myJson, '#resultado', checked);
           dibujarBotones();
           $('#tblReportes tfoot th').each( function () {
               var title = $(this).text();
               $(this).html( '<input type="text" placeholder="Buscar '+title+'" />' );
           } );
           var objetoDataTables_personal = $('#tblReportes').DataTable({
               "iDisplayLength":			10,
               "retrieve": true
  
});

objetoDataTables_personal.columns().every( function () {
var that = this;

$( 'input', this.footer() ).on( 'keyup change', function () {
   if ( that.search() !== this.value ) {
       that
           .search( this.value )
           .draw();
   }
} );
} );



$('label').addClass('form-inline');
$('select, input[type="search"]').addClass('form-control input-sm');

/* Comprobamos si se activa o desactiva el botón de búsqueda personalizada y el de reseteo. */
$('#valor_a_comparar').on('keyup keypress change', function(){
   $('#boton_buscar').prop('disabled', ($('#valor_a_comparar').prop('value') == ""));
   $('#boton_resetear').prop('disabled', ($('#id_campo').prop('value') == "0" && $('#id_operacion').prop('value') == "0" && $('#id_campo').prop('value') == ""));
});
$('#id_campo, #id_operacion').on('change', function(){
   $('#boton_resetear').prop('disabled', ($('#id_campo').prop('value') == "0" && $('#id_operacion').prop('value') == "0" && $('#valor_a_comparar').prop('value') == ""));
});



       });
       limpiarVariables();
}  }

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

function limpiarVariables() {
       filas.length=0;
       canColumnas.length=0;
       var titulos="";
       console.log("Variables limpiadas");
       
} 

function dibujarBotones() {
console.log("dibujando botones");
   
$('#tblReportes').DataTable( {
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
} );
}

function MaysPrimera(string){
       switch (string) {
           case "nombre":
               string = "proyecto"
               break;
               case "institucion":
               string = "institución"
               break;
               case "canton":
               string = "cantón"
               break;
               case "direccion_regional":
               string = "regional"
               break;
               case "estado":
               string = "Estado conexión"
               break;
                case "valor":
               string = "Internet"
               break;
               case "cod_pres":
               string = "Código"
               break;
               case "matricula_m":
                string = "Mujeres"
                break;
                case "matricula_h":
                string = "Hombres"
                break;
                case "cantidad_docentes":
                string = "Docentes"
                break;
                case "cantidad_grupos":
                string = "Grupos"
                break;
           default:
               break;
       }
       return string.charAt(0).toUpperCase() + string.slice(1);
}

function dibujaTitulos(array) {
titulos= "<th scope='col'>#</th>";
for (let index = 0; index < array.length; index++) {
   titulos=titulos+"<th class='text-center' scope='col'>"+ MaysPrimera(array[index])+"</th>"

}
}

function cambiarTextos(string) {
switch (string) {
   case "true":
       string = "Sí"
       break;
       case "false":
       string = "No"
       break;
   default:
       break;
}
return string;
}


function dibujaBuscadores(array) {
buscadores= "<th scope='col' style='visibility:hidden'>#</th>";
 for (let index = 0; index < array.length; index++) {
   buscadores=buscadores+"<th>"+ MaysPrimera(array[index])+"</th>"

}
}

function cantidadColumnas(array) {
for (let index = 1; index <= array.length; index++) {
 canColumnas.push(index);       
} 
console.log(canColumnas);      
}

function dibujaDatos(array, columnas) {
var fila=""
for (let i = 0; i < array.length; i++) {
let fowNumb = i + 1;
fila = "<th scope='row'>" + fowNumb + "</th>"
for (let index = 0; index < columnas.length; index++) {
   
  fila=fila+  "<td class='text-center'>" +
           cambiarTextos(array[i][columnas[index]]) +
         "</td>"
  
}
filas.push(fila);  
}
cantidadColumnas(columnas);
}
function cargaSelect(valores) {
for (let index = 0; index < valores.length; index++) {
   
$("#id_campo").append('<option value='+index+'>'+MaysPrimera(valores[index])+'</option>');
}
}


function dibujarTabla (array, visor,columnas) {
cargaSelect(columnas);
$(visor).empty();
dibujaTitulos(columnas);
dibujaBuscadores(columnas);
dibujaDatos(array,columnas);

var limite = array.length, row, 
htmlTable = $(
"<table  id='tblReportes' class='display nowrap'>" +
"<thead>" +
"<tr >" +
titulos +
"</tr>" +
"</thead>" + "<tfoot>" +
   "<tr>" +
       buscadores +
   "</tr>" +
" </tfoot>"+
"</table>"
), tBody = $("<tbody></tbody>");

   for (let index = 0; index < limite; index++) {
      
     row = $( 
       "<tr>" +
           filas[index] +
        "</tr>"
   );
     $(tBody).append(row);
 }
$(htmlTable).append(tBody);
$(visor).html(htmlTable);

checked.length=0;
}

function crearArreglo(){

$("input[name='columnas']:checked").each(function ()
{
//Mediante la función push agregamos al arreglo los values de los checkbox
checked.push(($(this).attr("value")));
});

   realizaProceso();

}