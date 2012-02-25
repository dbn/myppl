require.config({
  paths: {
    jquery:'http://code.jquery.com/jquery-1.7.1',
    underscore: 'libs/underscore/amd.1.3.1/underscore',
    backbone: 'libs/backbone/amd.0.9.0/backbone',
    text: 'libs/require/text',
    templates: '../templates',
    data: '../data',
    core:'../js/core/core',
  }
});
require([
  'app'
], function(App){
  App.initialize();
});
