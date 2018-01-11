if( $.cookie("loged_username") !== "" ){

var logeduser = $.cookie("loged_username");

$(document).ready( function () {
	$.ajax({
		   method: "POST",
		   url: "accountType",
		   data:{"logeduser": logeduser},
		   		success: function(data, status, xhr){
		   			console.log(data)
		   			if(data === 2 ){
		   				$("#accounts").hide();
		   				$("#contracts").hide();
		   				$("#registartionreq").hide();
		   				$("#assignpersson").hide();
		   			}
		   			if(acctype == 3){
		   				$("#accounts").hide();
		   				$("#contracts").hide();
		   				$("#registartionreq").hide();
		   				$("#assignpersson").hide();
		   				$("#invoice").hide();
		   			}
		   		}
     });
});


$(document).ready(function () {
    var options;
	$.ajax("/allProjectTypesName",
		       { type: 'GET',
		 		 success: function (data) {
				       options = data;
				       	$('#projecttypelist').empty();
				    	$('#projecttypelist').append($('<option></option>').html(""));
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

				       	$('#assignep').empty();
				       	$('#assignep').append($('<option></option>').html(""));
				       	$.each(options, function(i, p) {
				       	$('#assignep').append($('<option></option>').val(p).html(p));
				       	});
		       }

		       })

});


function saveTicket(){
	var projecttype = $("#projecttypelist option:selected" ).text();
	var description = $("#desc").val();
	var assignpers = $("#assignep option:selected" ).text();
	var duedate = $("#duedate").val();
	if(projecttype ==="" || description === "" || assignpers === "" || duedate === ""){
	   alert("All the fields are mandatory")
	}else{
		$.ajax({
			method: "POST",
			url: "addTicket",
			data:
				{"projecttype": projecttype,
				 "description": description,
				 "assignpers": assignpers,
				 "duedate": duedate,
				 "logeduser": logeduser
				},
				success: function(data, status, xhr){
					alert("The Ticket has been saved successfull");
					location = data;


				}, error: function(){
					alert("error on saving new ticket");
					}
		});
	}

		

}

}else{
	location="/unauthorized";
}