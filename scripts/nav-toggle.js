let menu_button = document.querySelector(".navbar-toggler");
let arrow_icon = document.querySelector(".navbar-toggler-icon");

menu_button.style.border = "none";

menu_button.addEventListener("click", () => {
    if (menu_button.getAttribute("aria-expanded") === "false") {
        arrow_icon.style.backgroundImage = "url(/images/carret-down.png)";
    } else {
        arrow_icon.style.backgroundImage = "url(/images/carret-up.png)";
        menu_button.style.border = "none";
    }
});
