const moreDatesButton = document.querySelector(".more-btn");
const closeDateButton = document.querySelector(".fa-xmark");
const touristCalendar = document.querySelector(".tourist-calendar");
const popBG = document.querySelector(".pop");
// touristCalendar.classList.add("hidden");
// popBG.classList.add("hidden");

moreDatesButton.addEventListener("click", () => {
  touristCalendar.classList.add("active");
  popBG.classList.add("active");
});

closeDateButton.addEventListener("click", () => {
  touristCalendar.classList.remove("active");
  popBG.classList.remove("active");
});
document.addEventListener('click', (event) => {
  if (
    !touristCalendar.contains(event.target) &&
    !moreDatesButton.contains(event.target) &&
    !closeDateButton.contains(event.target)
  ) {
    touristCalendar.classList.remove('active');
    popBG.classList.remove('active');
  }
});