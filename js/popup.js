$(function() {
	$('#button').click(function() {
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
});