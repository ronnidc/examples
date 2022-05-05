function showTableSwipeInfo() {

    const items = document.querySelectorAll(".table-component");

    // Loop through table-components on the page:
    for (var item of items) {
        item.addEventListener("touchstart", function () {

            document.querySelector('.table-component').classList.add("show-swipe-info");
            // Animations are all handled in css.

            // Reset status after one minute:
            setTimeout(function () {
                document.querySelector('.table-component').classList.remove("show-swipe-info");
            }, 60000);

        });
    }

}

showTableSwipeInfo();
