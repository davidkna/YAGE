$(function ($) {
	function getUrlVar(key) {
		var result = new RegExp(key + "=([^&]*)", "i").exec(location.search);
		return decodeURIComponent(result && result[1] || "");
	}
	$.getJSON('http://www.glitch-strategy.com/w/api.php', {
		'action': 'parse',
		'format': 'json',
		'page': getUrlVar('s'),
		'prop': 'text'
	}, function (response) {
		$('#cnt').empty().append(response.parse.text['*']);
		$('#cnt').prepend('<h1>' + getUrlVar('s') + '</h1>\n');
		$('#cnt img').each(function () {
			var $this = $(this);
			if ($this.attr('src')[0] == '/') $this.attr('src', 'http://www.glitch-strategy.com' + $this.attr('src'))
		});
		$('#cnt a').each(function () {
			var $this = $(this),
				oHref = this.href.split('/');
			if ( oHref[0] == 'chrome-extension:' ) {
				if ( oHref[3] == 'wiki') this.href = 'show.html?s=' + $(this).html();
				else {
					$(this).on("click", function (event) {
						chrome.tabs.create({
							url: 'http://www.glitch-strategy.com' + this.pathname
						});
					});
					this.href = 'http://www.glitch-strategy.com' + this.pathname;
				}
		} else {
			$(this).on("click", function (event) {
				chrome.tabs.create({
					url: $(this).attr('href')
				});
			});
		}
		});
	});
});