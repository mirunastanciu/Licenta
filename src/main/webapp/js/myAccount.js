$(window).resize(function(){
	location.reload();
});

var eladdresslist = [];
var acctype = $.cookie("accounting_type");
$(document).ready( function () {
	

		   			
		   			if(acctype == 2){
		   				$("#accounts").hide();
		   				$("#contracts").hide();
		   				$("#registartionreq").hide();
		   			}
		   			if(acctype == 3){
		   				$("#accounts").hide();
		   				$("#contracts").hide();
		   				$("#registartionreq").hide();
		   				$("#invoice").hide();
		   			}
	
});

$(document).ready( function () {
	console.log(acctype);
	$("#fnameedit").hide();
	$("#lnameedit").hide();
	$("#emailedit").hide();
	$("#addressedit1").hide();
	$("#addressedit2").hide();
	$("#save").hide();
	$("#changepassdiv").hide();

	$("#changepass").click(function(){
		console.log("jh")
		$("#changepassdiv").show();

	});

	$("#updatepasss").click(function(){
		var oldpass = $("div #oldpass").val();
		var newpass = $("div #newpass").val();
		var retypenewpass = $("div #retypenewpass").val();

		$.ajax({
			   method: "POST",
			   url: "checkOldPass",
			   data:{"oldpass": oldpass},
			   		success: function(data, status, xhr){

                     if(data == 1 ){
                    	 if(newpass === retypenewpass){
                    		 $.ajax({
  			   				   method: "POST",
  			   				   url: "updatePass",
  			   				   data:{"newpass": newpass},
  			   				   		success: function(data, status, xhr){
  			   				   		 $.notify({//options
  			  		    			    title:"<strong>Success!</strong>",
  			  		    				message:"The password has been changed.",
  			  		    					
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
  			   				   			$("#changepassdiv").hide();
  			   				   		}
  			   		     });
 
                     
                    	 
                    	 }else{
                    		 $.notify({//options
		  		    			    title:"<strong>Attention!</strong>",
		  		    				message:"The new passwords do not match.",
		  		    					
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
                    	 }
                    	 //alert("The new passwords do not match.");
                     }else if (data == 0 ){
                    	 $.notify({//options
  		    			    title:"<strong>Attention!</strong>",
  		    				message:"The old password is incorect.",
  		    					
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
                     }
                    	 
                     


			   		},error:function(){
			   			$.notify({//options
		    			    title:"<strong>Error!</strong>",
		    				message:"An error occurred, please try again later",
		    					
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



	});





	if(acctype == 1){
		//console.log("iggfdcvbjoiu")
		$("#contractinfo").hide();
		$('#personalinfo').removeClass('inLine');
		$('#personalinfo').addClass('centred');
		//document.getElementById('personalinfo').className += ' centred';
		$.ajax( "/getAdminDetails",
				{ type: 'GET',
			   		success: function(data, status, xhr){
			   			$("#idacc").html(data.idaccount);
			   			$("#fname").html(data.firstname);
			   			$("#lname").html(data.lastname);
			   			$("#email").html(data.email);
			   		},error:function(){
			   			$.notify({//options
		    			    title:"<strong>Error!</strong>",
		    				message:"An error occurred, please try again later",
		    					
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

		$.ajax("/getAddressByUser",
				{ type: 'GET',
			   		success: function(data, status, xhr){
			   			$("#address").html(data);

			   		},error:function(){
			   			alert("An error occurred, please try later")
			   		}
		});


	}else if(acctype == 2){
		$.ajax("/clientDetailsForMyAcc",
			{ type: 'GET',
			   		success: function(data, status, xhr){
			   			$("#idacc").html(data.idaccount);
			   			$("#fname").html(data.firstname);
			   			$("#lname").html(data.lastname);
			   			$("#email").html(data.email);
			   		},error:function(){
			   			alert("An error occurred, please try later")
			   		}
		});

		$.ajax("/getAddressByUser",
				{ type: 'GET',
			   		success: function(data, status, xhr){
			   			$("#address").html(data);

			   		},error:function(){
			   			alert("An error occurred, please try later")
			   		}
		});

		$.ajax( "/getClientContractExist",
				{ type: 'GET',
			success: function(data, status, xhr){
				if(data === 1){
					$.ajax( "/getClientContractDetailsForMyAcc",
							{ type: 'GET',
						success: function(data, status, xhr){
							
						   			$("#contractid").html(data.id);
						   			$("#status").html(data.status);
						   			$("#value").html(data.amount);
						   			$("#currency").html(data.curency);
						   			$("#signdate").html(data.signdate);
						   			$("#startdate").html(data.startdate);
						   			$("#expdate").html(data.expirationdate);
						   		},error:function(){
						   			alert("An error occurred, please try later")
						   		}
					});
				}else{
					$("#contractinfo").hide();
				}
						
			},
			error:function(){
				$.notify({//options
    			    title:"<strong>Error!</strong>",
    				message:"An error occurred, please try again later",
    					
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
			}
		});
	}else if(acctype == 3){
		$.ajax( "/employeeDetailsForMyAcc",
				{ type: 'GET',
			   		success: function(data, status, xhr){
			   			$("#idacc").html(data.idaccount);
			   			$("#fname").html(data.firstname);
			   			$("#lname").html(data.lastname);
			   			$("#email").html(data.email);
			   		},error:function(){
			   			$.notify({//options
		    			    title:"<strong>Error!</strong>",
		    				message:"An error occurred, please try again later",
		    					
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

		$.ajax( "/getEmployeeContractDetailsForMyAcc",
				{ type: 'GET',
			   		success: function(data, status, xhr){
			   			$("#contractid").html(data.id);
			   			$("#status").html(data.status);
			   			$("#value").html(data.salary);
			   			$("#currency").html(data.curency);
			   			$("#signdate").html(data.signdate);
			   			$("#startdate").html(data.startdate);
			   			$("#expdate").html(data.expirationdate);
			   		},error:function(){
			   			$.notify({//options
		    			    title:"<strong>Error!</strong>",
		    				message:"An error occurred, please try again later",
		    					
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

		$.ajax( "/getAddressByUser",
				{ type: 'GET',
			   		success: function(data, status, xhr){
			   			$("#address").html(data);

			   		},error:function(){
			   			$.notify({//options
		    			    title:"<strong>Error!</strong>",
		    				message:"An error occurred, please try again later",
		    					
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


		}


});

function edit(){

	$("#fnameedit").show();
	$("#lnameedit").show();
	$("#addressedit1").show();
	$("#addressedit2").show();
	$("#emailedit").show();
	$("#save").show();
	$("#editaccinfo").hide();



}


function firstNameChange(){

	$("#firstname").click(function(e) {
		var fname = $("#firstname p").text();
		var fnameedit = document.getElementById("fnameedit");
		 if(fname !== fnameedit && $(fnameedit).val().length !== 0 ){
			 if(e.target.id !== "fnameedit"){
				$("#fname").html(fnameedit.value);
				$('#fnameedit').val('');

	    		}
			 }
	});
}

function lastNameChange(){

	$("#lastname").click(function(e) {
		var lname = $("#lastname p").text();
		var lnameedit = document.getElementById("lnameedit");
		 if(lname !== lnameedit && $(lnameedit).val().length !== 0 ){
			 if(e.target.id !== "lnameedit"){
				$("#lname").html(lnameedit.value);
				$('#lnameedit').val('');

	    		}
			 }
	});
}

function emailChange(){


	$("#email1").click(function(e) {
		var email = $("#email1 p").text();
		var emailedit = document.getElementById("emailedit");
		if(e.target.id !== "emailedit"){
			     if(document.getElementById("emailedit").checkValidity()){
			    	 if(email !== emailedit && $(emailedit).val().length !== 0 ){
						 if(e.target.id !== "emailedit"){
							$("#email").html(emailedit.value);
							$('#emailedit').val('');
							document.getElementById("save").disabled = false;

				    		}
						 }
			     }else{
			    	 $.notify({//options
		    			    title:"<strong>Attention!</strong>",
		    				message:"The e-mail is invalid.",
		    					
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
			    	 //alert("invalid Email");
			    	 document.getElementById("save").disabled = true;
			     }
		}
		 	});
}

function addressChange(){

		var address = $("#addressdiv p").text();


			 var country1 = $("div #counrty").val();
			 var county1 = $("div #county").val();
			 var town1 = $("div #town").val();
			 var street1 = $("div #street").val();
			 var streetno1 = $("div #streetno").val();
			 var buildno1 = $("div #buildno").val();
			 var appno1 = $("div #appno").val();

			 if(country1 == "" || county1 == "" || town1 == "" || street1 == "" || streetno1 == "" || buildno1 == "" || appno1 == ""){
				 $.notify({//options
	    			    title:"<strong>Attention!</strong>",
	    				message:"please complete all mandatory fields.",
	    					
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

				 //alert("all fields are mandatory to chante address");
			 }else{
				 var addressedit = country1+", "+county1+", "+town1+", "+street1+" "+streetno1
					+", Build Number: "+buildno1+", App No:"+appno1;

				 if(address !== addressedit && addressedit !== ""  ){

								 eladdresslist.push(country1);
								 eladdresslist.push(county1);
								 eladdresslist.push(town1);
								 eladdresslist.push(street1);
								 eladdresslist.push(streetno1);
								 eladdresslist.push(buildno1);
								 eladdresslist.push(appno1);

								 localStorage.eladdresslist = JSON.stringify(eladdresslist);

								   $("#address").html(addressedit);
									$("div #counrty").val('');
									$("div #county").val('');
									$("div #town").val('');
									$("div #street").val('');
									$("div #streetno").val('');
									$("div #buildno").val('');
									$("div #appno").val('');

					}
		    	}


}

function save(){
	var fname = $("#firstname p").text();
	var lname = $("#lastname p").text();
	var email = $("#email1 p").text();

	var response1=1;
	var response2=1;

	if(eladdresslist.length !== 0){
		var add = JSON.parse(localStorage.eladdresslist);
		console.log(add[0])

		var country2 = add[0];
		var county2 =add[1];
		var town2 = add[2];
		var street2 = add[3];
		var streetno2 = add[4];
		var buildno2 = add[5];
		var appno2 = add[6];
		
		$.ajax({
			   method: "POST",
			   url: "changeAddressMyAcc",
			   data:{"country2": country2,
				     "county2": county2,
				     "town2":town2 ,
				     "street2": street2,
				     "streetno2": streetno2,
				     "buildno2": buildno2,
				     "appno2": appno2
			   },
			   		success: function(data, status, xhr){
			   			
			   		},error:function(){
			   			response2=0;
			   		}
		});

	}

	//
	
		$.ajax({
			   method: "POST",
			   url: "updateMyAcc",
			   data:{"fname": fname,
				     "lname": lname,
				     "email": email
				    
			   },
			   		success: function(data, status, xhr){
			   			
			   		},error:function(){
			   			response1=0;
			   		}
		});



		 

		 

	 if(response1 === 1 && response2 === 1){
			 $.notify({//options
			    title:"<strong>Success!</strong>",
				message:"The new Account Informations has been saved.",
					
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
			
			location.reload();
		}

}

/*}else{
	location="/unauthorized";
}
*/








