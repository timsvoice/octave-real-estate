$(document).ready(function(){
  $('#bgvid').on('ended',function(){
    $('.video-cta').removeClass('hidden');
    $('.video-cta').addClass('animated fadeIn');
  });
});

$(window).on("load", function(){
  $('.spinner-container').addClass('animated fadeOut');
})
