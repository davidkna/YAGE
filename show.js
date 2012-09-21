$(function ($) {
	function getUrlVar(key) {
		var result = new RegExp(key + "=([^&]*)", "i").exec(location.search);
		return decodeURIComponent(result && result[1] || "");
	}

	var page = getUrlVar('s') || localStorage['openEntry'];
	$.getJSON('http://www.glitch-strategy.com/w/api.php', {
		'action': 'parse',
		'format': 'json',
		'page': page,
		'prop': 'text'
	}, function (response) {
		console.log(page);
		$('#cnt').empty().append('<h1>' + page + '</h1>\n'+response.parse.text['*'].replace(new RegExp('src="/', 'g'), 'src="http://www.glitch-strategy.com/').replace(new RegExp('href="/wiki/', 'g'), 'data-wiki="1" href="show.html?s=').replace(new RegExp('href="/', 'g'), 'href="http://www.glitch-strategy.com/'));
		localStorage.clear();
		$('#cnt a').each(function () {
			var $this = $(this),
				oHref = this.href.split('/');
			if ( oHref[0] != 'chrome-extension:' ) {
			$(this).on("click", function (event) {
				chrome.tabs.create({
					url: $(this).attr('href')
				});
			});
		}
		});
	});
});