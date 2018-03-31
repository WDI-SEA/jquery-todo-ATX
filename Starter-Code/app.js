$( document ).ready(function() {
	let postCount = 0;
	let listObj = {};
	let sortingMethod = "byOldest";


	// if there's a value in the input field and the user submits, will add the
	// value into the master object and display the list based on the selected
	// sorting method, then clear the form
	$("#form1").on("submit", (e) => {
		e.preventDefault();
		if ($("#inputList").val()) {
			postCount++;
			$("#postCount").text(postCount);
			addItemToObject();
			createList();
		} else { alert("Nothing to add :(") }
	})

	// sorts the list as newest on top
	$("#sortFromNewest").on("click", () => {
		sortingMethod = "byNewest";
		if ($("#inputList").val()) {
			addItemToObject();
		}
		createList();
	})

	// sorts the list as oldest on top
	$("#sortFromOldest").on("click", () => {
		sortingMethod = "byOldest";
		if ($("#inputList").val()) {
			addItemToObject();
		}
		createList();
	})

	// resets the list and counter
	$("#reset").on("click", () => {
		$("#myList").empty();
		listObj = {};
		postCount = 0;
		$("#postCount").text(postCount);
	})

	// creates the list based on the master object and selected sorting option
	const createList = () => {
		$("#myList").empty();
		document.getElementById("form1").reset();
		switch(sortingMethod){
			case "byOldest":
				sortFromOldest();
				break;
			case "byNewest":
				sortFromNewest();
				break;
			default:
				console.log("sortingMethod variable value missing")
				break;
		}
	}

	// creates a new list item and stores it in a master object into its own 
	// object that contains the value written into the field, the order in 
	// which it was written, and the date and time when it was written
	const addItemToObject = () => {
		let objNum = Object.keys(listObj).length;
		let myTime = new Date().toLocaleString();
		listObj[objNum] = {};
		listObj[objNum].value = $("#inputList").val();
		listObj[objNum].time = myTime;
	}

	// for every item that was inserted into the master object, create a list
	// element with an id based on the object key within the master object
	// a shared "list-items" class, the string that was inputted, and append
	// that element to the <ul>
	const sortFromOldest = () => {
		for(key in listObj){
			$("<li>",{
			    text: listObj[key].value,
			    class: "list-items",
			    id: "list-" + key
			}).appendTo("#myList");
		}
	}

	const sortFromNewest = () => {
		let reverseOrder = [];
		for(key in listObj){
			reverseOrder += key;
		}
		for (let i = reverseOrder.length-1; i >= 0; i--) {
			$("<li>",{
			    text: listObj[i].value,
			    class: "list-items",
			    id: "list-" + i 		//might need to change
			}).appendTo("#myList");
		}
	}


});