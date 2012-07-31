$(function ($) {
	$.get('http://feeds.feedburner.com/GlitchStrategy?format=xml', function (response) {
		var $feed = $('<div class="feed"></div>');
		$(response).find("item").each(function () {
			var $this = $(this);
			$feed.append('<div class="item">\n<h3><a href="' + $this.find('link').text() + '">' + $this.find('title').text() + '</h2>\nPosted <time>' + $this.find('pubDate').text().replace(' +0000', '') + '</time><p>\n' + $this.find('description').text() + '</p>\n</a></div>\n');
		})
		$('#feed').append($feed);
	});
	$('#feed').on("click", "a", function (event) {
		chrome.tabs.create({
			url: $(this).attr('href')
		});
	});
});