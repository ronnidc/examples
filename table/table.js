function responsiveTable() {
    const items = document.querySelectorAll(".table");

    function stickyColumn() {
        const thisItem = document.querySelector(".table"); // ToDo needs to be uniq for THIS table and not for all tables on the page
        const swipeInfo = "show-swipe-info";

        function detector() {
            const hasScrollbar = thisItem.scrollWidth > thisItem.offsetWidth;
            console.log("Viewport width: " + thisItem.offsetWidth);
            console.log("Table width: " + thisItem.scrollWidth);
            console.log("The table is wider than the page? " + hasScrollbar);

            if (hasScrollbar) {
                thisItem.classList.add('table-sticky-column');
                item.addEventListener("touchstart", function () {
                    this.classList.add(swipeInfo);
                });
            } else if (!hasScrollbar) {
                thisItem.classList.remove('table-sticky-column');
                item.classList.remove(swipeInfo);
                item.addEventListener("touchstart", function () { // ToDo: this listener should be unnecessary
                    this.classList.remove(swipeInfo);
                });
            }
        }
        detector();
        window.addEventListener('resize', detector);
    }

    // Loop through all tables on the page:
    for (var item of items) {
        stickyColumn();
    }

}

responsiveTable();
