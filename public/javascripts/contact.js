//document references the dom top level
$(document).ready(function(){
	var validator = $("#contactForm").validate();
console.log("contact.js public");
	$("form").submit(function(e) {
		e.preventDefault();
		var form = $(this);
		console.log(form.serialize());
		$.ajax({ 
			type: "POST",
	        	url: "/contact",
//			contentType: 'application/json; charset=utf-8',
			json: true,
			dataType: 'json',
			data: form.serialize(), 
			success: console.log("form success")
		});

	});

});
