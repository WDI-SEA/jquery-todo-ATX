// Your jQuery Logic will go here
console.log("js linked");

let submitForm = $("#submit-form");


submitForm.submit(function(e) {
	e.preventDefault();
	let inputText = $("#input-box").val();
	
	$('#toDoList').append(
    	$('<li>').append(inputText)      
	);
	document.forms['submit-form'].reset()
});

var element = document.getElementById('toDoList');

$("<li>").click(function(element) {
	// element.removeChild(element);
	console.log("clicked list")
})


// submitForm.addEventListener("submit", function(e){
//     e.preventDefault();
//     let blogPost = $('#input-box').value;
//     posts.unshift(blogPost)
//  	console.log(blogPost);
//     document.forms['submit-form'].reset()
//   });