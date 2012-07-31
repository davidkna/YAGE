$(function ($) {
	$.get('http://seriousroutes.com/', function (rp) {
		var div = $('<div></div>');
		$(div).append('<h2 id=seriousroutes><a href="http://seriousroutes.com/">Serious Routes</a></h2>\n');
		$(div).append($('<div></div>').html($(b = rp)).find('#routes').html());
		$('#routes').append(div);
	});
	$.get('http://resources.grelca.com/route', function (rp) {
		$('#routes').append('<h2 id=grelca><a href="http://resources.grelca.com/">Housing Routes &amp; Directory</a></h2>\n' + $('<div></div>').html($(rp)).find("#route-list").html());
		$('.group').addClass('label label-info');
	});
	$.get('http://glitchroutes.com/build/', function (rp) {
		var $rp = $('<div></div>').html($(rp));
		$rp.find('form').attr('action', 'http://glitchroutes.com/build/').removeAttr('style').wrap('<div class="form"></div>');
		$('#routes').append('<h2 id=build><a href="http://glitchroutes.com/build/">Build Route</a></h2>\n' + $rp.find(".form").eq(0).html() + '<hr/>'+ $rp.find(".form").eq(1).html());
	});
	$('.star').remove()
	$('#routes').on("click", "a:not(.btn)", function (event) {
		chrome.tabs.create({
			url: $(this).attr('href')
		});
	});
});