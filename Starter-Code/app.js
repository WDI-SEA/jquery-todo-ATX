let choreList = {};

$(document).ready(function(){
  $("#cat").fadeIn(4000);
  
 


});



const addToLocalStorage = (item) => {
	localStorage.setItem('choreList', JSON.stringify(item));
}

const getFromLocalStorage = () => {
	let savedChore = localStorage.getItem('choreList')
	if (savedChore){
		choreList = JSON.parse(savedChore);
	for(let key in choreList) {
		$('#list').append('<li> ${choreList[key].task}');
		

	};


};

	console.log(choreList, typeof choreList);

};

	// const chores = function (event) {
	$("#submitButton").click((event) => {
	event.preventDefault();	
	if($('#form1').val()){
		let getChore = $('#form1').val();
		let newChore = $('<li>');
		// newChore.innerHTML = getChore;
		choreList.task = getChore
		choreList.timeStamp = event .timeStamp
		$("#list").append(newChore);
		$(newChore).html("Cheshire's chore is " + getChore);
		$('#form1').val('');
		console.log(choreList);
		
	
};
});











