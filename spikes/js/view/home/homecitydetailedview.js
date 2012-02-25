define([
  'jquery',
  'underscore',
  'backbone',
  'model/city',
  'text!templates/home/homecitydettmpl.html',
  'text!templates/feed/feedtmpl.html',
], 
function($, _, Backbone, CityModel , homeCityDetailedTemplateRaw , feedTemplateRaw)
{    
    var CityDetView = Backbone.View.extend(
    {
        model: new CityModel(),
        template: _.template(homeCityDetailedTemplateRaw),
        feedTemplate : _.template(feedTemplateRaw),
        
        tagName: "div",
        className: "cityDetailed",
        
        initialize:function(){
        
            _.bindAll(this);
        },
        
        render: function()
        {  
            if (!this.mod) return this;
            
            var obj = this.mod.toJSON() ;
            
            var compiledTemplate = this.template( obj );
            
            $(this.el).html(compiledTemplate);
            
            this.renderNewsFeed();
            
            return this;
        },
        
        renderNewsFeed: function (){
            
            if (!this.mod) return this;
            
            var newsfeedCol = this.mod.get("newsfeed");
            
            if (!newsfeedCol) return this;
            
            var newsfeed = {entries:newsfeedCol.toJSON()};
            
            var compiledTemplate = this.feedTemplate( newsfeed );
        
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
                this.mod.unbind("change:excerptText", this.render);
                this.mod.unbind("change:newsfeed", this.renderNewsFeed);
            }
        
            this.mod = mod;
            this.mod.bind("change:website", this.render);
            this.mod.bind("change:excerptText", this.render);
            this.mod.bind("change:newsfeed", this.renderNewsFeed);
        }
        
    });
    return CityDetView;
});


