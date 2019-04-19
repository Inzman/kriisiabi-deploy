$ = jQuery;
$(document).ready(function() {
  $UA = 'UA-662216-13';     
    // GA
    $("#startgame").click( function() {
       gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mäng',
        'event_label': 'Start',
        'value': '1'
       });
    });
    $(".quizArea").on('click','#question_one ol li:nth-child(1)', function(){
        gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '1.1',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_one ol li:nth-child(2)',function(){
        gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '1.2',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_one ol li:nth-child(3)',function(){
    gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '1.3',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_one ol li:nth-child(4)',function(){
            gtag('event', 'Click', {
            'send_to': $UA,
            'event_category': 'Kriisiabi mängu vastused',
            'event_label': '1.4',
            'value': '1'
        });
    });
//    
    $(".quizArea").on('click','#question_two ol li:nth-child(1)',function(){
        gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '2.1',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_two ol li:nth-child(2)',function(){
        gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '2.2',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_two ol li:nth-child(3)',function(){
    gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '2.3',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_two ol li:nth-child(4)',function(){
            gtag('event', 'Click', {
            'send_to': $UA,
            'event_category': 'Kriisiabi mängu vastused',
            'event_label': '2.4',
            'value': '1'
        });
    });
//    
    $(".quizArea").on('click','#question_three ol li:nth-child(1)',function(){
        gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '3.1',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_three ol li:nth-child(2)',function(){
        gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '3.2',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_three ol li:nth-child(3)',function(){
    gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '3.3',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_three ol li:nth-child(4)',function(){
            gtag('event', 'Click', {
            'send_to': $UA,
            'event_category': 'Kriisiabi mängu vastused',
            'event_label': '3.4',
            'value': '1'
        });
    });
//    
    $(".quizArea").on('click','#question_four ol li:nth-child(1)',function(){
        gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '4.1',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_four ol li:nth-child(2)',function(){
        gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '4.2',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_four ol li:nth-child(3)',function(){
    gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '4.3',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_four ol li:nth-child(4)',function(){
            gtag('event', 'Click', {
            'send_to': $UA,
            'event_category': 'Kriisiabi mängu vastused',
            'event_label': '4.4',
            'value': '1'
        });
    });
//    
    $(".quizArea").on('click','#question_five ol li:nth-child(1)',function(){
        gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '5.1',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_five ol li:nth-child(2)',function(){
        gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '5.2',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_five ol li:nth-child(3)',function(){
    gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '5.3',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_five ol li:nth-child(4)',function(){
            gtag('event', 'Click', {
            'send_to': $UA,
            'event_category': 'Kriisiabi mängu vastused',
            'event_label': '5.4',
            'value': '1'
        });
    });
//    
    $(".quizArea").on('click','#question_six ol li:nth-child(1)',function(){
        gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '6.1',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_six ol li:nth-child(2)',function(){
        gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '6.2',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_six ol li:nth-child(3)',function(){
    gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '6.3',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_six ol li:nth-child(4)',function(){
            gtag('event', 'Click', {
            'send_to': $UA,
            'event_category': 'Kriisiabi mängu vastused',
            'event_label': '6.4',
            'value': '1'
        });
    });
//    
    $(".quizArea").on('click','#question_seven ol li:nth-child(1)',function(){
        gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '7.1',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_seven ol li:nth-child(2)',function(){
        gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '7.2',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_seven ol li:nth-child(3)',function(){
    gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '7.3',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_seven ol li:nth-child(4)',function(){
            gtag('event', 'Click', {
            'send_to': $UA,
            'event_category': 'Kriisiabi mängu vastused',
            'event_label': '7.4',
            'value': '1'
        });
    });
    //    
    $(".quizArea").on('click','#question_eight ol li:nth-child(1)',function(){
        gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '8.1',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_eight ol li:nth-child(2)',function(){
        gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '8.2',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_eight ol li:nth-child(3)',function(){
    gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '8.3',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_eight ol li:nth-child(4)',function(){
            gtag('event', 'Click', {
            'send_to': $UA,
            'event_category': 'Kriisiabi mängu vastused',
            'event_label': '8.4',
            'value': '1'
        });
    });
    //    
    $(".quizArea").on('click','#question_nine ol li:nth-child(1)',function(){
        gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '9.1',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_nine ol li:nth-child(2)',function(){
        gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '9.2',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_nine ol li:nth-child(3)',function(){
    gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '9.3',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_nine ol li:nth-child(4)',function(){
            gtag('event', 'Click', {
            'send_to': $UA,
            'event_category': 'Kriisiabi mängu vastused',
            'event_label': '9.4',
            'value': '1'
        });
    });
        //    
    $(".quizArea").on('click','#question_ten ol li:nth-child(1)',function(){
        gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '10.1',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_ten ol li:nth-child(2)',function(){
        gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '10.2',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_ten ol li:nth-child(3)',function(){
    gtag('event', 'Click', {
        'send_to': $UA,
        'event_category': 'Kriisiabi mängu vastused',
        'event_label': '10.3',
        'value': '1'
   });
    });
        $(".quizArea").on('click','#question_ten ol li:nth-child(4)',function(){
            gtag('event', 'Click', {
            'send_to': $UA,
            'event_category': 'Kriisiabi mängu vastused',
            'event_label': '10.4',
            'value': '1'
        });
    });
//just end it here
    });