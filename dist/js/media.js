$('#bgvid').on('ended',function(){
  $('.video-cta').removeClass('hide');
  $('.video-cta').addClass('animated fadeIn');
});

$(window).load(function(){
  $('#spinner-container').addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
    $(this).removeClass('animated fadeOut');
    $(this).addClass('hide');
  });
})
