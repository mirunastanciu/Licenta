var counter = 0;

function Login(){
	var username = $('#username').val();
	var password = $('#password').val();
	
	if(username === "" ){
		$.notify({//options
					message:"The username field is mandatory.",
					button: "Confirm"
				},
				{//settings
					type:"danger",
					allow_dismiss: true,
					
					position: "fixed",
					placement: {
						from: "top",
						align: "center"
					}
					
		});
		counter = counter+1;
		
	}else if(password === ""){
		$.notify({//options
			message:"The password field is mandatory.",
			
		},
		{//settings
			type:"danger",
			allow_dismiss: true,
			
			position: "fixed",
			placement: {
				from: "top",
				align: "center"
			}
			
		});
		counter = counter+1;
	}
	
	if(counter < 3 && username !== "" && password !== ""){
		
		$.ajax({
			method: "POST",
			url: "accountvalidation",
			data:
				{"username": username,
				 "password": password
				},
				success: function(data, status, xhr){
					if(data == -1){
						$.notify({//options
									message:"This account dosn't exist ! Please register..."
								},
								{//settings
									template: 
											'<div style="margin-top:2px;" data-notify="container" class="col-xs-11 col-sm-3 s alert-warning" role="alert">'+
											'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>'+
											'<br>'+
											'<span data-notify="icon"></span>'+
											'<span data-placement="right"></span>' +
											'<span data-notify="message">This account dos not exist ! Please register...</span>'+
											'<br>'+
											'<br>'+
											'<p><a href="/registationRequestPage"  data-notify="url"><button>Ok</button></a><p>'+
											'</div>'
								}
					
						);
					}else if(data == 1){
						document.cookie = "loged_username="+username;						
						var logeduser = $.cookie("loged_username");
						window.location.replace(data);
						
						$.ajax({
							   method: "POST",
							   url: "accountType",
							   data:{"logeduser": logeduser},
							   		success: function(data, status, xhr){
							   			document.cookie = "accounting_type="+data;
							   		}
						 });
					}
		}, error: function(){
						$.notify({message:"An error ocured. Please try later."},
							{//settings
								type:"danger",
								allow_dismiss: true,
								
								position: "fixed",
								placement: {
									from: "top",
									align: "center"
									}
							});

					}
		});
	
		
	
	 if(counter === 3){
		 $.notify({//options
				message:"Please register.",
				},
				{//settings
					type:"warning",
					allow_dismiss: true,
					
					position: "fixed",
					placement: {
						from: "top",
						align: "center"
					}
				});
		 location="/registationRequestPage";
	 }

}}
	
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
		$.notify({//options
			message:"Please complete all mandatory fields.",
			button: "Confirm"
			},
			{//settings
				type:"danger",
				allow_dismiss: true,
				
				position: "fixed",
				placement: {
					from: "top",
					align: "center"
				}
			});
			
		//alert("Please complete all mandatory fields.");
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
						$.notify({//options
							message:"The request number doesn't exist.",
							button: "Confirm"
						},
						{//settings
							type:"danger",
							allow_dismiss: true,
							
							position: "fixed",
							placement: {
								from: "top",
								align: "center"
							}
						});
						//alert("The request number doesn't exist.");
					}else if(data === "2"){
						$.notify({//options
							message:"This secure code is not valid",
							button: "Confirm"
						},
						{//settings
							type:"danger",
							allow_dismiss: true,
							
							position: "fixed",
							placement: {
								from: "top",
								align: "center"
							}
						});
						//alert("This secure code is not valid");
					}else{
						$.notify({//options
							message:data,
							button: "Confirm"
						},
						{//settings
							type:"danger",
							allow_dismiss: true,
							
							position: "fixed",
							placement: {
								from: "top",
								align: "center"
							}
						});
						//alert(data);
						location="/registerAccount"
					}
					
				},error:function(){
					$.notify({//options
						message:"An error occurred, please try later.",
						button: "Confirm"
					},
					{//settings
						type:"danger",
						allow_dismiss: true,
						
						position: "fixed",
						placement: {
							from: "top",
							align: "center"
						}
					});
			    	   //alert("An error occurred, please try later.")
			       }
		});
	}
}

function openValidationSecureCodeModal(){
	//$('#validateSecureCodeModal').modal('show');
	$('#validateSecureCodeModal').modal('show');
}

