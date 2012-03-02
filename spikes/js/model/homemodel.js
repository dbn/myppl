define(
[ 'jquery',
  'underscore',
  'backbone',
  'model/cities',
  'model/artists'
  ],
   
    function($, _, Backbone, citiesCollection, artistsCollection)
    {
        var HomeModel = Backbone.Model.extend(
        {
        	
            initialize: function()
            {
            	_.bindAll(this);
            	
            	this.cities = new citiesCollection();
            	this.artists = new artistsCollection();
            	
            	this.set("cities", this.cities);                
                this.set("artists", this.artists);
                
                $.when(this.cities.fetch(),this.artists.fetch())
                	.then( this.joinCitiesAndArtists, this.errorCallback );
            },
            
            errorCallback :function(){
            	alert("failed to load cities and artists");
            },
            
            joinCitiesAndArtists:function()
            {
            	var cities = this.cities;
            	var artists = this.artists;
            	
                if (cities.length == 0 || artists.length == 0){return};
                
                for (var i=0;i<cities.length;i++)
                {
                    var city = cities.at(i);
                    var artistsFromTheCityArr = artists.filter(function(artistModel){
                        
                        return (artistModel.get("city").toLowerCase() == city.get("name").toLowerCase());
                    });
                    
            		city.set("artists",new Backbone.Collection(artistsFromTheCityArr));
                    //city.artists = artistsFromTheCityArr;                    
                };
                
                this.trigger("loadComplete"); 
            },
                        
            findArtist:function(name)
            {
                return this.artists.find(function(artist){
                    return artist.get("name").toLowerCase() == name.toLowerCase();
                });
            }
        });
        
        return HomeModel;
    
    });
