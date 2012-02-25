define(
[
    'underscore',
    'backbone',
    'model/newsfeed'
], 
function(_, Backbone , NewsFeedCollection) 
{
    var cityModel = Backbone.Model.extend(
    {
        defaults: 
        {
            name: "--NA--",
            picture:"--NA--",
            pathPrefix:"img/",
            picturePath:"--NA--",
            excerptFile:"",
            excerptText:"",
            selectedArtist:null,
            artists:null,            
        },

        getPath:function()
        {
          return "data/" + this.get("name");
        },
                
        initialize: function()
        {
            var arr = this.get("artists");
            this.set("artists",new Backbone.Collection(arr));
            
            var excFilePath = this.getPath() + "/" + this.get("excerptFile");
            this.newsfeed = new NewsFeedCollection();
            this.newsfeed.url = excFilePath.toLowerCase();
            this.newsfeed.bind("reset", this.newsFeedResetHandler, this);
        },
        
        loadExcerpt:function(){
        
            this.newsfeed.fetch();
        
            /*if (this.get("excerptText").length > 0)
                return;
        
            var filename =  this.get("excerptFile");
            if (!filename || filename.length == 0)
            {
                this.set("excerptText","");
                return;
            }
            
            var excFilePath = this.getPath() + "/" + this.get("excerptFile");
            
            var thisRef = this;
            $.get(excFilePath.toLowerCase())
            .success(function(data){
                thisRef.set("excerptText",data);
            })
            .fail(function(){
                thisRef.set("excerptText","No data available about this city");
            });*/
        },
        
        newsFeedResetHandler:function(){
            //console.log("CityModel::newsFeedResetHandler ");
            this.set({newsfeed:this.newsfeed});
            this.change();
        }

    });
    
    
    return cityModel;
});
