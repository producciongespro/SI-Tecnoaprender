$(document).ready(function () {
	
		cargaDatosPCD();
	// let consSelect = "SELECT * FROM `cr_provincias` ",
	// 		provincia ='', canton='';
	// 		cargaJson( consSelect, cargaProvincias, "../server/consultas_generales.php");
	
});	

function cargaDatosPCD(){
		 let consSelect = "SELECT * FROM `cr_provincias`",
		 		  arregloCantones=[], arregloDistritos=[];
		 cargaJson( consSelect, cargaProvincias, "../server/consultas_generales.php");
		 consSelect = "SELECT * FROM `cr_cantones`";		 
		 cargaJson( consSelect, function (data){arregloCantones = data; console.log("arregloCantones", arregloCantones);}, "../server/consultas_generales.php");
		 consSelect = "SELECT * FROM `cr_distritos`"; 		 
		 cargaJson( consSelect, function (data){arregloDistritos = data; console.log("arregloDistritos", arregloDistritos);}, "../server/consultas_generales.php");

		 $( "#form_provincia" ).change(function() {
			console.log($( "#form_provincia option:selected" ).val());
			provincia = $( "#form_provincia option:selected" ).val();
			cargaCantones(provincia, arregloCantones);
		});	
	
		$( "#form_canton" ).change(function() {
			// alert( "Handler for .change() called." );
			console.log($( "#form_canton option:selected" ).val());
			canton = $( "#form_canton option:selected" ).val();
			cargaDistritos(provincia, canton,arregloDistritos);
		});	

};

function cargaProvincias(array) {
		console.log("cargaProvincias", array);
		var textSelect = "";
		var dropdown;
			dropdown = $('#form_provincia');
			dropdown.empty();
			dropdown.append("<option value ='0' selected>--- Seleccione una opción ---</option>");
			// for (let index = 0; index < array.length; index++) {
			for(key in array) {	
				// if (idAsesor == array[index].id  )    {
					
				//  textSelect = "<option  value='"+ array[key].id_provincia  +"' selected name = '" +  array[key].provincia  + "'   >" +  array[key].provincia  + "</option>";  
				// }
				// else {
				  textSelect = "<option  value='"+ array[key].id_provincia  +"' name = '" +  array[key].provincia  + "'   >" +  array[key].provincia  + "</option>";  
				// }
				dropdown.append(textSelect);
			};     
			$( "#form_provincia" ).change(function() {
				console.log("Provincia id:",$( "#form_provincia option:selected" ).val());
			});	};

	function cargaCantones(p, array) {
		let cantones = array,
				 dropdown = $('#form_canton'),
				 arrayTmp = [];
		
		cantones = $.map( cantones, function( n, index ) {
			 return  n.id_provincia == p  ? n : null;
		});
		dropdown.empty();
		var tmpOption = $("<option value ='0' selected>--- Seleccione una opción ---</option>");
				arrayTmp.push(tmpOption);
		for(key in cantones) {
			 		// if (idAsesor == cantones[index].id  )    {	
						// tmpOption = $("<option  value='"+ cantones[key].id_canton  +"' selected name = '" +  cantones[key].canton  + "'   >" +  cantones[key].canton  + "</option>");  
		// 		// }
			tmpOption = $("<option  value='"+ cantones[key].id_canton  +"' name = '" +  cantones[key].canton  + "'   >" +  cantones[key].canton  + "</option>");  
			arrayTmp.push(tmpOption);
		}
		dropdown.append(arrayTmp);

		console.log("dimensions", cantones);
		console.log("arrayTMP", arrayTmp);   
	};

 function cargaDistritos(p,c,array) {

		let distritos = array;
		dropdown = $('#form_distrito'),
		arrayTmp = [];

		distritos = $.map( distritos, function( n, index ) {
		 return  n.id_provincia == p && n.id_canton == c  ? n : null;
		});
		
		dropdown.empty();
		var tmpOption = $("<option value ='0' selected>--- Seleccione una opción ---</option>");
	 	arrayTmp.push(tmpOption);
		for(key in distritos) {
			// if (idAsesor == cantones[index].id  )    {	
			 // tmpOption = $("<option  value='"+ distritos[key].id_distrito +"' selected name = '" +  distritos[key].distrito  + "'   >" +  distritos[key].distrito  + "</option>");  
// 		// }
			tmpOption = $("<option  value='"+ distritos[key].id_distrito  +"' name = '" +  distritos[key].distrito  + "'   >" +  distritos[key].distrito  + "</option>");  
			arrayTmp.push(tmpOption);
		}

		dropdown.append(arrayTmp); 

		console.log("distritos", distritos);
		console.log("arrayTMP en distritos", arrayTmp);  
};

function cargaJson(c, mCallBack, url) {
	// url= "../server/consultas_generales.php";
	const data = new FormData();
	data.append('consulta', c);
	console.log("consulta", c);
	
	fetch( url, {
	 method: 'POST',
	 body: data
	})  
	.then( r => r.json() )
	.then( data => { mCallBack(data); })
	.catch( e => {console.error( 'Error de carga' ); }) 
}    
