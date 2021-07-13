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
const UImainSections = document.querySelectorAll('main section');
let prevSection = null;
let currentSection = {};

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

const generateSectionsArr = () => {
    let sectionsArr = [];
    const UIsections = document.querySelectorAll('main section');
    UIsections.forEach( (UIsection, index) => {
        sectionsArr.push({
            id: index,
            element: UIsection,
            positionData: UIsection.getBoundingClientRect(),
        });
    });
    return sectionsArr;
}

const getSiblings = (element) => {
    // for collecting siblings
    let siblings = [];
    // if no parent, return no sibling
    if (!element.parentElement) return siblings;
    // first child of the parent node
    let sibling = element.parentElement.firstElementChild;

    // collecting siblings
    while (sibling) {
        if (sibling !== element) siblings.push(sibling);
        sibling = sibling.nextElementSibling;
    }
    return siblings;
};

// scroll stop event helper function
function scrollStop(callback, refresh = 66) {

    // Make sure a valid callback was provided
    if (!callback || typeof callback !== 'function') return;

    // Setup scrolling variable
    let isScrolling;

    // Listen for scroll events
    window.addEventListener('scroll', function (event) {

        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling);

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(callback, refresh);

    }, false);
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// initial function that runs on page loading
const init = () => {
    // Build Navbar dynamically based on sections
    buildNav();
}

// build the nav

const buildNav = () => {
    const virtualDOM = document.createDocumentFragment();
    UImainSections.forEach((UImainSection) => {
        const sectionId = UImainSection.id;
        const sectionName = UImainSection.getAttribute('data-nav');
        const navItem = createNavItem(sectionId, sectionName);
        virtualDOM.appendChild(navItem);
    });
    UInavbarList.appendChild(virtualDOM);
}

const deactivateSection = UIprevSection => {
    UIprevSection.classList.remove('active');
}

const activateSection = section => {
    if (section.classList.contains('active')) return;
    section.classList.add('active');
}

const activateNavLink = navLink => {
    if (navLink.classList.contains('active')) return;
    navLink.classList.add('active');
}

const deactivateNavLink = navLink => {
    if (!navLink.classList.contains('active')) return;
    navLink.classList.remove('active');
}

// Add class 'active' to section when near top of viewport

const activateSectionOnScroll = () => {
    UImainSections.forEach((section) => {
        const sectionPostionData = section.getBoundingClientRect();
        const sectionViewTopOffset = Math.round(sectionPostionData.top);
        const sectionHeight = sectionPostionData.height;
        const sectionId = section.id;
        const relatedNavLink = document.querySelector(`[data-section=${sectionId}]`);
        console.log(relatedNavLink);
        if (sectionViewTopOffset >= -sectionHeight * 0.8 && sectionViewTopOffset <= sectionHeight * 0.2) {
            activateSection(section);
            activateNavLink(relatedNavLink);
        } else {
            deactivateSection(section);
            deactivateNavLink(relatedNavLink);
        }
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

document.addEventListener('DOMContentLoaded', init);

// Scroll to section on link click

UInavbarList.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('menu__link')) scrollToRelatedSection(e.target);
})

// Set sections as active

scrollStop(activateSectionOnScroll);

