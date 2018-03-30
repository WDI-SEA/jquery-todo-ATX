let choreList = [];

$(document).ready(function(){
  $("#cat").fadeIn(4000);
 
	// const chores = function (event) {
	$("#submitButton").click((event) => {
	event.preventDefault();
	let getChore = $('#form1').val();
	let newChore = $('<li>');
	// newChore.innerHTML = getChore;
	$("#list").append(newChore);
	$(newChore).html("Cheshire's chore is" + getChore);
	$('#form1').val('');
	
})
});


const addToLocalStorage = (item) => {
	choreList.push(item)
	localStorage.setItem("LSChores", JSON.stringify(choreList));
	console.log("adding to storage");
};

const getFromLocalStorage = () => {
	console.log("getting from local storage");
	choreList = JSON.parse(localStorage.getItem("LSChores")) || [];

	console.log(choreList, typeof choreList);

};













