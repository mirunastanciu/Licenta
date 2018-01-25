/*if(!!$.cookie('loged_username') && $.cookie("loged_username") !== "" ){
	console.log("I'm in")*/

$(window).resize(function(){location.reload();});
//Dev table
$(document).ready( function () {

	 var table = $('#employeeTable').dataTable({
			"sAjaxSource": "/employeesDetails",
			"sAjaxDataProp": "",
			"columnDefs": [{"targets": 4,"orderable": false} ],
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [	/*{"mData": "tr.index()"},*/
			              	{"mData": "id"},
						    {"mData": "name"},
						    {"mData": "specialisation"},
						    {"mData": "specialisationlavel"},
						    {"defaultContent": '<button class="btn-details" type="button">Details</button>'}
						    ]
	 });
	 
	 

	 //Details button function
	 $('#employeeTable').on('click', '.btn-details', function () {

		 var tr = $(this).closest('tr');
		 var idEmployee = tr.children('td:eq(0)').text();//get the id (from db)


		 $.ajax({
			   method: "POST",
			   url: "getModalDetails",
			   data: {"idEmployee": idEmployee},
			   success: function(data, status, xhr){

					$(".modal-body #employeeid").html(data.id);
		            $(".modal-body #empname").html(data.name);
		            $(".modal-body #empspl").html(data.specialisation);
		            $(".modal-body #empspllev").html(data.specialisationlavel);
		            $(".modal-body #empemail").html(data.email);
		            $(".modal-body #empuser").html(data.username);
		            $(".modal-body #empaddress").html(data.address);

		            $(".modal-body #contractid").html(data.contractid);
		            $(".modal-body #contractstatus").html(data.contractstatus);
		            $(".modal-body #empsalary").html(data.salary);
		            $(".modal-body #salarycurency").html(data.curency);
		            $(".modal-body #stdate").html(data.startdate);
		            $(".modal-body #expdate").html(data.expirationdate);

				   $('#myModalEmployeeDetails').modal('show');
			   }
		 });

		//Delete button function
		  $('.modal-footer').on('click', '#deletebutton', function () {
            console.log(idEmployee)
			 $.ajax({
				   method: "POST",
				   url: "deleteEmployee",
				   data: {"idEmployee": idEmployee},
				   success: function(data, status, xhr){
					   $.notify({//options
						    title:"<strong>Success!<strong>",
							message:"The Employee account "+idEmployee+" has been deleted .",
							button: "Confirm"
							},
							{//settings
								type:"success",
								allow_dismiss: true,
								
								position: "fixed",
								placement: {
									from: "top",
									align: "center"
								}
							
						});
					   //alert("The Employee account "+idEmployee+" has been deleted .")
					   location.reload();
				   },error: function(){
					   $.notify({//options
						    title:"<strong>Error!</strong>",
							message:"The Employee account "+idEmployee+" has not been deleted . Please try again",
							button: "Confirm"
							},
							{//settings
								type:"danger",
								allow_dismiss: true,
								
								position: "fixed",
								placement: {
									from: "top",
									align: "center"
								}
							
						});
					  // alert("The Employee account "+idEmployee+" has not been deleted . Please try again")
				   }
			 });
	   })
    })




})

function createContractRemainder(){
	contractremainder
	//$('#ModalCreateNewEmployee').modal('hide');
	$('#contractremainder').modal('show');
	
	
}



