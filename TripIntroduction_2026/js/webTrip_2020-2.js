$(document).ready(function(){

  // -----------------------
  // 1️⃣ Share 按鈕定位
  // -----------------------
  function positionShareContainer() {
    var $share = $('.TripMain-share');
    var $btn = $('.TripMain-shareBtn');

    if($share.length && $btn.length){
      var btnOffset = $btn.offset();
      var btnW = $btn.outerWidth();
      var btnH = $btn.outerHeight();
      var containerW = $share.outerWidth();
      var windowW = $(window).width();

      if(windowW > 768){
        $share.css({
          left: btnOffset.left + btnW/2 - containerW/2,
          top: btnOffset.top + btnH + 10
        });
      }else{
        $share.css({
          left: btnOffset.left + btnW/2 - containerW/2 - 25,
          top: btnOffset.top + btnH + 10
        });
      }
    }
  }
  $(window).on('resize', positionShareContainer);
  positionShareContainer();

  // -----------------------
  // 2️⃣ 選單 sticky + 點擊滾動 + active
  // -----------------------
  var $nav = $("nav#TripNav");
  $nav.sticky({ topSpacing: 0 });

  $(".TripNav-list li").on("click", function(e){
    e.preventDefault();
    var target = $(this).data("target");
    var $targetElem = $(target);
    if($targetElem.length){
      var scrollTo = $targetElem.offset().top - ($(window).width() > 768 ? 70 : 60);
      $("html,body").animate({scrollTop: scrollTo}, 500);
    }
  });

  // -----------------------
  // 3️⃣ 天數 slider sticky + 滑到才出現 + 最後一天停止 + 點擊滾動 + active
  // -----------------------
  var $slider = $("#trip_day_slider");
  var $sliderWrapper = $("#trip_day_slider-sticky-wrapper");
  var stickyActive = false;

  function getSliderTop(){
    return $sliderWrapper.offset().top;
  }

  function getUnstickTop(){
    var $unstick = $("#unstick-day");
    if($unstick.length){
      return $unstick.offset().top - 100;
    }
    return Number.MAX_VALUE;
  }

  // scroll 事件
  $(window).on('scroll resize load', function(){
    var scrollTop = $(window).scrollTop();
    var sliderTop = getSliderTop();
    var unstickTop = getUnstickTop();

    // ---------- 滑到才 sticky ----------
    if(scrollTop + 100 >= sliderTop && scrollTop < unstickTop){
      if(!stickyActive){
        $slider.sticky({topSpacing:95});
        stickyActive = true;
      }
    }else{
      if(stickyActive){
        $slider.unstick();
        stickyActive = false;
      }
    }

    // ---------- 天數 active ----------
    $(".trip_day").each(function(index){
      if(scrollTop + 120 >= $(this).offset().top){
        $(".godays").removeClass("bt_active").eq(index).addClass("bt_active");
      }
    });

    // ---------- 選單 active ----------
    $("section.section-target").each(function(index){
      if(scrollTop <= 500){
        $(".TripNav-list li").removeClass("active").eq(0).addClass("active");
      }else if($(this).offset().top <= scrollTop + 150){
        $(".TripNav-list li").removeClass("active").eq(index).addClass("active");
      }
    });

  }).trigger('scroll');

  // ---------- 點擊天數滾動 ----------
  $(document).on("click", ".godays", function(e){
    e.preventDefault();
    var target = $(this).data("target");
    var $targetElem = $(target);
    if($targetElem.length){
      var scrollTo = $targetElem.offset().top - ($(window).width() > 768 ? 100 : 80);
      $("html,body").animate({scrollTop: scrollTo}, 500);
    }
  });

});
