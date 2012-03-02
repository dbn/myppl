define(['jquery', 'underscore', 'backbone', 'model/homemodel', 'view/home/homecityview', 'view/home/homecitydetailedview', 'view/home/homeartistdetailedview', 'text!templates/home/hometmpl.html'], function($, _, Backbone, HomeModel, CityView, CityDetailedView, ArtistDetailedView, homeTemplate) {
	var homeView = Backbone.View.extend({

		tagName : "div",

		cityViews : [],

		hiddenCityViews : [],

		artistDetailedView : (new ArtistDetailedView()).render(),

		cityDetailedView : (new CityDetailedView()).render(),

		isTemplateAppended : false,

		activeCityView : null,

		isLoading : true,

		initialize : function() {
			_.bindAll(this);
			this.model = new HomeModel();
			this.model.bind("loadComplete", this.loadCompleteEventHandler, this);
			this.isLoading = true;

		},
		loadCompleteEventHandler : function() {

			var cities = this.model.get("cities").models;

			for(var i = 0; i < cities.length; i++) {
				var cityView = new CityView({
					model : cities[i]
				});

				_.extend(cityView, Backbone.Events);

				cityView.bind('citySelected', this.citySelected, this);
				cityView.bind('artistSelected', this.artistSelected, this);
				cityView.bind('backBtnMouseDown', this.cityBackBtnMouseDown, this);

				this.cityViews.push(cityView);
			}

			this.render();
		},
		loadAndRender : function() {

			var dfrd = $.Deferred();

			if(this.isLoadedAndRendered) {
				dfrd.resolve();
				return dfrd;
			}

			this.loadAndRenderDfrd = dfrd;

			return dfrd;
		},
		resolveLoadedAndRendered : function() {
			this.isLoadedAndRendered = true;
			if(this.loadAndRenderDfrd) {
				this.loadAndRenderDfrd.resolve();
			}
		},
		render : function() {
			if(!this.isTemplateAppended) {
				$(this.el).empty();
				$(this.el).append(_.template(homeTemplate));
				this.isTemplateAppended = true;
			}

			$(this.el).find("#homeLoadingLbl").css("display", "none");

			var cities = this.model.get("cities").models;

			for(var i = 0; i < this.cityViews.length; i++) {
				this.cityViews[i].parentView = this;
				this.cityViews[i].render();
				$(this.el).append(this.cityViews[i].el);
				var cityViewEl = $(this.cityViews[i].el);
				cityViewEl.css('position', 'absolute');
				cityViewEl.css('top', 200 * i);
			}

			this.resolveLoadedAndRendered();

			return this;
		},
		citySelected : function(event) {
			var cityName = event.target.model.get("name");
			Backbone.history.navigate("/city/" + cityName.toLowerCase(), {
				trigger : true
			});
			//this.elevateCityView(event.target).then(this.showCityDetails);
		},
		showCity : function(cityName) {

			var activeCityModel = this.activeCityView ? this.activeCityView.model : null;

			var cityView = this.getCityViewByName(cityName);

			if(!cityView)
				return;

			var thisRef = this;

			var sameCity = activeCityModel && (activeCityModel.get("name").toLowerCase() == cityName.toLowerCase());

			if((this.currentView == "city" || this.currentView == "artist")) {
				if(!sameCity) {
					$.when(this.showHome()).done(function() {
						thisRef.showCity(cityName)
					});
				} else {
					$.when(this.hidePrevDetailedView()).done(function() {
						thisRef.showCityDetails(cityView)
					});
				}
			} else {
				this.currentView = "city";
				this.elevateCityView(cityView).then(this.showCityDetails);
			}
		},
		artistSelected : function(event) {
			var artistName = event.relatedObject.model.get("name");
			Backbone.history.navigate("/artist/" + artistName.toLowerCase(), {
				trigger : true
			});
		},
		showArtist : function(name) {

			var artistModel = this.model.findArtist(name);
			if(!artistModel)
				return;
			var cityView = this.getCityViewByName(artistModel.get("city"));
			if(!cityView)
				return;

			cityView.model.set({
				selectedArtist : artistModel
			});
			artistModel.set({
				"selected" : true
			});

			var thisRef = this;
			var activeCityModel = this.activeCityView ? this.activeCityView.model : null;

			if(this.currentView == "artist") {
				if(activeCityModel && (activeCityModel.get("name").toLowerCase() != artistModel.get("city").toLowerCase())) {
					$.when(this.showHome()).done(function() {
						thisRef.showArtist(name)
					});
				} else {
					$.when(this.hidePrevDetailedView()).done(function() {
						thisRef.showArtistDetails(cityView)
					});
				}
			} else if(this.currentView == "city") {
				$.when(this.hidePrevDetailedView()).done(function() {
					thisRef.showArtistDetails(cityView)
				});
			} else {
				this.currentView = "artist";
				this.elevateCityView(cityView).then(this.showArtistDetails);
			}
		},
		getCityViewByName : function(name) {

			for(var i = 0; i < this.cityViews.length; i++) {
				if(this.cityViews[i].model.get("name").toLowerCase() == name.toLowerCase())
					return this.cityViews[i];
			}

			return null;
		},
		elevateCityView : function(cityView) {

			//this.selectedArtist = event.relatedObject;

			var viewIndex = _.indexOf(this.cityViews, cityView);
			this.hiddenCityViews = _.without(this.cityViews, cityView);
			var hiddenCityViewsElArr = _.map(this.hiddenCityViews, function(view) {
				return view.el;
			});
			var dfrd = $.Deferred();

			var allFadeOurEffect = function() {
				return $(hiddenCityViewsElArr).fadeOut(200);
			}

			$.when(allFadeOurEffect()).done(function() {
				$(hiddenCityViewsElArr).detach();
				if(viewIndex != 0) {
					$(cityView.el).animate({
						top : 0
					}, 500, function() {
						dfrd.resolve(cityView);
					});
				} else {
					dfrd.resolve(cityView);
				}
			});
			return dfrd.promise();
		},
		showArtistDetails : function(cityView) {

			this.activeCityView = cityView;

			var artistModel = cityView.model.get("selectedArtist");

			this.artistDetailedView.setModel(artistModel);

			artistModel.set({
				selected : true
			});

			artistModel.loadExcerpt();

			var detEl = $(this.artistDetailedView.render().el);

			var index = cityView.model.get("artists").indexOf(artistModel);

			if(index == -1)
				return;

			var artistPos = 130 + ((index < 2 ? index : 1) * 180);

			detEl.css("left", artistPos);

			detEl.css("top", $(cityView.el).height());

			$(this.el).append(detEl);

			$.when(detEl.fadeIn(200)).done(function() {
				cityView.showBackButton()
			});

			this.currentView = "artist";
		},
		showCityDetails : function(cityView) {

			this.activeCityView = cityView;

			this.cityDetailedView.setModel(cityView.model);

			cityView.model.loadExcerpt();

			var detEl = $(this.cityDetailedView.render().el);

			$(this.el).append(detEl);

			$.when(detEl.fadeIn(200)).done(function() {
				cityView.showBackButton()
			});
			this.currentView = "city";
		},
		getCurrentDetailedView : function() {

			if(this.currentView == "artist") {
				return this.artistDetailedView;
			} else if(this.currentView == "city") {
				return this.cityDetailedView;
			}
			return null;
		},
		hidePrevDetailedView : function() {

			var dfrd = $.Deferred();
			this.activeCityView.unselect();
			var detView = this.getCurrentDetailedView();

			$.when($(detView.el).fadeOut(500)).done(function() {
				$(detView.el).detach();
				dfrd.resolve();
			})
			return dfrd.promise();
		},
		cityBackBtnMouseDown : function(event) {

			Backbone.history.navigate("/", {
				trigger : true
			});
		},
		showHome : function() {

			var dfrd = $.Deferred();

			if(!(this.currentView == "artist" || this.currentView == "city")) {
				dfrd.resolve();
				return dfrd;
			}

			var hiddenCityViewsElArr = _.map(this.hiddenCityViews, function(view) {
				return view.el;
			});
			this.cityViews = [this.activeCityView].concat(this.hiddenCityViews);
			this.activeCityView.hideBackButton();
			var artistModel = this.activeCityView.model.get("selectedArtist");
			var thisRef = this;
			$.when(this.hidePrevDetailedView()).done(function() {
				for(var i = 0; i < thisRef.cityViews.length; i++) {
					var cityViewEl = $(thisRef.cityViews[i].el);
					cityViewEl.css('position', 'absolute');
					cityViewEl.css('top', 200 * i);
				}

				$(hiddenCityViewsElArr).appendTo($(thisRef.el));

				thisRef.activeCityView = null;
				thisRef.hiddenCityViews.length = 0;
				thisRef.currentView = "home";

				$.when($(hiddenCityViewsElArr).fadeIn(200)).done(dfrd.resolve());
			});
			return dfrd;
		}
	});

	return homeView;

});
