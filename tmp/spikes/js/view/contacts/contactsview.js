define([
    'jquery',
    'underscore',
    'backbone',
    'core',
    'text!templates/contacts/contactstmpl.html',
], 
function($, _, Backbone, core, contactsTemplate){
       
    var ContactView = core.views.BaseView.extend(
    {
        __super:core.views.BaseView.prototype,
        
        tagName:'div',
        
        className:'contactsView',
        
        compiledTemplate:_.template( contactsTemplate ),
        
        initialize:function(){
            _.bindAll(this);
            this.__super.initialize.call(this);
        },
        
        render: function()
        {
            $.when($.ajax('data/contactsdata.html')).then(this.contactsLoaded);            
        },
        
        contactsLoaded:function(contactsData)
        {
            var data = {
                text:contactsData
            }
            $(this.el).html(this.compiledTemplate(data));
            return this.__super.render.call(this);
        },
    });
    
    return ContactView;
});
