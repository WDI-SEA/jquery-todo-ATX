// Your jQuery Logic will go here



var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"

var map;

//$(document).ready(function(){
console.log("loading google page");
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.78, lng: -122.44},
    zoom: 8
    


  });

  $("button").bind("click", ()=>{
  	//console.log("button has been clicked");
  	$.ajax({
  		method: 'GET',
  		url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson",
  		dataType: 'json',
  		success: onSuccess
  	});
  });
  
  function onSuccess(responseData){
  	console.log(responseData.metadata.title);
  };

//})

console.log("linking to js file");

let inputText ;
//let array = [];

	var table = $("#tb");
	var row = $("#row");
	console.log(row);
	var column1 = $("<td>Task to do: </td>");
	var column2 = $("<td> Date was given </td>")
	console.log(column1);
	row.append(column1);
	row.append(column2);

let submitForm = $("#addform");

submitForm.submit(function(event){
	event.preventDefault();
	inputText = $("#textform").val();

	console.log(inputText);
	if( inputText !== "")
	{

		var d = new Date();
		//array.push(inputText);
		saveToLocalStorage(d, inputText);


		var col = $("<td></td>");
		var colDate = $("<td></td>");
		var nrow = $("<tr></tr>");

		console.log(col);
		col.append(inputText);
		//var col1 = $("<td></td>");
		colDate.append(d);
		nrow.append(col);
		nrow.append(colDate);
		
	}
	table.append(nrow);
});

$("#deleteBtn").bind('click', ()=>{
	table.remove();
})






saveToLocalStorage = (key, value)=> {
	var mykey = JSON.stringify(key);
	localStorage.setItem(mykey, value);
	console.log(localStorage);
}



$("#removeBtn").bind('click', () => {
	var myTempString = inputText;
	var temp = inputText;
	var myMap = new Map();
	for(var i = 0; i < $("#textform").val().length; i++){
		//var myMap = new Map();
		//console.log("test");
		if(myMap.has(inputText[i])){
			//temp = temp.substring(i -1, temp.length);
			myTempString = myTempString.substring(0, i);
			//myTempString += temp;
			//temp = inputText.substring(i, inputText.length);
			//myTempString += temp;
		}
		else{
			myMap.set(myTempString[i], 1);
		}
	}
	console.log(myTempString);
	$("#textform").val(myTempString);
	//inputText.html(myTempString);
	//console.log(myTempString);
})
$("#occuranceBtn").bind('click', ()=>{
	
	var myMap = new Map()
	var count = 1;
	var tempCount = 1;
	
	var tempStrlength = $("#textform").val().length;
	

	for (var i = 0; i <= tempStrlength; i++){
		
		if(myMap.has(inputText[i]))
		{
			
			myMap.set(inputText[i], ++tempCount);
		}
		else{
			myMap.set(inputText[i], 1);
		}
	}
	console.log(myMap.get("a"));
	console.log(myMap);
})

$("#ajax").bind('click', ()=>{
	console.log("connecting to the demo.html");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			document.getElementById("demo").innerHTML = this.responseText;
		}
	}
	xhttp.open("GET","demo.html", true);
	xhttp.send();
});

//var loadDoc = ()=>{
	//console.log("connecting to the demo.html")
//}	

// $addform.submit(function){

