define(["jquery","underscore","backbone","model/artist","text!templates/home/homeartisttmpl.html"],function(a,b,c,d,e){var f=c.View.extend({model:d,template:b.template(e),tagName:"div",className:"artistInCity",initialize:function(){b.bindAll(this),this.model.bind("change:selected",this.selectedChanged)},events:{mouseenter:"mouseOverArtistPicture",mouseleave:"mouseOutArtistPicture",mousedown:"mouseDownArtistPicture"},mouseOutArtistPicture:function(b){a(this.overlay).animate({opacity:1},200,function(){}),a(this.icon).animate({opacity:.5},200,function(){}),this.model.get("selected")||a(this.nameLabel).animate({opacity:0},200,function(){})},mouseOverArtistPicture:function(b){a(this.overlay).animate({opacity:0},200,function(){}),a(this.icon).animate({opacity:1},200,function(){}),this.model.get("selected")||a(this.nameLabel).animate({opacity:1},200,function(){})},mouseDownArtistPicture:function(a){this.trigger("click",{target:this})},render:function(){var c={artist:this.model},d=b.template(e,c);return a(this.el).html(d),this.overlay=a(this.el).find(".artistImageOvrlay"),this.icon=a(this.el).find(".artistIcon"),this.picture=a(this.el).find(".artistPicture"),this.nameLabel=a(this.el).find(".artistName"),a(this.nameLabel).css("opacity",0),a(this.icon).css("opacity",.5),this},selectedChanged:function(b){var c=a(this.el);this.model.get("selected")?(this.icon.addClass("invisible"),this.picture.removeClass("invisible"),this.overlay.addClass("invisible"),a(this.nameLabel).css("opacity",1)):(this.icon.removeClass("invisible"),this.picture.addClass("invisible"),this.overlay.removeClass("invisible"),a(this.nameLabel).css("opacity",0))}});return f})