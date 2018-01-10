function save(){
	
	
	var username = $("#username").val();
	var idaccount = $("#idacount").val();
	var newpass =  $("#password").val();
	var passretype = $("#passwordretype").val();document.getElementById('passwordretype').value;
	var email = $("#email").val();
	
	if(username === "" || idaccount ==="" || newpass === "" || passretype === "" || email === ""){
		alert("All fields are mandatory");
	}else{
		$.ajax({
			method: "POST",
			url: "forgotPassword",
			data:
				{"username": username,
				 "idaccount": idaccount,
				 "newpass": newpass,
				 "passretype": passretype,
				 "email": email
				 
				},
				success: function(data, status, xhr){
					console.log(data);
					if(data === "1"){
						alert("The Id account doesn't exist !");
					}else if(data === "2"){
						alert("The username doesn't exist ! ");
					}else if(data === "3"){
						alert("parole nu corespund");	
					}else{
						alert(data);
						location = "http://localhost:8080/loginPage";
					}
					


				}, error: function(){
					alert("error change password");
					}
		});
	}

		
}