/**
 * Modal service. Handle the loading, show, destroying of modals in one place.
 */
define(function() {

  //Load moda (main)
  function loadModal(template) {
    //Inject modal template into modal div
    injectModal(template);
    //Show Modal
    showModal();
  }

  function injectModal(template) {}
  function showModal() {}

  return {
    loadModal: loadModal
  };

});
