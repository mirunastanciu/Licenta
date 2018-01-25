/*if( !!$.cookie('loged_username') && $.cookie("loged_username") !== "" ){*/

$(window).resize(function(){location.reload();});
//Dev table
$(document).ready( function () {

	 var table = $('#WTBP').dataTable({
			"sAjaxSource": "/getWTBPRequests",
			"sAjaxDataProp": "",
			"columnDefs": [{"targets": 4,"orderable": false},
			    			{'width': '10%', 'targets': 4}
						  ],
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [	/*{"mData": "tr.index()"},*/
			              	{"mData": "id"},
						    {"mData": "name"},
						    {"mData": "email"},
						    {"mData": "phone"},
						    {"defaultContent": '<button class="btn-details" type="button">PROCCESSED</button>'}
						    ]
	 });
	 
	 $('#WTBP').on('click', '.btn-details', function () {
		 var tr = $(this).closest('tr');
		 idRequest = tr.children('td:eq(0)').text();//get the id (from db)
		 
		 $.ajax({
				method: "POST",
				url: "processRequest",
				data:
					{"idRequest": idRequest,},
					success: function(data, status, xhr){
						$.notify({//options
		    			    title:"<strong>Success!</strong>",
		    				message:"The request hes been processed .",
		    					
		    				},
		    				{//settings
		    					allow_dismiss: true,
		    					//element:".modal",	
		    					type:"success",
		    					position: "fixed",
		    					placement: {
		    						from: "top",
		    						align: "center"
		    					}
		    				
		    			});
						//alert("The request hes been processed .")
						 location.reload();
					},error:function(){
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
			   			//alert("An error occurred, please try later")
			   		}
			});
		 
	 });
});

$(document).ready( function () {

	 var table = $('#AP').dataTable({
			"sAjaxSource": "/getAPRequests",
			"sAjaxDataProp": "",
			"columnDefs": [{"targets": 3,"orderable": false},
				              
			               ],
			
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [	/*{"mData": "tr.index()"},*/
			              	{"mData": "id"},
						    {"mData": "name"},
						    {"mData": "email"},
						    {"mData": "phone"}
						   
						    ]
	 });
});

/*}else{
	location="/unauthorized";
}*/