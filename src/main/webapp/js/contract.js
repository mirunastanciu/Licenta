/*if( !!$.cookie('loged_username') && $.cookie("loged_username") !== "" ){*/

$(window).resize(function(){location.reload();});

// --------------employee contracts table-------------------\\
$(document).ready( function () {

	 var table = $('#employeeContractTable').dataTable({
			"sAjaxSource": "/getEmployeeContracts/Details",
			"sAjaxDataProp": "",
			"columnDefs": [{"targets": 6,"orderable": false},
			              
			               ],
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [	/*{"mData": "tr.index()"},*/
			              	{"mData": "id"},
						    {"mData": "status"},
						    {"mData": "salary"},
						    {"mData": "curency"},
						    {"mData": "startdate"},
						    {"mData": "expirationdate"},
						    {"defaultContent": '<button class="btn-details" type="button">Edit</button>'}

						  ]
	 });

	//Edit function//
	 $('#employeeContractTable').on('click', '.btn-details', function () {
		 var tr = $(this).closest('tr');
		 idContract = tr.children('td:eq(0)').text();//get the id (from db)
		 $.ajax({
			   method: "POST",
			   url: "getEmployeeContract/DetailsForModal",
			   data: {idContract: idContract},
			   success: function(data, status, xhr){

				    $(".modal-body #idE").html(data.id);
					$(".modal-body #statusE").html(data.status);
		            $(".modal-body #salaryE").html(data.salary);
		            $(".modal-body #curencyE").html(data.curency);
		            $(".modal-body #signdateE").html(data.signdate);
		            $(".modal-body #startdateE").html(data.startdate);
		            if(data.expirationdate === null){
		              $(".modal-body #expdateE").html("Unlimited");
		            }else{
		            	$(".modal-body #expdateE").html(data.expirationdate);
		            }

		            $.ajax("/getEmployeeContractStatuses",
		 			       { type: 'GET',
		 			 		 success: function (data) {
		 			 			options = data;

		 					       	$('#StatusList').empty();
		 					        $('#StatusList').append($('<option></option>').html(""));
		 					       	$.each(options, function(i, p) {
		 					       	$('#StatusList').append($('<option></option>').val(p).html(p));
		 					       	});
		 			       }

		 			       })

		            $('#EditModalEmployeeContract').modal('show');
		            
		          //reset fields content on close
		        	$('#EditModalEmployeeContract').on('hidden.bs.modal', function (e) {
		        			  $(this)
		        			    .find("input,textarea,select")
		        			       .val('')
		        			       .end()
		        			    .find("input[type=checkbox], input[type=radio]")
		        			       .prop("checked", "")
		        			       .end();
		        	})

		        },error:function(){
		        	 $.notify({//options
						    title:"<strong>Error!</strong>",
							message:"An error occurred, please try later.",
								
							},
							{//settings
								allow_dismiss: true,
								z_index: 2000,
								type:"danger",
								position: "fixed",
								placement: {
									from: "top",
									align: "center"
								}
							
						});
		        	//alert("An error occurred, please try later.");
		        }


			   });

		 //Update function//
         $('.modal-footer').on('click', '#savebutton', function () {

        	 var status =  $(".modalcontent #statusE").text();
        	 var salary =  $(".modalcontent #salaryE").text();
        	 var expdate =  $(".modalcontent #expdateE").text();

        	 $.ajax({
				   method: "POST",
				   url: "updateContractEmployee",
				   data:
				          {"idContract": idContract,
					   	  "status": status,
					   	  "salary": salary,
					   	  "expdate": expdate
					   	  }
					   		,
				   success: function(data, status, xhr){

					   $('#EditModalEmployeeContract').modal('hide');
					   location.reload();
				   }, error: function(){
					   $.notify({//options
						    title:"<strong>Error!</strong>",
							message:"An error occurred, please try later.",
								
							},
							{//settings
								allow_dismiss: true,
								z_index: 2000,
								type:"danger",
								position: "fixed",
								placement: {
									from: "top",
									align: "center"
								}
							
						});
					   //alert("An error occurred, please try later.");
					   }
				   });


		   });
		});


});

