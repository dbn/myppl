define(
[ 'jquery',
  'underscore',
  'backbone',
  'models/city',
  'models/artists'
  //'text!../../data/artistdata.html'
  ],
   
    function($, _, Backbone, cityModel, artistsModel)
    {
        var citiesCollection = Backbone.Collection.extend(
        {
            model: cityModel,
            url : 'data/citydata.html',
            tmpCities: [],
            
            
            initialize: function()
            {
                this.artistCollection = new artistsModel();
                
                var thisRef = this;
                this.artistCollection.fetch(
                    {success:function(){
                        thisRef.updateCities();
                    }});
                           
                //this.artistsJSON = $.parseJSON(artistData);
            },
            
            updateCities:function()
            {
                if (this.tmpCities.length == 0 || this.artistCollection.length == 0){return};
                
                var artistsJsn = this.artistCollection.toJSON();
                
                for (var i=0;i<this.tmpCities.length;i++)
                {
                    var city = this.tmpCities[i];
                    var artistsFromTheCityArr = _.filter(   artistsJsn, 
                                                            function(artist) {
                                                                return artist.city == city.name;
                                                })
                    /*var artistsFromTheCityArr = this.artistCollection.filter(
                                                function(artist) {
                                                    return artist.get("city") == city.name;
                                                });*/
                    //var artistsFromTheCityColl = new artistsModel(artistsFromTheCityArr);
                    city.artists = artistsFromTheCityArr;                    
                    //this.add(new cityModel(city));                    
                }
                
                this.reset(this.tmpCities);
            },
            
            parse:function(rawcities)
            {
               this.tmpCities = rawcities;
               this.updateCities();
            }
        });
        
        //return new citiesCollection($.parseJSON(data));
        return new citiesCollection();
    
    });
