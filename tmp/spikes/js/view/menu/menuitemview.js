define([
  'jquery',
  'underscore',
  'backbone',
  'model/menuitem'
], 
function($, _, Backbone,menuItemModelClass,menuItemView)
{    
    var menuItemView = Backbone.View.extend(
    {        
        tagName:'li',
        
        //model:menuItemModelClass,
        
        template:_.template('<a class="menuAnc" href="<%= menuUrl %>"><%= caption %></a>'),
        
        activeMenu:false,
        
        initialize: function() 
        {   
            this.model.bind('change:activeMenu',this.activeChanged,this);
            //this.model.bind('change:caption',this.render,this);
            //this.model.bind('change:menuUrl',this.render,this);
            
            this.render();
        },
                            
        render: function()
        {
            $(this.el).html(this.template(this.model.toJSON()));
            
            this.anchor = $(this.el).children('.menuAnc');
            
            return this;
        }, 
        
        activeChanged:function(model,isActive)
        {
            isActive ? $(this.anchor).addClass("menuActive") : $(this.anchor).removeClass("menuActive");
        }
    });
    return menuItemView;
});