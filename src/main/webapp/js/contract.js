$(window).resize(function(){location.reload();});

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