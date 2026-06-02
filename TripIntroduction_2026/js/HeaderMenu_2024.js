$(document).ready(function () {

  // -------------------------------
  // 20260107
  // -------------------------------
  $('.nav_box').hover(
    function () {
   
      $(this).siblings('.nav_box').find('.under_line').removeClass('active');
      $(this).siblings('.nav_box').find('.sub_menu').removeClass('active');

    
      $(this).find('.under_line').addClass('active');

      $(this).find('.sub_menu').addClass('active');

   
      $(this).find('.sub_menu_box:first-child .sub_sub_menu_wrap').addClass('active');
      $(this).find('.sub_menu_box:first-child .sub_menu_title span').addClass('active');
    },
    function () {
      
      $(this).find('.under_line').removeClass('active');
      $(this).find('.sub_menu').removeClass('active');

      
      $(this).find('.sub_sub_menu_wrap').removeClass('active');
      $(this).find('.sub_menu_title span').removeClass('active');
    }
  );

  // -------------------------------
  // 子選單 
  // -------------------------------
  $('.sub_menu_box').hover(
    function () {
      //
      $(this).find('.sub_sub_menu_wrap').addClass('active');
      $(this).find('.sub_menu_title span').addClass('active');

    
      $(this).siblings('.sub_menu_box').find('.sub_sub_menu_wrap').removeClass('active');
      $(this).siblings('.sub_menu_box').find('.sub_menu_title span').removeClass('active');
    }
  );

  // -------------------------------
  // 根據 li 數量自動加 class
  // -------------------------------
  $('.sub_menu_list').each(function () {
    const listItems = $(this).find('li').length;
    const containerSpan = $(this).find('span');
    $(this).removeClass('if-over-8 if-over-16 if-over-24');
    containerSpan.removeClass('if-over-8-span');

    if (listItems >= 8 && listItems <= 16) {
      $(this).addClass('if-over-8');
      containerSpan.addClass('if-over-8-span');
    } else if (listItems > 16 && listItems <= 24) {
      $(this).addClass('if-over-16');
      containerSpan.addClass('if-over-8-span');
    } else if (listItems > 24) {
      $(this).addClass('if-over-24');
      containerSpan.addClass('if-over-8-span');
    }
  });

});




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
