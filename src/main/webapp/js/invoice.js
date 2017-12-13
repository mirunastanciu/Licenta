$(window).resize(function(){
	location.reload();
});

$(document).ready( function () {

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

						  ]
	 }); 
		//Details Pop-up 
	 $('#unpaidInvoiceTable').on('click', '.btn-details', function () {
		 var tr = $(this).closest('tr');
		 invoiceId = tr.children('td:eq(0)').text();//get the id (from db)
		 
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
						alert("error louding pos bill");
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
						alert("error louding client info");
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
						alert("error louding invoice info");
						}
					
			});
		 
		 $.ajax({
				method: "POST",
				url: "totalInvoice",
				data:{"invoiceId": invoiceId}
					,success: function(data, status, xhr){
					
						$(".modal-body #total").html(data+" EUR");
			            
					}, error: function(){
						alert("error total calculation");
						}
					
			});
		 
		 
		 $('#invoiceModal').modal('show');
	 });
	
 });

$(document).ready( function () {

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

						  ]
	 }); 
	 
	//Details Pop-up 
	 $('#paidInvoiceTable').on('click', '.btn-details', function () {
		 var tr = $(this).closest('tr');
		 invoiceId = tr.children('td:eq(0)').text();//get the id (from db)
		 
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
						alert("error louding pos bill");
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
						alert("error louding client info");
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
						alert("error louding invoice info");
						}
					
			});
		 
		 $.ajax({
				method: "POST",
				url: "totalInvoice",
				data:{"invoiceId": invoiceId}
					,success: function(data, status, xhr){
					
						$(".modal-body #total").html(data+" EUR");
			            
					}, error: function(){
						alert("error total calculation");
						}
					
			});
		 $('#invoiceModal').modal('show');
	 });
});

