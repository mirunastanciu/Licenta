$(document).ready( function () {

	 var table = $('#employeeTable').dataTable({
			"sAjaxSource": "/employeesDetails",
			"sAjaxDataProp": "",
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [	/*{"mData": "tr.index()"},*/
			              	{"mData": "id"},
						    {"mData": "name"},
						    {"mData": "specialisation"}]
	 });
						  
		
});	

function SaveEmployee(){
	 $('#myModal').modal('show');
}