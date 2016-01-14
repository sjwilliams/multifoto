/**
 * @preserve Multifoto - v0.0.1 - 2016-1-14
 * Fade through fixed positioned images.
 * https://github.com/sjwilliams/multifoto/
 * Copyright (c) 2016 Josh Williams; Licensed MIT
 */

/* globals jQuery, console */

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(jQuery);
  }
}(function($) {

  var multifoto = function(options, callback) {

    var $w = $(window);
    var $elements = this;
    var didScroll = false;

    options = $.extend(true, {
      ratio: 0.75,
      scrollThrottle: 250 // time in ms to throttle scroll. Increase for better performance.
    }, options);

    $elements.each(function(){
      var $el = $(this).addClass('multifoto');
      var data = $el.data();

      data.$imgs = $el.find('img');
      data.imgCount = data.$imgs.length;
      data.elHeight = $el.width() * options.ratio;

      $el.height(data.elHeight);

      data.$imgs.each(function(index){
        $(this)
          // .addClass((index === 0) ? 'mf-active' : 'mf-inactive')
          .addClass('mf-active')
          .css({
            'position': 'absolute',
            'top': 0,
            'zIndex': data.imgCount - index
          });
      });
    });


    function update(){
      var wHeight = window.innerHeight || document.documentElement.clientHeight;

      $elements.each(function(){
        var $el = $(this);
        var data = $el.data();
        var rect = $el[0].getBoundingClientRect();

        // range is the number of pixels the stack can move
        // freely in the viewport with the entire $el showing.
        var range = wHeight - data.elHeight;

        // starting with 0 meaning the $el hasn't fully been
        // scrolled into viewport, and 100 with some portion of
        // the $el scrolled off the top of the viewport.
        var percentComplete = 100 - ((rect.top / range) * 100);
        percentComplete = Math.min(Math.max(parseInt(percentComplete, 10), 0), 100);

        var visibleThreshold = 100 / data.imgCount;

        data.$imgs.each(function(index){
          if (percentComplete > ( (index + 1) / data.imgCount) * 100) {
            $(this).removeClass('mf-active');
          } else {
            $(this).addClass('mf-active');
          }
        });

      });
    }

    $w.scroll(function(){
      didScroll = true;
    });

    setInterval(function() {
      if (didScroll) {
        didScroll = false;
        update();
      }
    }, options.scrollThrottle);

    return this;
  };

  $.fn.multifoto = multifoto;

}));
