function responsiveTable() {

    const items = document.querySelectorAll(".table");
    const state = "show-swipe-info";

    function swipeInfo() {
        item.addEventListener("touchstart", function () {
            this.classList.add(state); // (Animation is handled in css).
        });
    }

    function stickyColumn() {
        const thisItem = document.querySelector(".table"); // ToDo needs to be uniq for this table and not for all tables on the page
        const hasScrollbar = thisItem.scrollWidth > thisItem.offsetWidth;
        console.log("thisItem offsetWidth: " + thisItem.offsetWidth);
        console.log("thisItem scrollWidth: " + thisItem.scrollWidth);
        console.log("The table is wider than the page? " + hasScrollbar);

        if (hasScrollbar) {
            console.log("the table is wider than the page")
            thisItem.classList.add('table-sticky-column');
            swipeInfo();
        }
    }

    // Loop through all tables on the page:
    for (var item of items) {
        stickyColumn();
    }

}

responsiveTable();
