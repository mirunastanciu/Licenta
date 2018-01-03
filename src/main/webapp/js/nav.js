 var current ;
var logeduser = $.cookie("loged_username");
var acctype = $.cookie("accounting_type");

 $(document).ready(function () {
   $('.text-nav').on('click', function (e) {
	   localStorage.setItem(current,"#"+$( this).attr('id'));

  });

 });


 $(document).ready(function () {
	 var a = localStorage.getItem(current);
	 $(a).addClass('clicked');


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
 
 function Logout(){
	 document.cookie = "loged_username=;";
	 document.cookie = "accounting_type=;";
	 location="http://localhost:8080/index.html";
 }
 
 $(document).ready(function () {
	
	if(acctype == 1){
		logeduser = $.cookie("loged_username");
		 $.ajax({
			   method: "POST",
			   url: "getAdminName",
			   data: {"logeduser": logeduser},
			   success: function(data, status, xhr){
				   $("#logedusernamediv #logedusername").html(data);
			   }
			   });
	}else if(acctype == 2){
		 logeduser = $.cookie("loged_username");
		 $.ajax({
			   method: "POST",
			   url: "getClientName",
			   data: {"logeduser": logeduser},
			   success: function(data, status, xhr){
				   $("#logedusernamediv #logedusername").html(data);
			   }
			   });
	}else{
		logeduser = $.cookie("loged_username");
		 $.ajax({
			   method: "POST",
			   url: "getEmployeeName",
			   data: {"logeduser": logeduser},
			   success: function(data, status, xhr){
				   
				   $("#logedusernamediv #logedusername").html(data);
			   }
			   });
	}
	
	 
	 
 });
 

