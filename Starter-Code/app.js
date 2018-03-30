console.log("js is working!");


$('#postInputForm').on('submit', (e) => {
	e.preventDefault();
	console.log("button pushed");
	console.log($('#postInput').val());
	$('li').append($('#postInput').val());
	
	//.append($('<li></li>'));
	// $('li').addTo('ul')


	// $('li')append($("#postInput").val());
});
	// create new li
	// append to ul
