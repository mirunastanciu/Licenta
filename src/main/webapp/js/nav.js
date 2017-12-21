 var current ;

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
	 document.cookie = "loged_username=;"
	 location="http://localhost:8080/index.html";
 }

