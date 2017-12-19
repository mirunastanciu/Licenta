function sent(){
	var name = $("#name").val();
	var email = $("#email").val();
	var phone =  $("#phone").val();
	
	if(name === "" || email ==="" || phone === ""){
		alert("All fields are mandatory");
	}else{
		$.ajax({
			method: "POST",
			url: "registrationRequest",
			data:
				{"name": name,
				 "email": email,
				 "phone": phone
				},
				success: function(data, status, xhr){
					alert("The request was sant ");
					location="http://localhost:8080/loginPage";
				}, error: function(){
					alert("error change password");
					}
		});
	}
} 