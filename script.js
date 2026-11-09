
// ======================================
// BIMBEL DOKTOR NANDA
// JAVASCRIPT INTERAKTIF
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    
// ==================================
// MOBILE NAVBAR / HAMBURGER
// ==================================

const menuToggle = document.getElementById("menu-toggle");
const mobileNavLinks = document.getElementById("nav-links");

if (menuToggle && mobileNavLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = mobileNavLinks.classList.toggle("show");

        menuToggle.classList.toggle("open", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });

    // Tutup menu setelah diklik
    mobileNavLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileNavLinks.classList.remove("show");
            menuToggle.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

    // Tutup menu dengan tombol Escape
    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            mobileNavLinks.classList.remove("show");
            menuToggle.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

        }

    });

}


    // 1. SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // 2. ANIMASI MUNCUL SAAT SCROLL
    const revealElements = document.querySelectorAll(
        "section, .program-card, .feature-card, .gallery-list img, .peta-box, .kontak-box"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {
        revealElements.forEach(element => {
            element.classList.add("active");
        });
    }


    // 3. NAVBAR AKTIF
    const navLinks = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("section[id]");

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === "#" + entry.target.id
                    );
                });
            }
        });
    }, {
        rootMargin: "-25% 0px -65% 0px"
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    // 4. LIGHTBOX GALERI
    const galleryImages = document.querySelectorAll(".gallery-list img");

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";

    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Tutup">&times;</button>
        <img src="" alt="Foto galeri diperbesar">
        <p class="lightbox-caption"></p>
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector("img");
    const lightboxCaption = lightbox.querySelector(".lightbox-caption");
    const closeButton = lightbox.querySelector(".lightbox-close");

    function closeLightbox() {
        lightbox.classList.remove("show");
        document.body.classList.remove("lightbox-open");
    }

    galleryImages.forEach(image => {

        image.style.cursor = "zoom-in";

        image.addEventListener("click", () => {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightboxCaption.textContent = image.alt;

            lightbox.classList.add("show");
            document.body.classList.add("lightbox-open");
        });

    });

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });


    // 5. TOMBOL KEMBALI KE ATAS
    const backToTop = document.createElement("button");

    backToTop.className = "back-to-top";
    backToTop.innerHTML = "&#8593;";
    backToTop.setAttribute("aria-label", "Kembali ke atas");

    document.body.appendChild(backToTop);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    }, { passive: true });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // 6. ANIMASI KARTU
    document.querySelectorAll(
        ".program-card, .feature-card"
    ).forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("card-hover");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("card-hover");
        });

    });


    console.log("Bimbel Doktor Nanda berhasil dimuat!");

});
