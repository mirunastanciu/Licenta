 var current;

 $(document).ready(function () {
   $('.text-nav').on('click', function (e) {
	   localStorage.setItem(current,"#"+$( this).attr('id'));
  });

 });


 $(document).ready(function () {
	 var a = localStorage.getItem(current);
	 $(a).addClass('clicked');


 });