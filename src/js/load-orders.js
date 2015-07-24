/**
 * Module leveraged for the Load Orders page. Uses Modal and Modal template.
 */

define(['modals','modal-templates'], function(Modals, ModalTemplates) {

  /**
   * JSON parsed order object
   */
  var ordersObj,

  /**
   * Cahced number of orders currently visible
   * @type {Number}
   */
      orderCount = 0,

  /**
   * DOM element used to display current order count
   * @param  {[type]} 'order-count' [description]
   */
      orderCountElement = document.getElementById('order-count');

  /**
   * Initializes the load-orders module
   */
  function init() {
    loadOrders();
  }

  /**
   * Make an AJAX call to Soylent orders and inject the orders into the DOM.
   * When complete add event listeners to each list item.
   */
  function loadOrders() {

    var orders = new XMLHttpRequest();

    orders.onload = function(data) {
      var html = '<ul>';
      ordersObj = JSON.parse(this.responseText);

      ordersObj.forEach(function(el, index) {
        html += '<li data-index="' + index + '" data-modal-target="order" class="order-listener">';
        html +=  el.first_name + ' ' + el.last_name + ' | ' + el.street_address;
        html += '</li>';
      });

      html += '</ul>';
      document.getElementById('orders-list').innerHTML = html;

      addOrderEventListeners();
    };

    orders.open('GET', 'http://soylent-challenge.herokuapp.com/orders/', true);
    orders.send();
  }

  /**
   * Add event listeners for each order in the list (on the page)
   * Upon being clicked run the generateOrderTemplate function which will return
   * the injected HTML to be injected into the DOM (in a modal)
   */
  function addOrderEventListeners() {
    var orders = document.querySelectorAll('.order-listener');

    Array.prototype.forEach.call(orders, function(el) {
      el.addEventListener('click', function(){
        var template = generateOrderTemplate(parseInt(el.getAttribute('data-index')));
        //TODO - Modals.loadModal(template);
      }, false);
    });
  }

  /**
   * Puts a handle bar style string together with an object and replaces the
   * placeholders with real values.
   * @param  The index in the orders object to inject //TODO Don't use index just send the object.
   * @return The HTML template to be injected into DOM
   */
  function generateOrderTemplate(index) {

    var template = ModalTemplates.getTemplateById('order'),
        currentOrder = ordersObj[parseInt(index),
        regex, prop;

    for(prop in currentOrder) {
      regex = new RegExp('{{' + prop + '}}','gi');
      template = template.replace(regex, currentOrder[prop]);
    }

    return template;
  }

  init();

  return {
    loadOrders: loadOrders
  };
});
