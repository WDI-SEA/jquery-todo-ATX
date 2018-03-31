$( document ).ready(function() {
	let postCount = 0;
	let listObj = {};

	$("#form1").on("submit", (e) => {
		e.preventDefault();
		if ($("#inputList").val()) {
			postCount++;
			$("#postCount").text(postCount);
			let objNum = Object.keys(listObj).length;
			let myTime = new Date().toLocaleString();
			listObj[objNum] = {};
			listObj[objNum].value = $("#inputList").val();
			listObj[objNum].time = myTime;
		}
		sortFromOldest();
	})

	$("#sortFromTop").on("click", () => {
		sortFromNewest();
	})


	const sortFromOldest = () => {
		$("#myList").empty();
		for(key in listObj){
			$("<li>",{
			    text: listObj[key].value,
			    class: "list-items",
			    id: "list-" + key
			}).appendTo("#myList");
		}
	}

	const sortFromNewest = () => {
		$("#myList").empty();
		let reverseOrder = [];
		for(key in listObj){
			reverseOrder += key;
		}
		for (let i = reverseOrder.length-1; i >= 0; i--) {
			$("<li>",{
			    text: listObj[i].value,
			    class: "list-items",
			    id: "list-" + i
			}).appendTo("#myList");
		}
	}
	$("#reset").on("click", () => {
		$("#myList").empty();
	})

});