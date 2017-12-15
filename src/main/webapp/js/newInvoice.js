$(window).resize(function(){
	location.reload();
});



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
	       }

	       });

function addPos(){

	var clientname = $("#clientlist option:selected").text();


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

			}, error: function(){
				alert("error on geting tickes id");
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
			  
			  alert("You must select a client and a ticket");
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
											alert("error total Invoice");
											}

								});

							}, error: function(){
								alert("error louding pos bill");
								}

					});

					$('#addPosModal').modal('hide');

			   }, error: function(){
				   alert("error on saving positions");
				   }
			   });
			 }
 }

 function saveInvoice(){
	 var clientname = $("#clientlist option:selected").text();
	 var duedate =	 $("#duedate").val();
     var total = $("#total").text();
     var table = $('#positionList').DataTable();
     
     
     if( clientname === "" || duedate === "" || table.data().count() ===0 ){
    	 alert ("You have empty fields")
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
    	 				alert("error save Invoice");
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

 			}, error: function(){
 				alert("error cancel Invoice");
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
	 				

	 			}, error: function(){
	 				
	 				}
	 	});

 });




