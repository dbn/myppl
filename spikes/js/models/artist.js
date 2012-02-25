define(
[
    'underscore',
    'backbone'
], 
function(_, Backbone) 
{
    var artistModel = Backbone.Model.extend(
    {
        defaults: 
        {
            name: "--NA--",
            picture:"--NA--",
            city:"--NA--",
            pathPrefix:"img/",
            picturePath:"--NA--"
        },  
        
        getPicturePath:function()
        {
          return this.get("pathPrefix") + this.get("picture");
        },
        
        initialize: function()
        {
            this.set({picturePath:this.getPicturePath()});
                                    
            this.bind("change:picture", function()
            {                
                this.set({picturePath:this.getPicturePath()});
            });
        }
    });    
    
    return artistModel;
});
