

function Save(){
	 var firstname =  $('#fname').val();
	 var lastname = $('#lname').val();
	 var email = $('#email').val();
	 var username = $('#Uname').val();
	 var password = $('#Pass').val();
	 
	 var country = $('#country').val();
	 var county = $('#county').val();
	 var town = $('#town').val();
	 var street = $('#street').val();
	 var streetno = $('#streetno').val();
	 var buildno = $('#build').val();
	 var appno = $('#appno').val();
	
	/* $.ajax({
		   method: "POST",
		   url: "uniqueUser",
		   data: {username: username}
		          
		   ,success: function(data, status, xhr){*/
			   if( $.trim($('#fname').val()) === ''|| $.trim($('#lname').val()) === '' || $.trim($('#email').val()) === '' ||
						 $.trim($('#Uname').val()) === '' ||  $.trim($('#Pass').val()) === '' ||  $.trim($('#country').val()) === '' ||
						 $.trim($('#county').val()) === '' || $.trim($('#town').val()) === '' || $.trim($('#street').val()) === '' ||
						 $.trim($('#streetno').val()) === '' || $.trim($('#build').val()) === '' || $.trim($('#appno').val()) === ''){
				   
				   $.notify({//options
					    title:"<strong>Attention!</strong>",
						message:"Please complete all mandaroty fields.",
							
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
					
					 //alert("Please complete all mandatory fileds.");
					 
				 }else{
					 if(document.getElementById("email").checkValidity()){
						 $.ajax({
							   method: "POST",
							   url: "saveClientAccount",
							   data: {"firstname": firstname,
							          "lastname": lastname,
							          "email": email,
							          "username": username,
							          "password": password,
							          "country": country,
							          "county": county,
							          "town": town,
							          "street": street,
							          "streetno": streetno,
							          "buildno": buildno,
							          "appno": appno}
							          
							          ,
							   success: function(data, status, xhr){
								   console.log(data);
								   if(data == 1){
									   $.notify({//options
										    title:"<strong>Success!</strong>",
											message:"The account has been saved .",
												
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
										setTimeout(function(){ 
											window.location.replace("/loginPage"); 
										}, delay);
									   
	
									   
								   }else if(data == 0){
									   $.notify({//options
										    title:"<strong>Attention!</strong>",
											message:"This username alrady exist !Please try with another username.",
												
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
									   
									   //alert("This username alrady exist !Please try with another username.");
								   }
								   	
							   },error:function(){
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
								   //alert("An error occurred, please try later")
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

		  /* },error: function(){
			 	alert("The username already exist !");
		   }*/
	 /*});*/
	 
 }	 

