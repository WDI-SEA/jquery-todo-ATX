console.log("js is working!");


$('#postInputForm').on('submit', (e) => {
	e.preventDefault();
	console.log("button pushed");
	console.log($('#postInput').val());
	$('ul').append("<li>" + $('#postInput').val() + "</li>");
	$('#postInput').val('');

	$('li').on('click', (e) => {
		console.log('list item was clicked');
		$('li').css("text-decoration", "line-through");
	})
});
	
