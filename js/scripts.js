$(document).ready(function(){
     $('#mycarousel').carousel({ interval:2000 });

     $('#carouselButton').click(function(){
    
         if( $('#carouselButton').children("span").hasClass('fa-pause'))
         {   
             $('#mycarousel').carousel('pause');
             $('#carouselButton').children("span").removeClass('fa-pause');
             $('#carouselButton').children("span").addClass('fa-play')
         }

         else if( $('#carouselButton').children("span").hasClass('fa-play'))
         {
                  $('#mycarouesel').carousel('cycle');
                  $('#carouselButton').children("span").removeClass('fa-play');
                  $('#carouselButton').children("span").addClass('fa-pause');
         }

     });               
});




$(document).ready(function(){
$("#reservebtn").click(function(){
$("#reserveform").modal();
});
});




$(document).ready(function(){
 $("#loginbtn").click(function(){
     $("#loginModal").modal();
 });
});

