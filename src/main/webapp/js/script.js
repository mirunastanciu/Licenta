var idTicket;
var logeduser = $.cookie("loged_username");
var acctype = $.cookie("accounting_type");


$(window).resize(function(){location.reload();});

$(document).ready( function () {

		   			if(acctype == 2 || acctype == 3){
		   				$("#accounts").hide();
		   				$("#contracts").hide();
		   				$("#registartionreq").hide();
		   			
		   		}
     
});


//To Do table
$(document).ready( function () {
	
	
	//if user is admin	
		   		    if(acctype == 1){
		   				var table = $('#ticketsTable').dataTable({
		   					"sAjaxSource": "/ticketsToDo",
		   					"sAjaxDataProp": "",
		   					"columnDefs": [
		   						  {'width': '50%', 'targets': 1}
		   					  ],
		   					"responsive": true,
		   					"order": [[ 0, "asc" ]],
		   					"aoColumns": [	/*{"mData": "tr.index()"},*/
		   					              	{"mData": "idticket"},
		   								    {"mData": "description"},
		   								    {"mData": "projecttypename"},
		   								    {"mData": "duedate"},
		   								    {"mData": "status"},
		   								    {"defaultContent": '<button class="btn-details" type="button">Details</button>'} ],

		   			    });
	//if user is client		   				
		   			}else if(acctype == 2){
		   				$.ajax({
							method: "POST",
							url: "ticketsToDoByClient",
							data:{"logeduser": logeduser}
								,success: function(data, status, xhr){

									var table = $('#ticketsTable').dataTable({
										"responsive": true,
										"columnDefs": [
								   						  {'width': '50%', 'targets': 1}
								   					  ],
										"order": [[ 0, "asc" ]],
										"data": data,
									    "columns": [
									        { data: "idticket" },
									        { data: "description" },
									        { data: "projecttypename" },
									        { data: "duedate"},
									        { data: "status"},
									        {"defaultContent": '<button class="btn-details" type="button">Details</button>'} 
									    ]

								    });
		   			            }, error: function(){
		   			            		alert("error Update Method");
		   			            	}
		   					});
	//if user is employee	
		   			}else{
		   				
		   			}
		   		

	

	 //Details button function
	 $('#ticketsTable').on('click', '.btn-details', function () {
		 var tr = $(this).closest('tr');
		
		 idTicket = tr.children('td:eq(0)').text();//get the id (from db)
		 console.log(idTicket)
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
			            $(".modal-body #employeename").html(data.employeename);
			            $(".modal-body #employeeemail").html(data.employeeemail);
			            $(".modal-body #employeespecialisation").html(data.employeespecialisation);
					}


		            $(".modal-body #clientname").html(data.clientname);
		            $(".modal-body #clientemail").html(data.clientemail);

		            $('#myModal').modal('show');
	//if user is client or employee no edit right , no delete right	            
		            if(acctype == 2 || acctype == 3){
		            	$("#editbutton").hide();
		            	$("#savebutton").hide();
		            	$("#deletebutton").hide();
		            }
		            //Edit function
		            $('.modal-footer').on('click', '#editbutton', function () {
		            	
		            		$("#projecttypelist").show();
			            	$("#statuslist").show();
			            	$("#description").show();
			            	$("#duedateedit").show();
			            	$("#startdateedit").show();
			            	$("#finishdateedit").show();
			            	$("#employeelist").show();
		            	
		            	
		            });

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

								       });

							 var options1;
								$.ajax("/getAllEmployiesName",
									       { type: 'GET',
									 		 success: function (data) {
											       options1 = data;

											       	$('#employeelist').empty();
											       	$.each(options1, function(i, p) {
											       	$('#employeelist').append($('<option></option>').val(p).html(p));
											       	});
									       }

									       })
							var options2;
								$.ajax("/getAllTicketStatusNames",
									       { type: 'GET',
									 		 success: function (data) {
											       options2 = data;

											       	$('#statuslist').empty();
											       	$.each(options2, function(i, p) {
											       	$('#statuslist').append($('<option></option>').val(p).html(p));
											       	});
									       }

									       })
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
							   }, error: function(){
								   alert("error Update Method");
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
								   alert("The tickes has been deleted");
								   $('#myModal').modal('hide');
								   location.reload();

							   },error:function(){
								   alert("Error on delet ticket !!!");
								   }

					  });

					});


				}, error: function(){
					alert("error opening modal");
				  }
		});
	});
});


