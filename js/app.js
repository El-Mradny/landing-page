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

const allSections = document.querySelectorAll("section>div>h2");
let sectionIds = [];
let navList = document.querySelector("#navbar__list");
let newNode = document.createDocumentFragment();
let scrollFlag = null;
let navBar =  document.querySelector('.navbar__menu');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
let format = (item) =>{
    return item.replace(' ', '').toLowerCase()
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const initiate = () => {
    allSections.forEach((item)=> {
        sectionIds.push(format(item.innerHTML));
        let newItemNav = document.createElement("li");
        newItemNav.innerHTML = "<a class='menu__link'>"+item.innerHTML+"</a>";
        newItemNav.addEventListener('click', () => showSection(format(item.innerHTML)));
        newNode.appendChild(newItemNav);
        newItemNav.setAttribute("id", format(item.innerHTML)+"-nav");
    });
    navList.appendChild(newNode)
}


// Add class 'active' to section when near top of viewport
// Scroll to anchor ID using scrollTO event
// check which element are shown in screen

const checkActive = () =>{
    navBar.style.display="block";
    if (scrollFlag !== null) {
        clearTimeout(scrollFlag)
        for (let i = 0 ; i < sectionIds.length; i++){
            let sectionItem = document.getElementById(sectionIds[i]);
            sectionItem.setAttribute("class", '');
            showInViewport(sectionItem , sectionIds[i] );
        }
    }
    scrollFlag = setTimeout(() => {
        navBar.style.display="none";
    }, 1500);
}


// Modify active section and nav bar after checking Viewport.

let showInViewport = (tagElement, navElementClass) =>{
    const rect = tagElement.getBoundingClientRect();
    const navElement = document.querySelector(`#${navElementClass}-nav`);
    
    if  (
        rect.top >= -14 &&
        rect.top <= 750
    ){
        tagElement.setAttribute("class", "active");
        tagElement.style.scrollBehavior= 'smooth';
        navElement.style.backgroundColor = "#333";
    }else {
        navElement.style.backgroundColor = "";
    }
    
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu


// Scroll to section on link click
const showSection = (sectionName) =>{
    document.getElementById(sectionName).scrollIntoView(true);
}

// Set sections as active



initiate();
window.addEventListener('scroll', checkActive);








