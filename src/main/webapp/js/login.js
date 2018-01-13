
function Login(){
	 
	var username = $('#username').val();
	var password = $('#password').val();
	
	document.cookie = "loged_username="+username; 
	
	var logeduser = $.cookie("loged_username");
	 /*$.ajax({
         url: "/login",
         type: 'GET',
         success: function(res) {
             console.log(res);
             alert(res);
         }
     });*/

	 $.ajax({
		   method: "POST",
		   url: "accountType",
		   data:{"logeduser": logeduser},
		   		success: function(data, status, xhr){
		   			document.cookie = "accounting_type="+data;
		   		}
	 });

	$.ajax({
		method: "POST",
		url: "accountvalidation",
		data:
			{"username": username,
			 "password": password
			},
			success: function(data, status, xhr){
				if(data == "/registerAccount"){
					alert("This account dosn't exist ! Please register...");
					location = data;
				}else{
				 window.location.replace(data);
				}
			}, error: function(){
				//alert("error on Login");
				}
	});
};
function redirectForgotPass(){
	location="/forgotPasswordPage";
}

function redirectRegisterAcc(){
	location="/registerAccount";
}

function redirectRegistrationRequest(){
	location="/registationRequestPage";
}


function validateSecureCode() {
	var idrequest = $("#idrequest").val();
	var securecode = $("#securecode").val();

	if(idrequest === "" || securecode ==="" ){
		alert("Please complete all mandatory fields.");
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
						alert("The request number doesn't exist.");
					}else if(data === "2"){
						alert("This secure code is not valid");
					}else{
						alert(data);
						location="/registerAccount"
					}
					
				},error:function(){
			    	   alert("An error occurred, please try later.")
			       }
		});
	}
}

function openValidationSecureCodeModal(){
	//$('#validateSecureCodeModal').modal('show');
	$('#validateSecureCodeModal').modal('show');
}

