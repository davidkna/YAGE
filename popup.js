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

	function search(query) {
		jQuery.getJSON('http://www.glitch-strategy.com/w/api.php', {
			'fomat': 'json',
			'action': 'opensearch',
			'search': query,
			'limit': 100
		}, function (response) {
			$('#result').empty();
			for (var i = 0; i < response[1].length; i++) {
				//$('#result').append('<li><a href="show.html?s=' + response[1][i] + '">' + response[1][i] + '</a></li>\n');
				$('#s').typeahead({
					'source': response[1]
				});
			}
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
			$('#cnt').empty().append('<hr><h1>' + page + '</h1>\n' + response.parse.text['*'].replace(new RegExp('href="/wiki/', 'g'), 'data-wiki="1" href="http://glitch-strategy.com/wiki/'));
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
		search($('#s').val());
	});
	$('#cnt').on('click', 'a[data-wiki="1"]', function () {
		$('#s').val($(this).text());
		openWiki($(this).text());
	})
	$('form').eq(0).submit(function (e) {
		openWiki($('#s').val());
		return false;
	});

});