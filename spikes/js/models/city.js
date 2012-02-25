define(
[
    'underscore',
    'backbone',
    'models/artists'
], 
function(_, Backbone,artistCollection) 
{
    var cityModel = Backbone.Model.extend(
    {
        defaults: 
        {
            name: "--NA--",
            picture:"--NA--",
            pathPrefix:"img/",
            picturePath:"--NA--",
            artists:[],
        },
        
        getPicturePath:function()
        {
          return this.get("pathPrefix") + this.get("picture");
        },
        
        initialize: function()
        {
            this.set({picturePath:this.getPicturePath()});
            
            this.set({artists:new artistCollection(this.attributes.artists)});
                        
            this.bind("change:picture", function()
            {                
                this.set({picturePath:this.getPicturePath()});
            });
        }
    });
    
    
    return cityModel;
});
