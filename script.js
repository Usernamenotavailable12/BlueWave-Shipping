let translations;

// Load translations dynamically
fetch("translations.json")
  .then((response) => response.json())
  .then((data) => {
    translations = data;
    const savedLanguage = localStorage.getItem("preferredLanguage") || "en";
    updateLanguage(savedLanguage);
    languageSelects.forEach((select) => (select.value = savedLanguage));
  });

function updateLanguage(lang) {
  // Update Header
  document.querySelector('a[href="index.html"]').textContent =
    translations[lang].header.home;
  document.querySelector('a[href="about.html"]').textContent =
    translations[lang].header.about;
  document.querySelector('a[href="services.html"]').textContent =
    translations[lang].header.services;
  document.querySelector('a[href="ocean-logistics.html"]').textContent =
    translations[lang].header.oceanLogistics;
  document.querySelector('a[href="contact.html"]').textContent =
    translations[lang].header.contact;

  // Update Hero Section
  const hero = translations[lang].hero;
  if (document.querySelector(".hero")) {
    document.querySelector(".hero h1").textContent = hero.title;
    document.querySelector(".hero p").textContent = hero.subtitle;
    document.querySelector(".hero .cta-button").textContent = hero.cta;
  }

  // Update Intro Section
  if (document.querySelector(".intro p")) {
    document.querySelector(".intro p").textContent =
      translations[lang].intro.text;
  }

  // Update About Us Section
  if (document.querySelector(".about")) {
    document.querySelector(".about h1").textContent =
      translations[lang].about.title;
    document.querySelector(".about p").textContent =
      translations[lang].about.content;
    document.querySelector(".mission h2").textContent =
      translations[lang].about.missionTitle;
    document.querySelector(".mission p").textContent =
      translations[lang].about.missionContent;

    const whyChooseTitle = translations[lang].about.whyChooseTitle;
    const whyChooseList = translations[lang].about.whyChooseList;

    document.querySelector(".why-choose-us h2").textContent = whyChooseTitle;
    const listItems = document.querySelectorAll(".why-choose-us ul li");
    whyChooseList.forEach((item, index) => {
      listItems[index].innerHTML = item;
    });
  }

  // Update Services Section
  if (document.querySelector(".services")) {
    const services = translations[lang].services;

    // Update section title
    document.querySelector(".services h1").textContent = services.title;

    // Update each service item
    const serviceItems = document.querySelectorAll(".service-item");
    services.items.forEach((item, index) => {
      const serviceItem = serviceItems[index];
      serviceItem.querySelector("h2").textContent = item.title;

      // Update paragraph or list content
      if (item.content) {
        serviceItem.querySelector("p").textContent = item.content;
      } else if (item.list) {
        const listItems = serviceItem.querySelectorAll("ul li");
        item.list.forEach((listText, listIndex) => {
          listItems[listIndex].innerHTML = listText;
        });
      }
    });

    // Update CTA
    document.querySelector(".cta p").textContent = services.ctaText;
    document.querySelector(".extra p").innerHTML = services.extraText;
    document.querySelector(".cta .cta-button").textContent = services.ctaButton;
  }

  // Update Ocean Logistics Section
  if (document.querySelector(".ocean-logistics")) {
    const oceanLogistics = translations[lang].oceanLogistics;

    // Update section title and introduction
    document.querySelector(".ocean-logistics h1").textContent =
      oceanLogistics.title;
    document.querySelector(".ocean-logistics p").textContent =
      oceanLogistics.intro;

    // Update each logistics service
    const logisticsServices = document.querySelectorAll(
      ".ocean-logistics .service-item"
    );
    oceanLogistics.services.forEach((item, index) => {
      const logisticsService = logisticsServices[index];
      logisticsService.querySelector("h2").textContent = item.title;
      logisticsService.querySelector("p").textContent = item.content;
    });

    // Update CTA
    document.querySelector(".ocean-logistics .cta p").textContent =
      oceanLogistics.ctaText;
    document.querySelector(".ocean-logistics .cta .cta-button").textContent =
      oceanLogistics.ctaButton;
  }

  // Update Contact Section
  if (document.querySelector(".contact")) {
    const contact = translations[lang].contact;

    // Update section title
    document.querySelector(".contact h1").textContent = contact.title;

    // Update contact information
    const contactInfo = document.querySelector(".contact-info").children;
    contactInfo[0].textContent = contact.info.phone;
    contactInfo[1].textContent = contact.info.email;
    contactInfo[2].textContent = contact.info.address;
  }

  // Update Footer
  document.querySelectorAll(".footer-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href.includes("index.html"))
      link.textContent = translations[lang].footer.home;
    if (href.includes("about.html"))
      link.textContent = translations[lang].footer.about;
    if (href.includes("services.html"))
      link.textContent = translations[lang].footer.services;
    if (href.includes("ocean-logistics.html"))
      link.textContent = translations[lang].footer.oceanLogistics;
    if (href.includes("contact.html"))
      link.textContent = translations[lang].footer.contact;
  });
}

