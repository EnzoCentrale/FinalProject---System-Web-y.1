

// This first part is all for the navigation Bar
const modal = document.getElementById("modal");

// Show modal: set display to block and stop background scrolling
function showModal() {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Hide modal: set display to none and restore scrolling
function hideModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function displayModal() {
  if (getComputedStyle(modal).display === 'block') {
    hideModal();
  } else {
    showModal();
  }
}




