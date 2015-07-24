/**
 * 	Object containing all templates for modals.
 */
define(function(){

  var template = {

    //Global base template
    base: '',

    //Template for seeing an order in more detail
    order: '<ul id="order-overlay" data-id="{{id}}">' +
            '<li>{{city}}</li>' +
            '<li>{{created_at}}</li>' +
            '<li>{{delivery_date}}</li>' +
            '<li>{{email}}</li>' +
            '<li>{{first_name}}</li>' +
            '<li>{{id}}</li>' +
            '<li>{{last_name}}</li>' +
            '<li>{{phone_number}}</li>' +
            '<li>{{quantity}}</li>' +
            '<li>{{sku}}</li>' +
            '<li>{{state}}</li>' +
            '<li>{{street_address}}</li>' +
            '<li>{{valid}}</li>' +
            '<li>{{validated_by}}</li>' +
            '<li>{{zipcode}}</li>' +
            '</ul>' +
            '<p id="remove-order">Remove Item</p>'

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
