$(document).ready(function () {
  $('.nav_box').hover(
    function () {
      // Hide the first sub_menu_box when hovering
      $(this).find('.sub_menu').addClass('active');
      $(this)
        .find('.sub_menu_box:first-child .sub_sub_menu_wrap')
        .addClass('active');
      $(this)
        .find('.sub_menu_box:first-child .sub_menu_title span')
        .addClass('active');
      $(this).find('.under_line').addClass('active');
    },
    function () {
      // Show the first sub_menu_box when not hovering
      $(this).find('.sub_menu').removeClass('active');
      $(this).find('.under_line').removeClass('active');
    }
  );

  $('.sub_menu_box').hover(
    function () {
      // over
      $(this).find('.sub_sub_menu_wrap').addClass('active');
      $(this).find('.sub_menu_title span').addClass('active');
      if ($(this).index() > 0) {
        // Remove active class from the sub_sub_menu_wrap in the first sub_menu_box
        $('.sub_menu_box:first-child .sub_sub_menu_wrap').removeClass('active');
        $('.sub_menu_box:first-child .sub_menu_title span').removeClass(
          'active'
        );
      }
    },
    function () {
      // out
      $(this).find('.sub_sub_menu_wrap').removeClass('active');
      $(this).find('.sub_menu_title span').removeClass('active');
    }
  );
});
/*
document.addEventListener('DOMContentLoaded', function () {
  var menuLists = document.querySelectorAll('.sub_menu_list');

  menuLists.forEach(function (menuList) {
    var listItems = menuList.querySelectorAll('li');
    var containerSpan = menuList.querySelector('span');
    if (listItems.length >= 8 && listItems.length <= 16) {
      menuList.classList.add('if-over-8');
      containerSpan.classList.add('if-over-8-span');
    } else if (listItems.length > 16 && listItems.length <= 24) {
      menuList.classList.add('if-over-16');
      containerSpan.classList.add('if-over-8-span');
    } else if (listItems.length > 24) {
      menuList.classList.add('if-over-24');
      containerSpan.classList.add('if-over-8-span');
    }
  });
});*/
document.addEventListener('DOMContentLoaded', function () {
  var menuLists = document.querySelectorAll('.sub_menu_list');

  menuLists.forEach(function (menuList) {
    var listItems = menuList.querySelectorAll('li');
    var containerSpan = menuList.querySelector('span');
    if (listItems.length >= 8 && listItems.length <= 16) {
      //menuList.classList.add('if-over-8');
      containerSpan.classList.add('two_column');
    } else if (listItems.length>16) {
      //menuList.classList.add('if-over-16');
      containerSpan.classList.add('three_column');
    }
  });
});
