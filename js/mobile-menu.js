const menuBurgerBtn = document.getElementById("menu-burger-btn");
const mobileNav = document.getElementById("mobile-nav");
const firstMobileLink = mobileNav.querySelector("a");


function toggleMenu() {
    const isOpen = mobileNav.classList.contains("show-menu");

   if (isOpen) {
        mobileNav.classList.remove("show-menu");
        menuBurgerBtn.setAttribute("aria-expanded", "false");
        menuBurgerBtn.focus(); // fokus tillbaka
    } else {
        mobileNav.classList.add("show-menu");
        menuBurgerBtn.setAttribute("aria-expanded", "true");
        firstMobileLink.focus(); // 👈 VIKTIG
    }
}

menuBurgerBtn.addEventListener("click", toggleMenu);

const mobileListItems = document.querySelectorAll(".mobile-list-item");

mobileListItems.forEach(element => {

    element.addEventListener("click", toggleMenu);
});