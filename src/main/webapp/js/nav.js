var current;
$(document).ready(function () {
	
		 
		 var a = localStorage.getItem(current);
		 if(a === null){
			 $("#startpage").addClass('clicked');
		 }else{
			 $(a).addClass('clicked');
		 }
		
	
		 $(document).ready(function () {
			   $('.text-nav').on('click', function (e) {
				   localStorage.setItem(current,"#"+$( this).attr('id'));
				   localStorage.setItem(location,window.location.path);
			  });
		 });
	
	
		  $('#logout').on('click', function (e) {
			  console.log("clear data")
			   localStorage.clear();
		  });
	
	
	
	 
		  $('#loginButton').on('click', function (e) {
			   localStorage.setItem(current,"#"+"startpage");
		  });
	
	 
	 
	
		 if( window.location.pathname  !== "/loginPage" &&  window.location.pathname  !== "/index.html" && window.location.pathname  !== "/" ){
			 $.ajax({
				   method: "GET",
				   url: "accountName",
				   
				   success: function(data, status, xhr){
					   $("#logedusernamediv #logedusername").html(data);
				   }
				   });
		 }
		 
	
});

