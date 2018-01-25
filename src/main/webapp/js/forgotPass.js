function save(){
	
	
	var username = $("#username").val();
	var idaccount = $("#idacount").val();
	var newpass =  $("#password").val();
	var passretype = $("#passwordretype").val();document.getElementById('passwordretype').value;
	var email = $("#email").val();
	
	if(username === "" || idaccount ==="" || newpass === "" || passretype === "" || email === ""){
		
		$.notify({//options
		    title:"<strong>Attention!</strong>",
			message:"Please complete all mandaroty fields.",
				
			},
			{//settings
				allow_dismiss: true,
			    //element: ".modal",		
				type:"danger",
				position: "fixed",
				placement: {
					from: "top",
					align: "center"
				}
			
		});
		//alert("Please complete all mandatory fields.");
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
							$.notify({//options
							    title:"<strong>Attention!</strong>",
								message:"The Id account doesn't exist !",
									
								},
								{//settings
									allow_dismiss: true,
										
									type:"danger",
									position: "fixed",
									placement: {
										from: "top",
										align: "center"
									}
								
							});
							//alert("The Id account doesn't exist !");
						}else if(data === "2"){
							$.notify({//options
							    title:"<strong>Attention!</strong>",
								message:"The username doesn't exist!",
									
								},
								{//settings
									allow_dismiss: true,
										
									type:"danger",
									position: "fixed",
									placement: {
										from: "top",
										align: "center"
									}
								
							});
							//alert("The username doesn't exist ! ");
						}else if(data === "3"){
							$.notify({//options
							    title:"<strong>Attention!</strong>",
								message:"The passwords are not metch!",
									
								},
								{//settings
									allow_dismiss: true,
										
									type:"danger",
									position: "fixed",
									placement: {
										from: "top",
										align: "center"
									}
								
							});
							//alert("parole nu corespund");	
						}else{
							$.notify({//options
							    title:"<strong>Success!</strong>",
								message:data,
									
								},
								{//settings
									allow_dismiss: true,
										
									type:"success",
									position: "fixed",
									placement: {
										from: "top",
										align: "center"
									}
								
							});
							var delay = 2000; 
							setTimeout(function(){ window.location = "/loginPage"; }, delay);
							//location = "/loginPage";
						}
						
	
	
					}, error: function(){
						$.notify({//options
						    title:"<strong>Error!</strong>",
							message:"An error occurred, please try later",
								
							},
							{//settings
								allow_dismiss: true,
									
								type:"danger",
								position: "fixed",
								placement: {
									from: "top",
									align: "center"
								}
							
						});
						//alert("An error occurred, please try later");
						}
			});
		}else{
			$.notify({//options
			    title:"<strong>Attention!</strong>",
				message:"The e-mail is not valid.",
					
				},
				{//settings
					allow_dismiss: true,
						
					type:"danger",
					position: "fixed",
					placement: {
						from: "top",
						align: "center"
					}
				
			});
			//alert("The e-mail is not valid.");
		}
	}

		
}