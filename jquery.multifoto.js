/**
 * @preserve Multifoto - v0.0.1 - 2016-1-14
 * Fade through fixed positioned images.
 * https://github.com/sjwilliams/multifoto/
 * Copyright (c) 2016 Josh Williams; Licensed MIT
 */

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(jQuery);
  }
}(function($) {

  var multifoto = function(options, callback) {

    var $w = $(window),
      $elements = this;

    options = $.extend(true, {
    }, options);

    return this;
  };

  $.fn.multifoto = multifoto;

}));
