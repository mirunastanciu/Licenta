function sent(){
	var name = $("#name").val();
	var email = $("#email").val();
	var phone =  $("#phone").val();
	
	if(name === "" || email ==="" || phone === ""){
		$.notify({//options
		    title:"<strong>Attention!</strong>",
			message:"Please complete all mandatory fields."
				
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
		//alert("Please complete all mandatory fields.");
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
						$.notify({//options
		    			    title:"<strong>Success!</strong>",
		    				message:"The request has been sant."
		    					
		    				},
		    				{//settings
		    					allow_dismiss: true,
		    					//element:".modal",	
		    					type:"success",
		    					position: "fixed",
		    					placement: {
		    						from: "top",
		    						align: "center"
		    					}
		    				
		    			});
						var delay = 3000; 
						setTimeout(function(){ window.location = "/loginPage"; }, delay);
						//location="loginPage";
					}, error: function(){
						$.notify({//options
		    			    title:"<strong>Error!</strong>",
		    				message:"The request has not been sant."
		    					
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
						//alert("The request has not been sant.");
						}
			});
		}else{
			$.notify({//options
			    title:"<strong>Attention!</strong>",
				message:"The e-mail is invalid."
					
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
			//alert("The request has been sant.");
		}
		
	}
} 