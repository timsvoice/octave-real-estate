$('#bgvid').on('ended',function(){
  $('.video-cta').removeClass('hide')
    .addClass('animated fadeIn');
});

$(window).load(function(){
  $('#spinner-container').addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
    $(this).removeClass('animated fadeOut')
      .addClass('hide');
  });
})
