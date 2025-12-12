const menuBurgerBtn = document.getElementById("menu-burger-btn");

const mobileNav = document.getElementById("mobile-nav");


function toggleMenu() {
    if (mobileNav.classList.contains("show-menu")) {
        mobileNav.classList.remove("show-menu");
    } else {
        mobileNav.classList.add("show-menu");
    }
}

menuBurgerBtn.addEventListener("click", toggleMenu);

const mobileListItems = document.querySelectorAll(".mobile-list-item");

mobileListItems.forEach(element => {

    element.addEventListener("click", toggleMenu);
});