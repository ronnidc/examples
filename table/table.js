function showTableSwipeInfo() {

    const items = document.querySelectorAll(".table");
    const state = "show-swipe-info";

    // Loop through all tables on the page:
    for (var item of items) {
        const thisPage = document.querySelector(".table");
        const hasScrollbar = thisPage.scrollWidth > thisPage.offsetWidth;
        console.log("thisPage offsetWidth: " + thisPage.offsetWidth);
        console.log("thisPage scrollWidth: " + thisPage.scrollWidth);
        console.log("The table is wider than the page? " + hasScrollbar);

        item.addEventListener("touchstart", function () {
            this.classList.add(state); // (Animations are all handled in css).
            // Reset status after 60 seconds:
            setTimeout(_ => this.classList.remove(state), (60*1000));
        });
    }

}

showTableSwipeInfo();

// To Do: "restart" not working properly