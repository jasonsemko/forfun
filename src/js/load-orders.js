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
      orderCountElement = document.getElementById('order-count'),
      /**
       * The previous order, used to compare new orders and if there is a change.
       * @type {String}
       */
      previousOrder = "",

      /**
       * HTML template string
       * @type {String}
       */
      html = "";

  /**
   * Initializes the load-orders module
   */
  function init() {
    loadOrders();
    setInterval(loadOrders,30000); //Check every thirty seconds
  }

  /**
   * Make an AJAX call to Soylent orders and inject the orders into the DOM.
   * When complete add event listeners to each list item.
   */
  function loadOrders() {

    console.log("check for new orders");
    var orders = new XMLHttpRequest();

    orders.onload = function(data) {

      //As we cycle through this every minute, only proceed if the data is new.
      if(previousOrder === "" || previousOrder !== this.responseText) {

        // > 1 updates
        if(previousOrder !== "") {
            alert("Orders have been updated and will be reflected in your browser.");
            if(Modals.isOpen) {
              Modals.destroyModal(true);
            }
        }

        previousOrder = this.responseText;
        html = "<tr><th>Name<th>Address</tr>";
        ordersObj = JSON.parse(this.responseText);

        ordersObj = ordersObj.filter(function(order) {
          return order.quantity !== 0;
        });

        //Readable
        ordersObj.forEach(function(e,i) {
          e.created_at = new Date(e.created_at).toLocaleDateString();
          e.delivery_date = new Date(e.delivery_date).toLocaleDateString();
        });

        orderCount = ordersObj.length;

        ordersObj.forEach(function(el, index) {
          html += '<tr data-index="' + index + '" data-id="' + el.id + '" class="order-listener">';
          html += '<td>' + el.first_name + ' ' + el.last_name + '<td>' + el.street_address;
          html += '</tr>';
        });

        document.getElementById('orders-list').innerHTML = html;

        updateOrderCount();
        addOrderEventListeners();
      }
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
    var orders = document.querySelectorAll('.order-listener'), template;

    Array.prototype.forEach.call(orders, function(el) {
      el.addEventListener('click', function(){

        template = generateOrderTemplate(parseInt(el.getAttribute('data-index')));
        Modals.loadModal(template);
        addRemoveOrderListener();

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
        currentOrder = ordersObj[parseInt(index)],
        regex, prop;

    for(prop in currentOrder) {
      regex = new RegExp('{{' + prop + '}}','gi');
      template = template.replace(regex, currentOrder[prop]);
    }

    return template;
  }

  /**
   * Add the "Remove Order" listener
   */
  function addRemoveOrderListener() {
    var removeOrderBtn = document.getElementById('remove-order');
    removeOrderBtn.addEventListener('click', removeOrder, true);
  }

  /**
   * Remove an order
   * @param  {Event} event The event
   */
  function removeOrder(event) {
    var id = document.getElementById('remove-order').getAttribute('data-id');
    var el = document.querySelector('#orders-list tr[data-id="'+id+'"]');
    el.parentNode.removeChild(el);
    orderCount--;
    updateOrderCount();
    Modals.destroyModal(true);
  }

  /**
   * Update the current order count
   */
  function updateOrderCount() {
    orderCountElement.textContent = orderCount;
  }

  init();

  return {
    loadOrders: loadOrders
  };
});
