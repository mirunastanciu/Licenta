if(!!$.cookie('loged_username') && $.cookie("loged_username") !== "" ){

$(window).resize(function(){
	location.reload();
});

/*$(document).ready( function () {*/
	/*document.getElementById("addpos").disabled = true;*/


var options;
$.ajax("/getClientsName",
	       { type: 'GET',
	 		 success: function (data) {
	 			options = data;

			       	$('#clientlist').empty();
			       	$('#clientlist').append($('<option></option>').html(""));
			       	$.each(options, function(i, p) {
			       	$('#clientlist').append($('<option></option>').val(p).html(p));
			       	});
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
	    	   //alert("An error occurred, please try later.")
	       }

	       
	       });

function addPos(){
	/*if()*/

	var clientname = $("#clientlist option:selected").text();
	console.log(clientname);


	var options1;
	$.ajax({
		method: "POST",
		url: "getIdTByIdCl",
		data:
			{"clientname": clientname}
			,success: function(data, status, xhr){
				options1 = data;

				$('#ticketlist').empty();
				$('#ticketlist').append($('<option></option>').html(""));
		       	$.each(options1, function(i, p) {
		       	$('#ticketlist').append($('<option></option>').val(p).html(p));
		       	});

			},error:function(){
				$.notify({//options
    			    title:"<strong>Error!</strong>",
    				message:"An error occurred, please try again later",
    					
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
		    	   //alert("An error occurred, please try later.")
		       }
	});


	var options2=[];
	$.ajax("/getAllServices",
		       { type: 'GET',
		 		 success: function (data) {

		 			 for(i in data){
		 				options2[i] = data[i].neme;
		 			 }
				       	$('#serviceList').empty();
				       	$('#serviceList').append($('<option></option>').html(""));
				       	$.each(options2, function(i, p) {
				       	$('#serviceList').append($('<option></option>').val(p).html(p));
				       	});
		       },error:function(){
		    	   $.notify({//options
	    			    title:"<strong>Error!</strong>",
	    				message:"An error occurred, please try again later",
	    					
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
		    	   //alert("An error occurred, please try later.")
		       }

		       });
	//$('#addPosModal').modal({backdrop: 'static', keyboard: false});//nu se inchide la click
	//$('#addPosModal').modal('show');
	$("#addPosModal").modal({
	    backdrop: 'static',
	    keyboard: false,
	    show: true
	});
}

//save pos function
function savePos() {

	 var invoiceId = 0;

	 var servicename = $("#serviceList option:selected").text();
	 var idticket = $("#ticketlist option:selected").text();


	 if( $("#serviceList option:selected").text() === "" || $("#ticketlist option:selected").text() === ""){
		 $.notify({//options
			    title:"<strong>Attention!</strong>",
				message:"Please complete all mandatory fileds.",
					
				},
				{//settings
					element:".modal",	
					allow_dismiss: true,
					
					type:"danger",
					position: "fixed",
					placement: {
						from: "top",
						align: "center"
					}
				
			});
			 // alert("You must select a client and a ticket");
			  addPos();
		 /* $('#addPosModal').on('hidden.bs.modal', function() {
			  addPos();
		 	});
*/
		}else{
				$.ajax({
					   method: "POST",
					   url: "saveBillPosition",
					   data:{"servicename": servicename,
						   	  "idticket": idticket}
						   		,
					   success: function(data, status, xhr){
						    $.ajax({
								method: "POST",
								url: "getBillPositions",
								data:{"invoiceId": invoiceId}
									,success: function(data, status, xhr){

										var table = $('#positionList').dataTable({
											"sAjaxDataProp": "",
											"bFilter": false,
											"bPaginate": false,
											"bInfo": false,
											"responsive": true,
											"bSort" : false,
											"destroy": true,
											"order": [[ 0, "asc" ]],
											"data": data,
										    "columns": [
										        { data: "servicename" },
										        { data: "price" },
										        { data: "currency" },
										        { data: "idticket"}
										    ]

									    });



										$.ajax({
											method: "POST",
											url: "totalInvoice",
											data:{"invoiceId": invoiceId}
												,success: function(data, status, xhr){
													$("#total").html(data);
		
												}, error: function(){
													 $.notify({//options
										    			    title:"<strong>Error!</strong>",
										    				message:"An error occurred, please try again later",
										    					
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
													//alert("error total Invoice");
													}
		
										});

							},error:function(){
								 $.notify({//options
					    			    title:"<strong>Error!</strong>",
					    				message:"An error occurred, please try again later",
					    					
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
						    	   //alert("An error occurred, please try later.")
						       }

					});

					$('#addPosModal').modal('hide');

			   },error:function(){
				   $.notify({//options
	    			    title:"<strong>Error!</strong>",
	    				message:"An error occurred, please try again later",
	    					
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
		    	   //alert("An error occurred, please try later.")
		       }
			   });
			 }
 }

 function saveInvoice(){
	 var clientname = $("#clientlist option:selected").text();
	 var duedate =	 $("#duedate").val();
     var total = $("#total").text();
     var table = $('#positionList').DataTable();
     
     
     if( clientname === "" || duedate === "" || table.data().count() === 0 ){
    	 $.notify({//options
			    title:"<strong>Attention!</strong>",
				message:"Please complete all mandatory fields.",
					
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
    	 //alert ("You have empty fields")
     }else{
    	 $.ajax({
    	 		method: "POST",
    	 		url: "saveInvoice",
    	 		data:
    	 			{"clientname": clientname,
    	 			 "duedate": duedate,
    	 			 "total": total}
    	 			,success: function(data, status, xhr){
    	 				 window.location.replace(data);

    	 			}, error: function(){
    	 				 $.notify({//options
    		    			    title:"<strong>Error!</strong>",
    		    				message:"The invoice has not been saved. Plase try again.",
    		    					
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
    	 				//alert("The invoice has not been saved. Plase try again.");
    	 				}
    	 	});
     }

     


 }
 
 function cancel(){
     var del="delete"
     $.ajax({
 		method: "POST",
 		url: "deleteDraft",
 		data:{"del" :del}
 			,success: function(data, status, xhr){
 				 window.location.replace(data);

 			},error:function(){
 				$.notify({//options
    			    title:"<strong>Error!</strong>",
    				message:"An error occurred, please try later.",
    					
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
 	    	   alert("An error occurred, please try later.")
 	       }
 	});
 }

 $(window).bind('beforeunload', function(){
    //alert("loasing all data")

	 var del="delete"
	     $.ajax({
	 		method: "POST",
	 		url: "deleteDraft",
	 		data:{"del" :del}
	 			,success: function(data, status, xhr){
	 				

	 			},error:function(){
	 	    	  // alert("An error occurred, please try later.")
	 	       }
	 	});

 });

}else{
	location="/unauthorized";
}