// Language Switcher
const languageSelects = document.querySelectorAll(
  "#language-select, #language-select-footer"
);
languageSelects.forEach((select) => {
  select.addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    localStorage.setItem("preferredLanguage", selectedLanguage);
    updateLanguage(selectedLanguage);
  });
});

// Set Default or Saved Language on Page Load
document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("preferredLanguage") || "en";
  updateLanguage(savedLanguage);
  languageSelects.forEach((select) => (select.value = savedLanguage));
});

document.addEventListener("DOMContentLoaded", () => {
  const burgerMenu = document.querySelector(".burger-menu");
  const navList = document.querySelector(".nav-list");

  burgerMenu.addEventListener("click", () => {
    navList.classList.toggle("active");
  });
});

// Get the language select element
const languageSelect = document.getElementById("language-select");

// Function to update the language class
function updateLanguageClass(language) {
  if (language === "ge") {
    languageSelect.classList.add("cur-lang-ge");
    languageSelect.classList.remove("cur-lang-en");
  } else if (language === "en") {
    languageSelect.classList.add("cur-lang-en");
    languageSelect.classList.remove("cur-lang-ge");
  }
}

// Add event listener to handle change events on the language select
languageSelect.addEventListener("change", () => {
  const selectedLanguage = languageSelect.value;
  updateLanguageClass(selectedLanguage);
  localStorage.setItem("preferredLanguage", selectedLanguage); // Save the selected language
});

// Set the correct class on page load based on saved language
document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("preferredLanguage") || "en";
  languageSelect.value = savedLanguage; // Ensure the select shows the correct value
  updateLanguageClass(savedLanguage); // Apply the appropriate class
});

// Select the header element
const header = document.querySelector('.header');

// Define the class to add when scrolling down
const scrolledClass = 'scrolled';

// Create a placeholder element
const headerPlaceholder = document.createElement('div');

// Add a scroll event listener
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        // Add the placeholder and class if the page is scrolled down
        if (!header.classList.contains(scrolledClass)) {
            headerPlaceholder.style.height = `${header.offsetHeight}px`;
            header.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
            header.classList.add(scrolledClass);
            header.parentNode.insertBefore(headerPlaceholder, header);
        }
    } else {
        // Remove the placeholder and class if scrolled back to the top
        if (header.classList.contains(scrolledClass)) {
            header.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
            header.classList.remove(scrolledClass);
            if (headerPlaceholder.parentNode) {
                headerPlaceholder.parentNode.removeChild(headerPlaceholder);
            }
        }
    }
});

// Function to toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  const darkModeClass = "dark-mode-enabled";

  if (body.classList.contains(darkModeClass)) {
      body.classList.remove(darkModeClass);
      localStorage.setItem("darkMode", "disabled");
  } else {
      body.classList.add(darkModeClass);
      localStorage.setItem("darkMode", "enabled");
  }
}

// Function to apply the saved dark mode setting on page load
function applyDarkModeSetting() {
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "enabled") {
      document.body.classList.add("dark-mode-enabled");
  }
}

// Initialize dark mode setting on page load
document.addEventListener("DOMContentLoaded", applyDarkModeSetting);

// Attach toggle function to a button (replace 'toggle-dark-mode-btn' with your button's ID or class)
document.getElementById("toggle-dark-mode-btn").addEventListener("click", toggleDarkMode);
