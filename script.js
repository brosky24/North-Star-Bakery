// ==========================================
// NORTH STAR BAKERY - TOUCHSTONE 4 SCRIPT
// ==========================================

// Data structures using objects and arrays (Touchstone requirement)
const bakeryData = {
    inquiryTypes: ["Custom Cakes", "Catering", "General Inquiry"],
    selectedPreference: null
};

// Run functions once the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    initializePreferenceSelector();
    setupFormValidation();
});

// ==========================================
// 1. INTERACTIVE FEATURE & LOCAL STORAGE
// ==========================================
function initializePreferenceSelector() {
    const buttons = document.querySelectorAll(".interest-btn");
    const feedbackEl = document.getElementById("selectionFeedback");

    // Load stored data from localStorage when the page opens
    const savedPreference = localStorage.getItem("bakeryPreference");
    if (savedPreference && feedbackEl) {
        bakeryData.selectedPreference = savedPreference;
        feedbackEl.textContent = `Welcome back! Your preferred interest is saved as: "${savedPreference}".`;
        feedbackEl.style.color = "#2b7a78";
    }

    // Save data when the user clicks an option button
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            const chosenInterest = event.target.getAttribute("data-interest");
            
            // Update object state
            bakeryData.selectedPreference = chosenInterest;

            // Save to browser's localStorage
            localStorage.setItem("bakeryPreference", chosenInterest);

            // Update user feedback on screen dynamically
            if (feedbackEl) {
                feedbackEl.textContent = `Preference saved successfully: ${chosenInterest}!`;
                feedbackEl.style.color = "#2b7a78";
            }
        });
    });
}

// ==========================================
// 2. FORM VALIDATION & USER FEEDBACK
// ==========================================
function setupFormValidation() {
    const form = document.getElementById("contactForm");
    
    if (!form) return; // Exit if form is not present on the page

    form.addEventListener("submit", function (event) {
        let isValid = true;

        // Clear previous error messages
        clearErrors();

        // Validate Full Name
        const fullnameInput = document.getElementById("fullname");
        const fullnameError = document.getElementById("fullnameError");
        if (!fullnameInput.value.trim()) {
            showError(fullnameError, "Please enter your full name.");
            isValid = false;
        }

        // Validate Email Address
        const emailInput = document.getElementById("email");
        const emailError = document.getElementById("emailError");
        const emailValue = emailInput.value.trim();
        
        if (!emailValue) {
            showError(emailError, "Email address is required.");
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            showError(emailError, "Please enter a valid email address (e.g., name@example.com).");
            isValid = false;
        }

        // Prevent form submission if validation fails
        if (!isValid) {
            event.preventDefault();
        } else {
            event.preventDefault(); // Stop default action to show success banner instead
            showSuccessBanner();
        }
    });
}

// Helper function to display error text near the relevant field
function showError(errorElement, message) {
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.color = "#d9534f";
        errorElement.style.fontSize = "0.85rem";
        errorElement.style.display = "block";
    }
}

// Helper function to clear errors before re-validating
function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(span => {
        span.textContent = "";
    });
}

// Helper function to validate email structure using basic regex pattern
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Helper function to show a success banner upon valid submission
function showSuccessBanner() {
    const successBanner = document.getElementById("formSuccessMessage");
    const form = document.getElementById("contactForm");
    
    if (successBanner && form) {
        form.style.display = "none";
        successBanner.style.display = "block";
        successBanner.textContent = "Thank you! Your message has been successfully validated and recorded.";
        successBanner.style.color = "#2b7a78";
        successBanner.style.fontWeight = "bold";
        successBanner.style.padding = "20px";
        successBanner.style.border = "1px solid #2b7a78";
        successBanner.style.backgroundColor = "#eef8f8";
    }
}