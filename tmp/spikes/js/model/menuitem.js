define(
[
    'underscore',
    'backbone'
], 
function(_, Backbone) 
{
    var menuItemModel = Backbone.Model.extend(
    {
        defaults: 
        {
            caption:"--NA--",
            menuUrl:"--NA--",
            active:false
        }
    });
    
    return menuItemModel;
});
