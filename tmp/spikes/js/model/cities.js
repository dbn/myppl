define(
[ 'jquery',
  'underscore',
  'backbone',
  'model/city',
  'model/artists'
  //'text!../../data/artistdata.html'
  ],
   
    function($, _, Backbone, cityModel, artistsModel)
    {
        var CollectionOfCities = Backbone.Collection.extend(
        {
            model: cityModel,
            url : 'data/citydata.html',
            tmpCities: [],
            
            
            initialize: function()
            {
                _.bindAll(this);
                this.artistCollection = new artistsModel();
                
                var thisRef = this;
                this.artistCollection.fetch();
                           
            },
            
            joinArtists:function(cities)
            {
                if (cities.length == 0 || this.artistCollection.length == 0){return};
                
                for (var i=0;i<cities.length;i++)
                {
                    var city = cities[i];
                    var artistsFromTheCityArr = this.artistCollection.filter(function(artistModel){
                        
                        return (artistModel.get("city").toLowerCase() == city.name.toLowerCase());
                    });
                    
                    city.artists = artistsFromTheCityArr;                    
                };
                
                return cities;
            },
            
            parse:function(resp, xhr)
            {               
               return this.joinArtists(resp);
            },
            
            findArtist:function(name)
            {
                return this.artistCollection.find(function(artist){
                    return artist.get("name").toLowerCase() == name.toLowerCase();
                });
            }
        });
        
        return new CollectionOfCities();
    
    });
