define(
[ 'jquery',
  'underscore',
  'backbone',
  'model/menuitem'
  ],
   
function($, _, Backbone, menuItemModel)
{

    var menuCollection = Backbone.Collection.extend(
    {
        model: menuItemModel
    });

    return menuCollection;
});
