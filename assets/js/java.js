// change navbar color on scroll
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});



// Select all sections and nav links
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

// Function to update active link on scroll
function updateActiveLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 320; // navbar height adjust
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

// Run on scroll
window.addEventListener("scroll", updateActiveLink);

// Also handle click (smooth scroll + active state)
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((nav) => nav.classList.remove("active"));
    this.classList.add("active");
  });
});




// Footer Date
function showDateTime() {
  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = days[now.getDay()];
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  const fullDateTime = `${dayName}, ${date} - ${time}`;
  document.getElementById("datetime").textContent = fullDateTime;
}

showDateTime(); // Function call

