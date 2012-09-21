$(function ($) {
	//search with Wikimedia-API
	$('form').submit(function (e) {
		return false;
	});

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
				$('#result').append('<li><a href="show.html?s=' + response[1][i] + '">' + response[1][i] + '</a></li>\n');
			}
		});
	}

	if (getUrlVar('s')) search(getUrlVar('s'));
	$('#s').keypress(function () {
		search($('#s').val());
		history.pushState({}, '', 'search.html?s=' + encodeURIComponent($('#s').val()));
	});
});