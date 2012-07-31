$(function ($) {
	function getUrlVar(key) {
		var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
		return decodeURIComponent(result && result[1] || "");
	}
	$.getJSON('http://www.glitch-strategy.com/w/api.php', {
		'action': 'parse',
		'format': 'json',
		'page': getUrlVar("s"),
		'prop': 'text'
	}, function (response) {
		$('#cnt').html(response.parse.text['*']);
		$('#cnt').prepend('<h1>' + getUrlVar('s') + '</h1>\n');
		$('#cnt img').each(function () {
			var $this = $(this);
			if ($this.attr('src')[0] == '/') $this.attr('src', 'http://www.glitch-strategy.com/' + $this.attr('src'))
		});
		$('#cnt a').each(function () {
			var $this = $(this);
			if ($this.attr('href')[0] == '/') $this.attr('href', 'http://www.glitch-strategy.com/' + $this.attr('href'))
		});
	});
});