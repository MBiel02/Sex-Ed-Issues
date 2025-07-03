


// we make sure the JavaScript file loads after our HTML by using a function test if the HTML is loaded

function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}   



docReady(function() {

	// functions
	// go
	// here

});


document.addEventListener('DOMContentLoaded', function() {
  // Mobile tab switching
  const tabs = document.querySelectorAll('.mobile-tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs and content
      document.querySelectorAll('.mobile-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.mobile-content').forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
});

// Force scroll to bottom on load
window.addEventListener('load', function() {
  const leftSide = document.querySelector('.left-side');
  leftSide.scrollTop = leftSide.scrollHeight;
  
  // // Reverse scroll direction (wheel/touch)
  // leftSide.addEventListener('wheel', function(e) {
  //   this.scrollTop -= e.deltaY;
  //   e.preventDefault();
  // });
});



// Book data
const books = [
  {
    cover: 'content/Issue_1/Cover.jpg',
    spreads: [
      'content/Issue_1/1.jpg',
      'content/Issue_1/2.jpg',
      'content/Issue_1/3.jpg',
      'content/Issue_1/4.jpg',
      'content/Issue_1/5.jpg',
      'content/Issue_1/6.jpg',
      'content/Issue_1/7.jpg',
      'content/Issue_1/8.jpg',
      'content/Issue_1/9.jpg',
      'content/Issue_1/10.jpg',
      'content/Issue_1/11.jpg',
      'content/Issue_1/12.jpg',
      'content/Issue_1/13.jpg',
      'content/Issue_1/14.jpg'
    ]
  },

  
  {
    cover: 'content/Issue_2/Cover.jpg',
    spreads: [
      'content/Issue_2/2.jpg',
      'content/Issue_2/3.jpg',
      'content/Issue_2/4.jpg',
      'content/Issue_2/5.jpg',
      'content/Issue_2/6.jpg',
      'content/Issue_2/7.jpg',
      'content/Issue_2/8.jpg',
      'content/Issue_2/9.jpg',
      'content/Issue_2/10.jpg',
      'content/Issue_2/11.jpg',
      'content/Issue_2/12.jpg',
      'content/Issue_2/13.jpg',
      'content/Issue_2/14.jpg',
      'content/Issue_2/15.jpg',
      'content/Issue_2/16.jpg',
      'content/Issue_2/17.jpg',
      'content/Issue_2/18.jpg',
      'content/Issue_2/19.jpg',
      'content/Issue_2/20.jpg',
      'content/Issue_2/21.jpg',
      'content/Issue_2/22.jpg',
      'content/Issue_2/23.jpg',
      'content/Issue_2/24.jpg',
    ]
  },
  {
    cover: 'content/Issue_3/Cover.jpg',
    spreads: [
      'content/Issue_3/1.jpg',
      'content/Issue_3/2.jpg',
      'content/Issue_3/3.jpg',
      'content/Issue_3/4.jpg',
      'content/Issue_3/5.jpg',
      'content/Issue_3/6.jpg',
      'content/Issue_3/7.jpg',
      'content/Issue_3/8.jpg',
      'content/Issue_3/9.jpg',
      'content/Issue_3/10.jpg',
      'content/Issue_3/11.jpg',
      'content/Issue_3/12.jpg',
      'content/Issue_3/13.jpg',
      'content/Issue_3/14.jpg',
      'content/Issue_3/15.jpg',
      'content/Issue_3/16.jpg',
      'content/Issue_3/17.jpg',
      'content/Issue_3/18.jpg',
      'content/Issue_3/19.jpg'
    ]
  }
];

// DOM ready handler
function docReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

docReady(function() {
  // Initialize books
  initBooks('.image-scroll'); // Desktop
  initBooks('.mobile-image-scroll'); // Mobile

  // Mobile tab switching
  const tabs = document.querySelectorAll('.mobile-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.mobile-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.mobile-content').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Scroll to bottom on load
  const leftSide = document.querySelector('.left-side');
  if (leftSide) {
    leftSide.scrollTop = leftSide.scrollHeight;
  }
});

function initBooks(containerSelector) {
  const containers = document.querySelectorAll(containerSelector);
  if (!containers.length) return;

  containers.forEach(container => {
    container.innerHTML = '';

    books.forEach((book, bookIndex) => {
      createBookElement(book, bookIndex, container);
    });
  });
}

function createBookElement(book, bookIndex, container) {
  // Create container div
  const bookContainer = document.createElement('div');
  bookContainer.className = 'book-container';
  bookContainer.dataset.bookIndex = bookIndex;
  bookContainer.dataset.currentPage = '-1'; // Start with cover

  // Create close button
  const closeBtn = document.createElement('div');
  closeBtn.className = 'close-btn';
  closeBtn.innerHTML = '✕';
  closeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    resetToCover(bookContainer);
  });

  // Create image element
  const img = document.createElement('img');
  img.className = 'book-image';
  img.src = book.cover;
  img.alt = `Issue ${bookIndex + 1}`;
  img.dataset.isAnimating = 'false';

  // Assemble elements
  bookContainer.appendChild(img);
  bookContainer.appendChild(closeBtn);
  container.appendChild(bookContainer);

  // Click handler
  bookContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('close-btn')) return;
    if (img.dataset.isAnimating === 'true') return;

    const currentPage = parseInt(this.dataset.currentPage);
    const isCover = currentPage === -1;
    const isLastPage = currentPage >= book.spreads.length - 1;

    img.dataset.isAnimating = 'true';

    if (isCover) {
      // Cover → First spread
      img.src = book.spreads[0];
      this.dataset.currentPage = '0';
    } else if (isLastPage) {
      // Last spread → Cover
      img.src = book.cover;
      this.dataset.currentPage = '-1';
    } else {
      // Next spread
      img.src = book.spreads[currentPage + 1];
      this.dataset.currentPage = (currentPage + 1).toString();
    }

    // Reset after load
    const tempImg = new Image();
    tempImg.onload = () => {
      img.dataset.isAnimating = 'false';
    };
    tempImg.src = img.src;
  });
}

function resetToCover(container) {
  const bookIndex = container.dataset.bookIndex;
  const img = container.querySelector('img');
  img.src = books[bookIndex].cover;
  container.dataset.currentPage = '-1';
}