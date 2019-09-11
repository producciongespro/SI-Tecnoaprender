jQuery(document).ready(function($){
  let modalAcercaDe = '<div class="modal-dialog" role="document">';
      modalAcercaDe += '<div class="modal-content">';
      modalAcercaDe += '<div class="modal-header about-us">';
      modalAcercaDe += '<h4 class="modal-title" id="myModalLabel">Acerca de</h4>';
      modalAcercaDe += '<button type="button" class="close" data-custom-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
      modalAcercaDe += '</div>';
      modalAcercaDe += '<div class="modal-body body-about-us">';
      modalAcercaDe += '<p> Ministerio de Educación Pública de Costa Rica <br> Dirección de Recursos Tecnológicos <br> Departamento de Gestión y Producción GESPRO <br>Desarrolladores: Luis Chacón, Óscar Pérez, Patricia Hernández, Ana Araya <br>Derechos reservados ©2019 </p>';
      modalAcercaDe += '</div>';
      modalAcercaDe += '<div class="modal-footer about-us">';
      modalAcercaDe += '<button type="button" class="btn btn-modal btn-default" data-custom-dismiss="modal">Cerrar</button>';
      modalAcercaDe += '</div>';
      modalAcercaDe += '</div>';
      modalAcercaDe += '</div>';
  
  $( "#myModal" ).append(modalAcercaDe);
});


// Cargando modal acerca de
function cargaModalAcercaDe()
{
  let modalBtn = $('.acerca-de');
  let modal = $('#myModal'),
      animInClass = "";
      animOutClass = "";

  modalBtn.on('click', function() {
    animInClass = "bounceInRight";
    animOutClass = "bounceOutRight";
      modal.addClass(animInClass);
      modal.modal({backdrop: false});
  });
  modal.on('show.bs.modal', function () {
    var closeModalBtns = modal.find('button[data-custom-dismiss="modal"]');
    closeModalBtns.one('click', function() {
      modal.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function( evt ) {
        modal.modal('hide')
      });
      modal.removeClass(animInClass).addClass(animOutClass);
    })
  })

  modal.on('hidden.bs.modal', function ( evt ) {
    var closeModalBtns = modal.find('button[data-custom-dismiss="modal"]');
    modal.removeClass(animOutClass)
    modal.off('webkitAnimationEnd oanimationend msAnimationEnd animationend')
    closeModalBtns.off('click')
  });
}

// fin de cargando modal acerca de