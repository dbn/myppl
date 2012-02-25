define(
[
    'underscore',
    'backbone'
], 
function(_, Backbone) 
{
    var artistModel = Backbone.Model.extend(
    {
        selected:false,
        
        defaults: 
        {
            name:"--NA--",
            icon:"--NA--",
            picture:"--NA--",
            excerptFile:"",
            website:"--NA--",
            cvurl:"--NA--",
            city:"--NA--",
            picturePath:"--NA--",
            iconPath:"--NA--",
            excerptText:"",
            excertLoaded:false,
            selected:false,
            cv:""
        },
        
        initialize: function()
        {
            _.bindAll(this);
            
            this.set({picturePath:this.getPicturePath()});
            this.set({iconPath:this.getIconPath()});
            this.set({cvPath:this.getCvPath()});
                                    
            this.bind("change:picture", function()
            {                
                this.set({picturePath:this.getPicturePath()});
            });
            
            this.bind("change:icon", function()
            {                
                this.set({iconPath:this.getIconPath()});
            });
                       
            this.bind("change:cv", function()
            {                
                this.set({cvPath:this.getCvPath()});
            });
        },
        
        getPath:function()
        {
          return "data/" + this.get("city") + "/" + this.get("name");
        },
        
        getCvPath:function()
        {
            return (this.getPath() + "/" + this.get("cv")).toLowerCase();
        },
        
        getPicturePath:function()
        {
            return this.getPath() + "/" + this.get("picture");
        },

        getIconPath:function()
        {
            return this.getPath() + "/" + this.get("icon");
        },
        
        loadExcerpt:function(){
        
            if (this.get("excerptText").length > 0)
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
                thisRef.set("excerptText","No data available about this artist");
            });
        }
        
    });    
    
    return artistModel;
});
