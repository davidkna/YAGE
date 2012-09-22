$(function ($) {
	function getUrlVar(key) {
		var result = new RegExp(key + "=([^&]*)", "i").exec(location.search);
		return decodeURIComponent(result && result[1] || "");
	}

	$('.loading').attr('src', chrome.extension.getURL('images/ajax-loader.gif'));
	$('.navbar a').each(function() {
		$(this).attr('href', chrome.extension.getURL($(this).attr('href')));
	});
	localStorage.clear();

	var page = getUrlVar('s') || localStorage['openEntry'];
	$.getJSON('http://www.glitch-strategy.com/w/api.php', {
		'action': 'parse',
		'format': 'json',
		'page': page,
		'prop': 'text'
	}, function (response) {
		$('base').attr('href', 'http://www.glitch-strategy.com');
		$('#cnt').empty().append('<h1>' + page.replace(new RegExp('_', 'g'), ' ') + '</h1>\n'+ response.parse.text['*'].replace(new RegExp('href="/wiki/', 'g'), 'data-wiki="1" href=" ' + chrome.extension.getURL('show.html') + '?s='));
		localStorage.clear();
		$('#cnt a').each(function () {
			var $this = $(this),
				href = this.href.split('/');
			if ( href[0] != 'chrome-extension:' ) {
			$(this).on("click", function (event) {
				chrome.tabs.create({
					url: $(this).attr('href')
				});
			});
		}
		});
	});
});