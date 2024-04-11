// Function to update the slider content based on the notes
function updateSliderContent(note) {
    const slider = document.querySelector('.recent_order .slider');
    const slide = document.createElement('div');
    slide.classList.add('slide');
    slide.textContent = note;
    slider.appendChild(slide);
}

// Listen for the custom event dispatched from notes.html when a new note is added
window.addEventListener('noteAdded', function(event) {
    const note = event.detail;
    updateSliderContent(note);
});

const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu_bar');
const closeBtn = document.querySelector('#close_btn');
const themeToggler = document.querySelector('.theme-toggler');
const liveDateElement = document.querySelector('.live-date'); // Add this line

// Function to update the live date
function updateLiveDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const formattedDate = currentDate.toLocaleString('en-US', options);
    liveDateElement.textContent = "Live Date: " + formattedDate;
}

// Call the function initially
updateLiveDate();

// Update the live date every second
setInterval(updateLiveDate, 1000);

// Function to get the username from local storage
function getUsername() {
    return localStorage.getItem('username');
}

// Function to update the username in the profile section
function updateUsername() {
    const usernameElement = document.getElementById('usernamePlaceholder');
    const username = getUsername();
    if (username) {
        usernameElement.textContent = username;
    }
}

// Call the function to update the username when the page loads
updateUsername();

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = "block";
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = "none";
});

themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
});

// Slider functionality
const slider = document.querySelector('.recent_order .slider');
const slides = document.querySelectorAll('.recent_order .slider .slide');

let currentSlide = 0;

// Function to show the current slide
function showSlide(index) {
    slides.forEach((slide) => {
        slide.classList.remove('active');
    });
    slides[index].classList.add('active');
}

// Initial call to show the first slide
showSlide(currentSlide);

// Function to move to the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Function to move to the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Set interval to auto-rotate slides
setInterval(nextSlide, 5000); // Change 5000 to your desired interval in milliseconds