// --------------clients contracts table---------------\\
$(document).ready( function () {

	 var table = $('#clientContractTable').dataTable({
			"sAjaxSource": "/getClientContracts/Details",
			"sAjaxDataProp": "",
			"columnDefs": [{"targets": 6,"orderable": false},
				              
			               ],
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [	/*{"mData": "tr.index()"},*/
			              	{"mData": "id"},
						    {"mData": "status"},
						    {"mData": "amount"},
						    {"mData": "curency"},
						    {"mData": "startdate"},
						    {"mData": "expirationdate"},
						    {"defaultContent": '<button class="btn-details" type="button">Edit</button>'}
						    ]
	 });

		//Edit function//
	 $('#clientContractTable').on('click', '.btn-details', function () {
		 var tr = $(this).closest('tr');
		 var idContract = tr.children('td:eq(0)').text();//get the id (from db)
		 $.ajax({
			   method: "POST",
			   url: "getClientContract/DetailsForModal",
			   data: {idContract: idContract},
			   success: function(data, status, xhr){

				    $(".modal-body #idEC").html(data.id);
					$(".modal-body #statusEC").html(data.status);
		            $(".modal-body #amountEC").html(data.amount);
		            $(".modal-body #curencyEC").html(data.curency);
		            $(".modal-body #signdateEC").html(data.signdate);
		            $(".modal-body #startdateEC").html(data.startdate);
		            if(data.expirationdate === null){
		              $(".modal-body #expdateEC").html("Unlimited");
		            }else{
		            	$(".modal-body #expdateEC").html(data.expirationdate);
		            }

		            $.ajax("/getClientContractstatusNames",
		 			       { type: 'GET',
		 			 		 success: function (data) {
		 			 			options = data;

		 					       	$('#StatusListC').empty();
		 					    	$('#StatusListC').append($('<option></option>').html(""));
		 					       	$.each(options, function(i, p) {
		 					       	$('#StatusListC').append($('<option></option>').val(p).html(p));
		 					       	});
		 			       },error:function(){
		 			    	  $.notify({//options
								    title:"<strong>Error!</strong>",
									message:"An error occurred, please try later.",
										
									},
									{//settings
										allow_dismiss: true,
										z_index: 2000,
										type:"danger",
										position: "fixed",
										placement: {
											from: "top",
											align: "center"
										}
									
								});
		 			    	  //alert("An error occurred, please try later.");
		 			       }

		 			       });

		            $('#EditModalClientContract').modal('show');
		            
		          //reset fields content on close
		        	$('#EditModalEmployeeContract').on('hidden.bs.modal', function (e) {
		        			  $(this)
		        			    .find("input,textarea,select")
		        			       .val('')
		        			       .end()
		        			    .find("input[type=checkbox], input[type=radio]")
		        			       .prop("checked", "")
		        			       .end();
		        	})
		            
		            

		        },error:function(){
		        	$.notify({//options
					    title:"<strong>Error!</strong>",
						message:"An error occurred, please try later.",
							
						},
						{//settings
							allow_dismiss: true,
							z_index: 2000,
							type:"danger",
							position: "fixed",
							placement: {
								from: "top",
								align: "center"
							}
						
					});
		        	//alert("An error occurred, please try later.");
		        }


			   });

		 //Update function//
         $('.modal-footer').on('click', '#savebutton', function () {

        	 var status =  $(".modalcontent #statusEC").text();
        	 var amount =  $(".modalcontent #amountEC").text();
        	 var expdate =  $(".modalcontent #expdateEC").text();

        	 $.ajax({
				   method: "POST",
				   url: "updateContractClient",
				   data:
				          {"idContract": idContract,
					   	  "status": status,
					   	  "amount": amount,
					   	  "expdate": expdate
					   	  }
					   		,
				   success: function(data, status, xhr){

					   $('#EditModalClientContract').modal('hide');
					   location.reload();
				   }, error: function(){
					   $.notify({//options
						    title:"<strong>Error!</strong>",
							message:"An error occurred, please try later.",
								
							},
							{//settings
								allow_dismiss: true,
								z_index: 2000,
								type:"danger",
								position: "fixed",
								placement: {
									from: "top",
									align: "center"
								}
							
						});
					   //alert("An error occurred, please try later.");
					   }
				   });


		   });
		});


});

