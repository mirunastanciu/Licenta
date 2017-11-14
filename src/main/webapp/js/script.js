var idTicket;

$(window).resize(function(){location.reload();});
					   	

$(document).ready( function () {

	 var table = $('#ticketsTable').dataTable({
			"sAjaxSource": "/ticketsToDo",		
			"sAjaxDataProp": "",
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [	{"mData": "idticket"},
						    {"mData": "description"},						  
						    {"mData": "projecttypename"},
						    {"mData": "duedate"},
						    {"mData": "status"},
						    {"defaultContent": '<button class="btn-details" type="button">Details</button>'} ]
	 });
	 $('#ticketsTable').on('click', '.btn-details', function () {
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
									       
					
									       
					$('.modal-footer').on('click', '#savebutton', function () {
					
					});				      
		            	
		        },
		        error: function(){
		            alert("error");
		        }  
		 });	   
	});
	
	 
});

//

$(document).ready( function () {
	 var table = $('#getAllTicketsAssigned').dataTable({
			"sAjaxSource": "/ticketsInProgress",
			"sAjaxDataProp": "",
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [ /* { "mData": "id"},*/
			              { "mData": "idticket"},
			              { "mData": "description"},
			              /* { "mData": "projcttype"},*/
			              { "mData": "projecttypename"},
			              { "mData": "duedate"},
			              /*{ "mData": "idstatus"},*/
			              {"mData": "status"},
			    {"defaultContent": '<button class="btn-details" type="button">Details</button>'}]
	 });
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
		        },
		        error: function(){
		            alert("error");
		        }  
		 });
	});
});

//

$(document).ready( function () {
	
	 var table = $('#getAllTicketsDone').dataTable({
			"sAjaxSource": "/ticketsDone",
			"sAjaxDataProp": "",
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [/* { "mData": "id"},*/
			              { "mData": "idticket"},
			              { "mData": "description"},
			              /* { "mData": "projcttype"},*/
			              { "mData": "projecttypename"},
			              { "mData": "duedate"},
			              /*{ "mData": "idstatus"},*/
			              {"mData": "status"},
			    {"defaultContent": '<button class="btn-details" type="button">Details</button>'}]
	 });
	 
	 $('#getAllTicketsDone').on('click', '.btn-details', function () {
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
		        },
		        error: function(){
		            alert("error");
		        }  
		 });   
		});
});

function projectTypeChange() 
{
    sel = document.getElementById("projecttypelist"); // 
    var priceDesc = document.getElementById("projecttype");
    if ( sel.options[sel.selectedIndex].value == "JVA" ) {
      priceDesc.innerHTML = sel.options[sel.selectedIndex].value;
    }
    else if ( sel.options[sel.selectedIndex].value == "HTML" ) {
    	priceDesc.innerHTML = sel.options[sel.selectedIndex].value;
    }	
}

function statusChange() 
{

	$.ajax("/getAllTicketStatusNames", 
		       { type: 'GET',
		 		 success: function (data) {		        	 
				       
				       for(var i in data){
				    	   sel = document.getElementById("statuslist"); // 
				    	    var priceDesc = document.getElementById("status");
				    	    if ( sel.options[sel.selectedIndex].value == data[i] ) {
				    	      priceDesc.innerHTML = sel.options[sel.selectedIndex].value;
				    	    }
				       }
				 }
   /* sel = document.getElementById("statuslist"); // 
    var priceDesc = document.getElementById("status");
    if ( sel.options[sel.selectedIndex].value == "JVA" ) {
      priceDesc.innerHTML = sel.options[sel.selectedIndex].value;
    }
    else if ( sel.options[sel.selectedIndex].value == "HTML" ) {
    	priceDesc.innerHTML = sel.options[sel.selectedIndex].value;
    }	*/
})
}


