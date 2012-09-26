$(function ($) {
	// Glitch Strategy Feed 
	$.getJSON('http://pipes.yahoo.com/pipes/pipe.run?_id=f20695275788f660010c83f300544904&_render=json', function (response) {
		var result = '';
		for (var i = 0; i < response.count; i++) {
			var item = response.value.items[i];
			result += '<div class="item">\n<h3><a href="' + item['feedburner:origLink'] + '">' + item.title + '</h2>\nPosted <time>' + item.pubDate.replace(' +0000', '') + '</time><p>\n' + '<img src="' + $(item['content:encoded']).find('img').attr('src') + '">' + item.description + '</p>\n</a></div>\n';
		};
		$('.feed').append(result);
	});
	$('.feed').on("click", "a", function (event) {
		chrome.tabs.create({
			url: $(this).attr('href')
		});
	});

	// Routes
	$('a[data-toggle="tab"]').eq(2).on('shown', function (e) {
		$.get('http://glitchroutes.com/build/', function (rp) {
			var $rp = $('<div></div>').html($(rp.replace(/<script[ >][\s\S]*?<\/script>/g, '')));
			$rp.find('form').attr('action', 'http://glitchroutes.com/build/').removeAttr('style').wrap('<div class="form"></div>');
			$('#build').append($rp.find(".form").eq(0).html() + '<hr/>' + $rp.find(".form").eq(1).html());
			$('#build input[type="submit"]').addClass('btn');
			$('#build').find('.loading').remove();
		});
		$.get('http://seriousroutes.com/', function (rp) {
			var div = $('<div></div>'),
				$rp = $(rp.replace(/<script[ >][\s\S]*?<\/script>/g, '')),
				$srs = $('#serious');
			$(div).append($('<div></div>').html($rp).find('#routes').html());
			$srs.append(div);
			$srs.find('form').each(function () {
				$(this).attr('action', 'http://www.glitch.com/locations/' + $(this).attr('action'));
				$(this).find('button').addClass('btn');
			});
			$srs.find('.loading').remove();
		});
		$.get('http://resources.grelca.com/route', function (rp) {
			$('#grelca').append($('<div></div>').html($(rp.replace(/<script[ >][\s\S]*?<\/script>/g, ''))).find("#route-list").html());
			$('.group').addClass('label label-info');
			$('#grelca input[type="submit"]').addClass('btn');
			$('#grelca').find('.loading').remove();
		});
		$('.star').remove();
		$('button, input[type="submit"]').addClass('btn');
		$('.tab-content').on('a', 'click', function (event) {
			chrome.tabs.create({
				url: $(this).attr('href')
			});
		});
	});

	// Search Glitch Strategy

	function getUrlVar(key) {
		var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
		return decodeURIComponent(result && result[1] || "");
	}

	function search(query, process) {
		jQuery.getJSON('http://www.glitch-strategy.com/w/api.php', {
			'fomat': 'json',
			'action': 'opensearch',
			'search': query,
			'limit': 100
		}, function (response) {
			process(response[1]);
		});
	}

	function openWiki(page) {
		$('#cnt').html('<img src="images/ajax-loader.gif" alt="loading..." class="loading">');
		$.getJSON('http://www.glitch-strategy.com/w/api.php', {
			'action': 'parse',
			'format': 'json',
			'page': page,
			'prop': 'text'
		}, function (response) {
			$('base').attr('href', 'http://www.glitch-strategy.com');
			$('#cnt').empty().append('<hr><h1>' + page.replace(new RegExp('_', 'g'), ' ') + '</h1>\n' + response.parse.text['*'].replace(new RegExp('href="/wiki/', 'g'), 'data-wiki="1" href="http://glitch-strategy.com/wiki/'));
			localStorage.clear();
			$('#cnt a').not('a[data-wiki="1"]').each(function () {
				var $this = $(this),
					href = this.href.split('/');
				if (href[0] != 'chrome-extension:') {
					$(this).on("click", function (event) {
						chrome.tabs.create({
							url: $(this).attr('href')
						});
					});
				}
			});
			$('base').attr('href', '');
		});
	}
	if (getUrlVar('s')) search(getUrlVar('s'));
	$('#s').keypress(function () {
		$('#s').typeahead({
					'source': search
		});
	});
	$('#cnt').on('click', 'a[data-wiki="1"]', function () {
		var page = this.href.split('/')[4];
		$('#s').val(page.replace(new RegExp('_', 'g'), ' '));
		openWiki(page);
	})
	$('form').eq(0).submit(function (e) {
		openWiki($('#s').val());
		return false;
	});

});
/**
* Bootstrap.js by @fat & @mdo
* plugins: bootstrap-tab.js, bootstrap-typeahead.js
* Copyright 2012 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function(a){var b=function(b){this.element=a(b)};b.prototype={constructor:b,show:function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.attr("data-target"),e,f,g;d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,""));if(b.parent("li").hasClass("active"))return;e=c.find(".active a").last()[0],g=a.Event("show",{relatedTarget:e}),b.trigger(g);if(g.isDefaultPrevented())return;f=a(d),this.activate(b.parent("li"),c),this.activate(f,f.parent(),function(){b.trigger({type:"shown",relatedTarget:e})})},activate:function(b,c,d){function g(){e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),f?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var e=c.find("> .active"),f=d&&a.support.transition&&e.hasClass("fade");f?e.one(a.support.transition.end,g):g(),e.removeClass("in")}},a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("tab");e||d.data("tab",e=new b(this)),typeof c=="string"&&e[c]()})},a.fn.tab.Constructor=b,a(function(){a("body").on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})})}(window.jQuery),!function(a){var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.typeahead.defaults,c),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.highlighter=this.options.highlighter||this.highlighter,this.updater=this.options.updater||this.updater,this.$menu=a(this.options.menu).appendTo("body"),this.source=this.options.source,this.shown=!1,this.listen()};b.prototype={constructor:b,select:function(){var a=this.$menu.find(".active").attr("data-value");return this.$element.val(this.updater(a)).change(),this.hide()},updater:function(a){return a},show:function(){var b=a.extend({},this.$element.offset(),{height:this.$element[0].offsetHeight});return this.$menu.css({top:b.top+b.height,left:b.left}),this.$menu.show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(b){var c;return this.query=this.$element.val(),!this.query||this.query.length<this.options.minLength?this.shown?this.hide():this:(c=a.isFunction(this.source)?this.source(this.query,a.proxy(this.process,this)):this.source,c?this.process(c):this)},process:function(b){var c=this;return b=a.grep(b,function(a){return c.matcher(a)}),b=this.sorter(b),b.length?this.render(b.slice(0,this.options.items)).show():this.shown?this.hide():this},matcher:function(a){return~a.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(a){var b=[],c=[],d=[],e;while(e=a.shift())e.toLowerCase().indexOf(this.query.toLowerCase())?~e.indexOf(this.query)?c.push(e):d.push(e):b.push(e);return b.concat(c,d)},highlighter:function(a){var b=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");return a.replace(new RegExp("("+b+")","ig"),function(a,b){return"<strong>"+b+"</strong>"})},render:function(b){var c=this;return b=a(b).map(function(b,d){return b=a(c.options.item).attr("data-value",d),b.find("a").html(c.highlighter(d)),b[0]}),b.first().addClass("active"),this.$menu.html(b),this},next:function(b){var c=this.$menu.find(".active").removeClass("active"),d=c.next();d.length||(d=a(this.$menu.find("li")[0])),d.addClass("active")},prev:function(a){var b=this.$menu.find(".active").removeClass("active"),c=b.prev();c.length||(c=this.$menu.find("li").last()),c.addClass("active")},listen:function(){this.$element.on("blur",a.proxy(this.blur,this)).on("keypress",a.proxy(this.keypress,this)).on("keyup",a.proxy(this.keyup,this)),(a.browser.chrome||a.browser.webkit||a.browser.msie)&&this.$element.on("keydown",a.proxy(this.keydown,this)),this.$menu.on("click",a.proxy(this.click,this)).on("mouseenter","li",a.proxy(this.mouseenter,this))},move:function(a){if(!this.shown)return;switch(a.keyCode){case 9:case 13:case 27:a.preventDefault();break;case 38:a.preventDefault(),this.prev();break;case 40:a.preventDefault(),this.next()}a.stopPropagation()},keydown:function(b){this.suppressKeyPressRepeat=!~a.inArray(b.keyCode,[40,38,9,13,27]),this.move(b)},keypress:function(a){if(this.suppressKeyPressRepeat)return;this.move(a)},keyup:function(a){switch(a.keyCode){case 40:case 38:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.lookup()}a.stopPropagation(),a.preventDefault()},blur:function(a){var b=this;setTimeout(function(){b.hide()},150)},click:function(a){a.stopPropagation(),a.preventDefault(),this.select()},mouseenter:function(b){this.$menu.find(".active").removeClass("active"),a(b.currentTarget).addClass("active")}},a.fn.typeahead=function(c){return this.each(function(){var d=a(this),e=d.data("typeahead"),f=typeof c=="object"&&c;e||d.data("typeahead",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>',minLength:1},a.fn.typeahead.Constructor=b,a(function(){a("body").on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(b){var c=a(this);if(c.data("typeahead"))return;b.preventDefault(),c.typeahead(c.data())})})}(window.jQuery)