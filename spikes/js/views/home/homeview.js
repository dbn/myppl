define([
  'jquery',
  'underscore',
  'backbone',
  'models/cities',
  'views/home/homecityview',
  'text!templates/home/home.html'
],

function($, _, Backbone, citiesCollection ,homeCityView, homeTemplate)
{
  var homeView = Backbone.View.extend({
    el: $("#content")
    
    , cityViews:[]
    
    , initialize: function(){
      this.collection = citiesCollection;
      this.collection.bind("reset", this.collectionChangeHandler, this);
      this.collection.bind("refresh", this.collectionChangeHandler,this);
      this.collection.bind("add", this.collectionChangeHandler, this);
      this.collection.bind("remove",this.collectionChangeHandler, this);
      
      this.collection.fetch();
    }
    
    , collectionChangeHandler: function(){
        var cities = this.collection.models;
        
        for (var i=0;i<cities.length;i++)
        {
            var cityView = new homeCityView();
            cityView.model = cities[i];
            this.cityViews.push(cityView);
        }
        this.render();
    }, 
    
    render: function()
    {            
        var cities = this.collection.models;
        
        for (var i=0;i<this.cityViews.length;i++)
        {
            this.cityViews[i].parentView = this;
            this.cityViews[i].render();
            $(this.el).append(this.cityViews[i].el);
        }
       
      /*var data = {
        cities: this.collection.models,
        _: _
      };
      var compiledTemplate = _.template( homeTemplate, data );
      $("#content").html( compiledTemplate );*/
    }
  });
  
  return new homeView ;
  
  });
