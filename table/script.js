function showTableSwipeInfo() {

    const items = document.querySelectorAll(".table-component");
    const state = "show-swipe-info";

    // Loop through all table-components on the page:
    for (var item of items) {
        item.addEventListener("touchstart", function () {

            this.classList.add(state);
            // Animations are all handled in css.

            // Reset status after 60 seconds:
            setTimeout(_ => this.classList.remove(state), (60*1000));

        });
    }

}

showTableSwipeInfo();

// To Do: "restart" not working properly