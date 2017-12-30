/*var x = $.cookie("loged_username");
console.log(x);*/
var logeduser = $.cookie("loged_username");

$(document).ready( function () {
	$.ajax({
		   method: "POST",
		   url: "accountType",
		   data:{"logeduser": logeduser},
		   		success: function(data, status, xhr){
		   			if(data === 2 || data === 3){
		   				$("#accounts").hide();
		   				$("#contracts").hide();
		   				$("#registartionreq").hide();
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

	
});

