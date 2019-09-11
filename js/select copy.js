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
				// alert( "Handler for .change() called." );
				console.log("Provincia id:",$( "#form_provincia option:selected" ).val());
			});
			// console.log($( "#form_provincia option:selected" ).val());
			// let consSelect = "SELECT * FROM `cr_canton` ";
			// enviarFormDataAjax2( empaquetarConsulta(consSelect), cargaProvincias, "../server/consultas_generales.php")
	};

	// function selectCantones(p) {
	// 	console.log("provincia en cantones", p);
		
	// 	let consSelect = "SELECT * FROM `cr_cantones` WHERE `id_provincia`= '"+ p+"'";
	// 	console.log("consulta cantones", consSelect);
		
	// 	cargaJson( consSelect, cargaCantones, "../server/consultas_generales.php");
	// }

	function cargaCantones(p, array) {
		let cantones = array,
				 dropdown = $('#form_canton'),
				 arrayTmp = [];
		
		cantones = $.map( cantones, function( n, index ) {
			 return  n.id_provincia == p  ? n : null;
		});
		for(key in cantones) {
			let tmpOption = $("<option  value='"+ array[key].id_canton  +"' selected name = '" +  array[key].canton  + "'   >" +  array[key].canton  + "</option>");  
			arrayTmp.push(tmpOption);
		}


		console.log("dimensions", cantones);
		console.log("arrayTMP", arrayTmp);


		// var textSelect = "";
		
		// 	dropdown.empty();
		// 	dropdown.append("<option value ='0' selected>--- Seleccione una opción ---</option>");
		// 	// for (let index = 0; index < array.length; index++) {
		// 	for(key in cantones) {	
		// 		// if
		// 		// if (idAsesor == array[index].id  )    {
					
		// 		//  textSelect = "<option  value='"+ array[key].id_provincia  +"' selected name = '" +  array[key].provincia  + "'   >" +  array[key].provincia  + "</option>";  
		// 		// }
		// 		// else {
		// 		  textSelect = "<option  value='"+ array[key].id_canton  +"' name = '" +  array[key].canton  + "'   >" +  array[key].canton  + "</option>";  
		// 		// }
		// 		dropdown.append(textSelect);
		// 	};     
	};

	// function selectDistritos(p,c) {
	// 	// console.log(" en cantones", p);
		
	// 	let consSelect = "SELECT * FROM `cr_distritos` WHERE `id_provincia`= '"+p+"' AND `id_canton`='"+c+"'";
	// 	console.log("consulta distritos", consSelect);
		
	// 	// cargarJson( consSelect, cargaDistritos, "../server/consultas_generales.php");
	// 	cargaJson( consSelect, cargaDistritos, "../server/consultas_generales.php");
	// }

	function cargaDistritos(p,c) {
		var dimensions = arregloDistritos;
		dimensions = $.map( dimensions, function( n, index ) {
		// return value * 2;
		// return  value.id_provincia = '4' 
		 return  n.id_provincia == '4'  ? n : null;
});
//   $.map( arregloDistritos, function( n,i ) {
// 	 return  n.id_provincia = '4'  ? n.distrito : null;
console.log("dimensions", dimensions);
		console.log("cargadistritos");
		// let array = JSON.parse(arreglo);
		
		 console.log("distritos", array);
		
		var textSelect = "";
		var dropdown;
			dropdown = $('#form_distrito');
			dropdown.empty();
			dropdown.append("<option value ='0' selected>--- Seleccione una opción ---</option>");
			// for (let index = 0; index < array.length; index++) {
			for(key in array) {	
				// if (idAsesor == array[index].id  )    {
					
				//  textSelect = "<option  value='"+ array[key].id_provincia  +"' selected name = '" +  array[key].provincia  + "'   >" +  array[key].provincia  + "</option>";  
				// }
				// else {
				  textSelect = "<option  value='"+ array[key].id_distrito  +"' name = '" +  array[key].distrito  + "'   >" +  array[key].distrito  + "</option>";  
				// }
				dropdown.append(textSelect);
			};     
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
