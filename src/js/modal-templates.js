/**
 * 	Object containing all templates for modals.
 */
define(function(){

  var template = {

    //Global base template
    base: '',

    //Template for seeing an order in more detail
    order: '<h1>{{city}}</h1>{{phone_number}}....{{sku}}'

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
