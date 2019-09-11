// Módulos de ingreso/registro/recuperación contraseña
jQuery(document).ready(function($){
  registrar();
  recuperar_contrasena();
  ingresar();
});


function registrar() {
  $('#form-login')[0].reset();
  $('#form-reset-password')[0].reset();
  
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
      sendData($( "#form-singup"));
      console.log("formulario valido");
    }
  else {
  alertify.notify('El formulario no es válido. Intenta de nuevo','warning',3, null);
  }
  });

  function sendData(formWithData) {
        
      jQuery.ajax({
        url:'main_app/server/login/registro.php',
        type:'POST',
        dataType:'json',
        data: formWithData.serialize(),
        beforeSend:function(){
          loading(true);
          $('.botonlg').val('Validando....');
        },
        success:function() {
          loading(false);
          console.log("bien");
      }
      })
      .done(function(respuesta){
        // console.log(respuesta);
        if (!respuesta.error) {
          //  if (respuesta.tipo== 2) {
          //  location='main_app/admin/index.php';
          //  }else if (respuesta.tipo== 1 ) {
          //    location='main_app/usuario/index.php';
          //  }
          console.log("respuesta", respuesta.error);
          alertify.alert('REGISTRO', respuesta.msj[0]);
        }else {
          alertify.alert(respuesta.msj[0]);
        }
      })
      .fail(function(resp){
        console.log("respuesta", resp.responseText);
      })
      .always(function(){
        console.log("complete");
    });
  }
}

function recuperar_contrasena() {  
  // Modulo de recuperación de contraseña
  
  var form = $( "#form-reset-password");
  $(document).off('submit','#form-reset-password'); //limpiar el submit
  $("form").on("submit", function(event) {
        event.preventDefault();
       });
  jQuery.validator.addMethod("cmep", function(value, element) {
    return validateMailMep(value);
  });

  form.validate({
      rules: {
        reset_email    : {required: true, cmep: true, email:true}
      },
      messages: {
      signup_email    : {
                required: "El campo es requerido",
                email : "Por favor, indica una direcci&oacute;n de correo v&aacute;lida",
                cmep : "Error en el correo. No corresponde al oficial del MEP ",
              },
      }
  });

  $("#reset-password-submit").click(function () {
  if(form.valid()=== true){
      let correo_user = $("#reset-email").val(),
      formData = new FormData();
      formData.append("email", correo_user);
      jQuery.ajax({
        url:'main_app/server/login/recupera.php',
        type:'POST',
        dataType:'json',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend:function(){
          loading(true);
          $('.botonlg').val('Validando....');
        },
        success:function() {
          loading(false);
          console.log("bien");
       }
      })
      .done(function(respuesta){
        console.log("respuesta recuperar", respuesta);
        if (!respuesta.error) {
          console.log("respuesta", respuesta.error);
          alertify.alert('Recuperación de contraseña', respuesta.msj[0]);
        }else {
          alertify.alert('Error',respuesta.msj[0]+'. Intente de nuevo');
        }
   
      })
      .fail(function(resp){
        console.log("respuesta"+resp);
      })
      .always(function(){
        console.log("complete");
    });
    }
  else {
  alertify.notify('El formulario no es válido. Intenta de nuevo','warning',3, null);
  }
  });
}


function ingresar() {
  // Modulo de ingreso al sistema
  var form = $( "#form-login" );
  $("form").on("submit", function(event) {
        event.preventDefault();
  });
  jQuery.validator.addMethod("cmep", function(value, element) {
                      return validateMailMep(value);
  });

  form.validate({
      rules: {
        signin_email    : {required: true, cmep: true, email:true},
        signin_password  : {required: true},
      },
        messages: {
          signin_email    : {
                          required: "Este campo es requerido",
                          email : "Por favor, indica una direcci&oacute;n de correo v&aacute;lida",
                          cmep : "Error en el correo. No corresponde al oficial del MEP ",
                        },
            signin_password    : "Este campo es requerido",
      },
  });
  $("#submit-login").click(function () {
     if(form.valid()=== true){
       verificaDatos();
     }
     else {
        console.log("El formulario no es válido");
     }
   });
}

function verificaDatos() {
  
   sessionStorage.setItem("correo", $("#signin-email").val());
  var formData = new FormData();
  formData.append("correoU", $("#signin-email").val());
  formData.append("passwordU", $("#signin-password").val());
    jQuery.ajax({
              url: 'main_app/server/login/login.php',
              type:'POST',
              data: formData,
              dataType:'json',
              cache: false,
              contentType: false,
              processData: false,
              beforeSend:function(){
                  loading(true);
                 console.log("enviando");
              },
              success:function() {
                 loading(false);
                 console.log("bien");
              },
      })
      .done(function(respuesta){
        console.log("respuesta.error..."+respuesta.error);
        console.log("respuesta.dato..."+respuesta.dato);
               if (respuesta.error){
                     alertify.notify(respuesta.dato+'. Intente de nuevo.','success',3, null);
               }
               else {
                  var userT = respuesta.dato;
                  sessionStorage.setItem("tipo", respuesta.dato);
                    location = 'main_app/admin/index.php';  //aquí irían los módulos de administración
               }
        })
        .fail(function(resp){
            console.log(resp.responseText);
        })
        .always(function(){
           console.log("complete");
        });
  // });
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
    // funcion general para mostrar animación de espera/en proceso
    if (muestra){
       $('.loading').html ("<img src='images/loader.gif' alt='loading' /><br> Espere un momento por favor...");
    }
    else {
      $('.loading').text('');
    }
  }