// ------------create new employee contract modal function-----------\\
function modalEmployeeContract(){
	var options;
	 $('#myModalEmployeeContract').modal('show');

		$.ajax("/getEmployeeContractStatuses",
			       { type: 'GET',
			 		 success: function (data) {
			 			options = data;

					       	$('#statusList').empty();
					    	$('#statusList').append($('<option></option>').html(""));
					       	$.each(options, function(i, p) {
					       	$('#statusList').append($('<option></option>').val(p).html(p));
					       	});
			       },error:function(){
			    	   $.notify({//options
						    title:"<strong>Error!</strong>",
							message:"An error occurred, please try later.",
								
							},
							{//settings
								allow_dismiss: true,
								z_index: 2000,
								type:"danger",
								position: "fixed",
								placement: {
									from: "top",
									align: "center"
								}
							
						});
			    	   //alert("An error occurred, please try later.");
			       }

			       })
			       
			       //reset fields content on close
		        	$('#myModalEmployeeContract').on('hidden.bs.modal', function (e) {
		        			  $(this)
		        			    .find("input,textarea,select")
		        			       .val('')
		        			       .end()
		        			    .find("input[type=checkbox], input[type=radio]")
		        			       .prop("checked", "")
		        			       .end();
		        	})
   //Save Fuction//
	$('.modal-footer').on('click', '#savebutton',function(){
			var salary = $(".modalcontent #salary").val();
			var status = $("#statusList option:selected" ).text();
			var signaturedate = $('.modalcontent #signdate').val();
			var startdate =$('.modalcontent #startdate').val();
			var expirationdate =$('.modalcontent #expdate').val();

	if($.trim($(".modalcontent #salary").val()) === ''|| $.trim($('.modalcontent #signdate').val()) === ''||
	   $.trim($('.modalcontent #startdate').val()) === '' || status === ""){
		
		$.notify({//options
		    title:"<strong>Attention!</strong>",
			message:"Please complete all mandatory fileds.",
				
			},
			{//settings
				//element:".modal",	
				allow_dismiss: true,
				 z_index: 2000,
				type:"danger",
				position: "fixed",
				placement: {
					from: "top",
					align: "center"
				}
			
		});

		//alert("There are one or more mandatory fields to be fill in !");
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
						$.notify({//options
						    title:"<strong>Success!</strong>",
							message:"The new contract has been saved.",
								
							},
							{//settings
								allow_dismiss: true,
								z_index: 2000,
								type:"success",
								position: "fixed",
								placement: {
									from: "top",
									align: "center"
								}
							
						});
						var delay = 2000; 
						setTimeout(function(){ 
							$('#myModalEmployeeContract').modal('hide');
							 location.reload();
						}, delay);
						//alert("The new contract has been saved.");
						

					}, error: function(){
						$.notify({//options
						    title:"<strong>Error!</strong>",
							message:"The new contract has not been saved.",
								
							},
							{//settings
								allow_dismiss: true,
								z_index: 2000,
								type:"danger",
								position: "fixed",
								placement: {
									from: "top",
									align: "center"
								}
							
						});
						//alert("The new contract has not been saved," );
						}
			});
	}
 }
		);

}

