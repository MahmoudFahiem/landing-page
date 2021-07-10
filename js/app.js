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
        // TODO: Get section name for data nav
        const sectionName = UImainSection.querySelector('h2').textContent;
        const navItem = createNavItem(sectionId, sectionName);
        virtualDOM.appendChild(navItem);
    });
    UInavbarList.appendChild(virtualDOM);
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

document.addEventListener('DOMContentLoaded', buildNav);

// Scroll to section on link click

// Set sections as active


