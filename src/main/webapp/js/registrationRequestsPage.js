if( !!$.cookie('loged_username') && $.cookie("loged_username") !== "" ){

$(window).resize(function(){location.reload();});
//Dev table
$(document).ready( function () {

	 var table = $('#WTBP').dataTable({
			"sAjaxSource": "/getWTBPRequests",
			"sAjaxDataProp": "",
			"columnDefs": [
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
						alert("The request was processed !")
						 location.reload();
					}, error: function(){
						alert("error on processing request");
						}
			});
		 
	 });
});

$(document).ready( function () {

	 var table = $('#AP').dataTable({
			"sAjaxSource": "/getAPRequests",
			"sAjaxDataProp": "",
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

}else{
	location="/unauthorized";
}