//----------create new client contract modal function--------------\\
function modalClientContract(){
	 $('#myModalClientContract').modal('show');
	 var options;
		$.ajax("/getClientsName",
			       { type: 'GET',
			 		 success: function (data) {
			 			options = data;

					       	$('#clientsList').empty();
					     	$('#clientsList').append($('<option></option>').html(""));
					       	$.each(options, function(i, p) {
					       	$('#clientsList').append($('<option></option>').val(p).html(p));
					       	});
			       },error:function(){
			    	   $.notify({//options
						    title:"<strong>Error!</strong>",
							message:"An error occurred, please try later.",
								
							},
							{//settings
								allow_dismiss: true,
								z_index: 2000,
								type:"danger",
								position: "fixed",
								placement: {
									from: "top",
									align: "center"
								}
							
						});
			    	   	//alert("The contract has been saved successfull")
			       }

			       });


		$.ajax("/getClientContractstatusNames",
			       { type: 'GET',
			 		 success: function (data) {
			 			options = data;

					       	$('#statusList1').empty();
					       	$('#statusList1').append($('<option></option>').html(""));
					       	$.each(options, function(i, p) {

					       	$('#statusList1').append($('<option></option>').val(p).html(p));
					       	});
			       },error:function(){
			    	   $.notify({//options
						    title:"<strong>Error!</strong>",
							message:"An error occurred, please try later.",
								
							},
							{//settings
								allow_dismiss: true,
								z_index: 2000,
								type:"danger",
								position: "fixed",
								placement: {
									from: "top",
									align: "center"
								}
							
						});
			    	   //alert("The contract has been saved successfull")
			       }

			       });

		//reset fields content on close
    	$('#myModalClientContract').on('hidden.bs.modal', function (e) {
    			  $(this)
    			    .find("input,textarea,select")
    			       .val('')
    			       .end()
    			    .find("input[type=checkbox], input[type=radio]")
    			       .prop("checked", "")
    			       .end();
    	})

   //Save Fuction//
	$('.modal-footer').on('click', '#savebutton', function (){
			var amount = $(".modalcontent #amount").val();
			var status = $("#statusList1 option:selected" ).text();
			var client = $("#clientsList option:selected").text();
			var signaturedate = $('.modalcontent #signdate1').val();
			var startdate =$('.modalcontent #startdate1').val();
			var expirationdate =$('.modalcontent #expdate1').val();

	if($.trim($(".modalcontent #amount").val()) === ''|| $.trim($('.modalcontent #signdate1').val()) === ''||
	   $.trim($('.modalcontent #startdate1').val()) === '' || client === "" || status === ""){

		$.notify({//options
		    title:"<strong>Attention!</strong>",
			message:"Please complete all mandaroty fields .",
				
			},
			{//settings
				allow_dismiss: true,
				z_index: 2000,
				type:"danger",
				position: "fixed",
				placement: {
					from: "top",
					align: "center"
				}
			
		});
			//alert("Please complete all mandaroty fields .");
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
						$.notify({//options
						    title:"<strong>Success!</strong>",
							message:"The new contract has been saved .",
								
							},
							{//settings
								allow_dismiss: true,
								z_index: 2000,
								type:"success",
								position: "fixed",
								placement: {
									from: "top",
									align: "center"
								}
							
						});
						var delay = 2000; 
						setTimeout(function(){ 
							$('#getEmployeeContractStatuses').modal('hide');
							 location.reload();
						}, delay);
						//alert("The new contract has been saved .");
						

					}, error: function(){
						$.notify({//options
						    title:"<strong>Error!</strong>",
							message:"The new contract has not been saved .",
								
							},
							{//settings
								allow_dismiss: true,
								z_index: 2000,
								type:"danger",
								position: "fixed",
								placement: {
									from: "top",
									align: "center"
								}
							
						});
						//alert("The new contract has not been saved .");
						}
			});
	}
		});

}
//----------- Employee Contract functions-------------------\\
//Change Status on Edit mode//
function statusChange(){

	$.ajax("/getEmployeeContractStatuses",
		       { type: 'GET',
		 		 success: function (data) {

				       for(var i in data){
				    	   sel = document.getElementById("StatusList"); //
				    	    var status = document.getElementById("statusE");
				    	    if ( sel.options[sel.selectedIndex].value == data[i] ) {
				    	    	status.innerHTML = sel.options[sel.selectedIndex].value;
				    	    }
				       }
				       },error:function(){
				    	   $.notify({//options
							    title:"<strong>Error!</strong>",
								message:"An error occurred, please try later..",
									
								},
								{//settings
									allow_dismiss: true,
									z_index: 2000,
									type:"danger",
									position: "fixed",
									placement: {
										from: "top",
										align: "center"
									}
								
							});
				    	   //alert("An error occurred, please try later.")
				       }
		       })
	
}

