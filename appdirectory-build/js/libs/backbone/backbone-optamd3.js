(function(a,b){typeof exports!="undefined"?b(a,exports,require("underscore")):typeof define=="function"&&define.amd?define(["underscore","jquery","exports"],function(c,d,e){b(a,e,c,d)}):a.Backbone=b(a,{},a._,a.jQuery||a.Zepto||a.ender)})(this,function(a,b,c,d){var e=a.Backbone,f=Array.prototype.slice;b.VERSION="0.5.3",b.noConflict=function(){return a.Backbone=e,b},b.emulateHTTP=!1,b.emulateJSON=!1,b.Events={bind:function(a,b,c){var d=this._callbacks||(this._callbacks={}),e=d[a]||(d[a]={}),f=e.tail||(e.tail=e.next={});return f.callback=b,f.context=c,e.tail=f.next={},this},unbind:function(a,b){var c,d,e;if(!a)this._callbacks=null;else if(c=this._callbacks)if(!b)c[a]={};else if(d=c[a])while((e=d)&&(d=d.next)){if(d.callback!==b)continue;e.next=d.next,d.context=d.callback=null;break}return this},trigger:function(a){var b,c,d,e,g,h=["all",a];if(!(c=this._callbacks))return this;while(g=h.pop()){if(!(b=c[g]))continue;e=g=="all"?arguments:f.call(arguments,1);while(b=b.next)(d=b.callback)&&d.apply(b.context||this,e)}return this}},b.Model=function(a,b){var d;a||(a={}),b&&b.parse&&(a=this.parse(a));if(d=t(this,"defaults"))a=c.extend({},d,a);this.attributes={},this._escapedAttributes={},this.cid=c.uniqueId("c"),this.set(a,{silent:!0}),this._changed=!1,this._previousAttributes=c.clone(this.attributes),b&&b.collection&&(this.collection=b.collection),this.initialize(a,b)},c.extend(b.Model.prototype,b.Events,{_changed:!1,idAttribute:"id",initialize:function(){},toJSON:function(){return c.clone(this.attributes)},get:function(a){return this.attributes[a]},escape:function(a){var b;if(b=this._escapedAttributes[a])return b;var d=this.attributes[a];return this._escapedAttributes[a]=c.escape(d==null?"":""+d)},has:function(a){return this.attributes[a]!=null},set:function(a,b,d){var e;c.isObject(a)||a==null?(e=a,d=b):(e={},e[a]=b),d||(d={});if(!e)return this;e.attributes&&(e=e.attributes);if(d.unset)for(var f in e)e[f]=void 0;var g=this.attributes,h=this._escapedAttributes;if(!d.silent&&this.validate&&!this._performValidation(e,d))return!1;this.idAttribute in e&&(this.id=e[this.idAttribute]);var i=this._changing;this._changing=!0;for(var f in e){var j=e[f];if(!c.isEqual(g[f],j)||d.unset&&f in g)d.unset?delete g[f]:g[f]=j,delete h[f],this._changed=!0,d.silent||this.trigger("change:"+f,this,j,d)}return i||(!d.silent&&this._changed&&this.change(d),this._changing=!1),this},unset:function(a,b){return(b||(b={})).unset=!0,this.set(a,null,b)},clear:function(a){return(a||(a={})).unset=!0,this.set(c.clone(this.attributes),a)},fetch:function(a){a||(a={});var c=this,d=a.success;return a.success=function(b,e,f){if(!c.set(c.parse(b,f),a))return!1;d&&d(c,b)},a.error=v(a.error,c,a),(this.sync||b.sync).call(this,"read",this,a)},save:function(a,c){c||(c={});if(a&&!this.set(a,c))return!1;var d=this,e=c.success;c.success=function(a,b,f){if(!d.set(d.parse(a,f),c))return!1;e&&e(d,a,f)},c.error=v(c.error,d,c);var f=this.isNew()?"create":"update";return(this.sync||b.sync).call(this,f,this,c)},destroy:function(a){a||(a={});if(this.isNew())return this.trigger("destroy",this,this.collection,a);var c=this,d=a.success;return a.success=function(b){c.trigger("destroy",c,c.collection,a),d&&d(c,b)},a.error=v(a.error,c,a),(this.sync||b.sync).call(this,"delete",this,a)},url:function(){var a=t(this.collection,"url")||this.urlRoot||u();return this.isNew()?a:a+(a.charAt(a.length-1)=="/"?"":"/")+encodeURIComponent(this.id)},parse:function(a,b){return a},clone:function(){return new this.constructor(this)},isNew:function(){return this.id==null},change:function(a){this.trigger("change",this,a),this._previousAttributes=c.clone(this.attributes),this._changed=!1},hasChanged:function(a){return a?this._previousAttributes[a]!=this.attributes[a]:this._changed},changedAttributes:function(a){if(!this._changed)return!1;a||(a=this.attributes);var b=!1,d=this._previousAttributes;for(var e in a){if(c.isEqual(d[e],a[e]))continue;(b||(b={}))[e]=a[e]}for(var e in d)e in a||((b||(b={}))[e]=void 0);return b},previous:function(a){return!a||!this._previousAttributes?null:this._previousAttributes[a]},previousAttributes:function(){return c.clone(this._previousAttributes)},_performValidation:function(a,b){var c=this.validate(a,b);return c?(b.error?b.error(this,c,b):this.trigger("error",this,c,b),!1):!0}}),b.Collection=function(a,b){b||(b={}),b.comparator&&(this.comparator=b.comparator),c.bindAll(this,"_onModelEvent","_removeReference"),this._reset(),a&&this.reset(a,{silent:!0}),this.initialize.apply(this,arguments)},c.extend(b.Collection.prototype,b.Events,{model:b.Model,initialize:function(){},toJSON:function(){return this.map(function(a){return a.toJSON()})},add:function(a,b){if(c.isArray(a))for(var d=0,e=a.length;d<e;d++)b&&b.at==+b.at&&d&&(b.at+=1),this._add(a[d],b);else this._add(a,b);return this},remove:function(a,b){if(c.isArray(a))for(var d=0,e=a.length;d<e;d++)this._remove(a[d],b);else this._remove(a,b);return this},get:function(a){return a==null?null:this._byId[a.id!=null?a.id:a]},getByCid:function(a){return a&&this._byCid[a.cid||a]},at:function(a){return this.models[a]},sort:function(a){a||(a={});if(!this.comparator)throw new Error("Cannot sort a set without a comparator");return this.models=this.sortBy(this.comparator),a.silent||this.trigger("reset",this,a),this},pluck:function(a){return c.map(this.models,function(b){return b.get(a)})},reset:function(a,b){return a||(a=[]),b||(b={}),this.each(this._removeReference),this._reset(),this.add(a,{silent:!0,parse:b.parse}),b.silent||this.trigger("reset",this,b),this},fetch:function(a){a||(a={}),a.parse===undefined&&(a.parse=!0);var c=this,d=a.success;return a.success=function(b,e,f){c[a.add?"add":"reset"](c.parse(b,f),a),d&&d(c,b)},a.error=v(a.error,c,a),(this.sync||b.sync).call(this,"read",this,a)},create:function(a,b){var c=this;b||(b={}),a=this._prepareModel(a,b);if(!a)return!1;var d=b.success;return b.success=function(a,e,f){c.add(a,b),d&&d(a,e,f)},a.save(null,b),a},parse:function(a,b){return a},chain:function(){return c(this.models).chain()},_reset:function(a){this.length=0,this.models=[],this._byId={},this._byCid={}},_prepareModel:function(a,c){if(a instanceof b.Model)a.collection||(a.collection=this);else{var d=a;a=new this.model(d,{collection:this,parse:c.parse}),a.validate&&!a._performValidation(a.attributes,c)&&(a=!1)}return a},_add:function(a,b){b||(b={}),a=this._prepareModel(a,b);if(!a)return!1;var c=this.getByCid(a);if(c)throw new Error(["Can't add the same model to a set twice",c.id]);this._byId[a.id]=a,this._byCid[a.cid]=a;var d=b.at!=null?b.at:this.comparator?this.sortedIndex(a,this.comparator):this.length;return this.models.splice(d,0,a),a.bind("all",this._onModelEvent),this.length++,b.index=d,b.silent||a.trigger("add",a,this,b),a},_remove:function(a,b){b||(b={}),a=this.getByCid(a)||this.get(a);if(!a)return null;delete this._byId[a.id],delete this._byCid[a.cid];var c=this.indexOf(a);return this.models.splice(c,1),this.length--,b.index=c,b.silent||a.trigger("remove",a,this,b),this._removeReference(a),a},_removeReference:function(a){this==a.collection&&delete a.collection,a.unbind("all",this._onModelEvent)},_onModelEvent:function(a,b,c,d){if(a!="add"&&a!="remove"||c==this)a=="destroy"&&this._remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],this._byId[b.id]=b),this.trigger.apply(this,arguments);else return}});var g=["forEach","each","map","reduce","reduceRight","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","sortBy","sortedIndex","toArray","size","first","rest","last","without","indexOf","lastIndexOf","isEmpty","groupBy"];c.each(g,function(a){b.Collection.prototype[a]=function(){return c[a].apply(c,[this.models].concat(c.toArray(arguments)))}}),b.Router=function(a){a||(a={}),a.routes&&(this.routes=a.routes),this._bindRoutes(),this.initialize.apply(this,arguments)};var h=/:\w+/g,i=/\*\w+/g,j=/[-[\]{}()+?.,\\^$|#\s]/g;c.extend(b.Router.prototype,b.Events,{initialize:function(){},route:function(a,d,e){b.history||(b.history=new b.History),c.isRegExp(a)||(a=this._routeToRegExp(a)),b.history.route(a,c.bind(function(b){var c=this._extractParameters(a,b);e&&e.apply(this,c),this.trigger.apply(this,["route:"+d].concat(c))},this))},navigate:function(a,c){b.history.navigate(a,c)},_bindRoutes:function(){if(!this.routes)return;var a=[];for(var b in this.routes)a.unshift([b,this.routes[b]]);for(var c=0,d=a.length;c<d;c++)this.route(a[c][0],a[c][1],this[a[c][1]])},_routeToRegExp:function(a){return a=a.replace(j,"\\$&").replace(h,"([^/]*)").replace(i,"(.*?)"),new RegExp("^"+a+"$")},_extractParameters:function(a,b){return a.exec(b).slice(1)}}),b.History=function(){this.handlers=[],c.bindAll(this,"checkUrl")};var k=/^#/,l=/msie [\w.]+/,m=!1;c.extend(b.History.prototype,{interval:50,getFragment:function(a,b){if(a==null)if(this._hasPushState||b){a=window.location.pathname;var c=window.location.search;c&&(a+=c)}else a=window.location.hash;return a=decodeURIComponent(a.replace(k,"")),a.indexOf(this.options.root)||(a=a.substr(this.options.root.length)),a},start:function(a){if(m)throw new Error("Backbone.history has already been started");this.options=c.extend({},{root:"/"},this.options,a),this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&window.history&&window.history.pushState);var b=this.getFragment(),e=document.documentMode,f=l.exec(navigator.userAgent.toLowerCase())&&(!e||e<=7);f&&(this.iframe=d('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(b)),this._hasPushState?d(window).bind("popstate",this.checkUrl):"onhashchange"in window&&!f?d(window).bind("hashchange",this.checkUrl):setInterval(this.checkUrl,this.interval),this.fragment=b,m=!0;var g=window.location,h=g.pathname==this.options.root;if(this._wantsPushState&&!this._hasPushState&&!h)return this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0;this._wantsPushState&&this._hasPushState&&h&&g.hash&&(this.fragment=g.hash.replace(k,""),window.history.replaceState({},document.title,g.protocol+"//"+g.host+this.options.root+this.fragment));if(!this.options.silent)return this.loadUrl()},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(a){var b=this.getFragment();b==this.fragment&&this.iframe&&(b=this.getFragment(this.iframe.location.hash));if(b==this.fragment||b==decodeURIComponent(this.fragment))return!1;this.iframe&&this.navigate(b),this.loadUrl()||this.loadUrl(window.location.hash)},loadUrl:function(a){var b=this.fragment=this.getFragment(a),d=c.any(this.handlers,function(a){if(a.route.test(b))return a.callback(b),!0});return d},navigate:function(a,b){if(!b||b===!0)b={trigger:b};var c=(a||"").replace(k,"");if(this.fragment==c||this.fragment==decodeURIComponent(c))return;this._hasPushState?(c.indexOf(this.options.root)!=0&&(c=this.options.root+c),this.fragment=c,window.history[b.replace?"replaceState":"pushState"]({},document.title,c)):(this.fragment=c,this._updateHash(window.location,c,b.replace),this.iframe&&c!=this.getFragment(this.iframe.location.hash)&&(b.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,c,b.replace))),b.trigger&&this.loadUrl(a)},_updateHash:function(a,b,c){c?a.replace(a.toString().replace(/(javascript:|#).*$/,"")+"#"+b):a.hash=b}}),b.View=function(a){this.cid=c.uniqueId("view"),this._configure(a||{}),this._ensureElement(),this.delegateEvents(),this.initialize.apply(this,arguments)};var n=/^(\S+)\s*(.*)$/,o=["model","collection","el","id","attributes","className","tagName"];c.extend(b.View.prototype,b.Events,{tagName:"div",$:function(a){return a==null?d(this.el):d(a,this.el)},initialize:function(){},render:function(){return this},remove:function(){return d(this.el).remove(),this},make:function(a,b,c){var e=document.createElement(a);return b&&d(e).attr(b),c&&d(e).html(c),e},delegateEvents:function(a){if(!a&&!(a=t(this,"events")))return;this.undelegateEvents();for(var b in a){var e=this[a[b]];if(!e)throw new Error('Event "'+a[b]+'" does not exist');var f=b.match(n),g=f[1],h=f[2];e=c.bind(e,this),g+=".delegateEvents"+this.cid,h===""?d(this.el).bind(g,e):d(this.el).delegate(h,g,e)}},undelegateEvents:function(){d(this.el).unbind(".delegateEvents"+this.cid)},_configure:function(a){this.options&&(a=c.extend({},this.options,a));for(var b=0,d=o.length;b<d;b++){var e=o[b];a[e]&&(this[e]=a[e])}this.options=a},_ensureElement:function(){if(!this.el){var a=this.attributes||{};this.id&&(a.id=this.id),this.className&&(a["class"]=this.className),this.el=this.make(this.tagName,a)}else c.isString(this.el)&&(this.el=d(this.el).get(0))}});var p=function(a,b){var c=s(this,a,b);return c.extend=this.extend,c};b.Model.extend=b.Collection.extend=b.Router.extend=b.View.extend=p;var q={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};b.sync=function(a,e,f){var g=q[a],h={type:g,dataType:"json"};return f.url||(h.url=t(e,"url")||u()),!f.data&&e&&(a=="create"||a=="update")&&(h.contentType="application/json",h.data=JSON.stringify(e.toJSON())),b.emulateJSON&&(h.contentType="application/x-www-form-urlencoded",h.data=h.data?{model:h.data}:{}),b.emulateHTTP&&(g==="PUT"||g==="DELETE")&&(b.emulateJSON&&(h.data._method=g),h.type="POST",h.beforeSend=function(a){a.setRequestHeader("X-HTTP-Method-Override",g)}),h.type!=="GET"&&!b.emulateJSON&&(h.processData=!1),debugger,d.ajax(c.extend(h,f))};var r=function(){},s=function(a,b,d){var e;return b&&b.hasOwnProperty("constructor")?e=b.constructor:e=function(){return a.apply(this,arguments)},c.extend(e,a),r.prototype=a.prototype,e.prototype=new r,b&&c.extend(e.prototype,b),d&&c.extend(e,d),e.prototype.constructor=e,e.__super__=a.prototype,e},t=function(a,b){return!a||!a[b]?null:c.isFunction(a[b])?a[b]():a[b]},u=function(){throw new Error('A "url" property or function must be specified')},v=function(a,b,c){return function(d,e){var e=d===b?e:d;a?a(d,e,c):b.trigger("error",d,e,c)}};return b})