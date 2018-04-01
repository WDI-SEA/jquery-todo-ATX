$( document ).ready(function() {
	let postCount = 0;
	if (localStorage.getItem("postCount")){
		postCount = JSON.parse(localStorage.getItem("postCount"));
	}
	let listArr = [];
	if (localStorage.getItem("listArr")){
		listArr = JSON.parse(localStorage.getItem("listArr"));
	}
	let sortingMethod = "byNewest";

	// if there's a value in the input field and the user submits, will add the value into the master array and display the list based on the selected sorting method, then clear the form
	$("#form1").on("submit", (e) => {
		e.preventDefault();
		if ($("#inputList").val()) {
			postCount++;
			$("#postCount").text(postCount);
			addItemToObject();
			createList();
			localStorage.setItem("listArr", JSON.stringify(listArr));
			localStorage.setItem("postCount", JSON.stringify(postCount));
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
		listArr = [];
		postCount = 0;
		$("#postCount").text(postCount);
		localStorage.removeItem("listArr");
		localStorage.removeItem("postCount");
	})

	// creates the list based on the master array and selected sorting option
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

	// creates a new list item and stores it in a master array into its own object that contains the value written into the field, the order in which it was written, and the date and time when it was written
	const addItemToObject = () => {
		let myTime = new Date().toLocaleString();
		listArr.push({
			value: $("#inputList").val(),
			time: myTime
		})
	}

	// for every item that was inserted into the master array, create a list element with an id based on the index within the master array, a shared "list-items" class, the string that was inputted, and append that element to the <ul>
	const sortFromOldest = () => {
		for(let i = 0; i < listArr.length; i++){
			appendToList(i)
		}
	}

	const sortFromNewest = () => {
		for(let i = listArr.length-1; i >= 0; i--){
			appendToList(i)
		}
	}

	const appendToList = (i) => {
		$("<li>",{
		    text: listArr[i].value,
		    class: "list-items",
		    id: "list-" + i 
		}).appendTo("#myList");
	}

	createList();
	$("#postCount").text(postCount);
});