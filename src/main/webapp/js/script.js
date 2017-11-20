var idTicket;

$(window).resize(function(){location.reload();});

//To Do table
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
	 //Details button function
	 $('#ticketsTable').on('click', '.btn-details', function () {
		 var tr = $(this).closest('tr');
		 idTicket = tr.children('td:eq(0)').text();//get the id (from db)
		 $.ajax({
			   method: "POST",
			   url: "getDetailsByIdTicket",
			   data: {idTicket: idTicket},
			   success: function(data, status, xhr){

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
		            //Edit function
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
					//update function
					$('.modal-footer').on('click', '#savebutton', function () {
						console.log(idTicket)//get the id (from db)
						var projecttype =  $(".modalcontent #projecttype").text();
						var status =  $(".modalcontent #status").text();
						var projectdescription =  $(".modalcontent #projectdescription").text();
						var duedate =  $("#dd #duedate").text();
						var startdate =  $("#sd #startdate").text();
						var finishdate =  $("#fd #finishdate").text();
						var employeename =  $("#emp #employeename").text();

						 $.ajax({
							   method: "POST",
							   url: "updateTicket",
							   data:
							          {"idTicket": idTicket,
								   	  "projecttype": projecttype,
								   	  "status": status,
								   	  "projectdescription": projectdescription,
								   	  "duedate": duedate,
								      "startdate": startdate,
								      "finishdate": finishdate,
								      "employeename": employeename}
								   		,
							   success: function(data, status, xhr){
								   $('#myModal').modal('hide');
								   location.reload();
							   }, error: function(){
								   alert("error Update Method");
								   }
							   });
					});

				}, error: function(){
					alert("error opening modal");
				  }
		});
	});
});


//Assigned Table
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
	 //Details button function
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
		            //Edit function
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
								
								//update function
								$('.modal-footer').on('click', '#savebutton', function () {
									console.log(idTicket)//get the id (from db)
									var projecttype =  $(".modalcontent #projecttype").text();
									var status =  $(".modalcontent #status").text();
									var projectdescription =  $(".modalcontent #projectdescription").text();
									var duedate =  $("#dd #duedate").text();
									var startdate =  $("#sd #startdate").text();
									var finishdate =  $("#fd #finishdate").text();
									var employeename =  $("#emp #employeename").text();

									 $.ajax({
										   method: "POST",
										   url: "updateTicket",
										   data:
										          {"idTicket": idTicket,
											   	  "projecttype": projecttype,
											   	  "status": status,
											   	  "projectdescription": projectdescription,
											   	  "duedate": duedate,
											      "startdate": startdate,
											      "finishdate": finishdate,
											      "employeename": employeename}
											   		,
										   success: function(data, status, xhr){
											   $('#myModal').modal('hide');
											   location.reload();
										   }, error: function(){
											   alert("error Update Method");
											   }
										   });
								});		
		        },
		        error: function(){
		            alert("error");
		        }
		 });
	});
});


