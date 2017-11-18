//AJAX interaction that causes a POST request to save the attributes of myFood from
//the food game file to the gallery
$(document).ready(function() {
	$("#SaveButton").click(function(e){
		//e.preventDefault();
		$.ajax({
			type: "POST",
			url: "/createafruit",
			data: {
				type: myFood.type,
				accessories: myFood.addons
			},
			success: function(result) {
				alert("Saved to the gallery!");
			},
			error: function(result) {
				alert("Error!");
			}
		});
	});
});