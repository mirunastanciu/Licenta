/*var x = $.cookie("loged_username");
console.log(x);*/

if( !!$.cookie('loged_username') && $.cookie("loged_username") !== "" ){
	

var logeduser = $.cookie("loged_username");
var acctype = $.cookie("accounting_type");

var eladdresslist = [];


$(document).ready( function () {
	$.ajax({
		   method: "POST",
		   url: "accountType",
		   data:{"logeduser": logeduser},
		   		success: function(data, status, xhr){
		   			if(data === 2){
		   				$("#accounts").hide();
		   				$("#contracts").hide();
		   				$("#registartionreq").hide();
		   			}
		   			if(data == 3){
		   				$("#accounts").hide();
		   				$("#contracts").hide();
		   				$("#registartionreq").hide();
		   				$("#invoice").hide();
		   			}
		   		}
     });
});


$(document).ready( function () {
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
			   data:{"oldpass": oldpass,
				     "logeduser": logeduser},
			   		success: function(data, status, xhr){

                     if(data == 1 && newpass === retypenewpass){
                    	 $.ajax({
			   				   method: "POST",
			   				   url: "updatePass",
			   				   data:{"newpass": newpass,
			   					     "logeduser": logeduser},
			   				   		success: function(data, status, xhr){

			   				   			$("#changepassdiv").hide();
			   				   		}
			   		     });

                     }else{
                    	 alert("the retype pass or the old password in incorect");
                     }


			   		},error:function(){

			   		}
	     });



	});





	if(acctype == 1){
		$("#contractinfo").hide();
		$('#personalinfo').removeClass('inLine');
		$('#personalinfo').addClass('centred');
		//document.getElementById('personalinfo').className += ' centred';
		$.ajax({
			   method: "POST",
			   url: "getAdminDetails",
			   data:{"logeduser": logeduser},
			   		success: function(data, status, xhr){
			   			$("#idacc").html(data.idaccount);
			   			$("#fname").html(data.firstname);
			   			$("#lname").html(data.lastname);
			   			$("#email").html(data.email);
			   		}
		});

		$.ajax({
			   method: "POST",
			   url: "getAddressByUser",
			   data:{"logeduser": logeduser},
			   		success: function(data, status, xhr){
			   			$("#address").html(data);

			   		}
		});


	}else if(acctype == 2){
		$.ajax({
			   method: "POST",
			   url: "clientDetailsForMyAcc",
			   data:{"logeduser": logeduser},
			   		success: function(data, status, xhr){
			   			$("#idacc").html(data.idaccount);
			   			$("#fname").html(data.firstname);
			   			$("#lname").html(data.lastname);
			   			$("#email").html(data.email);
			   		}
		});

		$.ajax({
			   method: "POST",
			   url: "getAddressByUser",
			   data:{"logeduser": logeduser},
			   		success: function(data, status, xhr){
			   			$("#address").html(data);

			   		}
		});


		$.ajax({
			   method: "POST",
			   url: "getClientContractDetailsForMyAcc",
			   data:{"logeduser": logeduser},
			   		success: function(data, status, xhr){
			   			$("#contractid").html(data.id);
			   			$("#status").html(data.status);
			   			$("#value").html(data.amount);
			   			$("#currency").html(data.curency);
			   			$("#signdate").html(data.signdate);
			   			$("#startdate").html(data.startdate);
			   			$("#expdate").html(data.expirationdate);
			   		}
		});
	}else if(acctype == 3){
		$.ajax({
			   method: "POST",
			   url: "employeeDetailsForMyAcc",
			   data:{"logeduser": logeduser},
			   		success: function(data, status, xhr){
			   			$("#idacc").html(data.idaccount);
			   			$("#fname").html(data.firstname);
			   			$("#lname").html(data.lastname);
			   			$("#email").html(data.email);
			   		}
		});

		$.ajax({
			   method: "POST",
			   url: "getEmployeeContractDetailsForMyAcc",
			   data:{"logeduser": logeduser},
			   		success: function(data, status, xhr){
			   			$("#contractid").html(data.id);
			   			$("#status").html(data.status);
			   			$("#value").html(data.salary);
			   			$("#currency").html(data.curency);
			   			$("#signdate").html(data.signdate);
			   			$("#startdate").html(data.startdate);
			   			$("#expdate").html(data.expirationdate);
			   		}
		});

		$.ajax({
			   method: "POST",
			   url: "getAddressByUser",
			   data:{"logeduser": logeduser},
			   		success: function(data, status, xhr){
			   			$("#address").html(data);

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
			    	 alert("invalid Email");
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

				 alert("all fields are mandatory to chante address");
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

	var response1=0;
	var response2=0;

	//console.log(localStorage.getItem("eladdresslist"))
	var add = JSON.parse(localStorage.eladdresslist);
	//console.log(add[1])

	var country2 = add[0];
	var county2 =add[1];
	var town2 = add[2];
	var street2 = add[3];
	var streetno2 = add[4];
	var buildno2 = add[5];
	var appno2 = add[6];

	//
	if(acctype == 1){
		$.ajax({
			   method: "POST",
			   url: "updateAdminMyAcc",
			   data:{"fname": fname,
				     "lname": lname,
				     "email": email,
				     "logeduser": logeduser
			   },
			   		success: function(data, status, xhr){
			   			/*response1=1;
			   			alert(response1);*/
			   			//alert("The new Account Informations has been saved succesfully .");
			   			//location.reload();
			   		}
		});



		 $.ajax({
			   method: "POST",
			   url: "changeAddressMyAcc",
			   data:{"country2": country2,
				     "county2": county2,
				     "town2":town2 ,
				     "street2": street2,
				     "streetno2": streetno2,
				     "buildno2": buildno2,
				     "appno2": appno2,
				     "logeduser": logeduser
			   },
			   		success: function(data, status, xhr){
			   			/*response2 = 1;
			   			alert(response2);*/
			   			//alert("The new Account Informations has been saved succesfully .");
			   			//location.reload();
			   		}
		});

		 location.reload();

		/* if(response1 === 1 && response2 === 1){
				alert("The new Account Informations has been saved succesfully .");
				location.reload();
			}else{
				alert("Error on saving new informations");
			}*/


	}else if(acctype == 2){

		$.ajax({
			   method: "POST",
			   url: "updateClMyAcc",
			   data:{"fname": fname,
				     "lname": lname,
				     "email": email,
				     "logeduser": logeduser
			   },
			   		success: function(data, status, xhr){

			   			response1=1;
			   			//alert("The new Account Informations has been saved succesfully .");
			   			//location.reload();
			   		}
		});

		$.ajax({
			   method: "POST",
			   url: "changeAddressMyAcc",
			   data:{"country2": country2,
				     "county2": county2,
				     "town2": town2,
				     "street2": street2,
				     "streetno2": streetno2,
				     "buildno2": buildno2,
				     "appno2": appno2,
				     "logeduser": logeduser
			   },
			   		success: function(data, status, xhr){
			   			response2=1;
			   			//alert("The new Account Informations has been saved succesfully .");
			   			//location.reload();
			   		}
		});

		location.reload();

		/*if(response1 === 1 && response2 === 1){
			alert("The new Account Informations has been saved succesfully .");
			location.reload();
		}else{
			alert("Error on saving new informations");
		}*/

	}else{

		$.ajax({
			   method: "POST",
			   url: "updateEmpMyAcc",
			   data:{"fname": fname,
				     "lname": lname,
				     "email": email,
				     "logeduser": logeduser
			   },
			   		success: function(data, status, xhr){
			   			response1=1;
			   			//alert("The new Account Informations has been saved succesfully .");
			   			//location.reload();
			   		}
		});

		$.ajax({
			   method: "POST",
			   url: "changeAddressMyAcc",
			   data:{"country2": country2,
				     "county2": county2,
				     "town2": town2,
				     "street2": street2,
				     "streetno2": streetno2,
				     "buildno2": buildno2,
				     "appno2": appno2,
				     "logeduser": logeduser
			   },
			   		success: function(data, status, xhr){
			   			response2=1;
			   			//alert("The new Account Informations has been saved succesfully .");
			   			//location.reload();
			   		}
		});

		/*if(response1 === 1 && response2 === 1){
			alert("The new Account Informations has been saved succesfully .");
			location.reload();
		}else{
			alert("Error on saving new informations");
		}*/
		location.reload();

	}

}

}else{
	location="/unauthorized";
}