//Change salary on Edit mode//
function SalaryChange(){

	$("#SLRY").click(function(e) {
		var salary = $("#salaryE").text();
		var salaryedit = document.getElementById("salaryEdit");
		 if(salary !== salaryedit && $(salaryedit).val().length !== 0 ){
			 if(e.target.id !== "salaryEdit"){
				$(".modal-body #salaryE").html(salaryedit.value);

	    		}
			 }
	});
}

//Change Expiration Date//
function expDateChange(){

	$("#EXPD").click(function(e) {
		var expdate =  $("#expdateE").text();
	    var expdateedit = document.getElementById("expDateEdit");
	    if(expdate.value !== expdateedit.value /* && $(duedateedit).val().length !== 0*/ ){
	    	if(e.target.id !== "expDateEdit" ){
	    		if($(expdateedit).val().length == 0){
	    			$(".modal-body #expdateE").html("Unlimited");
	    		}else{
	    			$(".modal-body #expdateE").html(expdateedit.value);
	    		}
	    			
	    		

	    	 }
		}
	});
}

//----------- Client Contract functions-------------------\\
//Change Status on Edit mode//
function statusChange1(){

	$.ajax("/getEmployeeContractStatuses",
		       { type: 'GET',
		 		 success: function (data) {

				       for(var i in data){
				    	   sel = document.getElementById("StatusListC"); //
				    	    var status = document.getElementById("statusEC");
				    	    if ( sel.options[sel.selectedIndex].value == data[i] ) {
				    	    	status.innerHTML = sel.options[sel.selectedIndex].value;
				    	    }
				       }
				     
				 },errot:function(){
					 $.notify({//options
						    title:"<strong>Error!</strong>",
							message:"An error occurred, please try later..",
								
							},
							{//settings
								allow_dismiss: true,
								z_index: 2000,
								type:"danger",
								position: "fixed",
								placement: {
									from: "top",
									align: "center"
								}
							
						});
					 //alert("An error occurred, please try later.");
				 }
	})
}

//Change salary on Edit mode//
function SalaryChange1(){

	$("#SLRY1").click(function(e) {
		var amount = $("#amountEC").text();
		var amountedit = document.getElementById("amountEdit");
		 if(amount !== amountedit && $(amountedit).val().length !== 0 ){
			 if(e.target.id !== "amountEdit"){
				$(".modal-body #amountEC").html(amountedit.value);

	    		}
			 }
	});
}

//Change Expiration Date//
function expDateChange1(){

	$("#EXPD1").click(function(e) {
		var expdate =  $("#expdateEC").text();
	    var expdateedit = document.getElementById("expDateEditC");
	    if(expdate.value !== expdateedit.value /* && $(duedateedit).val().length !== 0*/ ){
	    	if(e.target.id !== "expDateEditC" ){
	    		if($(expdateedit).val().length == 0){
	    			$(".modal-body #expdateEC").html("Unlimited");
	    		}else{
	    			$(".modal-body #expdateEC").html(expdateedit.value);
	    		}

	    	 }
		}
	});
}


/*}else{
	location="/unauthorized";
}*/