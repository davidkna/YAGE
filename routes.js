$(function ($) {
	$.get('http://glitchroutes.com/build/', function (rp) {
		var $rp = $('<div></div>').html($(rp.replace(/<script[ >][\s\S]*?<\/script>/g, '')));
		$rp.find('form').attr('action', 'http://glitchroutes.com/build/').removeAttr('style').wrap('<div class="form"></div>');
		$('#build').append($rp.find(".form").eq(0).html() + '<hr/>'+ $rp.find(".form").eq(1).html());
		$('#build input[type="submit"]').addClass('btn');
		$('#build').find('.loading').remove();
	});
	$.get('http://seriousroutes.com/', function (rp) {
		var div = $('<div></div>'),
			$rp = $(rp.replace(/<script[ >][\s\S]*?<\/script>/g, '')),
			$srs = $('#serious');
		$(div).append($('<div></div>').html($rp).find('#routes').html());
		$srs.append(div);
		$srs.find('form').each(function() {
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
/* ========================================================
 * bootstrap-tab.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */
!function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype={constructor:b,show:function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.attr("data-target"),e,f,g;if(!d){d=b.attr("href");d=d&&d.replace(/.*(?=#[^\s]*$)/,"")}if(b.parent("li").hasClass("active"))return;e=c.find(".active a").last()[0];g=a.Event("show",{relatedTarget:e});b.trigger(g);if(g.isDefaultPrevented())return;f=a(d);this.activate(b.parent("li"),c);this.activate(f,f.parent(),function(){b.trigger({type:"shown",relatedTarget:e})})},activate:function(b,c,d){function g(){e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");b.addClass("active");if(f){b[0].offsetWidth;b.addClass("in")}else{b.removeClass("fade")}if(b.parent(".dropdown-menu")){b.closest("li.dropdown").addClass("active")}d&&d()}var e=c.find("> .active"),f=d&&a.support.transition&&e.hasClass("fade");f?e.one(a.support.transition.end,g):g();e.removeClass("in")}};a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("tab");if(!e)d.data("tab",e=new b(this));if(typeof c=="string")e[c]()})};a.fn.tab.Constructor=b;a(function(){a("body").on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault();a(this).tab("show")})})}(window.jQuery)