document.addEventListener('DOMContentLoaded', () => {
    const engravingInput = document.getElementById('engraving-text');
    const livePreview = document.getElementById('live-preview');
    const fontSelect = document.getElementById('font-select');
    const orderWhatsappBtn = document.getElementById('order-whatsapp');
    const orderEmailBtn = document.getElementById('order-email');

    // Live Preview functionality
    engravingInput.addEventListener('input', (e) => {
        livePreview.textContent = e.target.value;
    });

    fontSelect.addEventListener('change', (e) => {
        livePreview.style.fontFamily = e.target.value;
    });

      // Order Logic
      orderWhatsappBtn.addEventListener('click', () => {
          const text = engravingInput.value || "Naam ka Comb";
          const font = fontSelect.value;
          const message = `Hello, main Naam ka Comb order karna chahta hoon.
          \nDetails:\nName: ${text}\nFont: ${font}`;

        // *************** IMPORTANT ***************
        // Replace 'YOUR_PHONE_NUMBER' with your actual WhatsApp number (with country code, e.g., 919876543210)
        const whatsappNumber = 'YOUR_PHONE_NUMBER';
        // ***************************************

        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    });

    orderEmailBtn.addEventListener('click', () => {
        const text = engravingInput.value || "Naam ka Comb";
        const font = fontSelect.value;
        const subject = "Naam ka Comb Order Enquiry";
        const body = `Hello, main Naam ka Comb order karna chahta hoon.
        \nDetails:\nName: ${text}\nFont: ${font}`;

        // *************** IMPORTANT ***************
        // Replace 'YOUR_EMAIL_ADDRESS' with your actual email address
        const emailAddress = 'YOUR_EMAIL_ADDRESS';
        // ***************************************

        const emailURL = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = emailURL;
    });
});
const items = document.querySelectorAll(".product-gallery img, .product-gallery video");
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");
const lightboxVideo = lightbox.querySelector("video");
const closeBtn = lightbox.querySelector(".close");
const nextBtn = lightbox.querySelector(".next");
const prevBtn = lightbox.querySelector(".prev");

let currentIndex = 0;

// Open lightbox
items.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentIndex = index;
    showItem(item);
    lightbox.style.display = "flex";
  });
});

function showItem(item) {
  if (item.tagName === "IMG") {
    lightboxImg.src = item.src;
    lightboxImg.style.display = "block";
    lightboxVideo.style.display = "none";
  } else if (item.tagName === "VIDEO") {
    lightboxVideo.src = item.src;
    lightboxVideo.style.display = "block";
    lightboxImg.style.display = "none";
    lightboxVideo.play();
  }
}

// Close lightbox
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
  lightboxVideo.pause();
});

// Next/Prev
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % items.length;
  showItem(items[currentIndex]);
});
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  showItem(items[currentIndex]);
});
    
// Swipe support (mobile)
let startX = 0;
lightbox.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});
lightbox.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  let diff = startX - endX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      currentIndex = (currentIndex + 1) % items.length;
    } else {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
    }
    showItem(items[currentIndex]);
  }
});

// Escape key close
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "Escape") lightbox.style.display = "none";
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
  }
});
