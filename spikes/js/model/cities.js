define(
[ 'jquery',
  'underscore',
  'backbone',
  'model/city'
  ],
   
    function($, _, Backbone, cityModel)
    {
        var cityCollection = Backbone.Collection.extend(
        {
            model: cityModel,
            url : 'data/citydata.html',
            initialize: function(){
            }
        });

        return cityCollection;
    
    });
