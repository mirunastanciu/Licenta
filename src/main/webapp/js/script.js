
$(window).resize(function(){
	location.reload();
});
var acctype;
$(document).ready( function () {
	
	$.ajax("/accountType",
			{ type: 'GET',
	 		  success: function (data) {
		   			document.cookie = "accounting_type="+data;
		   		    acctype = $.cookie("accounting_type");
		   			
		   			if(acctype == 2 ){
		   				$("#accounts").hide();
		   				$("#contracts").hide();
		   				$("#registartionreq").hide();
		   			    
		   			}
		   			if(acctype == 3){
		   				$("#accounts").hide();
		   				$("#contracts").hide();
		   				$("#registartionreq").hide();
		   				$("#invoice").hide();
		   				//$("#donet").hide();
		        	  
		   			}
		   		}
	 });
})

var idTicket;




//To Do table
$(document).ready( function () {
			
		var table = $('#ticketsTable').dataTable({
			"sAjaxSource": "/ticketsToDo",
			"sAjaxDataProp": "",
			"columnDefs": [
				  {'width': '50%', 'targets': 1},
				  {"targets": 5,"orderable": false} 
			  ],
			"responsive": true,
			"order": [[ 0, "desc" ]],
			"aoColumns": [	/*{"mData": "tr.index()"},*/
			              	{"mData": "idticket"},
						    {"mData": "description"},
						    {"mData": "projecttypename"},
						    {"mData": "creationdate"},
						    {"mData": "status"},
						    {"defaultContent": '<button class="btn-details" type="button">Details</button>'} ],
			"fnRowCallback": function( nRow, mData, iDisplayIndex, iDisplayIndexFull ) {
				$('td:eq('+4+')', nRow).addClass('negativeStatus');
			}
				
	    });
			

		if($("#ticketsTable #stsColor"))

				
		
//Details button function
	 $('#ticketsTable').on('click', '.btn-details', function () {
		 
		 
		 var tr = $(this).closest('tr');
		 
		 idTicket = tr.children('td:eq(0)').text();//get the id (from db)
		 
		 $.ajax({
			   method: "POST",
			   url: "getDetailsByIdTicket",
			   data: {"idTicket": idTicket},
			   success: function(data, status, xhr){

				   	$("#cldiv").show();
				   	$("#projecttypelist").hide();
					$("#statuslist").hide();
					$("#description").hide();
					$("#duedateedit").hide();
					$("#startdateedit").hide();
					$("#finishdateedit").hide();
					$("#employeelist").hide();
					//

					$(".modal-body #ticketid").html(data.idticket);
		            $(".modal-body #projecttype").html(data.projecttypename);
		            $(".modal-body #status").html(data.status);
		            $(".modal-body #projectdescription").html(data.description);
		            $(".modal-body #creationdate").html(data.creationdate);
		            $(".modal-body #duedate").html(data.duedate);
		            
		            if(data.startdate === null){
		            	 $(".modal-body #startdate").html("Not defined");
		            }else{
		            	 $(".modal-body #startdate").html(data.startdate);
		            }
		          
		            
		            if(data.finishdate === null){
		            	 $(".modal-body #finishdate").html("Not defined");
		            }else{
		            	$(".modal-body #finishdate").html(data.finishdate);
		            }
		            

					if(data.employeename === "Unassigned"){
						$(".modal-body #employeeemail").html(data.employeeemail);
				        $(".modal-body #employeespecialisation").html(data.employeespecialisation);
					    $(".modal-body #employeename").html(data.employeename);
					    $("#empE").hide();
						$("#empS").hide();
						
					}else if(data.employeename !== "Unassigned"){
						//console.log("employee")
						//$(".modal-footer #assigntome").hide();
						//$("#assigntome").hide();
						$("#empE").show();
						$("#empS").show();
						$("#employeeemail").show();
						$("#employeespecialisation").show();
			            $(".modal-body #employeename").html(data.employeename);
			            $(".modal-body #employeeemail").html(data.employeeemail);
			            $(".modal-body #employeespecialisation").html(data.employeespecialisation);
			            
					}
					$(".modal-body #clientname").html(data.clientname);
					if(data.clientname === "System"){
						$("#cldiv").hide();
			           
					}else{
						 $(".modal-body #clientemail").html(data.clientemail);
					}

			

		            $('#myModal').modal('show');
		            
		            
//reset fields content on close
		        	$('#myModal').on('hidden.bs.modal', function (e) {
		        			  $(this)
		        			    .find("input,textarea,select")
		        			       .val('')
		        			       .end()
		        			    .find("input[type=checkbox], input[type=radio]")
		        			       .prop("checked", "")
		        			       .end();
		        	});
		            
//if user is client or employee no edit right , no delete right	            
		            if(acctype == 2 ){
		            	$("#editbutton").hide();
		            	$("#savebutton").hide();
		            	$("#deletebutton").hide();
		            	$("#assigntome").hide();
		            	$("#unassign").hide();
		            }
		            if(acctype == 3){
		            	$("#deletebutton").hide();
		            	$("#assigntome").show();
		            	$("#unassign").show();
		            	
		            }
		            if(acctype == 1){
		            	$("#assigntome").hide();
		            	//$("#unassign").hide();
		            }
		            
		            
							
					
//Edit function
		            $('.modal-footer').on('click', '#editbutton', function () {
		            	
		            	if(acctype == 3){
		            		
		            		$("#statuslist").show();
		            		$("#startdateedit").show();
			            	$("#finishdateedit").show();
				            }else{
				            	$("#projecttypelist").show();
				            	$("#description").show();
				            	$("#duedateedit").show();
				            	$("#statuslist").show();
				            	$("#startdateedit").show();
				            	$("#finishdateedit").show();
				            	$("#employeelist").show();
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
							       }
							       })
		            	
		   			 var options1;
						$.ajax("/getAllEmployiesName",
							       { type: 'GET',
							 		 success: function (data) {
									       options1 = data;

									       	$('#employeelist').empty();
									       	$('#employeelist').append($('<option></option>').html(""));
									       	$.each(options1, function(i, p) {
									       	$('#employeelist').append($('<option></option>').val(p).html(p));
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
							   		}

							       })
					var options2;
						$.ajax("/getAllTicketStatusNames",
							       { type: 'GET',
							 		 success: function (data) {
									       options2 = data;

									       	$('#statuslist').empty();
									       	$('#statuslist').append($('<option></option>').html(""));
									       	$.each(options2, function(i, p) {
									       	$('#statuslist').append($('<option></option>').val(p).html(p));
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
							   		}

							       })
		            	
		            	
			            	
		            	
		            	
		            })
//Assign to me
		            $('.modal-footer').on('click', '#assigntome', function () {
		            	 $.ajax({
							   method: "POST",
							   url: "assignToMe",
							   data:
							          {/*"logeduser": logeduser,*/
								       "idTicket": idTicket
							          },
		            	       success: function(data, status, xhr){
		            	    	   $.ajax({
		            				   method: "POST",
		            				   url: "getDetailsByIdTicket",
		            				   data: {idTicket: idTicket},
		            				   success: function(data, status, xhr){

		            					   	$("#projecttypelist").hide();
		            						$("#statuslist").hide();
		            						$("#description").hide();
		            						$("#duedateedit").hide();
		            						$("#startdateedit").hide();
		            						$("#finishdateedit").hide();
		            						$("#employeelist").hide();

		            						$(".modal-body #ticketid").html(data.idticket);
		            			            $(".modal-body #projecttype").html(data.projecttypename);
		            			            $(".modal-body #status").html(data.status);
		            			            $(".modal-body #projectdescription").html(data.description);
		            			            $(".modal-body #creationdate").html(data.creationdate);
		            			            $(".modal-body #duedate").html(data.duedate);
		            			            $(".modal-body #startdate").html(data.startdate);
		            			            $(".modal-body #finishdate").html(data.finishdate);

		            						if(data.employeename === "Unassigned"){
		            							$(".modal-body #employeeemail").html(data.employeeemail);
		            					        $(".modal-body #employeespecialisation").html(data.employeespecialisation);
		            						    $(".modal-body #employeename").html(data.employeename);
		            						    $("#empE").hide();
		            							$("#empS").hide();
		            						}else{
		            							$("#empE").show();
		            							$("#empS").show();
		            							$("#employeeemail").show();
		            							$("#employeespecialisation").show();
		            				            $(".modal-body #employeename").html(data.employeename);
		            				            $(".modal-body #employeeemail").html(data.employeeemail);
		            				            $(".modal-body #employeespecialisation").html(data.employeespecialisation);
		            						}


		            			            $(".modal-body #clientname").html(data.clientname);
		            			            $(".modal-body #clientemail").html(data.clientemail);
		            			           
		            			            //$('#myModal').modal('show');
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
								   			//alert("An error occurred, please try later")
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
		       		   			
		       		   		}
		            });
			   });
		            
		          
		            
//Unassign
		            $('.modal-footer').on('click', '#unassign', function () {
		            	 $.ajax({
							   method: "POST",
							   url: "unassign",
							   data:{"idTicket": idTicket},
		            	       success: function(data, status, xhr){
		            	    	   $.ajax({
		            				   method: "POST",
		            				   url: "getDetailsByIdTicket",
		            				   data: {idTicket: idTicket},
		            				   success: function(data, status, xhr){

		            					   	$("#projecttypelist").hide();
		            						$("#statuslist").hide();
		            						$("#description").hide();
		            						$("#duedateedit").hide();
		            						$("#startdateedit").hide();
		            						$("#finishdateedit").hide();
		            						$("#employeelist").hide();

		            						$(".modal-body #ticketid").html(data.idticket);
		            			            $(".modal-body #projecttype").html(data.projecttypename);
		            			            $(".modal-body #status").html(data.status);
		            			            $(".modal-body #projectdescription").html(data.description);
		            			            $(".modal-body #creationdate").html(data.creationdate);
		            			            $(".modal-body #duedate").html(data.duedate);
		            			            $(".modal-body #startdate").html(data.startdate);
		            			            $(".modal-body #finishdate").html(data.finishdate);

		            						if(data.employeename === "Unassigned"){
		            							$(".modal-body #employeeemail").html(data.employeeemail);
		            					        $(".modal-body #employeespecialisation").html(data.employeespecialisation);
		            						    $(".modal-body #employeename").html(data.employeename);
		            						    $("#empE").hide();
		            							$("#empS").hide();
		            						}else{
		            							$("#empE").show();
		            							$("#empS").show();
		            							$("#employeeemail").show();
		            							$("#employeespecialisation").show();
		            				            $(".modal-body #employeename").html(data.employeename);
		            				            $(".modal-body #employeeemail").html(data.employeeemail);
		            				            $(".modal-body #employeespecialisation").html(data.employeespecialisation);
		            						}


		            			            $(".modal-body #clientname").html(data.clientname);
		            			            $(".modal-body #clientemail").html(data.clientemail);
		            			           
		            			            //$('#myModal').modal('show');
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
		            	    	   //alert("An error occurred, please try later")
						   		}
		            });
		            });
						 
								    	

				
//update function
					$('.modal-footer').on('click', '#savebutton', function () {
						console.log(idTicket)//get the id (from db)
						var projecttype =  $(".modalcontent #projecttype").text();
						var status =  $(".modalcontent #status").text();
						var projectdescription =  $(".modalcontent #projectdescription").text();
						var duedate =  $("#dd #duedate").text();
						var startdate =  $("#sd #startdate").text();
						var finishdate =  $("#fd #finishdate").text();
						var employeename =  $("#emp #employeename").text();

						 $.ajax({
							   method: "POST",
							   url: "updateTicket",
							   data:
							          {"idTicket": idTicket,
								   	  "projecttype": projecttype,
								   	  "status": status,
								   	  "projectdescription": projectdescription,
								   	  "duedate": duedate,
								      "startdate": startdate,
								      "finishdate": finishdate,
								      "employeename": employeename}
								   		,
							   success: function(data, status, xhr){

								   console.log(duedate);
										   console.log(startdate);
												   console.log(finishdate);
								   $('#myModal').modal('hide');
								   location.reload();
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
						   		}
							   });
					});

//Delete fuction
					$('.modal-footer').on('click', '#deletebutton', function () {

						 $.ajax({
							   method: "POST",
							   url: "deleteTicket",
							   data: {idTicket: idTicket},
							   success: function(data, status, xhr){
								   $.notify({//options
					    			    title:"<strong>Success!</strong>",
					    				message:"The tickes has been deleted",
					    					
					    				},
					    				{//settings
					    					allow_dismiss: true,
					    					element:".modal",	
					    					type:"success",
					    					position: "fixed",
					    					placement: {
					    						from: "top",
					    						align: "center"
					    					}
					    				
					    			});
								   var delay = 2000; 
									setTimeout(function(){ 
										 $('#myModal').modal('hide');
										   location.reload();
									}, delay);
								  

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
							   
						   			//alert("An error occurred, please try later")
						   		}

					  });

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
						



//Assigned Table

	var table = $('#getAllTicketsAssigned').dataTable({
			"sAjaxSource": "/ticketsInProgress",
					"sAjaxDataProp": "",
						"columnDefs": [
						               {'width': '50%', 'targets': 1},
						               {'width': '10%', 'targets': 4},
						               {"targets": 5,"orderable": false} 
									  ],			
						"responsive": true,
						"order": [[ 0, "asc" ]],
						"aoColumns": [
									  { "mData": "idticket"},
									  { "mData": "description"},
									  { "mData": "projecttypename"},
									  { "mData": "duedate"},
									  {"mData": "status"},
									  {"defaultContent": '<button class="btn-details" type="button">Details</button>'}],
									  "fnRowCallback": function( nRow, mData, iDisplayIndex, iDisplayIndexFull ) {
					   						$('td:eq('+4+')', nRow).addClass('inProgressStatuses');
									    }
							 });								
									
			
				   			
							
//Details button function
	 $('#getAllTicketsAssigned').on('click', '.btn-details', function () {
		 var tr = $(this).closest('tr');
		 idTicket = tr.children('td:eq(0)').text();//get the id (from db)
		 $.ajax({
			   method: "POST",
			   url: "getDetailsByIdTicket",
			   data: {"idTicket": idTicket},
			   success: function(data, status, xhr){
				   $("#cldiv").show();
				   $("#projecttypelist").hide();
					$("#statuslist").hide();
					$("#description").hide();
					$("#duedateedit").hide();
					$("#startdateedit").hide();
					$("#finishdateedit").hide();
					$("#employeelist").hide();

					$(".modal-body #ticketid").html(data.idticket);
		            $(".modal-body #projecttype").html(data.projecttypename);
		            $(".modal-body #status").html(data.status);
		            $(".modal-body #projectdescription").html(data.description);
		            $(".modal-body #creationdate").html(data.creationdate);
		            $(".modal-body #duedate").html(data.duedate);
		            if(data.startdate === null){
		            	 $(".modal-body #startdate").html("Not defined");
		            }else{
		            	 $(".modal-body #startdate").html(data.startdate);
		            }
		          
		            
		            if(data.finishdate === null){
		            	 $(".modal-body #finishdate").html("Not defined");
		            }else{
		            	$(".modal-body #finishdate").html(data.finishdate);
		            }


					if(data.employeename === "Unassigned"){
						$(".modal-body #employeeemail").html(data.employeeemail);
				        $(".modal-body #employeespecialisation").html(data.employeespecialisation);
					    $(".modal-body #employeename").html(data.employeename);
					    $("#empE").hide();
						$("#empS").hide();
						
					}else if(data.employeename !== "Unassigned"){
						//console.log("employee")
						//$(".modal-footer #assigntome").hide();
						//$("#assigntome").hide();
						$("#empE").show();
						$("#empS").show();
						$("#employeeemail").show();
						$("#employeespecialisation").show();
			            $(".modal-body #employeename").html(data.employeename);
			            $(".modal-body #employeeemail").html(data.employeeemail);
			            $(".modal-body #employeespecialisation").html(data.employeespecialisation);
			            
					}

		            $(".modal-body #clientname").html(data.clientname);
					if(data.clientname === "System"){
						$("#cldiv").hide();
			           
					}else{
						 $(".modal-body #clientemail").html(data.clientemail);
					}

		            $('#myModal').modal('show');
		            
		            
//reset fields content on close
		        	$('#myModal').on('hidden.bs.modal', function (e) {
		        			  $(this)
		        			    .find("input,textarea,select")
		        			       .val('')
		        			       .end()
		        			    .find("input[type=checkbox], input[type=radio]")
		        			       .prop("checked", "")
		        			       .end();
		        	})
		            
//if user is client or employee no edit right , no delete right	            
		            
		            if(acctype == 2 ){
		            	$("#editbutton").hide();
		            	$("#savebutton").hide();
		            	$("#deletebutton").hide();
		            	$("#assigntome").hide();
		            	//$("#unassign").hide();
		            }
		            if(acctype == 3){
		            	$("#deletebutton").hide();
		            	$("#assigntome").hide();
		            	$("#unassign").show();
		            	
		            }
		            if(acctype == 1){
		            	$("#assigntome").hide();
		            	$("#unassign").hide();
		            }
//Edit function
		            $('.modal-footer').on('click', '#editbutton', function () {
		            		if(acctype == 3){
		            			
		            		$("#statuslist").show();
		            		$("#startdateedit").show();
			            	$("#finishdateedit").show();
				            }else{
				            	$("#projecttypelist").show();
				            	$("#description").show();
				            	$("#duedateedit").show();
				            	$("#statuslist").show();
				            	$("#startdateedit").show();
				            	$("#finishdateedit").show();
				            	$("#employeelist").show();
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

								 var options1;
									$.ajax("/getAllEmployiesName",
										       { type: 'GET',
										 		 success: function (data) {
												       options1 = data;

												       	$('#employeelist').empty();
												       	$('#employeelist').append($('<option></option>').html(""));
												       	$.each(options1, function(i, p) {
												       	$('#employeelist').append($('<option></option>').val(p).html(p));
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

								var options2;
									$.ajax("/getAllTicketStatusNames",
										       { type: 'GET',
										 		 success: function (data) {
												       options2 = data;

												       	$('#statuslist').empty();
												       	$('#statuslist').append($('<option></option>').html(""));
												       	$.each(options2, function(i, p) {
												       	$('#statuslist').append($('<option></option>').val(p).html(p));
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
									    				
									    			});											   		}

										       });
		            		
		            });
		            
		           /* 
///CLOSE		            $('.modal-footer').on('click', '#close', function () {
		            	 location.reload();
		            });*/
		           
//Unassign
		            $('.modal-footer').on('click', '#unassign', function () {
		            	 $.ajax({
							   method: "POST",
							   url: "unassign",
							   data:{"idTicket": idTicket},
		            	       success: function(data, status, xhr){
		            	    	   $.ajax({
		            				   method: "POST",
		            				   url: "getDetailsByIdTicket",
		            				   data: {idTicket: idTicket},
		            				   success: function(data, status, xhr){

		            					   	$("#projecttypelist").hide();
		            						$("#statuslist").hide();
		            						$("#description").hide();
		            						$("#duedateedit").hide();
		            						$("#startdateedit").hide();
		            						$("#finishdateedit").hide();
		            						$("#employeelist").hide();

		            						$(".modal-body #ticketid").html(data.idticket);
		            			            $(".modal-body #projecttype").html(data.projecttypename);
		            			            $(".modal-body #status").html(data.status);
		            			            $(".modal-body #projectdescription").html(data.description);
		            			            $(".modal-body #creationdate").html(data.creationdate);
		            			            $(".modal-body #duedate").html(data.duedate);
		            			            $(".modal-body #startdate").html(data.startdate);
		            			            $(".modal-body #finishdate").html(data.finishdate);

		            						if(data.employeename === "Unassigned"){
		            							$(".modal-body #employeeemail").html(data.employeeemail);
		            					        $(".modal-body #employeespecialisation").html(data.employeespecialisation);
		            						    $(".modal-body #employeename").html(data.employeename);
		            						    $("#empE").hide();
		            							$("#empS").hide();
		            						}else{
		            							$("#empE").show();
		            							$("#empS").show();
		            							$("#employeeemail").show();
		            							$("#employeespecialisation").show();
		            				            $(".modal-body #employeename").html(data.employeename);
		            				            $(".modal-body #employeeemail").html(data.employeeemail);
		            				            $(".modal-body #employeespecialisation").html(data.employeespecialisation);
		            						}


		            			            $(".modal-body #clientname").html(data.clientname);
		            			            $(".modal-body #clientemail").html(data.clientemail);
		            			           
		            			            //$('#myModal').modal('show');
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
		            });
		            });

					

//update function
								$('.modal-footer').on('click', '#savebutton', function () {
									console.log(idTicket)//get the id (from db)
									var projecttype =  $(".modalcontent #projecttype").text();
									var status =  $(".modalcontent #status").text();
									var projectdescription =  $(".modalcontent #projectdescription").text();
									var duedate =  $("#dd #duedate").text();
									var startdate =  $("#sd #startdate").text();
									var finishdate =  $("#fd #finishdate").text();
									var employeename =  $("#emp #employeename").text();

									 $.ajax({
										   method: "POST",
										   url: "updateTicket",
										   data:
										          {"idTicket": idTicket,
											   	  "projecttype": projecttype,
											   	  "status": status,
											   	  "projectdescription": projectdescription,
											   	  "duedate": duedate,
											      "startdate": startdate,
											      "finishdate": finishdate,
											      "employeename": employeename}
											   		,
										   success: function(data, status, xhr){
											   $('#myModal').modal('hide');
											   location.reload();
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
		
//Done Table
		
	 var table = $('#getAllTicketsDone').dataTable({
			"sAjaxSource": "/ticketsDone",
			"sAjaxDataProp": "",
			"columnDefs": [
				  {'width': '50%', 'targets': 1},
				  {"targets": 5,"orderable": false} 
			  ],
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [
			              { "mData": "idticket"},
			              { "mData": "description"},
			              { "mData": "projecttypename"},
			              { "mData": "duedate"},
			              {"mData": "status"},
			    {"defaultContent": '<button class="btn-details" type="button">Details</button>'}],
			    "fnRowCallback": function( nRow, mData, iDisplayIndex, iDisplayIndexFull ) {
					$('td:eq('+4+')', nRow).addClass('positiveStatus');
			    }
	 });		   				
				   		
//Details button function
			 $('#getAllTicketsDone').on('click', '.btn-details', function () {
				 var tr = $(this).closest('tr');
				 idTicket = tr.children('td:eq(0)').text();//get the id (from db)
				 $.ajax({
					   method: "POST",
					   url: "getDetailsByIdTicket",
					   data: {idTicket: idTicket},
					   success: function(data, status, xhr){
						   $("#cldiv").show();
						   $("#projecttypelist").hide();
							$("#statuslist").hide();
							$("#description").hide();
							$("#duedateedit").hide();
							$("#startdateedit").hide();
							$("#finishdateedit").hide();
							$("#employeelist").hide();

							$(".modal-body #ticketid").html(data.idticket);
				            $(".modal-body #projecttype").html(data.projecttypename);
				            $(".modal-body #status").html(data.status);
				            $(".modal-body #projectdescription").html(data.description);
				            $(".modal-body #creationdate").html(data.creationdate);
				            $(".modal-body #duedate").html(data.duedate);
				            if(data.startdate === null){
				            	 $(".modal-body #startdate").html("Not defined");
				            }else{
				            	 $(".modal-body #startdate").html(data.startdate);
				            }
				          
				            
				            if(data.finishdate === null){
				            	 $(".modal-body #finishdate").html("Not defined");
				            }else{
				            	$(".modal-body #finishdate").html(data.finishdate);
				            }


							if(data.employeename === "Unassigned"){
								$(".modal-body #employeeemail").html(data.employeeemail);
						        $(".modal-body #employeespecialisation").html(data.employeespecialisation);
							    $(".modal-body #employeename").html(data.employeename);
							    $("#empE").hide();
								$("#empS").hide();
								
							}else if(data.employeename !== "Unassigned"){
								//console.log("employee")
								//$(".modal-footer #assigntome").hide();
								//$("#assigntome").hide();
								$("#empE").show();
								$("#empS").show();
								$("#employeeemail").show();
								$("#employeespecialisation").show();
					            $(".modal-body #employeename").html(data.employeename);
					            $(".modal-body #employeeemail").html(data.employeeemail);
					            $(".modal-body #employeespecialisation").html(data.employeespecialisation);
					            
							}
				            $(".modal-body #clientname").html(data.clientname);
							if(data.clientname === "System"){
								$("#cldiv").hide();
					           
							}else{
								 $(".modal-body #clientemail").html(data.clientemail);
							}
				            $('#myModal').modal('show');
				            
				            
//reset fields content on close
				        	/*$('#myModal').on('hidden.bs.modal', function (e) {
				        			  $(this)
				        			    .find("input,textarea,select")
				        			       .val('')
				        			       .end()
				        			    .find("input[type=checkbox], input[type=radio]")
				        			       .prop("checked", "")
				        			       .end();
				        	})*/
				            
//if user is client or employee no edit right , no delete right	            
				          
				            if(acctype == 2 ){
				            	$("#editbutton").hide();
				            	$("#savebutton").hide();
				            	$("#deletebutton").hide();
				            	$("#assigntome").hide();
				            	//$("#unassign").hide();
				            }
				            if(acctype == 3){
				            	$("#deletebutton").hide();
				            	$("#assigntome").show();
				            	$("#unassign").show();
				            	
				            }
				            if(acctype == 1){
				            	$("#assigntome").hide();
				            	$("#unassign").hide();
				            }
//Edit function
				            $('.modal-footer').on('click', '#editbutton', function () {
				            	if(acctype == 3){
				            		
				            		$("#statuslist").show();
				            		$("#startdateedit").show();
					            	$("#finishdateedit").show();
						            }else{
						            	$("#projecttypelist").show();
						            	$("#description").show();
						            	$("#duedateedit").show();
						            	$("#statuslist").show();
						            	$("#startdateedit").show();
						            	$("#finishdateedit").show();
						            	$("#employeelist").show();
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

									 var options1;
										$.ajax("/getAllEmployiesName",
											       { type: 'GET',
											 		 success: function (data) {
													       options1 = data;

													       	$('#employeelist').empty();
													       	$('#employeelist').append($('<option></option>').html(""));
													       	$.each(options1, function(i, p) {
													       	$('#employeelist').append($('<option></option>').val(p).html(p));
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

									var options2;
										$.ajax("/getAllTicketStatusNames",
											       { type: 'GET',
											 		 success: function (data) {
													       options2 = data;

													       	$('#statuslist').empty();
													     	$('#statuslist').append($('<option></option>').html(""));
													       	$.each(options2, function(i, p) {
													       	$('#statuslist').append($('<option></option>').val(p).html(p));
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

								
										
										 /*$('.modal-footer').on('click', '#close', function () {
////Close							            	 location.reload();
							            });*/
										 
//update function
										$('.modal-footer').on('click', '#savebutton', function () {
											console.log(idTicket)//get the id (from db)
											var projecttype =  $(".modalcontent #projecttype").text();
											var status =  $(".modalcontent #status").text();
											var projectdescription =  $(".modalcontent #projectdescription").text();
											var duedate =  $("#dd #duedate").text();
											var startdate =  $("#sd #startdate").text();
											var finishdate =  $("#fd #finishdate").text();
											var employeename =  $("#emp #employeename").text();

											 $.ajax({
												   method: "POST",
												   url: "updateTicket",
												   data:
												          {"idTicket": idTicket,
													   	  "projecttype": projecttype,
													   	  "status": status,
													   	  "projectdescription": projectdescription,
													   	  "duedate": duedate,
													      "startdate": startdate,
													      "finishdate": finishdate,
													      "employeename": employeename}
													   		,
												   success: function(data, status, xhr){
													   $('#myModal').modal('hide');
													   location.reload();
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
		});
//Change Project Type on Edit mode
function projectTypeChange(){
	$.ajax("/allProjectTypesName",
		       { type: 'GET',
		 		 success: function (data) {

				       for(var i in data){
				    	   sel = document.getElementById("projecttypelist"); //
				    	    var projecttype = document.getElementById("projecttype");
				    	    if ( sel.options[sel.selectedIndex].value == data[i] ) {
				    	    	projecttype.innerHTML = sel.options[sel.selectedIndex].value;
				    	    }
				       }
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

}
//Change Status on Edit mode
function statusChange(){

	$.ajax("/getAllTicketStatusNames",
		       { type: 'GET',
		 		 success: function (data) {

				       for(var i in data){
				    	   sel = document.getElementById("statuslist"); //
				    	    var status = document.getElementById("status");
				    	    if ( sel.options[sel.selectedIndex].value == data[i] ) {
				    	    	status.innerHTML = sel.options[sel.selectedIndex].value;
				    	    }
				       }
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
}


//Change description on Edit mode
function descriptionChange(){

	$("#desc").click(function(e) {
		var desc = $("#desc p").text();
		var descedit = document.getElementById("description");
		 if(desc !== descedit && $(descedit).val().length !== 0 ){
			 if(e.target.id !== "description"){
				$(".modal-body #projectdescription").html(descedit.value);

	    		}
			 }
	});
}

//Change Due Date
function duedateonChange(){

	$("#dd").click(function(e) {
		var duedate =  $("#dd p").text();
	    var duedateedit = document.getElementById("duedateedit");
	    if(duedate.value !== duedateedit.value && $(duedateedit).val().length !== 0 ){
	    	if(e.target.id !== "duedateedit" ){
	    		$(".modal-body #duedate").html(duedateedit.value);
	    	 }
		}
	});
}

//Change Start Date
function startdateonChange(){

	$("#sd").click(function(e) {
		var startdate =  $("#sd p").text();
	    var startdateedit = document.getElementById("startdateedit");
		if(startdate.value !== startdateedit && $(startdateedit).val().length !== 0 ){
	    	 if(e.target.id !== "startdateedit" ){
	    		$(".modal-body #startdate").html(startdateedit.value);
	    	 }
		}
	})
}

//Change Finish Date
function finishdateonChange(){

	$("#fd").click(function(e) {
		var finishdate =  $("#fd p").text();;
	    var finishdateedit = document.getElementById("finishdateedit");
		if(finishdate.value !== finishdateedit && $(finishdateedit).val().length !== 0 ){
	    	 if(e.target.id !== "finishdateedit" ){
	    		$(".modal-body #finishdate").html(finishdateedit.value);
	    	 }
		}
	})
}
//Change assignement
function assignementChange(){

	 sel = document.getElementById("employeelist");
	 name = sel.options[sel.selectedIndex].value;
	 console.log(name)
	 if(name === ""){
		 $(".modal-body #empE").hide();
		 $(".modal-body #employeeemail").hide();
		 
		 $(".modal-body #empS").hide();
		 $(".modal-body #employeespecialisation").hide();
		 $(".modal-body #employeename").html("Unassigned");
	 }else{
		 $.ajax({
			   method: "POST",
			   url: "getEmployeeByName",
			   data: {name: name},
			   success: function(data, status, xhr){
				   var name1=data.firstname+" "+data.lastname;
				   $(".modal-body #empE").show();
				  $(".modal-body #employeename").html(name1);
				  $(".modal-body #empS").show();
				  $(".modal-body #employeeemail").html(data.email);
				  var idspecialisation = data.idspecialisation;
				  
				  $.ajax({
					   method: "POST",
					   url: "getSpecialisationById",
					   data: {"idspecialisation": idspecialisation},
					   success: function(data, status, xhr){
						   $(".modal-body #employeespecialisation").html(data.name);
					 }
				  })
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
	 }
	
}



