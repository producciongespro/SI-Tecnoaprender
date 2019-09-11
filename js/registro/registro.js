// Módulos de ingreso/registro/recuperación contraseña
jQuery(document).ready(function($){
  $(".div-shadow").addClass("invisible");
  $.extend($.validator.messages, {
    required: "Campo requerido",
    number: "Campo numérico"
  });

  registrar();

  // codigo index de la PLANTILLA

  var $form_modal = $('.cd-user-modal'),
      $form_signup = $form_modal.find('#cd-signup'),
      $form_modal_tab = $('.cd-switcher'),
      $tab_login = $form_modal_tab.children('li').eq(0).children('a'),
      $tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
      $main_nav = $('.main-nav');

//open modal
  $main_nav.on('click', function(event){
    let tmpOpcion =  event.target.id;
    tmpOpcion==="ingresar" ? $('#form-login')[0].reset(): $('#form-singup')[0].reset();

    if( $(event.target).is($main_nav) ) {
      // on mobile open the submenu
      $(this).children('ul').toggleClass('is-visible');	
      // console.log("1");
    } else {
    // on mobile close submenu
    $main_nav.children('ul').removeClass('is-visible');
    //show modal layer
    $form_modal.addClass('is-visible');	
    //show the selected form
    ( $(event.target).is('.cd-signup') ) ? signup_selected() : login_selected();
    // console.log("2");
  }

});

//close modal
$('.cd-user-modal').on('click', function(event){
  if( $(event.target).is($form_modal) || $(event.target).is('.cd-close-form') ) {
    $form_modal.removeClass('is-visible');
  }	
});
//close modal when clicking the esc keyboard button
$(document).keyup(function(event){
    if(event.which=='27'){
      $form_modal.removeClass('is-visible');
    }
  });

//switch from a tab to another
$form_modal_tab.on('click', function(event) {
  $('#form-reset-password')[0].reset();
  let optionTab = event.target.id
   optionTab==='modal-ingresar' ?  $('#form-login')[0].reset() : $('#form-singup')[0].reset();
  
  event.preventDefault();
  ( $(event.target).is( $tab_login ) ) ? login_selected() : signup_selected();
});

//hide or show password
$('.hide-password').on('click', function(){
  var $this= $(this),
    $password_field = $this.prev('input');
  
  ( 'password' == $password_field.attr('type') ) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
  // ( 'Hide' == $this.text() ) ? $this.text('Show') : $this.text('Hide');
  ( 'Ocultar' == $this.text() ) ? $this.text('Mostrar') : $this.text('Ocultar');
  //focus and move cursor to the end of input field
  $password_field.putCursorAtEnd();
});

function signup_selected(){
  $form_signup.addClass('is-selected');
  $tab_login.removeClass('selected');
  $tab_signup.addClass('selected');
}



//REMOVE THIS - it's just to show error messages 
$form_signup.find('input[type="submit"]').on('click', function(event){
  event.preventDefault();
});


//IE9 placeholder fallback
//credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
if(!Modernizr.input.placeholder){
  $('[placeholder]').focus(function() {
    var input = $(this);
    if (input.val() == input.attr('placeholder')) {
      input.val('');
      }
  }).blur(function() {
     var input = $(this);
      if (input.val() == '' || input.val() == input.attr('placeholder')) {
      input.val(input.attr('placeholder'));
      }
  }).blur();
  $('[placeholder]').parents('form').submit(function() {
      $(this).find('[placeholder]').each(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
         input.val('');
      }
      })
  });
}

});


//credits https://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
jQuery.fn.putCursorAtEnd = function() {
return this.each(function() {
    // If this function exists...
    if (this.setSelectionRange) {
        // ... then use it (Doesn't work in IE)
        // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
        var len = $(this).val().length * 2;
        this.setSelectionRange(len, len);
    } else {
      // ... otherwise replace the contents with itself
      // (Doesn't work in Google Chrome)
        $(this).val($(this).val());
    }
});
};

  // fin del codigo index de la PLANTILLA


function registrar() {
  $('#form-singup')[0].reset();
  $("#signup_id_centro").on('focus', function () {  
    this.value='';
  }); 

  autocompleteArrays();
  var form = $( "#form-singup");
  $(document).off('submit','#form-singup'); //limpiar el submit
  $("form").on("submit", function(event) {
        event.preventDefault();
       });
  jQuery.validator.addMethod("cmep", function(value, element) {
    return validateMailMep(value);
  });

  var rule_default = {
  required: true
  };
  var errorMess = {
  required : 'Este campo es requerido'
  }
  form.validate({
      rules: {
      signup_name : rule_default,
      signup_id_centro : rule_default,
      signup_email    : {required: true, cmep: true, email:true},
      signup_password    : rule_default,
      signup_password_2    : rule_default
      },
      messages: {
      signup_name    : errorMess,
      signup_email    : {
                required: "El campo es requerido",
                email : "Por favor, indica una direcci&oacute;n de correo v&aacute;lida",
                cmep : "Error en el correo. No corresponde al oficial del MEP ",
              },
      signup_password    : errorMess,
      signup_password_2    : errorMess,
      }
  });

  $("#signup-submit").click(function () {
  if(form.valid()=== true){
    
    let centro_educativo = $("#signup_id_centro").val();
     console.log("Centro educativo", centro_educativo);
    let tmp = centro_educativo;
    var res = tmp.indexOf("[");
    let codigoConsulta = tmp.substring(res + 4, tmp.length - 1);
    itemID = codigoConsulta; 
    console.log("ID", itemID);
    $("#signup_id_centro").val(itemID)
    // console.log("id centro", $("#signup_id_centro").val());
    
    let url = "main_app/server/login/registro.php",
        formData = new FormData($('#form-singup')[0]); 
        var origenSubmit = $("#signup-submit").attr("name");
        console.log("OrigenSubmit", origenSubmit);
        var signup_tipo_funcionario;
        switch (origenSubmit) {
          case 'registro_administrador':
            formData.append('signup_id_tipo', '1');  //administrador
          break;
          // case 'registro_usuarios':
          //   formData.append('signup_id_tipo', '2');   //director u otros
          // break;
          case 'registro_directores':
            formData.append('signup_id_tipo', '2');   //director u otros
          break;
          case 'registro_asesores':
            formData.append('signup_id_tipo', '6');   //asesor pedagógico DRTE
          break;
          default:
          break;
        };
        
        for (var pair of formData.entries()) {
          console.log("datos del registro",pair[0]+ ', ' + pair[1]); 
        }
        conectDataAjax ( url, formData, resultadoRegistro); 
    }
  else {
    alertify.notify('El formulario no es válido. Intenta de nuevo','warning',3, null);
  }
  });
}

