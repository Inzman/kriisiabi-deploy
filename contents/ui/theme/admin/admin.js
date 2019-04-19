$ = jQuery;
$(document).ready(function(){
    $('.page_color_exists').each(function(){
        var scheme = $(this).find('.scheme-box').text();
        $(this).find('th:first-child').css('border-left-color', scheme);
    });
});