// NAVIGATION //


// To assist with Mobile Menu (Hamburger Toggle)

function toggleMenu() {
    menu = document.querySelector('.navigation ul');
    menuToggle = document.querySelector('.menu-toggle');

    // Toggle the rotate class (made up) to apply the rotation effect
    menuToggle.classList.toggle('rotate');

    // To show or hide menu
    menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'flex' : 'none';
    
}

// Show button with transition after 3 seconds
  setTimeout(function() {
  document.querySelector('.portfoliobutton').classList.add('show');
  }, 3000);


// PDF Prompt for Mobile //
document.addEventListener('DOMContentLoaded', function() {

 element = document.querySelector('.pdf');

  if (element) {
    element.addEventListener('click', function() {
      if (window.innerWidth < 1080) {
        alert('PDF format. Unfortunately, this will only show properly for Desktop. Apologies');
      }
    });
  }
});


// Contact Form Submission //

const form = document.getElementById('contactForm');

// submit event listener
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission

  // using fetch method to get data
  try {
    const response = await fetch(form.action, {
      method: form.method,
      headers: {
        'Accept': 'application/json',
      },
      body: new FormData(form),
    });

    // Check if the response status is OK (200)
    if (response.ok) {
      // Clear the form after successful submission
      form.reset();
      // Show success alert
      alert('Form submitted successfully!');
    } else {
      // Handle error response
      alert('An error occurred. Please try again.');
    }
  } catch (error) {
    // Handle fetch error
    alert('An error occurred. Please try again.');
  }
});
  
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('success') === 'true') {
  alert('Information submitted successfully! Will respond within one business day :)');
}

// this code based on code from my actual portfolio i.e. https://hakeemellis.com/