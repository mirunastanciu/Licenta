/*if( !!$.cookie('loged_username') && $.cookie("loged_username") !== "" ){
*/
$(window).resize(function(){
	location.reload();
});

	var logeduser = $.cookie('loged_username');
	var acctype = $.cookie('accounting_type');


$(document).ready( function () {
	
		   			if(acctype == 2 || acctype == 3){
		   				$("#accounts").hide();
		   				$("#contracts").hide();
		   				$("#registartionreq").hide();
		   				$("#addInv").hide();
		   				
		   			}

});


$(document).ready( function () {
	
//if user ia admin	
  if(acctype == 1){
	  var table = $('#unpaidInvoiceTable').dataTable({
			"sAjaxSource": "/getAllUnpaidInvoices",
			"sAjaxDataProp": "",
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [	/*{"mData": "tr.index()"},*/
			              	{"mData": "idbill"},
						    {"mData": "creationdate"},
						    {"mData": "amount"},
						    {"mData": "curency"},
						    {"mData": "duedate"},
						    {"mData": "status"},
						    {"defaultContent": '<button class="btn-details" type="button">Details</button>'}

						  ],
						  "fnRowCallback": function( nRow, mData, iDisplayIndex, iDisplayIndexFull ) {
		   						$('td:eq('+5+')', nRow).addClass('inProgressStatuses');
						    }
	 });
//if user is client
  }else if(acctype == 2){
	  $.ajax({
			method: "POST",
			url: "getWaitingInvoicesByClient",
			data:{"logeduser": logeduser}
				,success: function(data, status, xhr){

					var table = $('#unpaidInvoiceTable').dataTable({
						"responsive": true,
						"order": [[ 0, "asc" ]],
						"data": data,
					    "columns": [
					        { data: "idbill" },
					        { data: "creationdate" },
					        { data: "amount" },
					        { data: "curency"},
					        { data: "duedate"},
					        { data: "status"},
					        {"defaultContent": '<button class="btn-details" type="button">Details</button>'}
					    ],
					    "fnRowCallback": function( nRow, mData, iDisplayIndex, iDisplayIndexFull ) {
	   						$('td:eq('+5+')', nRow).addClass('inProgressStatuses');
					    }

				    });
		            }, error: function(){
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
		            		//alert("An error occurred, please try later");
		            	}
				});
  }
 
	
		//Details Pop-up
	 $('#unpaidInvoiceTable').on('click', '.btn-details', function () {
		 var tr = $(this).closest('tr');
		 invoiceId = tr.children('td:eq(0)').text();//get the id (from db)
		 $("#approve").show();
		 $("#reject").show();
			
		if(acctype == 1){
			$("#approve").hide();
			$("#reject").hide();
		}
	

		 $.ajax({
				method: "POST",
				url: "getBillPositions",
				data:{"invoiceId": invoiceId}
					,success: function(data, status, xhr){

						var table = $('#serviceList').dataTable({
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
						//alert("An error occurred, please try later");
						}

			});

		 $.ajax({
				method: "POST",
				url: "getBillClientInfo",
				data:{"invoiceId": invoiceId}
					,success: function(data, status, xhr){

						$(".modal-body #idcl").html(data.id);
						var fullname = data.firstname+" "+data.lastname;
			            $(".modal-body #clname").html(fullname);
			            $(".modal-body #clemail").html(data.email);

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
						//alert("An error occurred, please try later");
						}

			});

		 $.ajax({
				method: "POST",
				url: "getInvoiceInfo",
				data:{"invoiceId": invoiceId}
					,success: function(data, status, xhr){

						$(".modal-body #idinv").html(data.idbill);
			            $(".modal-body #invcreationdate").html(data.creationdate);
			            $(".modal-body #invduedate").html(data.duedate);

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
						//alert("An error occurred, please try later");
						}

			});

		 $.ajax({
				method: "POST",
				url: "totalInvoice",
				data:{"invoiceId": invoiceId}
					,success: function(data, status, xhr){

						$(".modal-body #total").html(data+" EUR");

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
						//alert("An error occurred, please try later");
						}

			});


		 $('#invoiceModal').modal('show');
	 });

$("#addInv").click(function(){
	
	
	location="/CreateNewInvoicePage";
});
	 
 });

$(document).ready( function () {
//if user ia admin	
if(acctype == 1){
	 var table = $('#paidInvoiceTable').dataTable({
			"sAjaxSource": "/getAllPaidInvoices",
			"sAjaxDataProp": "",
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [	/*{"mData": "tr.index()"},*/
			              	{"mData": "idbill"},
						    {"mData": "creationdate"},
						    {"mData": "amount"},
						    {"mData": "curency"},
						    {"mData": "duedate"},
						    {"mData": "status"},
						    {"defaultContent": '<button class="btn-details" type="button">Details</button>'}

						  ],
						  "fnRowCallback": function( nRow, mData, iDisplayIndex, iDisplayIndexFull ) {
		   								   						
		   						switch(mData.status){
		   			            case 'APPROVED':
		   			                $('td:eq('+5+')', nRow).addClass('positiveStatus');
		   			                break;
		   			            case 'REJECTED':
		   			             $('td:eq('+5+')', nRow).addClass('negativeStatus');
		   			                break;
		   			           
		   			        }
		   					}
	 });
//if user is client
}else if(acctype == 2){
	$.ajax({
		method: "POST",
		url: "getProcessedInvoicesByClient",
		data:{"logeduser": logeduser}
			,success: function(data, status, xhr){

				var table = $('#paidInvoiceTable').dataTable({
					"responsive": true,
					"order": [[ 0, "asc" ]],
					"data": data,
				    "columns": [
				        { data: "idbill" },
				        { data: "creationdate" },
				        { data: "amount" },
				        { data: "curency"},
				        { data: "duedate"},
				        { data: "status"},
				        {"defaultContent": '<button class="btn-details" type="button">Details</button>'}
				    ],
				    "fnRowCallback": function( nRow, mData, iDisplayIndex, iDisplayIndexFull ) {
	   						
   						switch(mData.status){
   			            case 'APPROVED':
   			                $('td:eq('+5+')', nRow).addClass('positiveStatus');
   			                break;
   			            case 'REJECTED':
   			             $('td:eq('+5+')', nRow).addClass('negativeStatus');
   			                break;
   			           
   			        }
   					}

			    });
	            }, error: function(){
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
	            	//alert("An error occurred, please try later");
	            	}
			});
}


	//Details Pop-up
	 $('#paidInvoiceTable').on('click', '.btn-details', function () {
		 var tr = $(this).closest('tr');
		 invoiceId = tr.children('td:eq(0)').text();//get the id (from db)
		 var status = tr.children('td:eq(5)').text();
		
		$("#approve").hide();
		$("#reject").hide();
		
		if(acctype == 2 && status === "REJECTED"){
			$("#approve").show();
			
		}
		
		 $.ajax({
				method: "POST",
				url: "getBillPositions",
				data:{"invoiceId": invoiceId}
					,success: function(data, status, xhr){

						var table = $('#serviceList').dataTable({
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

					}, error: function(){
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
						//alert("An error occurred, please try later");
						}

			});

		 $.ajax({
				method: "POST",
				url: "getBillClientInfo",
				data:{"invoiceId": invoiceId}
					,success: function(data, status, xhr){

						$(".modal-body #idcl").html(data.id);
						var fullname = data.firstname+" "+data.lastname;
			            $(".modal-body #clname").html(fullname);
			            $(".modal-body #clemail").html(data.email);

					}, error: function(){
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
						//alert("An error occurred, please try later");
						}

			});

		 $.ajax({
				method: "POST",
				url: "getInvoiceInfo",
				data:{"invoiceId": invoiceId}
					,success: function(data, status, xhr){

						$(".modal-body #idinv").html(data.idbill);
			            $(".modal-body #invcreationdate").html(data.creationdate);
			            $(".modal-body #invduedate").html(data.duedate);

					}, error: function(){
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
						//alert("An error occurred, please try later");
						}

			});

		 $.ajax({
				method: "POST",
				url: "totalInvoice",
				data:{"invoiceId": invoiceId}
					,success: function(data, status, xhr){

						$(".modal-body #total").html(data+" EUR");

					}, error: function(){
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
						//alert("An error occurred, please try later");
						}

			});
		 $('#invoiceModal').modal('show');
	 });
	 
	 
	 //approve invoice
     $('.modal-footer').on('click', '#approve', function () {
    	 $.ajax({
				method: "POST",
				url: "approveInvoice",
				data:{"invoiceId": invoiceId}
    	 ,success: function(data, status, xhr){
    		 $('#invoiceModal').modal('hide');
    		 location.reload();
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
    		 //alert("An error occurred, please try later");
			}
     });
     });
     
   //reject invoice
     $('.modal-footer').on('click', '#reject', function () {
    	 $.ajax({
				method: "POST",
				url: "rejectInvoice",
				data:{"invoiceId": invoiceId}
 	 ,success: function(data, status, xhr){
 		 $('#invoiceModal').modal('hide');
 		location.reload();
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
 		//alert("An error occurred, please try later");
			}
     });
});
});

/*}else{
	location="/unauthorized";
}*/

