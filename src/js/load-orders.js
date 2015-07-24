/**
 * Module leveraged for the Load Orders page. Uses Modal and Modal template.
 */

define(['modals','modal-templates'], function(Modals, ModalTemplates) {

  /**
   * ordersObj - JSON parsed object of current orders
   */
  var ordersObj;

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
   * @return //TODO return the template
   */
  function generateOrderTemplate(index) {

    var template = ModalTemplates.getTemplateById('order'),
        currentOrder = ordersObj[parseInt(index),
        regex, prop;

    for(prop in currentOrder) {
      regex = new RegExp('{{' + prop + '}}','gi');
      template = template.replace(regex, currentOrder[prop]);
    }

    console.log(template); //Matt, this was the last thing I did. Logged out the template with the injected values, next step it putting it into a modal and showing it.
    return template;
  }

  init();

  return {
    loadOrders: loadOrders,
    getOrdersObj: getOrdersObj
  };
});