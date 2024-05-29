// Flag to indicate whether the change has been applied
let changeApplied = false;

function replaceProfilePictures(imageData) {
    // Select all profile picture elements
    const profilePictures = document.querySelectorAll('.update-components-actor__avatar-image');
  
    // Loop through each profile picture element
    profilePictures.forEach(picture => {
      // Replace the source of the image with the specified URL
      picture.src = imageData;
    });
}

// Variable to store the current image data
let currentImageData = '';

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'changeProfilePictures') {
        // Update the current image data
        currentImageData = request.imageData;
        
        // Replace profile pictures
        replaceProfilePictures(currentImageData);
        
        // Set the changeApplied flag to true
        changeApplied = true;
    }
});

// Observe DOM changes to handle dynamically loaded content
const observer = new MutationObserver(() => {
    // Check if the change has been applied before replacing profile pictures
    if (changeApplied) {
        replaceProfilePictures(currentImageData); // Use the most recent image data
    }
});
observer.observe(document.body, { childList: true, subtree: true });

// Function to handle scroll events
function handleScroll() {
    // Check if the change has been applied before replacing profile pictures
    if (changeApplied) {
        replaceProfilePictures(currentImageData); // Use the most recent image data
    }
}

// Listen for scroll events
window.addEventListener('scroll', handleScroll);

// Flag to prevent multiple clicks
let clicked = false;

// Listen for double click events
window.addEventListener('dblclick', function(event) {
    if (!clicked) {
        clicked = true;
        setTimeout(function() {
            clicked = false;
        }, 300); // Set a timeout to reset the clicked flag after 300 milliseconds
    } else {
        event.stopPropagation(); // Prevent further propagation of the event
    }
});
