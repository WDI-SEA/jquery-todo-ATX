
$(document).ready(function(){
	$('button').click( (e) => {
  		e.preventDefault();
		var newLI = $('<li>');
		newLI.on('click', liMove);
		$('#jfdi').append(newLI);
		$(newLI).html($("#addTask").val());
		$('#addTask').val('');
	})
});

function liMove(e){
	$(this).appendTo($('#doneAF'));
}


