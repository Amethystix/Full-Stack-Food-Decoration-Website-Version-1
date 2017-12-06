$(document).ready(function(){
	$("input:button").click(function(e){
		//e.preventDefault();
		const ID = this.id;
		$.ajax({
			type: "POST",
			url: "/myGallery",
			data: {
				id: ID
			},
			success: function(result){
				alert("Deleted from the gallery");
				window.location.reload();
			},
			error: function(result){
				alert("Error in deleting");
			}
		});
	});
});
//If the user hits the delete button
