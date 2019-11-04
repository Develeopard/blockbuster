//variable for moving background
let bgPattern = document.querySelector('#bg');

//constants for menu
const menu = document.querySelector('.menu');
const hamburger = document.querySelector('.hamburger');
const ham = document.querySelector('.ham');

//constants for header class toggle
const header = document.querySelector('header');
const ghostDiv = document.querySelector('.ghost-div');

//constants for hero slider
const slides = document.querySelectorAll('.slide');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const auto = true;
const intervalTime = 5000;
let slideInterval;

//MENU TOGGLE CODE
hamburger.addEventListener('click', () => {
    menu.classList.toggle('menu-open');
    ham.classList.toggle('exex');
    // document.body.classList.toggle('jammed');
})


//BACKGROUND MOVE CODE
window.addEventListener('scroll', function(){
    bgPattern.style.backgroundPosition = +window.pageYOffset+"px";
});

//HEADER TOGGLE CODE
const ghostDivOptions = {
    rootMargin: '0% 0% 0% 0%'
};

const ghostDivObserver = new IntersectionObserver(function(entries, ghostDivObserver) {
    entries.forEach(entry => {
        if(!entry.isIntersecting){
           header.classList.add('header-scrolled');
        }
       else{
           header.classList.remove('header-scrolled');
        }
    });
},
ghostDivOptions);

ghostDivObserver.observe(ghostDiv);

// SLIDER CODE
const nextSlide = () =>{
    // Get current class
    const current = document.querySelector('.current');
    // Remove current class
    current.classList.remove('current')
    // Check for next slide
    if(current.nextElementSibling){
        // Add current to next sibling
        current.nextElementSibling.classList.add('current');
    }else{
        // Add current to start
        slides[0].classList.add('current');
    }
    setTimeout(() => current.classList.remove('current'));
}

const prevSlide = () =>{
    // Get current class
    const current = document.querySelector('.current');
    // Remove current class
    current.classList.remove('current')
    // Check for prev slide
    if(current.previousElementSibling){
        // Add current to prev sibling
        current.previousElementSibling.classList.add('current');
    }else{
        // Add current to last
        slides[slides.length - 1].classList.add('current');
    }
    setTimeout(() => current.classList.remove('current'));
}

//Button events
next.addEventListener('click', e => {
    nextSlide();
    if(auto){
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }
});

prev.addEventListener('click', e => {
    prevSlide();
    if(auto){
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }
});

// Auto slide
if(auto){
    // Run next slide at interval time
    slideInterval = setInterval(nextSlide, intervalTime);
}

// Glide --
new Glide('.glide', {
    type: 'carousel',
    perView: 3,
    autoplay: 2000,
    gap: 20,
    breakpoints: {
        760: {
            perView: 2,

            peek: {
                before: 0,
                after: 0
            }
        },

        580: {
            perView: 1,

            peek: {
                before: 0,
                after: 0
            }
        }

    },
    peek: {
        before: 30,
        after: 30
    }
}).mount();