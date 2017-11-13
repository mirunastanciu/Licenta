x$(document).ready(function () {       
    var options;
	$.ajax("/allProjectTypesName", 
		       { type: 'GET',
		 		 success: function (data) {		        	 
				       options = data;
				       	$('#projecttypelist').empty();
				       	$.each(options, function(i, p) {
				       	$('#projecttypelist').append($('<option></option>').val(p).html(p));
				       	});
		       } 
		         
		       })
		      
});

$(document).ready(function () {       
    var options;
	$.ajax("/getAllEmployiesName", 
		       { type: 'GET',
		 		 success: function (data) {		        	 
				       options = data;
				       
				       	$('#assigne').empty();
				       	$.each(options, function(i, p) {
				       	$('#assigne').append($('<option></option>').val(p).html(p));
				       	});
		       } 
		         
		       })
		      
});


/*function ValidateForm(){
	var a=document.forms["addTicket"]["description"].value;
	var b=document.forms["addTicket"]["duedate"].value;
	
	if(a == "" || b==""){
		alert("You have some empty fields !!!")
	}
};*/