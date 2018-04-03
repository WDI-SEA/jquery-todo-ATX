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
	if (localStorage.getItem("sortingMethod")){
		sortingMethod = JSON.parse(localStorage.getItem("sortingMethod"));
	}
	
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
		let button = $("#sortFromNewest");
		let method = "byNewest";
		sortButton(button, method);
	})

	// sorts the list as oldest on top
	$("#sortFromOldest").on("click", () => {
		let button = $("#sortFromOldest");
		let method = "byOldest";
		sortButton(button, method);
	})

	const sortButton = (button, method) => {
		sortingMethod = method;
        if (!button.hasClass("btn-primary")) {
        	$("button").removeClass("btn-primary");
        	button.addClass("btn-primary");
        }
		if ($("#inputList").val()) {
			addItemToObject();
		}
		createList();
	}
	$("#sortFromAtoZ").on("click", () => {
		sortingMethod = "byAtoZ";
		localStorage.setItem("sortingMethod", JSON.stringify(sortingMethod));
        if (!$("#sortFromAtoZ").hasClass("btn-primary")) {
	    	$("button").removeClass("btn-primary");
	    	$("#sortFromAtoZ").addClass("btn-primary");
        }
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
		sortingMethod = "byNewest";
		sortButton($("#sortFromNewest"), "byNewest");
		$("#postCount").text(postCount);
		localStorage.removeItem("listArr");
		localStorage.removeItem("postCount");
		localStorage.removeItem("sortingMethod");
	})

	let delay = 300, clicks = 0, timer = null;
    $("body").on("click", ".list-items", (e) => {
    	let crossedItem = e.target.id.replace(/([^0-9])*/g, "");
        clicks++;
        if(clicks === 1) {
            timer = setTimeout(() => {
            	if ($(e.target).hasClass("lineThrough")) {
                	$(e.target).removeClass("lineThrough");
                	listArr[crossedItem].crossed = false;
            	} else {
            		$(e.target).addClass("lineThrough");
            		listArr[crossedItem].crossed = true;
            	}
            	localStorage.setItem("listArr", JSON.stringify(listArr));
                clicks = 0;
            }, delay);

        } else {
            clearTimeout(timer);
            listArr.splice(crossedItem, 1);
            postCount--;
            $("#postCount").text(postCount);
            createList();
            localStorage.setItem("postCount", JSON.stringify(postCount));
            localStorage.setItem("listArr", JSON.stringify(listArr));
            clicks = 0;
        }
    })
    .on("dblclick", ".list-items", (e) => {
        e.preventDefault();
    });

	// loads post count, master array, and sorting method from previous sessions if they exist. Otherwise create defaults


	// creates the list based on the master array and selected sorting option
	const createList = () => {
		$("#myList").empty();
		document.getElementById("form1").reset();
		localStorage.setItem("sortingMethod", JSON.stringify(sortingMethod));
		switch(sortingMethod){
			case "byOldest":
				sortFromOldest();
				break;
			case "byNewest":
				sortFromNewest();
				break;
			case "byAtoZ":
				sortAtoZ();
				break;
			default:
				console.log("sortingMethod variable value missing")
				break;
		}
	}

	// creates a new list item and stores it in a master array into its own object that contains the value written into the field, the order in which it was written, and the date and time when it was written
	const addItemToObject = () => {
		let myTime = new Date().toLocaleString();
		let itemID = 0;
		if (listArr[listArr.length-1]) {
			itemID = listArr.length
		}
		listArr.push({
			value: $("#inputList").val(),
			time: myTime,
			crossed: false,
			id: itemID
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

	const sortAtoZ = () => {
		let tempArray = [];
		let sortedArray = [];
		listArr.forEach(val => {
			tempArray.push(val.value)
		})
		sortedArray = tempArray.sort();
		tempArray = [];
		for(let i = 0; i < sortedArray.length; i++){
			for (let j = 0; j < listArr.length; j++) {
				for (let key in listArr[j]){
					if (listArr[j][key] === sortedArray[i]) {
						tempArray.push([sortedArray[i], listArr[j].id, j]);
					} 
				}
			}
		}
		let temp = 0;
		for(let k = 0; k < tempArray.length; k++){
			temp = tempArray[k][2];
			$("<li>",{
			    text: tempArray[k][0],
			    class: "list-items",
			    id: "list-" + temp
			}).appendTo("#myList");
			$("<span>",{
			    class: "glyphicon glyphicon-remove removeIcon",
			    id: "listSpan-" + temp
			}).appendTo("#list-" + temp);
			if (listArr[temp].crossed === true ) {
				$("#list-" + temp).addClass("lineThrough");
			}
		}
	}

	const appendToList = (i) => {
		$("<li>",{
		    text: listArr[i].value,
		    class: "list-items",
		    id: "list-" + i 
		}).appendTo("#myList");
		$("<span>",{
		    class: "glyphicon glyphicon-remove removeIcon",
		    id: "listSpan-" + i
		}).appendTo("#list-" + i);
		if (listArr[i].crossed === true) {
			$("#list-" + i).addClass("lineThrough");
		}
	}
	if (sortingMethod === "byOldest"){
		sortButton($("#sortFromOldest"), "byOldest");
	} else if (sortingMethod === "byAtoZ"){
		sortButton($("#sortFromAtoZ"), "byAtoZ");
	}
	createList();
	$("#postCount").text(postCount);
});