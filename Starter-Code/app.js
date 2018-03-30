// Your jQuery Logic will go here

// $('#addForm').submit(function (e) {
//  e.preventDefault();
//  console.log('submitted!');
// });
// const inputBox = $('addForm');

$(document).ready(function(){
$('button').click( (e) => {
  e.preventDefault();
  var taskText = $("#addTask").val();
  var newLI = $('<li>');
  newLI.on('click', liMove);
  $('#outstanding').append(newLI);
  $(newLI).html(taskText);
  $('#addTask').val('');
})
});


$(document).ready(function(){
// $('li').click( (e) => {
//  // e.preventDefault();
//  var taskDone = e.target;
//  var lIDone = document.createElement('li');
//  $('#done').append(lIDone);
//  $(lIDone).html(taskDone);
// })
})

function liMove(e){
  $(this).appendTo($('#done'));
}

// add click event to item in first column

// once firstArray item is clicked, splice out of firstArray and add to secondArray.