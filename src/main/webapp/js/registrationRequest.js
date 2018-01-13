function sent(){
	var name = $("#name").val();
	var email = $("#email").val();
	var phone =  $("#phone").val();
	
	if(name === "" || email ==="" || phone === ""){
		alert("Please complete all mandatory fields.");
	}else{
		if(document.getElementById("email").checkValidity()){
			$.ajax({
				method: "POST",
				url: "registrationRequest",
				data:
					{"name": name,
					 "email": email,
					 "phone": phone
					},
					success: function(data, status, xhr){
						alert("The request has been sant.");
						location="http://localhost:8080/loginPage";
					}, error: function(){
						alert("The request has not been sant.");
						}
			});
		}else{
			alert("The e-mail is not valid.");
		}
		
	}
} 