$(window).resize(function(){location.reload();});

// employee contracts table
$(document).ready( function () {

	 var table = $('#employeeContractTable').dataTable({
			"sAjaxSource": "/getEmployeeContracts/Details",
			"sAjaxDataProp": "",
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [	/*{"mData": "tr.index()"},*/
			              	{"mData": "id"},
						    {"mData": "status"},
						    {"mData": "salary"},
						    {"mData": "curency"},
						    {"mData": "startdate"},
						    {"mData": "expirationdate"}
						    
						  ]
	 });
						  
		
});	

// clients contrcats table
$(document).ready( function () {
	
	 var table = $('#clientContractTable').dataTable({
			"sAjaxSource": "/getClientContracts/Details",
			"sAjaxDataProp": "",
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [	/*{"mData": "tr.index()"},*/
			              	{"mData": "id"},
						    {"mData": "status"},
						    {"mData": "amount"},
						    {"mData": "curency"},
						    {"mData": "startdate"},
						    {"mData": "expirationdate"}
						    ]
	 });
						  
		
});	

// create new employee contract modal function
function modalEmployeeContract(){
	var options;
	 $('#myModalEmployeeContract').modal('show');
	 
		$.ajax("/getEmployeeContractStatuses",
			       { type: 'GET',
			 		 success: function (data) {
			 			options = data;

					       	$('#statusList').empty();
					       	$.each(options, function(i, p) {
					       	$('#statusList').append($('<option></option>').val(p).html(p));
					       	});
			       }

			       })
   //Save Fuction
	$('.modal-footer').on('click', '#savebutton', function (){
			var salary = $(".modalcontent #salary").val();
			var status = $("#statusList option:selected" ).text();
			var signaturedate = $('.modalcontent #signdate').val();
			var startdate =$('.modalcontent #startdate').val();
			var expirationdate =$('.modalcontent #expdate').val();
			
	if($.trim($(".modalcontent #salary").val()) === ''|| $.trim($('.modalcontent #signdate').val()) === ''||
	   $.trim($('.modalcontent #startdate').val()) === ''){
						
		alert("There are one or more mandatory fields to be fill in !");
	}else{						
		
			$.ajax({
				method: "POST",
				url: "saveNewEmployeeContract",
				data:
					{"salary": salary,
					 "status": status,
					 "signaturedate": signaturedate,
					 "startdate": startdate,
					 "expirationdate": expirationdate
					},
					success: function(data, status, xhr){
						alert("The contract has been saved successfull");
						$('#myModalEmployeeContract').modal('hide');
						 location.reload();
						
					}, error: function(){
						alert("error on saving new contract");
						}
			});
	}
 });		              
	  
}

//create new client contract modal function
function modalClientContract(){
	 $('#myModalClientContract').modal('show');
	 var options;
		$.ajax("/getClientsName",
			       { type: 'GET',
			 		 success: function (data) {
			 			options = data;

					       	$('#clientsList').empty();
					       	$.each(options, function(i, p) {
					       	$('#clientsList').append($('<option></option>').val(p).html(p));
					       	});
			       }

			       });
			     
	 
		$.ajax("/getClientContractstatusNames",
			       { type: 'GET',
			 		 success: function (data) {			 			
			 			options = data;

					       	$('#statusList1').empty();
					       	$.each(options, function(i, p) {
					       	 
					       	$('#statusList1').append($('<option></option>').val(p).html(p));
					       	});
			       }

			       });
	       
			       
			       
   //Save Fuction
	$('.modal-footer').on('click', '#savebutton', function (){
			var amount = $(".modalcontent #amount").val();
			var status = $("#statusList1 option:selected" ).text();
			var client = $("#clientsList option:selected").text();
			var signaturedate = $('.modalcontent #signdate1').val();
			var startdate =$('.modalcontent #startdate1').val();
			var expirationdate =$('.modalcontent #expdate1').val();
			
	if($.trim($(".modalcontent #amount").val()) === ''|| $.trim($('.modalcontent #signdate1').val()) === ''||
	   $.trim($('.modalcontent #startdate1').val()) === ''){
										
			alert("There are one or more mandatory fields to be fill in !");
	}else{		
				
		
			$.ajax({
				method: "POST",
				url: "saveNewClientContract",
				data:
					{"client": client,
					 "amount": amount,
					 "status": status,
					 "signaturedate": signaturedate,
					 "startdate": startdate,
					 "expirationdate": expirationdate
					},
					success: function(data, status, xhr){
						alert("The contract has been saved successfull");
						$('#getEmployeeContractStatuses').modal('hide');
						 location.reload();
						
					}, error: function(){
						alert("error on saving new contract");
						}
			});
	}
		});		              
	  
}




