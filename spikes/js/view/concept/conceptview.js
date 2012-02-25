define([
    'jquery',
    'underscore',
    'backbone',
    'core',
    'text!templates/concept/concepttmpl.html',
    'text!data/conceptdata.html'
], 
function($, _, Backbone, core, conceptTemplate,conceptData){

    var ConceptView = core.views.BaseView.extend(
    {
    
        __super:core.views.BaseView.prototype,
    
        tagName:'div',
        
        className:'conceptView',
        
        compiledTemplate:_.template( conceptTemplate),
                
        render: function()
        {                
            var data = {
                text:conceptData
            }
        
             $(this.el).html(this.compiledTemplate(data));
             
             return this.__super.render.call(this);
        },
        
               
    });
    return ConceptView;
});
