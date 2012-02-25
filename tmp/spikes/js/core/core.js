define([
    'jquery',
    'underscore',
    'backbone',
], 
function($, _, Backbone){

    var core = {views:{}};//namespases

    core.views.BaseView = Backbone.View.extend({
            
        isLoadedAndRendered : false,
        
        loadAndRenderDfrd:null,                
        
        render: function()
        {
             this.resolveLoadedAndRendered();
             return this;
        },
        
        loadAndRender: function()
        {                    
            var dfrd = $.Deferred();
            this.loadAndRenderDfrd = dfrd;
            if (this.isLoadedAndRendered)
            {   
                this.resolveLoadedAndRendered();
                return dfrd; 
            }
            else
            {
                this.render();
            }
            return dfrd;        
        },
        
        resolveLoadedAndRendered:function()
        {
            this.isLoadedAndRendered = true;
            if (this.loadAndRenderDfrd)
            {
                this.loadAndRenderDfrd.resolve();
            }
        }
    });
    
    return core;
});
