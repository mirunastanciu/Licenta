$(window).resize(function(){location.reload();});

$(document).ready( function () {

	 var table = $('#employeeContractTable').dataTable({
			"sAjaxSource": "/getAllEmployeeContracts",
			"sAjaxDataProp": "",
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [	/*{"mData": "tr.index()"},*/
			              	{"mData": "id"},
						    {"mData": "idstatus"},
						    {"mData": "salary"},
						    {"mData": "startdate"}]
	 });
						  
		
});	


$(document).ready( function () {

	 var table = $('#clientContractTable').dataTable({
			"sAjaxSource": "/getAllClientContracts",
			"sAjaxDataProp": "",
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [	/*{"mData": "tr.index()"},*/
			              	{"mData": "id"},
						    {"mData": "idstatus"},
						    {"mData": "amount"},
						    {"mData": "startdate"}]
	 });
						  
		
});	