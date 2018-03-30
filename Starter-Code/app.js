console.log("js is working!");


$('#postInputForm').on('submit', (e) => {
	e.preventDefault();
	console.log("button pushed");
	console.log($('#postInput').val());
	$('ul').append("<li>" + $('#postInput').val() + "</li>");
	$('#postInput').val('');
});
	

