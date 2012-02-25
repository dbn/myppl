// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'view/main/mainview'
], 
function($, _, Backbone, mainView )
{
  //debugger;
  var AppRouter = Backbone.Router.extend({ 
  
    currentView:null,    
    
	routes: 
	{
	  'city/:cityName': 'showCity',
	  'artist/:artistName':'showArtist',
	  'concept': 'showConcept',
	  'subject': 'showSubject',
	  'process': 'showProcess',
	  'contacts': 'showContacts',
	  '*actions': 'defaultAction'
	},
	
	showCity: function(cityName)
	{
        mainView.showCity(cityName);
	},
	
	showConcept:function()
	{
	    mainView.showConcept();
    },
	
	showSubject:function()
	{
	    mainView.showSubject();
    },
	
	showProcess:function()
	{
	    mainView.showProcess();
	},
	
	showContacts:function()
	{
	    mainView.showContacts();
	},

    showArtist:function(artistName)
    {
        mainView.showArtist(artistName);
    },

	defaultAction: function()
	{
        mainView.showHome();	    
	}
	
	
  });

  var initialize = function(){
	var app_router = new AppRouter;
	Backbone.history.start();
  };
  return {
	initialize: initialize
  };
});
