
// Phone number mask
(function () {
    const phoneInput = document.getElementById("phone");

    phoneInput.addEventListener("input", function (e) {
        // Remove all non-digit characters
        let digits = this.value.replace(/\D/g, "");

        // Limit to 10 digits
        digits = digits.substring(0, 10);

        // Format as (XXX) XXX-XXXX
        if (digits.length > 0) {
            if (digits.length <= 3) {
                this.value = "(" + digits;
            } else if (digits.length <= 6) {
                this.value =
                    "(" + digits.substring(0, 3) + ") " + digits.substring(3);
            } else {
                this.value =
                    "(" +
                    digits.substring(0, 3) +
                    ") " +
                    digits.substring(3, 6) +
                    "-" +
                    digits.substring(6);
            }
        }
    });
})();

// Form validation and submission
(function () {
    const form = document.getElementById("contactForm");
    const submitButton = document.getElementById("submitButton");
    const successMessage = document.getElementById("successMessage");

    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");

    const nameError = document.getElementById("nameError");
    const phoneError = document.getElementById("phoneError");
    const emailError = document.getElementById("emailError");

    let formSubmitted = false;

    // Validation functions
    function validateName() {
        const valid = nameInput.value.trim().length >= 2;
        toggleError(nameInput, nameError, valid);
        return valid;
    }

    function validatePhone() {
        // Check if phone matches pattern (XXX) XXX-XXXX
        const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
        const valid = phonePattern.test(phoneInput.value);
        toggleError(phoneInput, phoneError, valid);
        return valid;
    }

    function validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const valid = emailPattern.test(emailInput.value);
        toggleError(emailInput, emailError, valid);
        return valid;
    }

    function toggleError(inputElement, errorElement, isValid) {
        if (!isValid) {
            inputElement.classList.add("error");
            errorElement.style.display = "block";
        } else {
            inputElement.classList.remove("error");
            errorElement.style.display = "none";
        }
    }

    // Real-time validation
    nameInput.addEventListener("blur", validateName);
    phoneInput.addEventListener("blur", validatePhone);
    emailInput.addEventListener("blur", validateEmail);

    // Submit form
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (formSubmitted) {
            return;
        }

        // Validate all required fields
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isEmailValid = validateEmail();

        if (isNameValid && isPhoneValid && isEmailValid) {
            // Prepare form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Submit form via AJAX
            fetch(
                "https://formsws-hilstaging-com-0adj9wt8gzyq.runscope.net/solar",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            )
                .then((response) => {
                    // Handle successful submission (ignoring errors as per requirements)
                    submitButton.textContent = "Submitted";
                    submitButton.disabled = true;
                    formSubmitted = true;
                    successMessage.style.display = "block";
                })
                .catch((error) => {
                    // Ignore errors as per requirements, but mark as submitted anyway
                    submitButton.textContent = "Submitted";
                    submitButton.disabled = true;
                    formSubmitted = true;
                });
        }
    });
})();

// Performance optimization: Load scripts after content is rendered
document.addEventListener("DOMContentLoaded", function () {
    // Content is already loaded, but we can add any additional scripts here
    // that aren't critical for initial rendering
});
