const btnGallery = document.querySelectorAll(".decoration__container .decoration__data a");
const galleryImg = document.querySelectorAll(".decoration__container .decoration__data img");
const decorationContainer = document.querySelector(".decoration__container");
const galleryBox = document.querySelector(".gallery-box");
const lightbox = document.querySelector(".lightbox");
const closeBtn = lightbox.querySelector(".uil-times");
const fullImgBox = document.querySelector(".full-img");
const fullImg = document.querySelector(".full-img img");
const images = document.querySelectorAll(".img-gallery img");
const spanClose = document.querySelector(".full-img span");
const email = document.querySelector(".contact__direction input");
const bodyEmail = document.querySelector(".contact_textarea textarea");
const sendBtn = document.querySelector(".send_box a");
const notification = document.querySelector(".notifications");
const discountText = document.getElementById("discount");
const accesoryText = document.getElementById("accesory");
const topic_title = document.querySelector(".topic__title")

const scrolltop = document.querySelector(".scrolltop");
const lheader = document.querySelector(".l-header");
const home = document.querySelector(".home");
const budget = document.querySelector(".budget");
const contact = document.querySelector(".contact");
const footer = document.querySelector(".footer");
const sectionTitle = document.querySelector(".section-title");
const decoration__container = document.querySelector(".decoration__container");
const decoration = document.querySelector(".decoration");
const titles_decoration = document.querySelector(".decoration__title");
const divDec1Gallery = document.querySelector(".div-dec1-gallery");
const divDec2Gallery = document.querySelector(".div-dec2-gallery");
var timer = undefined;

const see_more = document.getElementById('see_more');
// CAROUSEL VARS

/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    // Validate that variables exist
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 200) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-toggle-right'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-toggle-left' : 'bx-toggle-right'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx-toggle-left' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
    sendBtn.style.backgroundColor = '#FFF';
    sendBtn.style.color = '#161212';
    if (document.body.classList.contains('dark-theme')) {
        sendBtn.style.backgroundColor = '#e7435c'
        sendBtn.style.color = '#FFF';
    }
})

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    distance: '30px',
    duration: 1800,
    reset: true,
});

sr.reveal(`.home__data, .home__img, 
        .decoration__data,
        .accessory__content,
        .footer__content`, {
    origin: 'top',
    interval: 200,
})

sr.reveal(`.share__img, .send__content`, {
    origin: 'left'
})

sr.reveal(`.share__data, .send__img`, {
    origin: 'right'
});

const setEventFullImg = (name, cont, id) => {
    images.forEach(img => {
        if (img.alt !== name) {
            img.style.display = 'none';
        } else {
            cont++;
        }
        topic_title.innerHTML = galleryImg[id].alt;
        img.addEventListener("click", (e) => {
            fullImg.src = e.target.src;
            fullImgBox.style.top = (img.offsetTop - 142) + 'px';
            fullImgBox.style.display = "flex";
            document.documentElement.scrollTop = img.offsetTop - 100;
            // document.body.style.overflow = "hidden";
        })
    })
    return cont;
}

const hideSections = () => {
    scrolltop.style.zIndex = '101';
    lheader.style.display = 'none';
    home.style.display = 'none';
    budget.style.display = 'none';
    contact.style.display = 'none';
    footer.style.display = 'none';
    sectionTitle.style.display = 'none';
    titles_decoration.style.display = 'none';
    lightbox.classList.add("show");
}

const openGallery = (e) => {
    var cont = 0;
    var name = e.target.id;
    decorationContainer.style.right = "-200px";
    cont = setEventFullImg(name, cont, e.target.classList[2]);
    hideSections();
    timer = setTimeout(() => {
        scrolltop.click()
    }, 600)
}

const hideLightbox = () => {
    decorationContainer.style.right = "auto";
    images.forEach(img => {
        img.style.display = 'block';
    })
    lightbox.classList.remove("show");
    lheader.style.display = 'block';
    home.style.display = 'block';
    budget.style.display = 'block';
    contact.style.display = 'block';
    footer.style.display = 'block';
    sectionTitle.style.display = 'block';
    titles_decoration.style.display = 'block';
    clearTimeout(timer);
    decoration.scrollIntoView({ behavior: 'smooth' });
}

const closeFullImg = () => {
    fullImgBox.style.display = "none";
    document.body.style.overflow = "auto";
}

btnGallery.forEach(a => {
    a.addEventListener("click", openGallery)
});