//Assigned Table
$(document).ready( function () {
	 
	//if user is admin	
		   		    if(acctype == 1){
							var table = $('#getAllTicketsAssigned').dataTable({
									"sAjaxSource": "/ticketsInProgress",
											"sAjaxDataProp": "",
												"columnDefs": [
												               {'width': '50%', 'targets': 1},
												               {'width': '10%', 'targets': 4}
															  ],			
												"responsive": true,
												"order": [[ 0, "asc" ]],
												"aoColumns": [
															  { "mData": "idticket"},
															  { "mData": "description"},
															  { "mData": "projecttypename"},
															  { "mData": "duedate"},
															  {"mData": "status"},
															  {"defaultContent": '<button class="btn-details" type="button">Details</button>'}]
													 });								
							
	
	//if user is client		   				
	   			  }else if(acctype == 2){
	   				$.ajax({
						method: "POST",
						url: "ticketsInProgressByClient",
						data:{"logeduser": logeduser}
							,success: function(data, status, xhr){
					   				var table = $('#getAllTicketsAssigned').dataTable({
										
												   "sAjaxDataProp": "",
													"columnDefs": [
													               {'width': '50%', 'targets': 1},
													              /* {'width': '10%', 'targets': 4}*/
																  ],			
													"responsive": true,
													"order": [[ 0, "asc" ]],
													"data": data,
												    "columns": [
												        { data: "idticket" },
												        { data: "description" },
												        { data: "projecttypename" },
												        { data: "duedate"},
												        { data: "status"},
												        {"defaultContent": '<button class="btn-details" type="button">Details</button>'} 
												        ]
											});
							}
					});
	//if user is employee	
		         }else{
			
		         	}
	


	
	 //Details button function
	 $('#getAllTicketsAssigned').on('click', '.btn-details', function () {
		 var tr = $(this).closest('tr');
		 idTicket = tr.children('td:eq(0)').text();//get the id (from db)
		 $.ajax({
			   method: "POST",
			   url: "getDetailsByIdTicket",
			   data: {idTicket: idTicket},
			   success: function(data, status, xhr){
		            /*$('#myModal .modal-body ').html(data.clientname);*/
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

		            $(".modal-body #employeename").html(data.employeename);
		            $(".modal-body #employeeemail").html(data.employeeemail);
		            $(".modal-body #employeespecialisation").html(data.employeespecialisation);

		            $(".modal-body #clientname").html(data.clientname);
		            $(".modal-body #clientemail").html(data.clientemail);

		            $('#myModal').modal('show');
		            
		//if user is client or employee no edit right , no delete right	            
		            if(acctype == 2 || acctype == 3){
		            	$("#editbutton").hide();
		            	$("#savebutton").hide();
		            	$("#deletebutton").hide();
		            }
		            //Edit function
		            $('.modal-footer').on('click', '#editbutton', function () {
		            	$("#projecttypelist").show();
		            	$("#statuslist").show();
		            	$("#description").show();
		            	$("#duedateedit").show();
		            	$("#startdateedit").show();
		            	$("#finishdateedit").show();
		            	$("#employeelist").show();
		            });

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

								       });

							 var options1;
								$.ajax("/getAllEmployiesName",
									       { type: 'GET',
									 		 success: function (data) {
											       options1 = data;

											       	$('#employeelist').empty();
											       	$.each(options1, function(i, p) {
											       	$('#employeelist').append($('<option></option>').val(p).html(p));
											       	});
									       }

									       });

							var options2;
								$.ajax("/getAllTicketStatusNames",
									       { type: 'GET',
									 		 success: function (data) {
											       options2 = data;

											       	$('#statuslist').empty();
											       	$.each(options2, function(i, p) {
											       	$('#statuslist').append($('<option></option>').val(p).html(p));
											       	});
									       }

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
										   }, error: function(){
											   alert("error Update Method");
											   }
										   });
								});
		        },
		        error: function(){
		            alert("error");
		        }
		 });
	});
});


