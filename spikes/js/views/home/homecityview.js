define([
  'jquery',
  'underscore',
  'backbone',
  'models/city',
  'text!templates/home/homecity.html'
], 
function($, _, Backbone, city , homeCityTemplate)
{
    el:$('#content')
    var conceptCityView = Backbone.View.extend(
    {
        model:city,
        //template: _.template(homeCityTemplate),

        render: function()
        {
            var data = {
                city:this.model,
                artists:this.model.get("artists"),
                _: _
            };
            
            var compiledTemplate = _.template( homeCityTemplate, data );
            
            $(this.el).html(compiledTemplate);
        }
    });
    return conceptCityView;
});


