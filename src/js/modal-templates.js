/**
 * 	Object containing all templates for modals.
 */
define(function(){

  var template = {

    //Global base template
    base: '',

    //Template for seeing an order in more detail
    order: '<p id="modal-title">Order ID: {{id}}' +
            '<hr>' +
            '<div class="info-section">' +
            '<h2>Personal Information</h2>' +
            '<p>{{first_name}} {{last_name}}</p>' +
            '<p>{{street_address}}<br>{{city}}, {{state}} {{zipcode}}</p>' +
            '<p>{{email}}</p>' +
            '<p>{{phone_number}}</p></div>' +
            '<div class="info-section order-info">' +
            '<h2>Order Information</h2>' +
            '<p>Created at: {{created_at}}</p>' +
            '<p>Delivery date: {{delivery_date}}</p>' +
            '<p>Quantity: {{quantity}}</p>' +
            '<p>SKU: {{sku}}</p></div>' +
            '<div class="remove-order-container"><p id="remove-order" data-id={{id}}>Remove Item</p></div>'
  };

  /**
   * Get template (from object above) by the key //TODO - rename function and param to key not ID
   * @param  {String} id the id for the template object to fetch
   * @return {String} the value found at key passed
   */
  function getTemplateById(id) {
    return template[id];
  }

  //have a get function here, if the template does not exist then throw an error in the console that says the template does not exist.
  return {
    getTemplateById: getTemplateById
  };
});