function sendEmail(e) {
    e.preventDefault();

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))) {
        email.value = '';
        createToast('error');
        return;
    }

    var params = {
        from_name: email.value,
        email_id: email.value,
        message: bodyEmail.value
    }
    emailjs.send("default_service", "template_upwl3a9", params).then(function (res) {
        createToast('success')
    }
    );

    email.value = '';
    bodyEmail.value = ''
    return true;
}

const toastDetails = {
    timer: 5000,
    success: {
        icon: "fa-solid fa-circle-check",
        text: "Success: Mensaje enviado."
    },
    error: {
        icon: "fa-solid fa-circle-xmark",
        text: "Error: Por favor ingresa un correo válido."
    },
}

const removeToast = (toast) => {
    toast.classList.add("hide");
    if (toast.timeoutId) clearTimeout(toast.timeoutId);// Clearing the timeout for the toast
    setTimeout(() => toast.remove(), 500);// Remove the toast after 500ms
}

const createToast = (id) => {
    const { icon, text } = toastDetails[id];//Getting the icon and text for the toast based on the id passed
    const toast = document.createElement('li');
    toast.className = `toast ${id}`;// Setting the classes for the toast
    toast.innerHTML = `<div class="column">
                                <i class="${icon}"></i>
                                <span>${text}</span>
                            </div>
                            <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`
    notification.appendChild(toast);//Append li to ul notification
    toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
}

const putTextDiscount = (text) => {
    bodyEmail.value = '';
    bodyEmail.value = 'Me gustaría saber más sobre los descuentos que aplican';
}
const putTextAccesory = (text) => {
    bodyEmail.value = '';
    bodyEmail.value = 'Me gustaría saber más sobre los descuentos que alquilan';
}

const carousel_container = document.querySelector('.carousel_container');
const carouselActive = (e) => {
    if (e.target.innerHTML === 'Ver más') {
        carousel_container.style.display = 'flex';
        e.target.innerHTML = 'Ver menos'

        const wrapper = document.querySelector('.wrapper');
        const carousel = document.querySelector('.carousel');
        const arrowBtns = document.querySelectorAll('.wrapper i');
        const firstCardWidth = carousel.querySelector(".card").offsetWidth;
        const carouselChildrens = [...carousel.children];
        
        let isDragging = false, startX, startScrollLeft, timeoutId;
        
        // Get the number of cards that can fit in the carousel at once
        let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

        carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
            carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
        });

        // Insert copies of the first few cards to beginning of carousel for infinite scrolling
        carouselChildrens.slice(0, cardPerView).forEach(card => {
            carousel.insertAdjacentHTML("beforeend", card.outerHTML);
        });

        // Add event listeners for arrow buttons to scroll the carousel left and right
        arrowBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
            })
        })

        const dragStart = (e) => {
            isDragging = true;
            carousel.classList.add("dragging");
            // Records the initial cursor and scroll position of the carousel
            startX = e.pageX;
            startScrollLeft = carousel.scrollLeft;
        }

        const dragging = (e) => {
            if (!isDragging) return; //if isDragging is false return from here
            // Updates the scroll position of the carousel based on the cursor movement
            carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
        }

        const dragStop = () => {
            isDragging = false;
            carousel.classList.remove("dragging");
        }

        const autoPlay = () => {
            // if(window.innerWidth < 800) return; // Return if window is smaller than 800
            // Autoplay the carousel after every 2500 ms
            timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
        }

        autoPlay();

        const infiniteScroll = () => {
            // If the carousel is at the beginning, scroll to the end
            if (carousel.scrollLeft === 0) {
                carousel.classList.add("no-transition");
                carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
                carousel.classList.remove("no-transition");
            } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
                carousel.classList.add("no-transition");
                // If the carousel is at the end, scroll to the beginning
                carousel.scrollLeft = carousel.offsetWidth;
                carousel.classList.remove("no-transition");
            }

            // Clear existing timeout & start autoplay if mouse is not hovering over carousel
            clearTimeout(timeoutId);
            if (!wrapper.matches(":hover")) autoPlay();
        }


        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("mousemove", dragging);
        document.addEventListener("mouseup", dragStop);
        carousel.addEventListener("scroll", infiniteScroll);
        wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
        wrapper.addEventListener("mouseleave", autoPlay);

        return;
    }
    carousel_container.style.display = 'none';
    e.target.innerHTML = 'Ver más'
}



sendBtn.addEventListener("click", sendEmail)
spanClose.addEventListener('click', closeFullImg);
closeBtn.addEventListener("click", hideLightbox);
discountText.addEventListener("click", putTextDiscount);
accesoryText.addEventListener("click", putTextAccesory);

// CAROUSEL ACTIONS
see_more.addEventListener('click', carouselActive);