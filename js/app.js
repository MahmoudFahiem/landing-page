/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const UInavbarList = document.querySelector('#navbar__list');
let sectionsOffsetTop = [];


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

const createNavItem = (navItemLink, navItemText) => {
    const navbarItem = document.createElement('li');
    navbarItem.innerHTML = `
        <a href="#" data-section="${navItemLink}" class="menu__link">${navItemText}</a>
    `;
    return navbarItem;
}

const getSectionsOffsetTop = () => {
    if (!sectionsOffsetTop.length) {
        const UIsections = document.querySelectorAll('main section');
        ;
        UIsections.forEach(UIsection => {
            sectionsOffsetTop.push({
                element: UIsection,
                offsetTop: UIsection.offsetTop
            });
        });
    }
    return sectionsOffsetTop;
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

const buildNav = () => {
    const virtualDOM = document.createDocumentFragment();
    const UImainSections = document.querySelectorAll("main section");
    UImainSections.forEach((UImainSection) => {
        const sectionId = UImainSection.id;
        const sectionName = UImainSection.getAttribute('data-nav');
        const navItem = createNavItem(sectionId, sectionName);
        virtualDOM.appendChild(navItem);
    });
    UInavbarList.appendChild(virtualDOM);
}

const deactivateAllSections = () => {
    const UIsections = document.querySelectorAll('main section');
    UIsections.forEach(UIsection => {
        UIsection.classList.remove('active');
    })
}

const activateScrolledSection = (section) => {
    if (section.classList.contains('active')) return;
    section.classList.add('active');
}

// Add class 'active' to section when near top of viewport

const activateSectionOnScroll = () => {
    const windowPosition = window.scrollY;
    const sectionsOffsetTop = getSectionsOffsetTop();
    sectionsOffsetTop.forEach( sectionObject => {
        const sectionTopOffset = sectionObject.offsetTop;
        const sectionHeight = sectionObject.element.offsetHeight;
        if (!((sectionTopOffset - sectionHeight*0.5) <= windowPosition)) return;
        deactivateAllSections();
        activateScrolledSection(sectionObject.element);
    })
}

// Scroll to anchor ID using scrollTO event

const scrollToRelatedSection = (clickedNavItem) => {
    const relatedSectionId = clickedNavItem.getAttribute('data-section');
    const relatedSection = document.querySelector(`#${relatedSectionId}`);
    relatedSection.scrollIntoView({
        behavior: 'smooth'
    });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

document.addEventListener('DOMContentLoaded', buildNav);

// Scroll to section on link click

UInavbarList.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('menu__link')) scrollToRelatedSection(e.target);
})

// Set sections as active

window.addEventListener('scroll', activateSectionOnScroll);

