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
	 console.log(email);
	 
	 
		
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
			   alert("The account have been saved succesfull !");
			   }
		 });
 }	 