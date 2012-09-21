$(function ($) {
	$.getJSON('http://pipes.yahoo.com/pipes/pipe.run?_id=f20695275788f660010c83f300544904&_render=json', function (response) {
		var result = '';
		for (var i = 0; i < response.count; i++) {
			var item = response.value.items[i];
			result += '<div class="item">\n<h3><a href="' + item['feedburner:origLink'] + '">' + item.title + '</h2>\nPosted <time>' + item.pubDate.replace(' +0000', '') + '</time><p>\n' + '<img src="'+ $(item['content:encoded']).find('img').attr('src') +'">' +item.description + '</p>\n</a></div>\n';
		};
		$('#feed').append(result);
	});
	$('#feed').on("click", "a", function (event) {
		chrome.tabs.create({
			url: $(this).attr('href')
		});
	});
});