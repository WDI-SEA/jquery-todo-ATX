$(document).ready(function(){
  $("#cat").fadeIn(4000);

  $('#myForm').submit(function(e){
    e.preventDefault();
    console.log('form was submitted with', $('#form1').val());
  });
});
