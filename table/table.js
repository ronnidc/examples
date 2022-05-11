function responsiveTable() {

    const items = document.querySelectorAll(".table");
    const state = "show-swipe-info";

    // Loop through all tables on the page:
    for (var item of items) {
        const thisItem = document.querySelector(".table"); // ToDo needs to be uniq for this table and not for all tables on the page
        const hasScrollbar = thisItem.scrollWidth > thisItem.offsetWidth;
        console.log("thisItem offsetWidth: " + thisItem.offsetWidth);
        console.log("thisItem scrollWidth: " + thisItem.scrollWidth);
        console.log("The table is wider than the page? " + hasScrollbar);

        if (thisItem.scrollWidth > thisItem.offsetWidth) {
            console.log("the table is wider than the page")
            thisItem.classList.add('table-sticky-column');
        }

        // ToDo wrap in if column class..
        item.addEventListener("touchstart", function () {
            this.classList.add(state); // (Animations are all handled in css).
        });
    }

}

responsiveTable();
