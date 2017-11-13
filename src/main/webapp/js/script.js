var idTicket;

$(window).resize(function(){location.reload();});
					   	

$(document).ready( function () {

	 var table = $('#ticketsTable').dataTable({
			"sAjaxSource": "/ticketsToDo",		
			"sAjaxDataProp": "",
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [
			      { "mData": "id"},
				  { "mData": "description" },
				  { "mData": "projcttype"},
				  { "mData": "duedate"},
				  { "mData": "idstatus"},
				  {"defaultContent": '<button class="btn-details" type="button">Details</button>'}		             
			   ]
	 
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
		        },
		        error: function(){
		            alert("error");
		        }  
		 });
		 
		
			   
		 });
	 
});



$(document).ready( function () {
	 var table = $('#getAllTicketsAssigned').dataTable({
			"sAjaxSource": "/ticketsInProgress",
			"sAjaxDataProp": "",
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [
			    { "mData": "id"},
			    { "mData": "description" },
			    { "mData": "projcttype"},
			    { "mData": "duedate"},
			    { "mData": "idstatus"},
			    {"defaultContent": '<button class="btn-details" type="button">Details</button>'}
				
			]
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
		        },
		        error: function(){
		            alert("error");
		        }  
		 });
		 
		
			   
		 });
});

$(document).ready( function () {
	
	 var table = $('#getAllTicketsDone').dataTable({
			"sAjaxSource": "/ticketsDone",
			"sAjaxDataProp": "",
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [
			    { "mData": "id"},
			    { "mData": "description" },
			    { "mData": "projcttype"},
			    { "mData": "duedate"},
			    { "mData": "idstatus"},
			    {"defaultContent": '<button class="btn-details" type="button">Details</button>'}
				
			]
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
		        },
		        error: function(){
		            alert("error");
		        }  
		 });
		 
		
			   
		 });
});


/*var oTable = $('#ticketsTable').dataTable({
    "fnRowCallback": function (nRow, aData, iDisplayIndex) {

          // Bind click event
          $(nRow).click(function() {

                alert( 'You clicked on '+aData.name+'\'s row' );

          });

          return nRow;
     }
});*/


/*function getProjectTypeName() {
	var l=;
		 $.ajax("/allProjectTypes", 
			       { type: 'GET',
			 		
			         success: function (data) {
			             l=data;
			         } 
			       }
			     );
     								
		for(var i=i ; i < l.length ; i++){
			if(l[i] == 1){
				return data[i].projecttypenade;
			}
		}
	 
	 return data;
		
	
	
	
};*/


	



