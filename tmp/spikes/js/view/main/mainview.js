define([
    'jquery',
    'underscore',
    'backbone',
    'model/menus',
    'view/menu/menuview',    
    'view/home/homeview',
], 
function(   $, _, Backbone, MenuCollection,
            MenuView , HomeView )
{
    var mainView = Backbone.View.extend(
    {
        el: $("#appcontainer"),  
              
        content: $("#content"),         
        
        currentView:null,
               
        menuCollection:new MenuCollection([ 
                {caption:"Home",menuUrl:"#/home"},
                {caption:"Concept",menuUrl:"#/concept"},
                {caption:"Subject",menuUrl:"#/subject"},
                //{caption:"Process",menuUrl:"#/process"},
                {caption:"Contacts",menuUrl:"#/contacts"} 
                ]),
       
        initialize:function()
        {   
            this.menuView = new MenuView({collection:this.menuCollection});
            this.render();
            this.menuView.render();
        },        
        
        render: function()
        {
            $(this.content).empty();
        },
        
        homeView: new HomeView(),        
        showHome:function()
        {
            this.menuView.setActiveMenu("Home");            
            $.when( this.setCurrentView(this.homeView)).then(this.homeView.showHome());            
        },        
        
        showArtist:function(artistName)
        {
            this.menuView.setActiveMenu("Home");
            var nextView = this.homeView;
                        
            $.when( this.setCurrentView(this.homeView)).done(function(){
                        nextView.showArtist(artistName);    
            });   
            
        },        
        
        showCity:function(cityName)
        {
            this.menuView.setActiveMenu("Home");
            var nextView = this.homeView;
                        
            $.when( this.setCurrentView(this.homeView)).done(function(){
                        nextView.showCity(cityName);    
            });   
            
        }, 
        
        showConcept:function()
        {
            this.menuView.setActiveMenu("Concept");
            this.loadAndSetView("view/concept/conceptview");
        },

        showSubject:function()
        {
            this.menuView.setActiveMenu("Subject");
            this.loadAndSetView("view/subject/subjectview");
        },

        showContacts:function()
        {
            this.menuView.setActiveMenu("Contacts");
            this.loadAndSetView("view/contacts/contactsview");   
        },
        
        loadAndSetView:function(url){
            var self = this;
            $.when(this.loadView(url)).done(
                function(view){
                    self.setCurrentView(view);
                });        
        },
        
        views:{},//View cache
             
        loadView:function(url)
        {
            var dfrd = $.Deferred();
            
            if (this.views[url]){
                dfrd.resolve(this.views[url].instance);
                return dfrd;
            }
            
            var views = this;
            
            require([url], function(viewCtor) 
            {
                var viewInstance = new viewClass();
                self.views[url] = {instance:viewInstance,viewCtor:viewCtor};
                dfrd.resolve(viewInstance);
            });
           
            return dfrd;
        },
        
        setCurrentView:function(nextView)
        {
            var dfrd = $.Deferred();
        
            if (this.currentView == nextView && this.currentView.isLoadedAndRendered)
            {
                dfrd.resolve();
            }
            else
            {   
                if (this.currentView && this.currentView.el)
                {
                    $(this.currentView.el).detach();
                };
                
                var thisRef = this;
                
                $.when(nextView.loadAndRender()).done( function(){
                
                    $(nextView.el).appendTo($(thisRef.content));
                    
                    thisRef.currentView = nextView; 
                    
                    dfrd.resolve(nextView);
                    
                });
            }
            
            return dfrd.promise();
        }
    });
    return new mainView;
});
