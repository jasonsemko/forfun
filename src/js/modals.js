/**
 * Modal service. Handle the loading, show, destroying of modals in one place.
 */
define(function() {

  var modalOuter = document.getElementById('modal-container-outer'),
      modalInner = document.getElementById('modal-content'),
      closeModal = document.getElementById('modal-close');

  /**
   * Main method for loading up a modal, injecting it into the page.
   * @param  {String} template The HTML template to be used
   */
  function loadModal(template) {
    injectModal(template);
    showModal();
  }

  function injectModal(template) {}
  function showModal() {}

  return {
    loadModal: loadModal,
    destroyModal: destroyModal
  };

});
