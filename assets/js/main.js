const btnGallery = document.querySelectorAll(".decoration__container .decoration__data a");
const galleryImg = document.querySelectorAll(".decoration__container .decoration__data img");
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
    if(document.body.classList.contains('dark-theme')){
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
        if(img.alt !== name){
            img.style.display='none'; 
        }else{ 
            cont++;
        }
        topic_title.innerHTML = galleryImg[id].alt;
            img.addEventListener("click", (e) => {
                fullImg.src = e.target.src;
                fullImgBox.style.top = (img.offsetTop-142)+'px';
                fullImgBox.style.display = "flex";
                document.documentElement.scrollTop = img.offsetTop-100;
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
    cont = setEventFullImg(name, cont, e.target.classList[2]);
    if(window.innerWidth <= 400){
        if(cont>2){
            galleryBox.style.top='70%';
        }else {
            galleryBox.style.top='70%'
        }
    }
    hideSections();
    timer = setTimeout(() =>{
        scrolltop.click()
    }, 600)
}

const hideLightbox = () => {
    images.forEach(img => {
        img.style.display='block';
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
    decoration.scrollIntoView({behavior: 'smooth'});
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

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))){
        email.value = '';
        createToast('error');
        return;
    } 

    var params = {
        from_name: email.value,
        email_id: email.value,
        message: bodyEmail.value
    }
    emailjs.send("default_service", "template_upwl3a9", params).then( function (res){
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
    if(toast.timeoutId) clearTimeout(toast.timeoutId);// Clearing the timeout for the toast
    setTimeout(() => toast.remove(), 500);// Remove the toast after 500ms
}

const createToast = (id) => {
    const { icon, text } = toastDetails[id];//Getting the icon and text for the toast based on the id passed
    const toast = document.createElement('li');
    toast.className = `toast ${id}`;// Setting the classes for the toast
    toast.innerHTML =    `<div class="column">
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

sendBtn.addEventListener("click", sendEmail)
spanClose.addEventListener('click', closeFullImg);
closeBtn.addEventListener("click", hideLightbox);
discountText.addEventListener("click", putTextDiscount);
accesoryText.addEventListener("click", putTextAccesory);