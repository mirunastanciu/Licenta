$('document').ready(function(){	
	
	$("img").click(function() {
		
		var url = $(this).attr("src");
	
		$(".modal-body #image img").attr("src",url);
		$(".modal-body #image img").removeClass("img-center");
		$(".modal-body #image img").addClass("imgmodal");
	
		 $('#imgModal').modal('show');
		
		
   });
});


