define([
  'jquery',
  'underscore',
  'backbone' ,
  'view/menu/menuitemview'
], 

function($, _, Backbone,menuItemView)
{    
    var menuView = Backbone.View.extend(
    {        
        el:$('#menu'),
        
        activePageName:"home",        
        
        itemViews : new (Backbone.Collection.extend({model:menuItemView}))(),
        
        initialize: function(){

            //this.collection.bind('add',   this.addOne, this);
            //this.collection.bind('reset', this.addAll, this);
            //this.collection.bind('all',   this.render, this);
            
            _.bindAll(this);
        },
                            
        render: function()
        {
            this.clear(); 
            
            this.addAll();
            
            return this;
        }, 
        
        addOne: function(menuItem) 
        {
            var view = new menuItemView({model: menuItem});
            
            $(this.el).append(view.render().el);
        },

        addAll: function() 
        {
            this.collection.each(this.addOne);
        },
        
        setActiveMenu:function(pageName)
        {
            this.collection.each(
                function(menuModel){
                    
                    var caption = menuModel.get("caption");
                    var isActive = (caption == pageName);
                    menuModel.set({"activeMenu":isActive});
                }
            ); 
        },
                        
        clear:function(){
            this.itemViews.reset();
            this.itemViews.each(function(view){view.remove();});
        }
        
    });
    
    return menuView;
});