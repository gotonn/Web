// відкриття/закриття відповідей
document.querySelectorAll('.toggle-menu').forEach(toggle => {
    toggle.addEventListener('click', function () {
        const questionCard = this.closest('.question-card');
        const openIcon = questionCard.querySelector('.open-icon');
        const closeIcon = questionCard.querySelector('.close-icon');
        const answer = questionCard.querySelector('.answer');

        openIcon.classList.toggle('d-none');
        closeIcon.classList.toggle('d-none');
        answer.classList.toggle('d-none');
    });
});

// Перемикання тарифних планів
function switchPlan(period) {
    const monthlyPrices = ['$9.99', '$12.99', '$14.99'];
    const yearlyPrices = ['$99.99', '$129.99', '$149.99'];
    
    const priceElements = document.querySelectorAll('.price');
    
    priceElements.forEach((priceElement, index) => {
        const kindElement = priceElement.querySelector('.kind');
        const newPrice = period === 'monthly' ? monthlyPrices[index] : yearlyPrices[index];
        
        const textNodes = Array.from(priceElement.childNodes);
        const textNode = textNodes.find(node => node.nodeType === 3);
        
        if (textNode) {
            textNode.textContent = newPrice;
        }
        
        kindElement.textContent = period === 'monthly' ? '/month' : '/year';
    });
    
    document.querySelectorAll('.text-plan').forEach(item => {
        item.classList.remove('highlighted');
    });
    
    document.querySelector(`[onclick="switchPlan('${period}')"]`).classList.add('highlighted');
}

// Бургер-меню
const burgerMenu = document.getElementById('burgerMenu');
const openBurgerIcon = document.getElementById('openIcon');
const closeBurgerIcon = document.getElementById('closeIcon');
const headerNav = document.getElementById('headerNav');

if (burgerMenu && openBurgerIcon && closeBurgerIcon && headerNav) {
    burgerMenu.addEventListener('click', () => {
        openBurgerIcon.classList.toggle('d-none');
        closeBurgerIcon.classList.toggle('d-none');
        headerNav.classList.toggle('header-nav__open');
    });
}

// Слайдер
const track = document.getElementById("sliderTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dots = document.querySelectorAll('.box-swipped div');
const highlightedSwipe = document.querySelector('.highlighted-swipe');

if (track && prevBtn && nextBtn) {
    let currentTranslate = 0;
    const cardWidth = 280;
    let visibleWidth = document.querySelector(".slider-container").offsetWidth;
    const totalDots = dots.length;

    function updateButtons() {
        const trackWidth = track.scrollWidth;
        const maxTranslate = visibleWidth - trackWidth;

        prevBtn.disabled = currentTranslate === 0;
        nextBtn.disabled = currentTranslate <= maxTranslate;

        prevBtn.style.opacity = currentTranslate === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentTranslate <= maxTranslate ? '0.5' : '1';

        updateSwipeIndicator();
    }

    function updateSwipeIndicator() {
        const trackWidth = track.scrollWidth;
        const maxTranslate = visibleWidth - trackWidth;
        const totalScrollRange = Math.abs(maxTranslate);

        if (totalScrollRange === 0) return;

        const scrollPosition = Math.abs(currentTranslate) / totalScrollRange;
        const activeIndex = Math.min(
            Math.floor(scrollPosition * totalDots),
            totalDots - 1
        );

        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('highlighted-swipe');
            } else {
                dot.classList.remove('highlighted-swipe');
            }
        });
    }

    nextBtn.addEventListener("click", () => {
        const trackWidth = track.scrollWidth;
        const maxTranslate = visibleWidth - trackWidth;

        if (currentTranslate > maxTranslate) {
            currentTranslate = Math.max(currentTranslate - cardWidth, maxTranslate);
            track.style.transform = `translateX(${currentTranslate}px)`;
            updateButtons();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentTranslate < 0) {
            currentTranslate = Math.min(currentTranslate + cardWidth, 0);
            track.style.transform = `translateX(${currentTranslate}px)`;
            updateButtons();
        }
    });

    window.addEventListener("resize", () => {
        visibleWidth = document.querySelector(".slider-container").offsetWidth;
        updateButtons();
    });

    window.addEventListener("load", updateButtons);
    track.addEventListener('scroll', updateButtons);
}