//Done Table
$(document).ready( function () {

	 var table = $('#getAllTicketsDone').dataTable({
			"sAjaxSource": "/ticketsDone",
			"sAjaxDataProp": "",
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [
			              { "mData": "idticket"},
			              { "mData": "description"},
			              { "mData": "projecttypename"},
			              { "mData": "duedate"},
			              {"mData": "status"},
			    {"defaultContent": '<button class="btn-details" type="button">Details</button>'}]
	 });
	 //Details button function
	 $('#getAllTicketsDone').on('click', '.btn-details', function () {
		 var tr = $(this).closest('tr');
		 idTicket = tr.children('td:eq(0)').text();//get the id (from db)
		 $.ajax({
			   method: "POST",
			   url: "getDetailsByIdTicket",
			   data: {idTicket: idTicket},
			   success: function(data, status, xhr){

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
		            //Edit function
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
								//update function
								$('.modal-footer').on('click', '#savebutton', function () {
									console.log(idTicket)//get the id (from db)
									var projecttype =  $(".modalcontent #projecttype").text();
									var status =  $(".modalcontent #status").text();
									var projectdescription =  $(".modalcontent #projectdescription").text();
									var duedate =  $("#dd #duedate").text();
									var startdate =  $("#sd #startdate").text();
									var finishdate =  $("#fd #finishdate").text();
									var employeename =  $("#emp #employeename").text();

									 $.ajax({
										   method: "POST",
										   url: "updateTicket",
										   data:
										          {"idTicket": idTicket,
											   	  "projecttype": projecttype,
											   	  "status": status,
											   	  "projectdescription": projectdescription,
											   	  "duedate": duedate,
											      "startdate": startdate,
											      "finishdate": finishdate,
											      "employeename": employeename}
											   		,
										   success: function(data, status, xhr){
											   $('#myModal').modal('hide');
											   location.reload();
										   }, error: function(){
											   alert("error Update Method");
											   }
										   });
								});			
		        },
		        error: function(){
		            alert("error");
		        }
		 });
		});
});
//Change Project Type on Edit mode
function projectTypeChange()
{


	$.ajax("/allProjectTypesName",
		       { type: 'GET',
		 		 success: function (data) {

				       for(var i in data){
				    	   sel = document.getElementById("projecttypelist"); //
				    	    var projecttype = document.getElementById("projecttype");
				    	    if ( sel.options[sel.selectedIndex].value == data[i] ) {
				    	    	projecttype.innerHTML = sel.options[sel.selectedIndex].value;
				    	    }
				       }
				 }
	})

}
//Change Status on Edit mode
function statusChange()
{

	$.ajax("/getAllTicketStatusNames",
		       { type: 'GET',
		 		 success: function (data) {

				       for(var i in data){
				    	   sel = document.getElementById("statuslist"); //
				    	    var status = document.getElementById("status");
				    	    if ( sel.options[sel.selectedIndex].value == data[i] ) {
				    	    	status.innerHTML = sel.options[sel.selectedIndex].value;
				    	    }
				       }
				 }
	})
}


//Change description on Edit mode
function descriptionChange(){

	$("#desc").click(function(e) {
		var desc = $("#desc p").text();
		var descedit = document.getElementById("description");
		 if(desc !== descedit && $(descedit).val().length !== 0 ){
			 if(e.target.id !== "description"){
				$(".modal-body #projectdescription").html(descedit.value);

	    		}
			 }
	});
}

//Change Due Date
function duedateonChange(){

	$("#dd").click(function(e) {
		var duedate =  $("#dd p").text();
	    var duedateedit = document.getElementById("duedateedit");
	    if(duedate.value !== duedateedit.value && $(duedateedit).val().length !== 0 ){
	    	if(e.target.id !== "duedateedit" ){
	    		$(".modal-body #duedate").html(duedateedit.value);
	    	 }
		}
	});
}

//Change Start Date
function startdateonChange(){

	$("#sd").click(function(e) {
		var startdate =  $("#sd p").text();
	    var startdateedit = document.getElementById("startdateedit");
		if(startdate.value !== startdateedit && $(startdateedit).val().length !== 0 ){
	    	 if(e.target.id !== "startdateedit" ){
	    		$(".modal-body #startdate").html(startdateedit.value);
	    	 }
		}
	})
}

//Change Finish Date
function finishdateonChange(){

	$("#fd").click(function(e) {
		var finishdate =  $("#fd p").text();;
	    var finishdateedit = document.getElementById("finishdateedit");
		if(finishdate.value !== finishdateedit && $(finishdateedit).val().length !== 0 ){
	    	 if(e.target.id !== "finishdateedit" ){
	    		$(".modal-body #finishdate").html(finishdateedit.value);
	    	 }
		}
	})
}
//Change assignement
function assignementChange(){

	 sel = document.getElementById("employeelist");
	 name = sel.options[sel.selectedIndex].value;
	 console.log(name)
	 $.ajax({
		   method: "POST",
		   url: "getEmployeeByName",
		   data: {name: name},
		   success: function(data, status, xhr){
			   var name1=data.firstname+" "+data.lastname;
			  $(".modal-body #employeename").html(name1);
			  $(".modal-body #employeeemail").html(data.email);
			  var idspecialisation = data.idspecialisation;
			  $.ajax({
				   method: "POST",
				   url: "getSpecialisationById",
				   data: {idspecialisation: idspecialisation},
				   success: function(data, status, xhr){
					   $(".modal-body #employeespecialisation").html(data.name);
				 }
			  })
	}
	 })
}