function autocompleteArrays() {
  // crea  los arreglos de codigos e instituciones para el autocomplete de la consulta del header
    
  let consSelect = 'SELECT id, cod_pres, institucion FROM centro_educativo ORDER BY cod_pres';
      inputwithComplete = 'signup_id_centro';

    enviarFormDataAjax( empaquetarConsulta(consSelect),
                        cargarCentrosEducativos,
                        "main_app/server/consultas_generales.php",
                        inputwithComplete
    );
  }

  function empaquetarConsulta(c) { 
    // c recibe como parámetro la consulta a empaquetar para luego mandarla por Ajx    
    
        var formData = new FormData();               
        formData.append("consulta", c );
        return formData;
}

  function enviarFormDataAjax  ( formData, mCallBack,  url, input) { 
    $(".div-shadow").removeClass("invisible");
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
      $(".div-shadow").removeClass("invisible");
      }, success: function(response){
        $(".div-shadow").addClass("invisible");
        console.log("Enviado satisfactoriamente");
        mCallBack(response,input);      
  
      }, error: function(response){
        $(".div-shadow").addClass("invisible");
        console.log("Error al enviar");
      }
    });
  }

  function cargarCentrosEducativos(stringArray,inputwithComplete) {    
    let data = JSON.parse(stringArray),
        availableCentros=[];
    // console.log("datos de centros",data);  
    
    //Renderiza el formulario de acuerdo al valor seleccionado por el usuario:
    const maxCentros = data.length;
  
    for (var index = 0; index < maxCentros; index++) { 
      availableCentros.push( "(COD: " + data[index].cod_pres + ") -"+    data[index].institucion    +  "- [ID: " + data[index].id  + "]");
     }
  
    $( "#"+inputwithComplete+"" ).autocomplete({
      
      source: availableCentros
    });
    $( "#"+inputwithComplete+"" ).autocomplete( "option", "appendTo", ".eventInsForm" );    //resuelve problema de posicionamiento del autocomplete en modales
  };

function resultadoRegistro (respuesta) {
  console.log("respuesta",respuesta);
  
  if (!respuesta.error) {
    console.log("respuesta", respuesta.error);
    // alertify.alert('REGISTRO', respuesta.msj[0]);
    alertify.alert('REGISTRO', respuesta.msj[0]).set('onok', function(closeEvent){ 	$('#form-singup')[0].reset();
		$('.cd-user-modal').removeClass('is-visible');} ); 
  }
  else {
    alertify.alert('ERROR',respuesta.msj[0]);
  }
}

function conectDataAjax ( path, formData, mCallBack) {
// registro asesor
  jQuery.ajax({
      url: path,
      type:'POST',
      dataType:'json',
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      beforeSend:function(){
        loading(true);
        console.log("enviando");
        $(".div-shadow").removeClass("invisible");
      },
      success: function(mensaje){        
        console.log("success", mensaje);       
        $(".div-shadow").addClass("invisible");
        mCallBack(mensaje);        
      },
      // error: function(mError){
      //   console.log("Error",mError);
      //   loading(false);
        error: function(xhr, status, error){
          var errorMessage = xhr.status + ': ' + xhr.statusText
          alert('Error - ' + errorMessage);
          alert('Error - ' + error);
          alert('Error - ' + xhr.error);
          $(".div-shadow").addClass("invisible");
      }
  })
  // .fail( function(xhr, textStatus, errorThrown) {
  //   alert(xhr.responseText);});

}

 function validateMailMep(correo) {
  // Función general de validación correo del MEP -- retorna true si está bien y false en caso contrario
    var re1='((?:[a-z][a-z1-9]+))';	// Alphanum 1
    var re2='(\\.)';	// Any Single Character 1
    var re3='((?:[a-z][a-z]+))';	// Word 1
    var re4='(\\.)';	// Any Single Character 2
    var re5='((?:[a-z][a-z]+))';	// Word 2
    var re6='(@)';	// Any Single Character 3
    var re7='(mep\\.go\\.cr)';	// Fully Qualified Domain Name 1
    var p = new RegExp(re1+re2+re3+re4+re5+re6+re7,["i"]);
    var m = p.exec(correo);
    if (m != null)
    {
      return true;
    }
    else {
      return false;
    }
  }

  function loading(muestra) {
    if (muestra){
       $('.loading').html('<div class="d-flex justify-content-left"><img src="images/loader.gif" alt="loading" /></div><div class="d-flex justify-content-left">Un momento, por favor...</div>');
    }
    else {
      $('.loading').html('');
    }
  }
