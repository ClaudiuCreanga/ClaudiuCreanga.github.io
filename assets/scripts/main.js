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

	  /***** TOGGLE BUTTON TOP *****/
    $(".left-off-canvas-toggle").click(function(){
      $("html, body").animate({ scrollTop: 0 }, "slow");
    })

  	/***** TOGGLE CODE *****/
  	$(".show-the-codes p").click(function(){
      $_this = $(this)
  		$(this).parent().next(".wrap-the-codes").slideToggle("400", function (){
        if($_this.parent().next(".wrap-the-codes").is(":visible") == true) {
          console.log("da")
          $_this.text("Hide the code");
        } else {
          console.log("nu")

          $_this.text("Show the code");
        }
      });
  	})
  });
})(jQuery);
