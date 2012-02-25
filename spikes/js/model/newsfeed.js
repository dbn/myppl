define(
[ 'jquery',
  'underscore',
  'backbone',
  'model/newsitem'
],
   
    function($, _, Backbone, NewsItemModel)
    {
        var NewsFeedCollection = Backbone.Collection.extend(
        {
            model: NewsItemModel,    
            
            parse: function(rawdata)
            {
                return rawdata;
            }
        });
        return NewsFeedCollection;
    
    });
