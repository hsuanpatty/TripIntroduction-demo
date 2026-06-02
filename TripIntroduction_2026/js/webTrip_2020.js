$(document).ready(function () {
  // 分享按鈕
  $("#shareBlock")
    .empty()
    .cShare({
      description: "jQuery plugin - C Share buttons...",
      showButtons: ["fb", "line"],
    });
  // 分享展開
  $(".TripMain-shareBtn").click(function () {
    var shareContainer = $('.TripMain-share');
    var windowWidth = $(window).width();
    shareContainer.slideToggle(500);
    if (shareContainer.css('display') === 'block') {
      var btnPosition = $(this).offset();
      var btnWidth = $(this).outerWidth();
      var btnHeight = $(this).outerHeight();
      var containerWidth = shareContainer.outerWidth();

      //if (windowWidth > 768) {
      //  shareContainer.css({
      //    'left': btnPosition.left + (btnWidth / 2) - (containerWidth / 2),
      //    'top': btnPosition.top + btnHeight + 10, // 將下方 50px 的調整添加到此處
      //  });
      //} else {
      //  shareContainer.css({
      //    'left': btnPosition.left + (btnWidth / 2) - (containerWidth / 2) - 25,
      //    'top': btnPosition.top + btnHeight + 10, // 將下方 50px 的調整添加到此處
      //  });
      //}
    }
  });

  $(window).resize(function () {
    var shareContainer = $('.TripMain-share');
    var shareBtn = $('.TripMain-shareBtn');
    var windowWidth = $(window).width();

    // 判斷 shareContainer 是否可見
    if (shareContainer.is(':visible')) {
      var btnPosition = shareBtn.offset();
      var btnWidth = shareBtn.outerWidth();
      var btnHeight = shareBtn.outerHeight();
      var containerWidth = shareContainer.outerWidth();

      if (windowWidth > 768) {
        shareContainer.css({
          'left': btnPosition.left + (btnWidth / 2) - (containerWidth / 2),
          'top': btnPosition.top + btnHeight + 10, // 將下方 50px 的調整添加到此處
        });
      } else {
        shareContainer.css({
          'left': btnPosition.left + (btnWidth / 2) - (containerWidth / 2) - 25,
          'top': btnPosition.top + btnHeight + 10, // 將下方 50px 的調整添加到此處
        });
      }
    }
  });

  // 選單置頂sticky
  $("nav#TripNav").sticky({
    topSpacing: 0,
  });

  // 選單指標
  $(".TripNav-list li").on("click", function (event) {
    event.preventDefault();
    var target = $(this).data("target");
    var _scrollTo2;
    if ($(window).width() > 768) {
      _scrollTo2 = $(target).position().top - 70;
    } else {
      _scrollTo2 = $(target).position().top - 60;
    }
    $("html, body").animate(
      {
        scrollTop: _scrollTo2,
      },
      500
    );
  });

  // 選單指標active
  var scrollTime;
  $(document).scroll(function () {
    clearTimeout(scrollTime);
    scrollTime = setTimeout(function () {
      $("section.section-target").each(function (index, element) {
        if ($(document).scrollTop() <= 500) {
          $(".TripNav-list li").removeClass("active");
          $(".TripNav-list li:eq(0)").addClass("active");
        } else {
          if ($(this).offset().top <= $(document).scrollTop() + 150) {
            $(".TripNav-list li").removeClass("active");
            $(".TripNav-list li").eq(index).addClass("active");
          } //If else End
        } //if End
      }); //each End
    }, 100); //setTimeout End
  }); //scroll End

  // TripBanner-owl-carousel
  $("#TripBanner-owl-carousel").owlCarousel({
    animateOut: "fadeOut",
    animateIn: "fadeInRight",
    items: 1,
    nav: true,
    video: true,
    responsiveClass: true,
    //loop: true,
    //autoplay: true,
    autoplayTimeout: 5000,
    margin: 20,
    smartSpeed: 450,
    dots: false,
    navText: [
      "<img src='images/20_back.svg'>",
      "<img src='images/20_next.svg'>",
    ],
  });

  // Spec-owl-carousel
  $(".Spec-owl-carousel").owlCarousel({
    nav: true,
    responsiveClass: true,
    //loop: true,
    //autoplay: true,
    //autoplayTimeout: 5000,
    margin: 20,
    smartSpeed: 450,
    dots: true,
    navText: [
      "<img src='images/20_picBack.svg'>",
      "<img src='images/20_picNext.svg'>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1024: {
        items: 3,
      },
    },
  });

  // 天數置頂sticky及解除
  $(window)
    .scroll(function () {
      var width = $(window).width();
      var w_scrollTop = $(this).scrollTop();
      var unstick_day_top = $("#unstick-day").position().top - 100;

      if (w_scrollTop >= unstick_day_top) {
        $("#trip_day_slider").unstick();
      } else {
        $("#trip_day_slider").sticky({
          topSpacing:100,
        });
      }
    })
    .scroll();

  // 天數指標
  $(".godays").on("click", function (event) {
    event.preventDefault();
    var target = $(this).data("target");
    var _scrollTo4;
    if ($(window).width() > 768) {
      _scrollTo4 = $(target).position().top - 600;
    } else {
      _scrollTo4 = $(target).position().top - 80;
    }
    $("html, body").animate(
      {
        scrollTop: _scrollTo4,
      },
      500
    );
  });

  // 天數指標active
  var scrollTimeDay;
  $(document).scroll(function () {
    clearTimeout(scrollTimeDay);
    scrollTimeDay = setTimeout(function () {
      $(".trip_day").each(function (index, element) {
        if ($(document).scrollTop() <= 500) {
          $(".godays").removeClass("bt_active");
          $(".godays li:eq(0)").addClass("bt_active");
        } else {
          if ($(this).offset().top <= $(document).scrollTop() + 120) {
            $(".godays").removeClass("bt_active");
            $(".godays").eq(index).addClass("bt_active");
          } //If else End
        } //if End
      }); //each End
    }, 100); //setTimeout End
  }); //scroll End

  // 行程內容收合
  //$(function () {
  //  if ($(window).width() < 769) {
  //    $(".trip_day_content").hide;
  //    $(".trip_day_title").click(function (event) {
  //      event.preventDefault();

  //      var $this = $(this),
  //        $data = $this.parent().find(".trip_day_content"),
  //        $self = $this.parent().find(".trip_day_title");

  //      if ($this.hasClass("trip_day_title_close")) {
  //        //關閉所有行程
  //        $(".trip_day_content").slideUp(0);

  //        $("html,body").animate(
  //          {
  //            scrollTop: $self.offset().top - 50,
  //          },
  //          0
  //        );
  //        $(".trip_day_title")
  //          .removeClass("trip_day_title_open")
  //          .addClass("trip_day_title_close");

  //        //打開行程內容
  //        $data.slideDown(0);
  //        $this
  //          .removeClass("trip_day_title_close")
  //          .addClass("trip_day_title_open");
  //      } else {
  //        $data.slideUp(0);
  //        $this
  //          .removeClass("trip_day_title_open")
  //          .addClass("trip_day_title_close");
  //      }
  //    });
  //  }
  //});
});
