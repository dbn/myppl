define(
[ 'jquery',
  'underscore',
  'backbone',
  'model/artist'
  ],
   
    function($, _, Backbone, artistModel, data)
    {
        var artistCollection = Backbone.Collection.extend(
        {
            model: artistModel,
            url : 'data/artistdata.html',
            initialize: function(){
            }
        });

        return artistCollection;
    
    });
