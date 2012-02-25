define([
  'jquery',
  'underscore',
  'backbone',
  'view/home/homeartistview',
  'model/city',
  'text!templates/home/homecitytmpl.html'
], 
function($, _, Backbone, ArtistView , city , homeCityTemplate)
{
    var CityView = Backbone.View.extend(
    {
       // model:city,
        cityContainerId:"",
        
        initialize: function()
        {
            _.bindAll(this);
            
            this.model.bind("change:selectedArtist",this.selectedArtistChanged);
        },

		events: 
        {
            "mousedown .cityName":  "cityNameMouseDown",
            "mousedown .backBtn":  "backBtnMouseDown",
        },
        
        createArtistsViews : function()
        {
            var artistModels = this.model.get("artists");
            this.artistViews = {};           
            
            for (var i=0 ; i<artistModels.length ; i++)
            {
                var artist = artistModels.at(i);
                var artistView = new ArtistView({model:artist});
                _.extend(artistView, Backbone.Events);
                artistView.bind('click', this.artistClicked, this);                
                this.artistViews[artist.get("name").toLowerCase()] = artistView;
                artistView.render();
                
                this.$el.append(artistView.el);
            }
        },
        
        render: function()
        {
            var data = {
                city:this.model,   
                cityContainerId:this.cityContainerId,          
                _: _
            };
            
            var compiledTemplate = _.template( homeCityTemplate, data );
            
            this.$el.html(compiledTemplate);
            
            this.$el.load(this.elementIsLoaded);
            
            this.createArtistsViews();
                       
            return this; 
        },
        
        artistClicked:function(event)
        {                        
            this.trigger("artistSelected", {target:this,relatedObject:event.target}); 
        },
        
        cityNameMouseDown: function(event) 
        {
        	this.trigger("citySelected", {target:this,relatedObject:event.target});
        },
        
        backBtnMouseDown:function(event)
        {
            this.trigger("backBtnMouseDown", event);
        },
        
        showBackButton:function()
        {
            $(this.el).find(".backBtn").removeClass("invisible");
        },
        
        hideBackButton:function()
        {
            $(this.el).find(".backBtn").addClass("invisible");
        },
        
        unselect:function()
        {
            var artistModels = this.model.get("artists");
            artistModels.each(function(artistModel){
                artistModel.set({selected:false});
            })
        },
        
        selectedArtistChanged:function(cityModel){
            var artistModel = cityModel.get("selectedArtist");
            this.selectedArtistView = this.artistViews[artistModel.get("name").toLowerCase()];
        },
        
        isLoaded:false,
        
        elementIsLoaded:function(){
            this.isLoaded = true;
            //console.log("city " + this.model.get("name") + " is Loaded");
        }
        
    });
    return CityView;
});


