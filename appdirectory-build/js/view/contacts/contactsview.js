/**
 * @license RequireJS text 1.0.2 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
(function(){var a=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],b=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,c=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,d=typeof location!="undefined"&&location.href,e=d&&location.protocol&&location.protocol.replace(/\:/,""),f=d&&location.hostname,g=d&&(location.port||undefined),h=[];define("text",[],function(){var i,j,k;return typeof window!="undefined"&&window.navigator&&window.document?j=function(a,b){var c=i.createXhr();c.open("GET",a,!0),c.onreadystatechange=function(a){c.readyState===4&&b(c.responseText)},c.send(null)}:typeof process!="undefined"&&process.versions&&!!process.versions.node?(k=require.nodeRequire("fs"),j=function(a,b){b(k.readFileSync(a,"utf8"))}):typeof Packages!="undefined"&&(j=function(a,b){var c="utf-8",d=new java.io.File(a),e=java.lang.System.getProperty("line.separator"),f=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(d),c)),g,h,i="";try{g=new java.lang.StringBuffer,h=f.readLine(),h&&h.length()&&h.charAt(0)===65279&&(h=h.substring(1)),g.append(h);while((h=f.readLine())!==null)g.append(e),g.append(h);i=String(g.toString())}finally{f.close()}b(i)}),i={version:"1.0.2",strip:function(a){if(a){a=a.replace(b,"");var d=a.match(c);d&&(a=d[1])}else a="";return a},jsEscape:function(a){return a.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r")},createXhr:function(){var b,c,d;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;for(c=0;c<3;c++){d=a[c];try{b=new ActiveXObject(d)}catch(e){}if(b){a=[d];break}}if(!b)throw new Error("createXhr(): XMLHttpRequest not available");return b},get:j,parseName:function(a){var b=!1,c=a.indexOf("."),d=a.substring(0,c),e=a.substring(c+1,a.length);return c=e.indexOf("!"),c!==-1&&(b=e.substring(c+1,e.length),b=b==="strip",e=e.substring(0,c)),{moduleName:d,ext:e,strip:b}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(a,b,c,d){var e=i.xdRegExp.exec(a),f,g,h;return e?(f=e[2],g=e[3],g=g.split(":"),h=g[1],g=g[0],(!f||f===b)&&(!g||g===c)&&(!h&&!g||h===d)):!0},finishLoad:function(a,b,c,d,e){c=b?i.strip(c):c,e.isBuild&&(h[a]=c),d(c)},load:function(a,b,c,h){if(h.isBuild&&!h.inlineText){c();return}var j=i.parseName(a),k=j.moduleName+"."+j.ext,l=b.toUrl(k),m=h&&h.text&&h.text.useXhr||i.useXhr;!d||m(l,e,f,g)?i.get(l,function(b){i.finishLoad(a,j.strip,b,c,h)}):b([k],function(a){i.finishLoad(j.moduleName+"."+j.ext,j.strip,a,c,h)})},write:function(a,b,c,d){if(b in h){var e=i.jsEscape(h[b]);c.asModule(a+"!"+b,"define(function () { return '"+e+"';});\n")}},writeFile:function(a,b,c,d,e){var f=i.parseName(b),g=f.moduleName+"."+f.ext,h=c.toUrl(f.moduleName+"."+f.ext)+".js";i.load(g,c,function(b){var c=function(a){return d(h,a)};c.asModule=function(a,b){return d.asModule(a,h,b)},i.write(a,g,c,e)},e)}},i})})(),define("text!templates/contacts/contactstmpl.html",[],function(){return'<p class="concept"><%= text %></p>\r\n\r\n'}),define("view/contacts/contactsview",["jquery","underscore","backbone","core","text!templates/contacts/contactstmpl.html"],function(a,b,c,d,e){var f=d.views.BaseView.extend({__super:d.views.BaseView.prototype,tagName:"div",className:"contactsView",compiledTemplate:b.template(e),initialize:function(){b.bindAll(this),this.__super.initialize.call(this)},render:function(){a.when(a.ajax("data/contactsdata.html")).then(this.contactsLoaded)},contactsLoaded:function(b){var c={text:b};return a(this.el).html(this.compiledTemplate(c)),this.__super.render.call(this)}});return f})