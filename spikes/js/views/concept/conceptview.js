define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/concept/concept.html'
], 
function($, _, Backbone, homeTemplate){
  var conceptView = Backbone.View.extend(
  {
	el: $("#page"),
	render: function()
	{
	  this.el.html(conceptTemplate);
	}
  });
  return new homeView;
});
