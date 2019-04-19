$ = jQuery;
jQuery(document).ready(function($){

    var current_hash = window.location.hash;
    
    /* modal */
	
		var confirmPrivacy = Cookies.get('confirm_modal');
		if(typeof confirmPrivacy === 'undefined' && confirmPrivacy != 'yes'){
      $('a[href="#site-intro"]').click();
      Cookies.set('confirm_modal', 'yes', { expires: 365, path: '/' });
		}
    /*
    $('[href="#site-intro"]').fancybox({
        onComplete: function(instance, slide){
            $('.fancybox-button--thumbs').removeAttr('title');
        },
        afterClose: function(){
            Cookies.set('confirm_modal', 'yes', { expires: 365, path: '/' });
        }
    });
    */

    $('.hamburger').append('<span class="hamburger-text"></span>');
    if($('body').hasClass('ru'))
      var hamburgertext = 'меню';
    else if($('body').hasClass('en'))
      var hamburgertext = 'Menu';
    else
      var hamburgertext = 'Menüü';

    $('.hamburger-text').text(hamburgertext);
    $(".site-title a").lettering('words');

    var scroll_instance = $(".ua-desktop .sidebar").overlayScrollbars({
        className: 'os-theme-dark',
        resize:"none",
        overflowBehavior : {
            y:"scroll"
        },
        scrollbars : {
            visibility       : "auto",
            autoHide         : "leave",
            autoHideDelay    : 800,
            dragScrolling    : true
        }
    }).overlayScrollbars();
    
    
    $(window).on("debouncedresize",function(){
        if ($(window).width() < 768) {
            $('body').alterClass('bp_*', 'bp_xs');
            sidebar_reset();
        }
        else if ($(window).width() >= 768 &&  $(window).width() <= 992) {
            $('body').alterClass('bp_*', 'bp_sm');
            sidebar_reset();
        }
        else if ($(window).width() > 992 &&  $(window).width() <= 1200) {
            $('body').alterClass('bp_*', 'bp_md');
            sidebar_reset();
        }
        else  {
            $('body').alterClass('bp_*', 'bp_lg');
            //sidebar_positioning();
        }
        $('body').attr('data-width', $(window).width());
        
        if($(window).width() >= 1200 && $(window).height() <= 900 && $('html').hasClass('ua-desktop')){
            setTimeout(function(){
                scroll_instance.scroll($('li.current_1'), 0);
            }, 100);
        }
    }).resize();

    
    if(current_hash){
        setTimeout(function(){
            $(window).scrollTo($('section'+current_hash), 800, {axis:'y', offset:-100});
        }, 1500);
    }
    /*
    $('.side-menu').localScroll({
        axis:'y',
        offset: {top:-100},
        hash: true
    });
    */
    $('.side-menu a[href*=\\#]').click(function(e) {
      e.preventDefault();
      $(window).stop(true).scrollTo(this.hash, {duration: 800, interrupt:true, offset:-100});
    });

    // CMS
    $('.wp-caption.alignleft').parent().addClass('clearfix');
    $('.section_type_frontpage-intro iframe, .cms iframe').wrap('<div class="embed-responsive embed-responsive-16by9" />');
    //$('.cms table').wrap('<div class="table-responsive" />');
    $('.cms table tr').each(function(){
      if(($(this).find('td').size() > 2) || ($(this).find('th').size() > 2)){
        $(this).parents('table').addClass('responsive');
      }
    });
    $('.cms td, .cms th').each(function(){
      var valueOfCell = $(this).text().trim();
      if(valueOfCell == ''){                 
        $(this).addClass('unfilled');
      } else{                 
        $(this).addClass('filled');
      }
    });

    // Hovers
    $('.start a, .langs a, .entry-meta a').addClass('hvr-underline-from-center');
    $('.iconos-block').hover(function() {
        $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    });

    $('#open_mob_menu').click(function(){
        if($('html').hasClass('mob_nav_open')){
            $('html').removeClass('mob_nav_open');
            $(this).removeClass('is-active');
        } else {
            $('html').addClass('mob_nav_open');
            $(this).addClass('is-active');
        }
        return false;
    });
    $('.widget-story').click(function(){
        var link = $(this).find('.widget-story-title a').attr('href');
        window.location.href = link;
    });

    $('a[href="#close_nav"], .sm-level-3 a').click(function(){
        $('html').removeClass('mob_nav_open');
        $('#open_mob_menu').removeClass('is-active');
    });
    
    $('.css-select a').click(function() {
        var value = $(this).data('css');
        $('html').alterClass('size_*', 'size_'+value);
        Cookies.set('css', value);
        return false;
    });
    var css = Cookies.get('css');
    if(typeof css !== 'undefined') $('html').alterClass('size_*', 'size_'+css);
    
    $('.ancestor > a').click(function(){
        $(this).next('.sm-level-2').slideToggle();
        $(this).parent('li').toggleClass('current_1');
        return false;
    });
    
    $('a[href="#search"]').click(function(e){
        e.preventDefault();
        $('#search').slideToggle(100);
        setTimeout(function(){
            if($('.searchform').is(':visible')){
                $('.search-link i').alterClass('fa-*', 'fa-search-minus');
                $('#search_value').focus();
            } else {
                $('.search-link i').alterClass('fa-*', 'fa-search');
                $('#search_value').blur();
            }
        }, 150);
    });

    $('#search_value').on('input', function() { 
        $('#gsc-i-id1').val($(this).val());
    });
    $('#search').submit(function () {
        $('.gsc-search-button').click();
    });
    
    /*
    if($(window).width() >= 1200){
    $('.sidebar').affix({
        offset: {
          top: 30,
          //bottom:100
        }
    });
    }
    $('.sidebar').on('affix.bs.affix', function(){ 
        sidebar_positioning();
    })
    .on('affix-top.bs.affix', function () {
        $(".sidebar").css("width","auto");
    });
    */
    
    setTimeout(function(){
    $('html').addClass('loaded');
    }, 300);

    // Swipe menu
    if($(window).width() <= 1200){
        $('.sidebar').on('swipeleft',function (e,data){
            $('#open_mob_menu').click();
        });
    }

    // Empty P-s
    $('.cms p').each(function(){
        var str = $(this).text();
        if((jQuery.trim( str )).length==0){
            $(this).addClass('empty');
        }
    });
    
    // Attention block
    //$('.attention').prop('title', mainLocalize.i18n_attention);
    $('.attention').prepend('<em class="attention-span">'+mainLocalize.i18n_attention+'</em>');
    
    // Gallery
    $('.gallery').each(function(i){
        var gid = $(this).data('gid');
        $(this).find('a').attr('data-fancybox', gid+'_'+i).removeAttr('title');
    });
    $('[data-fancybox]').fancybox({
        thumbs : {
		      autoStart : true
        },
        buttons: [
        //"zoom",
        //"share",
        //"slideShow",
        //"fullScreen",
        //"download",
        "thumbs",
        "close"
        ],
        loop: true,
        slideShow: false,
        fullScreen: false,
        image: {
            protect: true
        },
        
        onComplete: function(instance, slide){
            $('.fancybox-button--thumbs').removeAttr('title');
        }
    });

    // External links
    $('.cms a')
		  .filter('[href^="http"], [href^="//"]')
		  .not('[href*="' + window.location.host + '"]')
		  .attr('rel', 'noopener noreferrer')
      .attr('target', '_blank');
});


function sidebar_positioning(){
    var sidebarWidth = $('.sidebar-cont').width();
    //$(".sidebar").css("width",sidebarWidth);
}

function sidebar_reset(){
    //$(".sidebar").css("width","100%");
}


// For email
function nospam(user,domain) {
    locationstring = "mailto:" + user + "@" + domain;
    window.location = locationstring;
}