function copyTextToClipboard(text) {
    var copyFrom = $('<textarea/>');
    copyFrom.text(text);
    $('body').append(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.remove();
}

$(function() {
	$('#chirp-button').click(function() {
		url = 'http://chirpappapi-env-kxv8gngpvg.elasticbeanstalk.com/chirpapp/api/v1.0/' 
			+ encodeURIComponent($('#tweet').val());
		$.ajax({
		    type: 'GET',
    		url: url,
			success: function(result){
				console.log(result.tweet);
		      	$("#tweet").val(result.tweet);
	      	}
	    });
	});
	$('#tweet-button').click(function() {
		var newURL = "https://twitter.com/intent/tweet?text=" + encodeURIComponent($('#tweet').val());
  		chrome.tabs.create({ url: newURL });
	});
	$('#copy-button').click(function() {
		copyTextToClipboard($('#tweet').val())
	})
});

