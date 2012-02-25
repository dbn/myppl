define([
    'jquery',
    'underscore',
    'backbone',
    'core',
    'text!templates/subject/subjecttmpl.html',
    'text!data/subjectdata.html'
], 
function($, _, Backbone, core ,subjectTemplate,subjectData){

    var SubjectView = core.views.BaseView.extend(
    {
        __super:core.views.BaseView.prototype,
    
        tagName:'div',
        
        className:'subjectView',
        
        compiledTemplate:_.template( subjectTemplate),
                
        render: function()
        {
            var data = {
                text:subjectData
            }
        
             $(this.el).html(this.compiledTemplate(data));
             
             return this.__super.render.call(this);
        },        
    });
    return SubjectView;
});
