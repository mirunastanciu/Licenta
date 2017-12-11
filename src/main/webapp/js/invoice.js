$(document).ready( function () {

	 var table = $('#unpaidInvoiceTable').dataTable({
			"sAjaxSource": "/getAllUnpaidInvoices",
			"sAjaxDataProp": "",
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [	/*{"mData": "tr.index()"},*/
			              	{"mData": "idbill"},
						    {"mData": "creationdate"},
						    {"mData": "amount"},
						    {"mData": "curency"},
						    {"mData": "duedate"},
						    {"mData": "status"},
						    {"defaultContent": '<button class="btn-details" type="button">Details</button>'}

						  ]
	 }); 
 });

$(document).ready( function () {

	 var table = $('#paidInvoiceTable').dataTable({
			"sAjaxSource": "/getAllPaidInvoices",
			"sAjaxDataProp": "",
			"responsive": true,
			"order": [[ 0, "asc" ]],
			"aoColumns": [	/*{"mData": "tr.index()"},*/
			              	{"mData": "idbill"},
						    {"mData": "creationdate"},
						    {"mData": "amount"},
						    {"mData": "curency"},
						    {"mData": "duedate"},
						    {"mData": "status"},
						    {"defaultContent": '<button class="btn-details" type="button">Details</button>'}

						  ]
	 }); 
});
	 