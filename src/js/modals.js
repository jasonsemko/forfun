/**
 * Modal service. Handle the loading, show, destroying of modals in one place.
 */
define(function() {

  var modalOuter = document.getElementById('modal-container-outer'),
      modalInner = document.getElementById('modal-content'),
      closeModal = document.getElementById('modal-close-btn'),
      isModalOpen = false;

  /**
   * Main method for loading up a modal, injecting it into the page.
   * @param  {String} template The HTML template to be used
   */
  function loadModal(template) {
    injectModal(template);
    showModal();
    addModalEventListeners();
    isModalOpen = true;
  }

  /**
   * Injects HTML template into the modal-content container
   * @param  {String} template The HTML template to be used
   */
  function injectModal(template) {
    modalInner.innerHTML = template;
  }

  /**
   * Display the modal to the client
   */
  function showModal() {
    modalOuter.style.display = 'block';
  }

  /**
   * Adds modal event listeners
   *
   * Clicking outside of Modal.
   * Clicking the close button.
   */
  function addModalEventListeners() {
    modalOuter.removeEventListener('click', destroyModal);
    modalOuter.addEventListener('click', destroyModal, true);

    closeModal.removeEventListener('click', destroyModal, false);
    closeModal.addEventListener('click', destroyModal);
  }

  /**
   * Removes all HTML inside of Modal and hides it.
   * @return {Node | Boolean} [description]
   */
  function destroyModal(element) {

    var targetId = element.target ? element.target.id : element;

    if(/modal-container-outer|modal-close-btn/.test(targetId) || targetId === true) {
      modalOuter.style.display = 'none';
      modalInner.innerHTML = '';
      isModalOpen = false;
    }
  }

  /**
   * Returns true or false dependent upon modal being open
   * @return {Boolean} [description]
   */
  function isOpen() {
    return isModalOpen;
  }

  return {
    loadModal: loadModal,
    destroyModal: destroyModal,
    isOpen: isOpen
  };

});
