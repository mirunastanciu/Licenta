/*var x = $.cookie("loged_username");
console.log(x);*/
var logeduser = $.cookie("loged_username");
var acctype = $.cookie("accounting_type");

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
	$("#counrty").hide();
	$("#county").hide();
	$("#town").hide();	
	$("#street").hide();
	$("#streetno").hide();
	$("#buildno").hide();
	$("#appno").hide();	
	$("#emailedit").hide();
	
	
	if(acctype == 1){
		$("#contractinfo").hide();
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
	$("#counrty").show();
	$("#county").show();
	$("#town").show();	
	$("#street").show();
	$("#streetno").show();
	$("#buildno").show();
	$("#appno").show();	
	$("#emailedit").show();
	
}



		
		
		
		


