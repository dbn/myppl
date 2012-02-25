define([
  'jquery',
  'underscore',
  'backbone',
  'model/artist',
  'text!templates/home/homeartistdettmpl.html'
], 
function($, _, Backbone, ArtistModel , homeArtistDetailedTemplate)
{    
    var homeArtistDetView = Backbone.View.extend(
    {
        model: new ArtistModel(),
        template: _.template(homeArtistDetailedTemplate),
        tagName: "div",
        className: "artistDetailed",
        
        initialize:function(){
        
            _.bindAll(this);
        },
        
        render: function()
        {  
            if (!this.mod) return this;
            var compiledTemplate = this.template( this.mod.toJSON() );
            $(this.el).html(compiledTemplate);
            return this;
        },
        
        loadExcerpt:function(){
            this.mod.loadExcerpt();
        },
        
        setModel:function(mod){
            if (this.mod)
            {
                this.mod.unbind("change:website", this.render);
                this.mod.unbind("change:cvlink", this.render);
                this.mod.unbind("change:excerptText", this.render);
            }
        
            this.mod = mod;
            this.mod.bind("change:cvlink", this.render);
            this.mod.bind("change:website", this.render);
            this.mod.bind("change:excerptText", this.render);                        
        }
        
    });
    return homeArtistDetView;
});