//Done Table
$(document).ready( function () {

	//if user is admin	
		   		    if(acctype == 1){
							 var table = $('#getAllTicketsDone').dataTable({
									"sAjaxSource": "/ticketsDone",
									"sAjaxDataProp": "",
									"columnDefs": [
										  {'width': '50%', 'targets': 1}
									  ],
									"responsive": true,
									"order": [[ 0, "asc" ]],
									"aoColumns": [
									              { "mData": "idticket"},
									              { "mData": "description"},
									              { "mData": "projecttypename"},
									              { "mData": "duedate"},
									              {"mData": "status"},
									    {"defaultContent": '<button class="btn-details" type="button">Details</button>'}]
							 });
	//if user is client		   				
		   			  }else if(acctype == 2){
		   				$.ajax({
							method: "POST",
							url: "ticketsDoneByClient",
							data:{"logeduser": logeduser}
								,success: function(data, status, xhr){
									var table = $('#getAllTicketsDone').dataTable({
										"responsive": true,
										"columnDefs": [
								   						  {'width': '50%', 'targets': 1}
								   					  ],
										"order": [[ 0, "asc" ]],
										"data": data,
									    "columns": [
									        { data: "idticket" },
									        { data: "description" },
									        { data: "projecttypename" },
									        { data: "duedate"},
									        { data: "status"},
									        {"defaultContent": '<button class="btn-details" type="button">Details</button>'} 
									    ]

								    });
								}
		   				});
		   			  
	//if user is employee	
		         }else{
			
		         	}
		   			  
		   									 
	 //Details button function
	 $('#getAllTicketsDone').on('click', '.btn-details', function () {
		 var tr = $(this).closest('tr');
		 idTicket = tr.children('td:eq(0)').text();//get the id (from db)
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

		            $(".modal-body #employeename").html(data.employeename);
		            $(".modal-body #employeeemail").html(data.employeeemail);
		            $(".modal-body #employeespecialisation").html(data.employeespecialisation);

		            $(".modal-body #clientname").html(data.clientname);
		            $(".modal-body #clientemail").html(data.clientemail);

		            $('#myModal').modal('show');
		            
		          //if user is client or employee no edit right , no delete right	            
		            if(acctype == 2 || acctype == 3){
		            	$("#editbutton").hide();
		            	$("#savebutton").hide();
		            	$("#deletebutton").hide();
		            }
		            
		            //Edit function
		            $('.modal-footer').on('click', '#editbutton', function () {
		            	$("#projecttypelist").show();
		            	$("#statuslist").show();
		            	$("#description").show();
		            	$("#duedateedit").show();
		            	$("#startdateedit").show();
		            	$("#finishdateedit").show();
		            	$("#employeelist").show();
		            });

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

								       });

							 var options1;
								$.ajax("/getAllEmployiesName",
									       { type: 'GET',
									 		 success: function (data) {
											       options1 = data;

											       	$('#employeelist').empty();
											       	$.each(options1, function(i, p) {
											       	$('#employeelist').append($('<option></option>').val(p).html(p));
											       	});
									       }

									       });

							var options2;
								$.ajax("/getAllTicketStatusNames",
									       { type: 'GET',
									 		 success: function (data) {
											       options2 = data;

											       	$('#statuslist').empty();
											       	$.each(options2, function(i, p) {
											       	$('#statuslist').append($('<option></option>').val(p).html(p));
											       	});
									       }

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
										   }, error: function(){
											   alert("error Update Method");
											   }
										   });
								});
		        },
		        error: function(){
		            alert("error");
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
	 $.ajax({
		   method: "POST",
		   url: "getEmployeeByName",
		   data: {name: name},
		   success: function(data, status, xhr){
			   var name1=data.firstname+" "+data.lastname;
			  $(".modal-body #employeename").html(name1);
			  $(".modal-body #employeeemail").html(data.email);
			  var idspecialisation = data.idspecialisation;
			  $.ajax({
				   method: "POST",
				   url: "getSpecialisationById",
				   data: {idspecialisation: idspecialisation},
				   success: function(data, status, xhr){
					   $(".modal-body #employeespecialisation").html(data.name);
				 }
			  })
	}
	 })
}




