$(window).resize(function(){location.reload();});
//Dev table
$(document).ready( function () {

	 var table = $('#employeeTable').dataTable({
			"sAjaxSource": "/employeesDetails",
			"sAjaxDataProp": "",
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
			   data: {idEmployee: idEmployee},
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
})	
})	

function CreateNewEmployeeModal(){
	 $('#ModalCreateNewEmployee').modal('show');
	 var options1;
		$.ajax("/getSpNames",
			       { type: 'GET',
			 		 success: function (data) {
					       options1 = data;

					       	$('#specialisationList').empty();
					       	$.each(options1, function(i, p) {
					       	$('#specialisationList').append($('<option></option>').val(p).html(p));
					       	});
			       }

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
			var country = $("#countryList option:selected" ).text();
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
		   $.trim($(".modalcontent #appno").val()) === ''|| $.trim($(".modalcontent #contractno").val()) === ''){
			
			 alert("There are one or more mandatory fields to be fill in !");
		}else{
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
								alert("The contract has been saved successfull");
								$('#myModalEmployeeContract').modal('hide');
								 location.reload();
								
							}, error: function(){
								alert("error on saving new employee");
								}
					});
				}else{
					alert("This user alrady exist !Please try with anothe username !");
				  }
			}, error: function(){
				alert("error on uniqueness account");
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
			   data: {idClient: idClient},
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
			   }
		 });	
})	
	 
});
	 
	 