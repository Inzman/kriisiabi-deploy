$ = jQuery;
$(document).ready(function() {

   var quiz = [];
   $.getJSON(mainLocalize.theme_url+'/game/quiz_ru.json', function(data) {
       $.each(data.quiz, function(i, f) {
          var tblRow = "<div id=" + f.id + " style='display:none;'><header><div class='progressBar'><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><h2>" + f.title + "</h2></header><p class='choosethree firrst'>Выберите три ответа!</p><p class='choosethree lasst' style='display:none;'>Верное действие отмечено зеленым</p><h3>" + f.question + "</h3><ol>" + "<li class=" + f.checkFirst + "><span class='uncheck'>" + f.firstA + "</span></li>" + "<li class=" + f.checkSecond + "><span class='uncheck'>" + f.secondA + "</span></li>" + "<li class=" + f.checkThird + "><span class='uncheck'>" + f.ThirdA + "</span></li>" + "<li class=" + f.checkFourth + "><span class='uncheck'>" + f.fourthA + "</span></li>" + "</ol><button class='check_it button disabled'>Проверить</button><button class='go_next button' style='display:none;'>Далее</button></div>"
           $(tblRow).appendTo("#quizdata");
     });
   });
/**
* Doo some kilplane stuff
**/
        // 1. Peida kõik mida alguses pole vaja näidata. -- display none
        // 2. Peida intro ja näita esimest küsimust, lisa body class "quiz-one"
        // 3. Mängija alustab mängu, teeb valikud ja klikib kontrolli. Vastuste värvid ilmuvad nähtavale ja vastused saavad klassi "question_disabled".
        // 4. Ilmub nupp "edasi"
        // 5. Klikkides "edasi" vahetub body class "quiz-two" (jne), peidab esimese küsimuse ja asendab selle uuega.
    
        // toggle red text
        $(".quizArea").on('click','.check_it',function(){
            $('.firrst').fadeOut(200);
            $('.lasst').delay( 200 ).fadeIn( 200 );
        });
        $(".quizArea").on('click','.go_next',function(){
            $('.lasst').fadeOut(200);
            $('.firrst').delay( 200 ).fadeIn( 200 );
        });
        $('.thumb').hide();
        
        // 0
        $('.quizIntro').on('click','button',function(){
            $('.quizIntro').fadeOut(200);
            $('#question_one, .QuizBack, .t1').delay( 200 ).fadeIn( 200 );
            $('body').addClass('quiz-one');
        });
    
        // 1
        $(".quizArea").on('click','#question_one .check_it',function(){
            $('#question_one li').addClass('question_disabled');
            $('#question_one .check_it').fadeOut(200);
            $('#question_one .go_next').delay( 200 ).fadeIn( 200 );
        });
        $(".quizArea").on('click','#question_one .go_next',function(){
            $('#question_one, .t1').fadeOut(200, function() { $(this).remove(); });
            $('.check_it').addClass('disabled');
            $('#question_two, .t2').delay( 200 ).fadeIn( 200 );
            $('body').removeClass('quiz-one');
            $('body').addClass('quiz-two');
          
            $('#question_one h3').appendTo("#summary-wrapper"); //!!
            $('#question_one ol').appendTo("#summary-wrapper"); //!!
        });
        // 2
        $(".quizArea").on('click','#question_two .check_it',function(){
            $('#question_two li').addClass('question_disabled');
            $('#question_two .check_it').fadeOut(200);
            $('#question_two .go_next').delay( 200 ).fadeIn( 200 );
        });
        $(".quizArea").on('click','#question_two .go_next',function(){
            $('#question_two, .t2').fadeOut(200, function() { $(this).remove(); });
            $('.check_it').addClass('disabled');
            $('#question_three, .t3').delay( 200 ).fadeIn( 200 );
            $('body').removeClass('quiz-two');
            $('body').addClass('quiz-three');
        
            $('#question_two h3').appendTo("#summary-wrapper"); //!!
            $('#question_two ol').appendTo("#summary-wrapper"); //!!
        });
        // 3
        $(".quizArea").on('click','#question_three .check_it',function(){
            $('#question_three li').addClass('question_disabled');
            $('#question_three .check_it').fadeOut(200);
            $('#question_three .go_next').delay( 200 ).fadeIn( 200 );
        });
        $(".quizArea").on('click','#question_three .go_next',function(){
            $('#question_three, .t3').fadeOut(200, function() { $(this).remove(); });
            $('.check_it').addClass('disabled');
            $('#question_four, .t4').delay( 200 ).fadeIn( 200 );
            $('body').removeClass('quiz-three');
            $('body').addClass('quiz-four');
            
            $('#question_three h3').appendTo("#summary-wrapper"); //!!
            $('#question_three ol').appendTo("#summary-wrapper"); //!!
        });
        // 4
        $(".quizArea").on('click','#question_four .check_it',function(){
            $('#question_four li').addClass('question_disabled');
            $('#question_four .check_it').fadeOut(200);
            $('#question_four .go_next').delay( 200 ).fadeIn( 200 );
        });
        $(".quizArea").on('click','#question_four .go_next',function(){
            $('#question_four, .t4').fadeOut(200, function() { $(this).remove(); });
            $('.check_it').addClass('disabled');
            $('#question_five, .t5').delay( 200 ).fadeIn( 200 );
            $('body').removeClass('quiz-four');
            $('body').addClass('quiz-five');
            
            $('#question_four h3').appendTo("#summary-wrapper"); //!!
            $('#question_four ol').appendTo("#summary-wrapper"); //!!
        });
        // 5
        $(".quizArea").on('click','#question_five .check_it',function(){
            $('#question_five li').addClass('question_disabled');
            $('#question_five .check_it').fadeOut(200);
            $('#question_five .go_next').delay( 200 ).fadeIn( 200 );
        });
        $(".quizArea").on('click','#question_five .go_next',function(){
            $('#question_five, .t5').fadeOut(200, function() { $(this).remove(); });
            $('.check_it').addClass('disabled');
            $('#question_six, .t6').delay( 200 ).fadeIn( 200 );
            $('body').removeClass('quiz-five');
            $('body').addClass('quiz-six');
            
            $('#question_five h3').appendTo("#summary-wrapper"); //!!
            $('#question_five ol').appendTo("#summary-wrapper"); //!!
        });
        // 6
        $(".quizArea").on('click','#question_six .check_it',function(){
            $('#question_six li').addClass('question_disabled');
            $('#question_six .check_it').fadeOut(200);
            $('#question_six .go_next').delay( 200 ).fadeIn( 200 );
        });
        $(".quizArea").on('click','#question_six .go_next',function(){
            $('#question_six, .t6').fadeOut(200, function() { $(this).remove(); });
            $('.check_it').addClass('disabled');
            $('#question_seven, .t7').delay( 200 ).fadeIn( 200 );
            $('body').removeClass('quiz-six');
            $('body').addClass('quiz-seven');
            
            $('#question_six h3').appendTo("#summary-wrapper"); //!!
            $('#question_six ol').appendTo("#summary-wrapper"); //!!
        });
        // 7
        $(".quizArea").on('click','#question_seven .check_it',function(){
            $('#question_seven li').addClass('question_disabled');
            $('#question_seven .check_it').fadeOut(200);
            $('#question_seven .go_next').delay( 200 ).fadeIn( 200 );
        });
        $(".quizArea").on('click','#question_seven .go_next',function(){
            $('#question_seven, .t7').fadeOut(200, function() { $(this).remove(); });
            $('.check_it').addClass('disabled');
            $('#question_eight, .t8').delay( 200 ).fadeIn( 200 );
            $('body').removeClass('quiz-seven');
            $('body').addClass('quiz-eight');
            
            $('#question_seven h3').appendTo("#summary-wrapper"); //!!
            $('#question_seven ol').appendTo("#summary-wrapper"); //!!
        });
        // 8
        $(".quizArea").on('click','#question_eight .check_it',function(){
            $('#question_eight li').addClass('question_disabled');
            $('#question_eight .check_it').fadeOut(200);
            $('#question_eight .go_next').delay( 200 ).fadeIn( 200 );
        });
        $(".quizArea").on('click','#question_eight .go_next',function(){
            $('#question_eight, .t8').fadeOut(200, function() { $(this).remove(); });
            $('.check_it').addClass('disabled');
            $('#question_nine, .t9').delay( 200 ).fadeIn( 200 );
            $('body').removeClass('quiz-eight');
            $('body').addClass('quiz-nine');
            
            $('#question_eight h3').appendTo("#summary-wrapper"); //!!
            $('#question_eight ol').appendTo("#summary-wrapper"); //!!
        });
        // 9
        $(".quizArea").on('click','#question_nine .check_it',function(){
            $('#question_nine li').addClass('question_disabled');
            $('#question_nine .check_it').fadeOut(200);
            $('#question_nine .go_next').delay( 200 ).fadeIn( 200 );
        });
        $(".quizArea").on('click','#question_nine .go_next',function(){
            $('#question_nine, .t9').fadeOut(200, function() { $(this).remove(); });
            $('.check_it').addClass('disabled');
            $('#question_ten, .t10').delay( 200 ).fadeIn( 200 );
            $('body').removeClass('quiz-nine');
            $('body').addClass('quiz-ten');
            
            $('#question_nine h3').appendTo("#summary-wrapper"); //!!
            $('#question_nine ol').appendTo("#summary-wrapper"); //!!
        });
        // 10
        $(".quizArea").on('click','#question_ten .check_it',function(){
            $('#question_ten li').addClass('question_disabled');
            $('#question_ten .check_it').fadeOut(200);
            $('#question_ten .go_next').delay( 200 ).fadeIn( 200 );
        });
        $(".quizArea").on('click','#question_ten .go_next',function(){
            $('#question_ten, .QuizBack, .t10').fadeOut(200, function() { $(this).remove(); });
//            siin peaks tulemust näitama
            $('.quizResult').delay( 200 ).fadeIn( 200 );
            $('body').removeClass('quiz-ten');
//            $('body').addClass('quiz-ten');
            $('#question_ten h3').appendTo("#summary-wrapper"); //!!
            $('#question_ten ol').appendTo("#summary-wrapper"); //!!
        });
/**
* Play checkbox
**/
        // CHECK Correct
        // add 1 point
        $(".quizArea").on('click','.correct .uncheck',function(){
            addFunction(1);
            $(this).removeClass("uncheck");
            $(this).addClass("check");
            var nMyInput = $('.quizArea .check').length; 
            if (typeof nMyInput != "undefined"){
                if(!isNaN(nMyInput)){
                    if (parseInt(nMyInput) == 3) {
                        $('.check_it').removeClass('disabled');
                    } else {
                        $('.check_it').addClass('disabled');
                    }
                }
            }
        });
        // UNCHECK Correct
        // remove 1 point
        $(".quizArea").on('click','.correct .check',function(){
            addFunction(-1);
            $(this).removeClass("check");
            $(this).addClass("uncheck");
            var nMyInput = $('.quizArea .check').length; 
            if (typeof nMyInput != "undefined"){
                if(!isNaN(nMyInput)){
                    if (parseInt(nMyInput) == 3) {
                        $('.check_it').removeClass('disabled');
                    } else {
                        $('.check_it').addClass('disabled');
                    }
                }
            }
        });
        // CHECK False
        // remove 1 point
        $(".quizArea").on('click','.false .uncheck',function(){
            addFunction(-1);
            $(this).removeClass("uncheck");
            $(this).addClass("check");
            var nMyInput = $('.quizArea .check').length; 
            if (typeof nMyInput != "undefined"){
                if(!isNaN(nMyInput)){
                    if (parseInt(nMyInput) == 3) {
                        $('.check_it').removeClass('disabled');
                    } else {
                        $('.check_it').addClass('disabled');
                    }
                }
            }
        });
        // UNCHECK False
        // add 1 point
        $(".quizArea").on('click','.false .check',function(){
            addFunction(1);
            $(this).removeClass("check");
            $(this).addClass("uncheck");
            
            var nMyInput = $('.quizArea .check').length; 
            if (typeof nMyInput != "undefined"){
                if(!isNaN(nMyInput)){
                    if (parseInt(nMyInput) == 3) {
                        $('.check_it').removeClass('disabled');
                    } else {
                        $('.check_it').addClass('disabled');
                    }
                }
            }
        });
/**
* Play math
**/
        let result = 0;
        let clickNumber = 0
        function addFunction(n){
            result += n;
            clickNumber++;
            $(".quizResults").text(result);
//            console.log(result);
            // ERIVÄELANE
            if (26 <= result && result <= 30) {
                $(".resultImg").html('<img src="https://kriis.ee/contents/ui/theme/game/erivaelane.svg" alt="Эксперт"/>');
                $(".resultTitle").text('Эксперт');
                $(".resultDesc").text('Ваши познания великолепны. Вы с большой вероятностью справитесь и в самой непростой ситуации. Тем не менее, скачайте правила и проверьте, все ли необходимые приготовления сделаны.');
                $('.resultErivaelane').fadeIn();
                $('.resultMatkasell').remove();
               
            // MATKASELL
            } else if (21 <= result && result <= 25) {
                $(".resultImg").html('<img src="https://kriis.ee/contents/ui/theme/game/matkasell.svg" alt="eriväelane"/>');
                $(".resultTitle").text('Заядлый путешественник');
                $(".resultDesc").html('У вас очень хорошие познания о действиях в кризисной ситуации, однако их можно дополнить. Скачайте правила гражданской обороны и посмотрите, какими рекомендациями делится NKK в своем приложении NKK Ole valmis!');
                $('.resultMatkasell').fadeIn();
                $('.resultLinnavurle').remove();
               
            // LINNAVURLE
            } else if (16 <= result && result <= 20) {
                $(".resultImg").html('<img src="https://kriis.ee/contents/ui/theme/game/linnavurle.svg" alt="eriväelane"/>');
                $(".resultTitle").text('Городской обыватель');
                $(".resultDesc").html('Вы способны логически мыслить, однако в кризисной ситуации можете попасть в беду. Скачайте правила гражданской обороны и дополните свои знания. Также вы найдете интересные рекомендации в приложении NKK Ole valmis!');
                $('.resultLinnavurle').fadeIn();
                $('.resultBoheem').remove();
               
            // BOHEEM
            } else if (0 <= result && result <= 15) {
                $(".resultImg").html('<img src="https://kriis.ee/contents/ui/theme/game/boheem.svg" alt="eriväelane"/>');
                $(".resultTitle").text('Богема');
                $(".resultDesc").html('Вы как-нибудь справитесь, однако ваши познания о действиях в кризисной ситуации оставляют желать лучшего. Скачайте правила гражданской обороны и подумайте, что можете изменить уже сегодня, чтобы вы и ваши близкие смогли лучше справиться в кризисной ситуации! Также вы найдете рекомендации в приложении NKK Ole valmis!');
                $('.resultBoheem').fadeIn();
            }
            
        }
    // kontrolli lõpptulemust 
     $UA = 'UA-662216-13';   
    $(".quizArea").on('click','#question_ten .check_it',function(){
        if (26 <= result && result <= 30) {
             gtag('event', 'Click', {
        'send_to':  $UA,
        'event_category': 'Kriisiabi mäng',
        'event_label': 'Ekspert',
        'value': '1'
       });
         } else if (21 <= result && result <= 25) {
 gtag('event', 'Click', {
        'send_to':  $UA,
        'event_category': 'Kriisiabi mäng',
        'event_label': 'Matkasell',
        'value': '1'
       });
            // LINNAVURLE
            } else if (16 <= result && result <= 20) {
                 gtag('event', 'Click', {
        'send_to':  $UA,
        'event_category': 'Kriisiabi mäng',
        'event_label': 'Linnavurle',
        'value': '1'
       });
            // BOHEEM
            } else if (0 <= result && result <= 15) {
                 gtag('event', 'Click', {
        'send_to':  $UA,
        'event_category': 'Kriisiabi mäng',
        'event_label': 'Boheem',
        'value': '1'
       });
            }
            fbq('track', 'CompleteRegistration');
    });
    
// ava ja sulge
$(".read-summary").click(function () {

    $header = $(this);
    //getting the next element
    $content = $header.next();
    //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
    $content.slideToggle(500, function () {
        //execute this after slideToggle is done
        //change text of header based on visibility of content div
        $header.html(function () {
            //change text based on condition
            return $content.is(":visible") ? "<span class='resultURL'><i class='fas fa-chevron-up'></i>Скрыть ответы</span>" : "<span class='resultURL'><i class='fas fa-chevron-down'></i>Показать ответы</span>";
        });
    });

});
//just end it here
    });