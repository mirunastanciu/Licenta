
function Login(){
	 
	var username = $('#username').val();
	var password = $('#password').val();
	
	document.cookie = "loged_username="+username; 
	//console.log(document.cookie);
	

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
					location = data;
				}else{
				 window.location.replace(data);
				}
			}, error: function(){
				alert("error on Login");
				}
	});
};
function redirectForgotPass(){
	location="http://localhost:8080/forgotPasswordPage";
}

function redirectRegisterAcc(){
	location="http://localhost:8080/registerAccount";
}

function redirectRegistrationRequest(){
	location="http://localhost:8080/registationRequestPage";
}


function validateSecureCode() {
	var idrequest = $("#idrequest").val();
	var securecode = $("#securecode").val();

	if(idrequest === "" || securecode ==="" ){
		alert("All fields are mandatory");
	}else{
		$.ajax({
			method: "POST",
			url: "valivationSecureCode",
			data:
				{"idrequest": idrequest,
				 "securecode": securecode				 
				},
				success: function(data, status, xhr){
					if(data === "1"){
						alert("The request doesn't exist !");
					}else if(data === "2"){
						alert("This secure code is incorrect");
					}else{
						alert(data);
						location="http://localhost:8080/registerAccount"
					}
					
				}, error: function(){
					alert("error on validation secure code");
					}
		});
	}
}

function openValidationSecureCodeModal(){
	//$('#validateSecureCodeModal').modal('show');
	$('#validateSecureCodeModal').modal('show');
}

