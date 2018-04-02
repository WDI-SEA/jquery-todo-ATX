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
	$("#sortFromNewest").on("click", (e) => {
		sortingMethod = "byNewest";
        // if ($("button").hasClass("btn-default")) {
        // 	console.log("has class");
        // 	$(e.target).removeClass("btn-default");
        // 	$(e.target).addClass("btn-primary");
        // 	$("#sortFromOldest").removeClass("btn-primary").addClass("btn-default");
        // }
		if ($("#inputList").val()) {
			addItemToObject();
		}
		createList();
	})

	// sorts the list as oldest on top
	$("#sortFromOldest").on("click", (e) => {
		sortingMethod = "byOldest";
		// if ($(e.target).hasClass(".btn-default")) {
		// 	console.log("has class");
  // 		 	$(e.target).removeClass("btn-default");
  // 			$(e.target).addClass("btn-primary");
  // 		 	$("#sortFromNewest").removeClass("btn-primary").addClass("btn-default");
  // 		 }
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

   //  const makePrimary = (e) => {
   //  	if ($(".btn").hasClass("btn-primary")) {
			// $(".btn").removeClass("btn-primary");
	  //       $(".btn").addClass("btn-default");
   //  	}
   //      if ($(e.target).hasClass("btn-default")) {
   //      	$(e.target).removeClass("btn-default");
   //      	$(e.target).addClass("btn-primary");
   //      }
   //  }

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
			time: myTime,
			crossed: false
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
		$("<span>",{
		    class: "glyphicon glyphicon-remove removeIcon",
		    id: "listSpan-" + i 
		}).appendTo("#list-" + i);
		if (listArr[i].crossed === true) {
			$("#list-" + i).addClass("lineThrough");
		}
	}

	createList();
	$("#postCount").text(postCount);
});