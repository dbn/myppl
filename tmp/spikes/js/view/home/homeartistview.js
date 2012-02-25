define([
  'jquery',
  'underscore',
  'backbone',
  'model/artist',
  'text!templates/home/homeartisttmpl.html'
], 
function($, _, Backbone, artist , homeArtistTemplate)
{    
    var homeArtistView = Backbone.View.extend(
    {
        model:artist,
        template: _.template(homeArtistTemplate),
        tagName: "div",
        className: "artistInCity",
    
        initialize:function(){
            _.bindAll(this);
            this.model.bind("change:selected",this.selectedChanged);
            
            //console.log("ArtistView::init " + this.model.get("name") + " " + this.cid);
        },
        
        events: 
        {
            "mouseenter" :  "mouseOverArtistPicture",
            "mouseleave" :  "mouseOutArtistPicture",
            "mousedown" :  "mouseDownArtistPicture"
        },
        
        mouseOutArtistPicture: function(event)
        {
           $(this.overlay).animate({opacity: 1}, 200, 
                function() {});
                
           $(this.icon).animate({opacity: 0.5}, 200, 
                function() {});
                
           if (!this.model.get("selected"))
           {
                $(this.nameLabel).animate({opacity: 0}, 200, 
                    function() {});                          
           }
        },
        
        mouseOverArtistPicture: function(event)
        {
           $(this.overlay).animate({opacity: 0}, 200, 
                function() {});
                
           $(this.icon).animate({opacity: 1}, 200, 
                function() {});
                
           if (!this.model.get("selected"))
           {
                $(this.nameLabel).animate({opacity: 1}, 200, 
                    function() {});                          
           }
        },
        
        mouseDownArtistPicture: function(event)
        {        
            this.trigger("click", {target:this});            
        },
        
        render: function()
        {
            var data = {artist:this.model};
            var compiledTemplate = _.template( homeArtistTemplate, data );
            $(this.el).html(compiledTemplate);
            
            this.overlay = $(this.el).find(".artistImageOvrlay");
            this.icon = $(this.el).find(".artistIcon");
            this.picture = $(this.el).find(".artistPicture");
            this.nameLabel = $(this.el).find(".artistName");
            
            $(this.nameLabel).css("opacity",0);
            $(this.icon).css("opacity",0.5);
            
            
            return this;
        },
        
        selectedChanged:function(mod){
        
            var thisEl = $(this.el);            
            
            if (!this.model.get("selected"))
            {
                this.icon.removeClass('invisible');
                this.picture.addClass('invisible');
                this.overlay.removeClass('invisible');
                $(this.nameLabel).css("opacity",0);
            }else{
                this.icon.addClass('invisible');
                this.picture.removeClass('invisible');
                this.overlay.addClass('invisible');
                $(this.nameLabel).css("opacity",1);
            }
        }
    });
    return homeArtistView;
});


