function save(){
	
	
	var username = $("#username").val();
	var idaccount = $("#idacount").val();
	var newpass =  $("#password").val();
	var passretype = $("#passwordretype").val();document.getElementById('passwordretype').value;
	var email = $("#email").val();
	
	if(username === "" || idaccount ==="" || newpass === "" || passretype === "" || email === ""){
		alert("Please complete all mandatory fields.");
	}else{
		if(document.getElementById("email").checkValidity()){
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
							location = "/loginPage";
						}
						
	
	
					}, error: function(){
						alert("An error occurred, please try later");
						}
			});
		}else{
			alert("The e-mail is not valid.");
		}
	}

		
}