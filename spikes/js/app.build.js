(
	{
		appDir:"../",
		
		baseUrl:"js",

		dir:"../../appdirectory-build",
		
		modules:[
		    {
		    	name:"main"
		    	},
		    {
		    	name:"view/concept/conceptview",		    	    
		    	exclude:['jquery','underscore','backbone','core']		    	
		    	},
		    {
		    	name:"view/contacts/contactsview",
		    	exclude:['jquery','underscore','backbone','core']
		    	},
		    {
		    	name:"view/subject/subjectview",
		    	exclude:['jquery','underscore','backbone','core']
		    	}
		],
				
		paths:{
			jquery:"libs/jquery/jquery-1.7.1",
			underscore:"libs/underscore/amd.1.3.1/underscore",
			backbone:"libs/backbone/amd.0.9.0/backbone",
			text:"libs/require/text",
			templates:"../templates",
			data:"../data",
			core:'../js/core/core'
			}
	}
)