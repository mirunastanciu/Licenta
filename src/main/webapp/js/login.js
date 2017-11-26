 function Login(){
	var username = $('#username').val();
	 var password = $('#password').val();
	console.log(username);
	console.log(password);
	$.ajax({
		method: "POST",
		url: "accountvalidation",
		data:
			{"username": username,
			 "password": password
			},
			success: function(data, status, xhr){
				if(data == "http://localhost:8080/registerAccount"){
					alert("This account dosn't exist ! Please register...");
				}else{
				 window.location.replace(data); 
				}
			}, error: function(){
				alert("error on Login");
				}
	});
};