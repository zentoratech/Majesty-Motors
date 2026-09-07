/* =========================================================
   MAJESTY MOTORS
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const backTop = document.getElementById("backTop");

    const filterButtons = document.querySelectorAll(".filter-btn");
    const carCards = document.querySelectorAll(".car-card");

    const searchForm = document.getElementById("searchForm");

    const pickupLocation = document.getElementById("pickupLocation");
    const pickupDate = document.getElementById("pickupDate");
    const returnDate = document.getElementById("returnDate");
    const vehicleType = document.getElementById("vehicleType");

    const bookingForm = document.getElementById("bookingForm");
    const bookingCar = document.getElementById("bookingCar");
    const bookingPickup = document.getElementById("bookingPickup");
    const bookingReturn = document.getElementById("bookingReturn");

    const faqQuestions = document.querySelectorAll(".faq-question");

    const navLinks = document.querySelectorAll(".nav-link");


    /* =====================================================
       DATE SETUP
    ===================================================== */

    const today = new Date();

    const todayString =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");


    if (pickupDate) {
        pickupDate.min = todayString;
    }

    if (returnDate) {
        returnDate.min = todayString;
    }

    if (bookingPickup) {
        bookingPickup.min = todayString;
    }

    if (bookingReturn) {
        bookingReturn.min = todayString;
    }


    /* =====================================================
       NAVBAR SCROLL
    ===================================================== */

    function handleNavbar() {

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", handleNavbar);

    handleNavbar();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            menuToggle.classList.toggle("active");
            navMenu.classList.toggle("open");

        });


        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                menuToggle.classList.remove("active");
                navMenu.classList.remove("open");

            });

        });

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                !document.querySelector(targetId)
            ) {
                return;
            }

            event.preventDefault();

            const target = document.querySelector(targetId);

            const navbarHeight = navbar
                ? navbar.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       FLEET FILTER
    ===================================================== */

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const filter = this.dataset.filter;

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            this.classList.add("active");


            carCards.forEach(function (card) {

                const category = card.dataset.category || "";

                if (
                    filter === "all" ||
                    category.includes(filter)
                ) {

                    card.classList.remove("hidden");

                } else {

                    card.classList.add("hidden");

                }

            });

        });

    });


    /* =====================================================
       BOOK NOW BUTTONS
    ===================================================== */

    const carBookButtons =
        document.querySelectorAll(".car-book-btn");


    carBookButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedCar = this.dataset.car;

            if (bookingCar) {
                bookingCar.value = selectedCar;
            }

            const bookingSection =
                document.getElementById("booking");

            if (bookingSection) {

                const navbarHeight =
                    navbar ? navbar.offsetHeight : 0;

                const position =
                    bookingSection.getBoundingClientRect().top +
                    window.pageYOffset -
                    navbarHeight;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });

            }

        });

    });


    /* =====================================================
       SEARCH FORM
    ===================================================== */

    if (searchForm) {

        searchForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const location =
                pickupLocation.value.trim();

            const start =
                pickupDate.value;

            const end =
                returnDate.value;

            const type =
                vehicleType.value;


            if (!location || !start || !end) {

                showToast(
                    "Please complete the pickup location and dates."
                );

                return;

            }


            if (end < start) {

                showToast(
                    "Return date cannot be before pickup date."
                );

                return;

            }


            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });


            const matchingFilter =
                document.querySelector(
                    `.filter-btn[data-filter="${type}"]`
                );


            if (matchingFilter) {

                matchingFilter.classList.add("active");

            } else {

                const allButton =
                    document.querySelector(
                        '.filter-btn[data-filter="all"]'
                    );

                if (allButton) {
                    allButton.classList.add("active");
                }

            }


            carCards.forEach(function (card) {

                const category =
                    card.dataset.category || "";

                if (
                    type === "all" ||
                    category.includes(type)
                ) {

                    card.classList.remove("hidden");

                } else {

                    card.classList.add("hidden");

                }

            });


            const fleetSection =
                document.getElementById("fleet");


            if (fleetSection) {

                const navbarHeight =
                    navbar ? navbar.offsetHeight : 0;

                const position =
                    fleetSection.getBoundingClientRect().top +
                    window.pageYOffset -
                    navbarHeight;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });

            }


            showToast(
                "Cars updated for your selected requirements."
            );

        });

    }


    /* =====================================================
       BOOKING DATE VALIDATION
    ===================================================== */

    function validateBookingDates() {

        if (
            bookingPickup &&
            bookingReturn &&
            bookingPickup.value &&
            bookingReturn.value
        ) {

            if (bookingReturn.value < bookingPickup.value) {

                bookingReturn.setCustomValidity(
                    "Return date cannot be before pickup date."
                );

            } else {

                bookingReturn.setCustomValidity("");

            }

        }

    }


    if (bookingPickup) {

        bookingPickup.addEventListener(
            "change",
            function () {

                if (bookingReturn) {

                    bookingReturn.min =
                        bookingPickup.value;

                }

                validateBookingDates();

            }
        );

    }


    if (bookingReturn) {

        bookingReturn.addEventListener(
            "change",
            validateBookingDates
        );

    }


    /* =====================================================
       BOOKING FORM
    ===================================================== */

    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                validateBookingDates();


                if (!bookingForm.checkValidity()) {

                    bookingForm.reportValidity();

                    return;

                }


                const name =
                    document.getElementById("name").value.trim();

                const phone =
                    document.getElementById("phone").value.trim();

                const email =
                    document.getElementById("email").value.trim();

                const car =
                    bookingCar.value;

                const pickup =
                    bookingPickup.value;

                const returning =
                    bookingReturn.value;

                const message =
                    document.getElementById("message").value.trim();


                const formattedPickup =
                    formatDate(pickup);

                const formattedReturn =
                    formatDate(returning);


                const whatsappMessage =
                    `*MAJESTY MOTORS - BOOKING REQUEST*%0A%0A` +

                    `*Name:* ${encodeURIComponent(name)}%0A` +

                    `*Phone:* ${encodeURIComponent(phone)}%0A` +

                    `*Email:* ${encodeURIComponent(email || "Not provided")}%0A` +

                    `*Vehicle:* ${encodeURIComponent(car)}%0A` +

                    `*Pickup Date:* ${encodeURIComponent(formattedPickup)}%0A` +

                    `*Return Date:* ${encodeURIComponent(formattedReturn)}%0A` +

                    `*Additional Details:* ${encodeURIComponent(message || "None")}`;


                /*
                    IMPORTANT:
                    Replace 923001234567 with the
                    real Majesty Motors WhatsApp number.
                */

                const whatsappNumber =
                    "923001234567";


                const whatsappURL =
                    `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;


                window.open(
                    whatsappURL,
                    "_blank"
                );


                showToast(
                    "Opening WhatsApp with your booking request..."
                );


                bookingForm.reset();

            }
        );

    }


    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const currentItem =
                this.closest(".faq-item");


            document
                .querySelectorAll(".faq-item.open")
                .forEach(function (item) {

                    if (item !== currentItem) {
                        item.classList.remove("open");
                    }

                });


            currentItem.classList.toggle("open");

        });

    });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    function handleBackTop() {

        if (!backTop) {
            return;
        }

        if (window.scrollY > 600) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        handleBackTop
    );


    if (backTop) {

        backTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       ACTIVE NAV LINK
    ===================================================== */

    const sections =
        document.querySelectorAll("main section[id]");


    function updateActiveNav() {

        let currentSection = "";


        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop -
                (navbar ? navbar.offsetHeight + 100 : 100);

            const sectionBottom =
                sectionTop + section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");


            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav
    );


    /* =====================================================
       DATE FORMATTER
    ===================================================== */

    function formatDate(dateString) {

        if (!dateString) {
            return "Not provided";
        }


        const date =
            new Date(dateString + "T00:00:00");


        return date.toLocaleDateString(
            "en-PK",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message) {

        let toast =
            document.querySelector(".toast");


        if (!toast) {

            toast =
                document.createElement("div");

            toast.className = "toast";

            document.body.appendChild(toast);

        }


        toast.textContent = message;

        toast.classList.add("show");


        clearTimeout(
            toast.hideTimer
        );


        toast.hideTimer =
            setTimeout(function () {

                toast.classList.remove("show");

            }, 3500);

    }


    /* =====================================================
       INITIAL
    ===================================================== */

    handleBackTop();
    updateActiveNav();

});