'use strict';



// add Event on multiple elment

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



// PRELOADING

const loadingElement = document.querySelector("[data-loading]");

window.addEventListener("load", function () {
  loadingElement.classList.add("loaded");
  document.body.classList.remove("active");
});



// MOBILE NAV TOGGLE

const [navTogglers, navLinks, navbar, overlay] = [
  document.querySelectorAll("[data-nav-toggler]"),
  document.querySelectorAll("[data-nav-link]"),
  document.querySelector("[data-navbar]"),
  document.querySelector("[data-overlay]")
];

const toggleNav = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElements(navTogglers, "click", toggleNav);

const closeNav = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElements(navLinks, "click", closeNav);



// HEADER

const header = document.querySelector("[data-header]");

const activeElementOnScroll = function () {
  if (window.scrollY > 50) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

window.addEventListener("scroll", activeElementOnScroll);



/**
 * TEXT ANIMATION EFFECT FOR HERO SECTION
 */

const letterBoxes = document.querySelectorAll("[data-letter-effect]");

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

const setLetterEffect = function () {

  // loop through all letter boxes
  for (let i = 0; i < letterBoxes.length; i++) {
    // set initial animation delay
    let letterAnimationDelay = 0;

    // get all character from the current letter box
    const letters = letterBoxes[i].textContent.trim();
    // remove all character from the current letter box
    letterBoxes[i].textContent = "";

    // loop through all letters
    for (let j = 0; j < letters.length; j++) {

      // create a span
      const span = document.createElement("span");

      // set animation delay on span
      span.style.animationDelay = `${letterAnimationDelay}s`;

      // set the "in" class on the span, if current letter box is active
      // otherwise class is "out"
      if (i === activeLetterBoxIndex) {
        span.classList.add("in");
      } else {
        span.classList.add("out");
      }

      // pass current letter into span
      span.textContent = letters[j];

      // add space class on span, when current letter contain space
      if (letters[j] === " ") span.classList.add("space");

      // pass the span on current letter box
      letterBoxes[i].appendChild(span);

      // skip letterAnimationDelay when loop is in the last index
      if (j >= letters.length - 1) break;
      // otherwise update
      letterAnimationDelay += 0.05;

    }

    // get total delay of active letter box
    if (i === activeLetterBoxIndex) {
      totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
    }

    // add active class on last active letter box
    if (i === lastActiveLetterBoxIndex) {
      letterBoxes[i].classList.add("active");
    } else {
      letterBoxes[i].classList.remove("active");
    }

  }

  setTimeout(function () {
    lastActiveLetterBoxIndex = activeLetterBoxIndex;

    // update activeLetterBoxIndex based on total letter boxes
    activeLetterBoxIndex >= letterBoxes.length - 1 ? activeLetterBoxIndex = 0 : activeLetterBoxIndex++;

    setLetterEffect();
  }, (totalLetterBoxDelay * 1000) + 3000);

}

// call the letter effect function after window loaded
window.addEventListener("load", setLetterEffect);



/**
 * BACK TO TOP BUTTON
 */

const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  const bodyHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollEndPos = bodyHeight - windowHeight;
  const totalScrollPercent = (window.scrollY / scrollEndPos) * 100;

  backTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`;

  // visible back top btn when scrolled 5% of the page
  if (totalScrollPercent > 5) {
    backTopBtn.classList.add("show");
  } else {
    backTopBtn.classList.remove("show");
  }
});



/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
  for (let i = 0; i < revealElements.length; i++) {
    const elementIsInScreen = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;

    if (elementIsInScreen) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
}

window.addEventListener("scroll", scrollReveal);

scrollReveal();



/**
 * CUSTOM CURSOR
 */

const cursor = document.querySelector("[data-cursor]");
const anchorElements = document.querySelectorAll("a");
const buttons = document.querySelectorAll("button");

// change cursorElement position based on cursor move
document.body.addEventListener("mousemove", function (event) {
  setTimeout(function () {
    cursor.style.top = `${event.clientY}px`;
    cursor.style.left = `${event.clientX}px`;
  }, 100);
});

// add cursor hoverd class
const hoverActive = function () { cursor.classList.add("hovered"); }

// remove cursor hovered class
const hoverDeactive = function () { cursor.classList.remove("hovered"); }

// add hover effect on cursor, when hover on any button or hyperlink
addEventOnElements(anchorElements, "mouseover", hoverActive);
addEventOnElements(anchorElements, "mouseout", hoverDeactive);
addEventOnElements(buttons, "mouseover", hoverActive);
addEventOnElements(buttons, "mouseout", hoverDeactive);

// add disabled class on cursorElement, when mouse out of body
document.body.addEventListener("mouseout", function () {
  cursor.classList.add("disabled");
});

// remove diabled class on cursorElement, when mouse in the body
document.body.addEventListener("mouseover", function () {
  cursor.classList.remove("disabled");
});



// FUNCTION
const btnIcons = document.querySelectorAll('.btn-icon');
const locationBtns = document.querySelectorAll('.location-btn');
const carTypeBtns = document.querySelectorAll('.car-type-btn');
const backBtns = document.querySelectorAll('.back-btn');
const packageDetails = document.getElementById('package-details');

const serviceSection = document.getElementById('service');
const locationQuestionSection = document.getElementById('location-question');
const carTypeQuestionSection = document.getElementById('car-type-question');
const packageDescriptionSection = document.getElementById('package-description');

let selectedPackage = '';
let selectedLocation = '';
let carType = ''; // Track car type globally

// Show all steps progressively without hiding the previous ones
function showSection(section) {
  section.style.display = 'block';
  section.scrollIntoView({ behavior: 'smooth' });
}

// Reset everything to the default state
function resetToDefault() {
  // Hide all steps
  locationQuestionSection.style.display = 'none';
  carTypeQuestionSection.style.display = 'none';
  packageDescriptionSection.style.display = 'none';

  // Reset visibility of all service list items
  document.querySelectorAll('.service-list li').forEach(item => {
    item.style.display = 'block';
  });

  // Scroll to the top of the services section
  serviceSection.scrollIntoView({ behavior: 'smooth' });

  // Clear any dynamic text or selections
  packageDetails.innerText = '';
  selectedPackage = '';
  selectedLocation = '';
  carType = '';
}

// Attach event listeners to each package button
btnIcons.forEach(btn => {
  btn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior

    // Get the parent list item of the clicked button
    const clickedItem = btn.closest('li');

    // Mark the selected package
    selectedPackage = clickedItem.querySelector('.card-title').innerText;

    // Show the location question form
    showSection(locationQuestionSection);
  });
});

// Attach event listeners to each location button
locationBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    // Save the selected location
    selectedLocation = btn.getAttribute('data-location');
    console.log(`Selected location: ${selectedLocation}`); // Debugging

    // Show the car type question form
    showSection(carTypeQuestionSection);
  });
});

// Handle car types and link to the correct Calendly URL
// Handle car types and link to the correct Calendly URL
carTypeBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    carType = btn.getAttribute('data-car'); // Save car type globally

    // Pricing based on car type and package
    const pricing = {
      Coupe: {
        "Full Detail Basic": "$200"
      },
      Sedan: {
        "Full Detail Basic": "$220"
      },
      SUV: {
        "Full Detail Basic": "$250"
      },
      Truck: {
        "Full Detail Basic": "$300"
      }
    };

    // Calendly links for each location and package
    const calendlyLinks = {
      Houston: {
        SUV: {
          "Interior Detail": "https://calendly.com/rustezeautodetailing/interior-detail-suv-houston-tx",
          "Exterior Detail": "https://calendly.com/rustezeautodetailing/exterior-detail-suv-houston-tx",
          "Full Detail": "https://calendly.com/rustezeautodetailing/full-detail-basic-suv-houston-tx",
          "Premium Detail": "https://calendly.com/rustezeautodetailing/premium-detail-suv-houston-tx"
        },
        Truck: {
          "Interior Detail": "https://calendly.com/rustezeautodetailing/interior-detail-truck-houston-tx",
          "Exterior Detail": "https://calendly.com/rustezeautodetailing/exterior-detail-truck-houston-tx",
          "Full Detail": "https://calendly.com/rustezeautodetailing/full-detail-basic-truck-houston-tx",
          "Premium Detail": "https://calendly.com/rustezeautodetailing/premium-detail-truck-houston-tx"
        },
        Sedan: {
          "Interior Detail": "https://calendly.com/rustezeautodetailing/interior-detail-sedan-houston-tx",
          "Exterior Detail": "https://calendly.com/rustezeautodetailing/exterior-detail-sedan-houston-tx",
          "Full Detail": "https://calendly.com/rustezeautodetailing/full-detail-basic-sedan-dallas-fort-worth-tx-clone",
          "Premium Detail": "https://calendly.com/rustezeautodetailing/premium-detail-sedan-houston-tx"
        },
        Coupe: {
          "Interior Detail": "https://calendly.com/rustezeautodetailing/interior-detail-coupe-houston-tx",
          "Exterior Detail": "https://calendly.com/rustezeautodetailing/exterior-detail-coupe-houston-tx",
          "Full Detail": "https://calendly.com/rustezeautodetailing/full-detail-basic-coupe-dallas-fort-worth-tx-clone",
          "Premium Detail": "https://calendly.com/rustezeautodetailing/premium-detail-coupe-houston-tx"
        }
      },
      DFW: {
        SUV: {
          "Interior Detail": "https://calendly.com/rustezeautodetailing/interior-detail-suv-dfw-tx",
          "Exterior Detail": "https://calendly.com/rustezeautodetailing/exterior-detail-suv-dfw-tx",
          "Full Detail": "https://calendly.com/rustezeautodetailing/full-detail-basic-suv-dallas-fort-worth-tx"
        },
        Truck: {
          "Interior Detail": "https://calendly.com/rustezeautodetailing/interior-detail-truck-dfw-tx",
          "Exterior Detail": "https://calendly.com/rustezeautodetailing/exterior-detail-truck-dfw-tx",
          "Full Detail": "https://calendly.com/rustezeautodetailing/full-detail-basic-truck-dallas-fort-worth-tx"
        },
        Sedan: {
          "Interior Detail": "https://calendly.com/rustezeautodetailing/interior-detail-sedan-dfw-tx",
          "Exterior Detail": "https://calendly.com/rustezeautodetailing/exterior-detail-sedan-dfw-tx",
          "Full Detail": "https://calendly.com/rustezeautodetailing/full-detail-basic-sedan-dallas-fort-worth-tx"
        },
        Coupe: {
          "Interior Detail": "https://calendly.com/rustezeautodetailing/interior-detail-coupe-dfw-tx",
          "Exterior Detail": "https://calendly.com/rustezeautodetailing/exterior-detail-coupe-dfw-tx",
          "Full Detail": "https://calendly.com/rustezeautodetailing/full-detail-basic-coupe-dallas-fort-worth-tx"
        }
      }
    };

    // Retrieve the price and the correct Calendly link
    const selectedPrice = pricing[carType]?.[selectedPackage] || "Price not available";
    const calendlyLink =
      calendlyLinks[selectedLocation]?.[carType]?.[selectedPackage];

    if (!calendlyLink) {
      console.error("Calendly Link not found for the selected options.");
      alert("There was an issue with the booking URL. Please try again.");
      return;
    }

    console.log(`Calendly Link: ${calendlyLink}`); // Debugging

    // Update the package description section dynamically
    const packageTitle = packageDescriptionSection.querySelector('.h3.card-title');
    const bookNowBtn = packageDescriptionSection.querySelector('.book-now-btn');

    packageTitle.innerText = `Package Description: ${carType}`;
    packageDetails.innerHTML = `
      <p>You have selected the ${selectedPackage} package for a ${carType}.</p>
      <p>This package ensures your vehicle gets the best care for ${selectedPackage.toLowerCase()} services.</p>
      <p class="pricing-details">Price: ${selectedPrice}</p>
    `;

    // Update the "Book Now" button's `onclick` attribute to initialize the Calendly popup
    bookNowBtn.setAttribute(
      "onclick",
      `Calendly.initPopupWidget({url: '${calendlyLink}'}); return false;`
    );

    // Show the package description and booking section
    showSection(packageDescriptionSection);
  });
});


// Handle back button functionality
backBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    resetToDefault();
  });
});
