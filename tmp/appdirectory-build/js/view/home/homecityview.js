define(["jquery","underscore","backbone","view/home/homeartistview","model/city","text!templates/home/homecitytmpl.html"],function(a,b,c,d,e,f){var g=c.View.extend({cityContainerId:"",initialize:function(){b.bindAll(this),this.model.bind("change:selectedArtist",this.selectedArtistChanged)},events:{"mousedown .cityName":"cityNameMouseDown","mousedown .backBtn":"backBtnMouseDown"},createArtistsViews:function(){var a=this.model.get("artists");this.artistViews={};for(var e=0;e<a.length;e++){var f=a.at(e),g=new d({model:f});b.extend(g,c.Events),g.bind("click",this.artistClicked,this),this.artistViews[f.get("name").toLowerCase()]=g,g.render(),this.$el.append(g.el)}},render:function(){var a={city:this.model,cityContainerId:this.cityContainerId,_:b},c=b.template(f,a);return this.$el.html(c),this.$el.load(this.elementIsLoaded),this.createArtistsViews(),this},artistClicked:function(a){this.trigger("artistSelected",{target:this,relatedObject:a.target})},cityNameMouseDown:function(a){this.trigger("citySelected",{target:this,relatedObject:a.target})},backBtnMouseDown:function(a){this.trigger("backBtnMouseDown",a)},showBackButton:function(){a(this.el).find(".backBtn").removeClass("invisible")},hideBackButton:function(){a(this.el).find(".backBtn").addClass("invisible")},unselect:function(){var a=this.model.get("artists");a.each(function(a){a.set({selected:!1})})},selectedArtistChanged:function(a){var b=a.get("selectedArtist");this.selectedArtistView=this.artistViews[b.get("name").toLowerCase()]},isLoaded:!1,elementIsLoaded:function(){this.isLoaded=!0}});return g})