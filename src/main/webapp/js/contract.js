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
	 $('#myModalEmployeeContract').modal('show');
	 var options1;
		$.ajax("/getEmployeeContractStatuses",
			       { type: 'GET',
			 		 success: function (data) {
					       options1 = data;

					       	$('#statusList').empty();
					       	$.each(options1, function(i, p) {
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
		});		              
	  
}




