var acctype = $.cookie("accounting_type");


$(document).ready(function () {
	
	if(acctype == 2 ){
		$("#accounts").hide();
		$("#contracts").hide();
		$("#registartionreq").hide();
		$("#assignpersson").hide();
	    
	}
	if(acctype == 3){
		$("#accounts").hide();
		$("#contracts").hide();
		$("#registartionreq").hide();
		$("#invoice").hide();
		$("#donet").hide();
  
	}
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
		       },error:function(){
		    	   
		    	   $.notify({//options
	    			    title:"<strong>Error!</strong>",
	    				message:"An error occurred, please try later",
	    					
	    				},
	    				{//settings
	    					allow_dismiss: true,
	    					element:".modal",	
	    					type:"danger",
	    					position: "fixed",
	    					placement: {
	    						from: "top",
	    						align: "center"
	    					}
	    				
	    			});
		   		}

		       });

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
		       },error:function(){
		    	   $.notify({//options
	    			    title:"<strong>Error!</strong>",
	    				message:"An error occurred, please try later",
	    					
	    				},
	    				{//settings
	    					allow_dismiss: true,
	    					element:".modal",	
	    					type:"danger",
	    					position: "fixed",
	    					placement: {
	    						from: "top",
	    						align: "center"
	    					}
	    				
	    			});
		   		}

		       })

});


function saveTicket(){
	var projecttype = $("#projecttypelist option:selected" ).text();
	var description = $("#desc").val();
	var assignpers = $("#assignep option:selected" ).text();
	var duedate = $("#duedate").val();
	if(projecttype ==="" || description === "" || duedate === ""){
		 $.notify({//options
			    title:"<strong>Attention!</strong>",
				message:"Please complete all mandatory fields",
					
				},
				{//settings
					allow_dismiss: true,
					//element:".modal",	
					type:"danger",
					position: "fixed",
					placement: {
						from: "top",
						align: "center"
					}
				
			});
	}else{
		$.ajax({
			method: "POST",
			url: "addTicket",
			data:
				{"projecttype": projecttype,
				 "description": description,
				 "assignpers": assignpers,
				 "duedate": duedate
				 
				},
				success: function(data, status, xhr){
					 $.notify({//options
		    			    title:"<strong>Success!</strong>",
		    				message:"The Ticket has been saved.",
		    					
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
					//alert("The Ticket has been saved.");
					location = data;


				},error:function(){
					 $.notify({//options
		    			    title:"<strong>Error!</strong>",
		    				message:"An error occurred, please try later",
		    					
		    				},
		    				{//settings
		    					allow_dismiss: true,
		    					element:".modal",	
		    					type:"danger",
		    					position: "fixed",
		    					placement: {
		    						from: "top",
		    						align: "center"
		    					}
		    				
		    			});
		   		}
		});
	}

		

}

