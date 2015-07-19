(function($){
  $(document).ready(function(){
	  
	  /***** BACK TO TOP *****/
	  
	  // hide #back-top first
	  $("#back-top").hide();
	
	  // fade in #back-top
	  $(function () {
	    $(window).scroll(function () {
	      if ($(this).scrollTop() > 100) {
	        $('#back-top').fadeIn();
	      } else {
	        $('#back-top').fadeOut();
	      }
	    });
	
	    // scroll body to 0px on click
	    $('#back-top .fi-arrow-up').click(function() {
	      $('body,html').animate({
	        scrollTop: 0
	      }, "slow");
	    });
	  });
	  
	  /***** TOP BLOCKS *****/
	  $(".call-block").on("click", function(){
		  var element = $(this).parent().attr("class");
		  $(".blocks").find("div").slideUp();
		  if($("."+element).is(":hidden")){
			  $(".blocks").find("."+element).slideDown();
		  }
		  else{
			  $(".blocks").find("."+element).slideUp();
		  }
	  })
	  
  });
})(jQuery);