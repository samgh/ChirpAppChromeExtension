function copyTextToClipboard(text) {
    var copyFrom = $('<textarea/>');
    copyFrom.text(text);
    $('body').append(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.remove();
}

$(function() {
	$('#shorten-button').click(function() {
		$('#spinner').show();
		$('#tweet').css('opacity', '0.5');
		$.ajax({
		    type: 'POST',
    		url: 'http://chirpappapi-env-kxv8gngpvg.elasticbeanstalk.com/chirpapp/api/v1.0/tweet',
    		data: JSON.stringify({"tweet" : $('#tweet').val()}),
    		contentType: 'application/json; charset=utf-8',
    		dataType: 'json',
			success: function(result){
		      	$("#tweet").val(result.tweet);
		      	$('#spinner').hide();
		      	$('#tweet').css('opacity', '1.0');

		      	length = $('#tweet').val().length;
		      	$('#character-count').text(length + '/140');
		      	if (length > 140) $('#character-count').css('color', 'red');
		      	else $('#character-count').css('color', 'inherit');
	      	},
	      	error: function() {
	      		$('#spinner').hide();
	      		$('#tweet').css('opacity', '1.0');
	      	} 
	    });
	});

	$('#tweet').bind("keyup", function(event, ui) {
		length = $('#tweet').val().length
		$('#character-count').text(length + '/140');
		if (length > 140) $('#character-count').css('color', 'red');
		else $('#character-count').css('color', 'inherit');
	});

	$('#tweet-button').click(function() {
		var newURL = "https://twitter.com/intent/tweet?text=" + encodeURIComponent($('#tweet').val());
  		chrome.tabs.create({ url: newURL });
	});

	$('#copy-button').click(function() {
		copyTextToClipboard($('#tweet').val())
	});
});

