function login(){
	alert("kjhgf")
	var username =  document.getElementById('username').value;
	var password =  document.getElementById('password').value ;
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
			
			}, error: function(){
				alert("error on Login");
				}
	});
};