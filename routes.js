$(function ($) {
	$.get('http://glitchroutes.com/build/', function (rp) {
		var $rp = $('<div></div>').html($(rp));
		$rp.find('form').attr('action', 'http://glitchroutes.com/build/').removeAttr('style').wrap('<div class="form"></div>');
		$('#build').append('<h2><a href="http://glitchroutes.com/build/">Build Route</a></h2>\n' + $rp.find(".form").eq(0).html() + '<hr/>'+ $rp.find(".form").eq(1).html());
		$('#build input[type="submit"]').addClass('btn');
	});
	$.get('http://seriousroutes.com/', function (rp) {
		var div = $('<div></div>'),
			$rp = $(rp);
		$rp.find('button').addClass('btn');
		$(div).append('<h2 id=seriousroutes><a href="http://seriousroutes.com/">Serious Routes</a></h2>\n' + $('<div></div>').html($rp).find('#routes').html());
		$('#serious').append(div);
		$('#serious button').addClass('btn');
	});
	$.get('http://resources.grelca.com/route', function (rp) {
		$('#grelca').append('<h2 id=grelca><a href="http://resources.grelca.com/">Housing Routes &amp; Directory</a></h2>\n' + $('<div></div>').html($(rp)).find("#route-list").html());
		$('.group').addClass('label label-info');
		$('#grelca input[type="submit"]').addClass('btn');
	});
	$('.star').remove();
	$('button, input[type="submit"]').addClass('btn');
	$('#routes').on("click", "a:not(.btn)", function (event) {
		chrome.tabs.create({
			url: $(this).attr('href')
		});
	});
});