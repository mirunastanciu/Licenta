

function Save(){
	 var firstname =  $('#fname').val();
	 var lastname = $('#lname').val();
	 var email = $('#email').val();
	 var username = $('#Uname').val();
	 var password = $('#Pass').val();
	 sel = document.getElementById("country");
	 var country = sel.options[sel.selectedIndex].value;
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
						 $.trim($('#Uname').val()) === '' ||  $.trim($('#Pass').val()) === '' ||
						 $.trim($('#county').val()) === '' || $.trim($('#town').val()) === '' || $.trim($('#street').val()) === '' ||
						 $.trim($('#streetno').val()) === '' || $.trim($('#build').val()) === '' || $.trim($('#appno').val()) === ''){

					 alert("There are one or more mandatory fields to be fill in !");
					 
				 }else{
					 $.ajax({
						   method: "POST",
						   url: "saveClientAccount",
						   data: {firstname: firstname,
						          lastname: lastname,
						          email: email,
						          username: username,
						          password: password,
						          country: country,
						          county: county,
						          town: town,
						          street: street,
						          streetno: streetno,
						          buildno: buildno,
						          appno: appno}
						          
						          ,
						   success: function(data, status, xhr){
							   console.log(data);
							   if(data !== "faild"){
								   alert("The account have been saved succesfull !");
								   window.location.replace("http://localhost:8080/loginPage"); 

								   
							   }else{
								   alert("The username already exist !");
							   }
							   	
						   },error: function(){
							 	alert("Error on saving client accout !!");
						   }
					 });
				 }

		  /* },error: function(){
			 	alert("The username already exist !");
		   }*/
	 /*});*/
	 
 }	 

