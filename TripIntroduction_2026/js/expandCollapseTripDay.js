/*function toggleTripDayContent(titleElement) {
  const contentElement = titleElement.parentNode.querySelector('.trip_day_content');
  const selfElement = titleElement.parentNode.querySelector('.trip_day_title');
    console.log('Classes on titleElement:', titleElement.classList);
  if (titleElement.classList.contains('trip_day_title_close')) {
    console.log('True');
    // Close all trips (except the clicked one)
    const otherContentElements = document.querySelectorAll('.trip_day_content:not(.active)'); // exclude active content
    for (const contentElement of otherContentElements) {
      contentElement.style.display = 'none';
      contentElement.classList.remove('active');  // remove active class if present
    }
    // Update other titles (except the clicked one)
    const otherTitleElements = document.querySelectorAll('.trip_day_title:not(.active)'); // exclude active title
    for (const titleElement of otherTitleElements) {
      titleElement.classList.remove('trip_day_title_open');
      titleElement.classList.add('trip_day_title_close');
    }
    // Open clicked trip content and mark it active
    contentElement.style.display = 'block';
    contentElement.classList.add('active'); // mark active content
    titleElement.classList.remove('trip_day_title_close');
    titleElement.classList.add('trip_day_title_open');
  } else {
    console.log('False');
    contentElement.style.display = 'none';
    contentElement.classList.remove('active');  // remove active class if present
    titleElement.classList.remove('trip_day_title_open');
    titleElement.classList.add('trip_day_title_close');
  }
}*/
function toggleTripDayContent(titleElement) {
  //console.log('Bello');
  const contentElement =
    titleElement.parentNode.querySelector('.trip_day_content');

  if (titleElement.classList.contains('trip_day_title_close')) {
    // 顯示
    contentElement.style.display = 'block';
    titleElement.classList.remove('trip_day_title_close');
    titleElement.classList.add('trip_day_title_open');
  } else {
    // 隱藏
    contentElement.style.display = 'none';
    titleElement.classList.remove('trip_day_title_open');
    titleElement.classList.add('trip_day_title_close');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const titleElements = document.querySelectorAll('.trip_day_title');
  for (const titleElement of titleElements) {
    titleElement.addEventListener('click', () => {
      toggleTripDayContent(titleElement);
    });
  }
});
