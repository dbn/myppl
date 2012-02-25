define(
[
    'underscore',
    'backbone'
], 
function(_, Backbone) 
{
    var NewsItemModel = Backbone.Model.extend(
    {
        defaults: 
        {
            title:"",
            body:"",
            link:""
        },
                
    });    
    
    return NewsItemModel;
});