function CreateNewEmployeeModal(){
	 $('#contractremainder').modal("toggle");
	 $('#ModalCreateNewEmployee').modal('show');
	 var options1;
		$.ajax("/getSpNames",
			       { type: 'GET',
			 		 success: function (data) {
					       options1 = data;

					       	$('#specialisationList').empty();
					    	$('#specialisationList').append($('<option></option>').html(""));
					       	$.each(options1, function(i, p) {
					       	$('#specialisationList').append($('<option></option>').val(p).html(p));
					       	});
			       }

			       })
	//reset fields content on close
	$('#ModalCreateNewEmployee').on('hidden.bs.modal', function (e) {
			  $(this)
			    .find("input,textarea,select")
			       .val('')
			       .end()
			    .find("input[type=checkbox], input[type=radio]")
			       .prop("checked", "")
			       .end();
	})
	
  //Save Fuction
	$('.modal-footer').on('click', '#savebutton', function (){
			var firstname = $(".modalcontent #fname").val();
			var lastname = $(".modalcontent #lname").val();
			var username = $(".modalcontent #Uname").val();
			var password = $(".modalcontent #Pass").val();
			var email = $(".modalcontent #email").val();
			var specialisation = $("#specialisationList option:selected" ).text();
			var specialisationLavel = $("#specialisationLavelList option:selected" ).text();
			var country = $(".modalcontent #countryList").val();//$("#countryList option:selected" ).text();
			var county = $(".modalcontent #county").val();
			var town = $(".modalcontent #town").val();
			var street = $(".modalcontent #street").val();
			var streetno = $(".modalcontent #streetno").val();
			var build = $(".modalcontent #build").val();
			var appno = $(".modalcontent #appno").val();
			var contractno = $(".modalcontent #contractno").val();

		if($.trim($(".modalcontent #fname").val()) === ''|| $.trim($(".modalcontent #lname").val()) === ''||
		   $.trim($(".modalcontent #Uname").val()) === ''|| $.trim($(".modalcontent #Pass").val()) === ''||
		   $.trim($(".modalcontent #email").val()) === ''|| $.trim($(".modalcontent #county").val()) === ''||
		   $.trim($(".modalcontent #town").val()) === ''|| $.trim($(".modalcontent #street").val()) === ''||
		   $.trim($(".modalcontent #streetno").val()) === ''|| $.trim($(".modalcontent #build").val()) === ''||
		   $.trim($(".modalcontent #appno").val()) === ''|| $.trim($(".modalcontent #contractno").val()) === '' || 
		   $.trim($(".modalcontent #countryList").val()) === '' || specialisation === ""|| 
		   specialisationLavel === ""){
			
			$.notify({//options
			    title:"<strong>Attention!</strong>",
				message:"Please complete all mandaroty fields.",
					
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
		}else if(document.getElementById("email").checkValidity()){
			
			$.ajax({
				method: "POST",
				url: "uniqueUser",
				data:
					{"username": username}
			,
			success: function(data, status, xhr){
				if(data == "success"){
					$.ajax({
						method: "POST",
						url: "saveEmployee",
						data:
							{"firstname": firstname,
							 "lastname": lastname,
							 "username": username,
							 "password": password,
							 "email": email,
							 "specialisation": specialisation,
							 "specialisationLavel": specialisationLavel,
							 "country": country,
							 "county": county,
							 "town": town,
							 "street": street,
							 "streetno": streetno,
							 "build": build,
							 "appno": appno,
							 "contractno": contractno
							},
							success: function(data, status, xhr){
								
								$.notify({//options
								    title:"<strong>Success!</strong>",
									message:"The new employee account has been saved . ",
									
									},
									{//settings
										z_index: 2000,	
										type:"success",
										allow_dismiss: true,
										
										position: "fixed",
										placement: {
											from: "top",
											align: "center"
										}
									
								});
								//alert("The new employee account has been saved . ");
								$('#myModalEmployeeContract').modal('hide');
								 location.reload();

							}, error: function(){
								$.notify({//options
								    title:"<strong>Error!</strong>",
									message:"The new employee account has not been saved .Please try again.",
									
									},
									{//settings
										z_index: 2000,	
										type:"danger",
										allow_dismiss: true,
										
										position: "fixed",
										placement: {
											from: "top",
											align: "center"
										}
									
								});
								//alert("The new employee account has not been saved .Please try again.");
								}
					});
				}else{
					$.notify({//options
					    title:"<strong>Attention!</strong>",
						message:"This username already exist.",
						
						},
						{//settings
							z_index: 2000,	
							type:"danger",
							allow_dismiss: true,
							
							position: "fixed",
							placement: {
								from: "top",
								align: "center"
							}
						
					});
					//alert("An error occurred, please try later.");
				  }
			}, error: function(){
				$.notify({//options
				    title:"<strong>Error!</strong>",
					message:"An error occurred, please try later.",
					
					},
					{//settings
						z_index: 2000,
						type:"danger",
						allow_dismiss: true,
						
						position: "fixed",
						placement: {
							from: "top",
							align: "center"
						}
					
				});
				//alert("error on uniqueness account");
				}

		});
	}else{
		
		$.notify({//options
		    title:"<strong>Attention!</strong>",
			message:"The e-mail is invalid. ",
			
			},
			{//settings
				z_index: 2000,	
				type:"danger",
				allow_dismiss: true,
				
				position: "fixed",
				placement: {
					from: "top",
					align: "center"
				}
			
		});
	}	
	
		});


}
//Clients table
$(document).ready( function () {

	 var table = $('#clientTable').dataTable({
			"sAjaxSource": "/getAllClients",
			"sAjaxDataProp": "",
			"columnDefs": [{"targets": 3,"orderable": false},
			               {'width': '17%', 'targets': 3}
			               ],
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [
			              	{"mData": "id"},
						    {"mData": "firstname"},
						    {"mData": "lastname"},
						    {"defaultContent": '<button class="btn-details" type="button">Details</button>'}
						    ]
	 });
	 //Details button function
	 $('#clientTable').on('click', '.btn-details', function () {

		 var tr = $(this).closest('tr');
		 var idClient = tr.children('td:eq(0)').text();//get the id (from db)


		 $.ajax({
			   method: "POST",
			   url: "getClientDetails",
			   data: {"idClient": idClient},
			   success: function(data, status, xhr){

					$(".modal-body #clid").html(data.id);
		            $(".modal-body #clname").html(data.name);
		            $(".modal-body #clemail").html(data.email);
		            $(".modal-body #cluser").html(data.username);
		            $(".modal-body #claddress").html(data.address);


		            $(".modal-body #contractidcl").html(data.idcontract);
		            $(".modal-body #contractstatus1").html(data.contractstatus);
		            $(".modal-body #amount").html(data.amount);
		            //$(".modal-body #availableamount").html(data.curency);
		            $(".modal-body #curency").html(data.curency);
		            $(".modal-body #stdate1").html(data.startdate);


				   $('#myModalClientDetails').modal('show');
			   },error:function(){
				   $.notify({//options
					    title:"<strong>Error!</strong>",
						message:"An error occurred, please try later.",
						
						},
						{//settings
							z_index: 2000,
							type:"danger",
							allow_dismiss: true,
							
							position: "fixed",
							placement: {
								from: "top",
								align: "center"
							}
						
					});
				   
				   //alert("An error occurred, please try later")
			   }
		 });

		//Delete button function
		  $('.modal-footer').on('click', '#deletebutton', function () {

			 $.ajax({
				   method: "POST",
				   url: "deleteClient",
				   data: {"idClient": idClient},
				   success: function(data, status, xhr){
					   if(data === "existBillUnpaid"){
						   $.notify({//options
							    title:"<strong>Attention!</strong>",
								message:"This account cannot be deleted because there are unpaid bills!",
								
								},
								{//settings
									z_index: 2000,	
									type:"danger",
									allow_dismiss: true,
									
									position: "fixed",
									placement: {
										from: "top",
										align: "center"
									}
								
							});
						   //alert("This account cannot be deleted because exist invoice/s unpaied !")
					   }else{
						   $.notify({//options
							    title:"<strong>Success!</strong>",
								message:"The Client "+idClient+" has been deleted.",
								
								},
								{//settings
									z_index: 2000,	
									type:"success",
									allow_dismiss: true,
									
									position: "fixed",
									placement: {
										from: "top",
										align: "center"
									}
								
							});
						   var delay = 2000; 
							setTimeout(function(){ 
								location.reload();
							}, delay);
						   
					   }
					  
				   },error: function(){
					   $.notify({//options
						    title:"<strong>Error!</strong>",
							message:"An error occurred, please try later.",
							
							},
							{//settings
								z_index: 2000,	
								type:"danger",
								allow_dismiss: true,
								
								position: "fixed",
								placement: {
									from: "top",
									align: "center"
								}
							
						});
					  // alert("The Client "+idClient+" has not been deleted .Please try again. ")
				   }
			 });
	   })
})

});



/*}else{
	location="/unauthorized";
}*/


