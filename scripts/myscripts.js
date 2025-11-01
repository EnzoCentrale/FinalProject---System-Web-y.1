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


// Clicking the backdrop closes (but clicking content does not)
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    hideModal();
  }
});

// Close on Escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.style.display === 'block') {
    hideModal();
  }
  });

