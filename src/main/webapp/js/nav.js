$(document).ready(function () {
	 var current="#startpage" ;
	 var a = localStorage.getItem(current);
	 $(a).addClass('clicked');


 



 $(document).ready(function () {
   $('.text-nav').on('click', function (e) {
	   localStorage.setItem(current,"#"+$( this).attr('id'));

  });

 });




 $(document).ready(function () {
	   $('#logout').on('click', function (e) {
		   localStorage.clear();
	  });

	 });

 $(document).ready(function () {
	   $('#loginButton').on('click', function (e) {
		   localStorage.setItem(current,"#"+"startpage");
	  });

	 });
 
 /*function Logout(){
	 document.cookie = "loged_username=;";
	 document.cookie = "accounting_type=;";
	 location="/index.html";
 }*/
 
 $(document).ready(function () {
	 if( window.location.pathname  !== "/loginPage" &&  window.location.pathname  !== "/index.html" ){
		 $.ajax({
			   method: "GET",
			   url: "accountName",
			   
			   success: function(data, status, xhr){
				   $("#logedusernamediv #logedusername").html(data);
			   }
			   });
	 }
	 
 });
});

