$ = jQuery;
jQuery(document).ready(function($){
  $('[data-track]').click(function(){
    var what = $(this).attr('data-track');
    console.log(what);
    fbq('track', what);
  });
});