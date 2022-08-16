function responsiveTable() {

    const items = document.querySelectorAll(".table");

    items.forEach(function (item) {

        const swipeInfoClass = "swipe-info";
        const stickyColumnClass = "sticky-column";
        const overflowClass = "no-overflow";

        function detector() {
            const parentWidth = item.offsetWidth;
            const tableWidth = item.scrollWidth;
            const overflowX = tableWidth > parentWidth;
            const leadingColumn = item.dataset.leadingcolumn;

            if (overflowX) {

                item.classList.add(overflowClass);

                if (leadingColumn) {
                    item.classList.add(stickyColumnClass);
                };

                item.addEventListener("touchstart", function () {
                    this.classList.add(swipeInfoClass);
                });

            } else if (!overflowX) {
                item.addEventListener("touchstart", function () { // this is stupid but necessary for now.
                    this.classList.remove(swipeInfoClass);
                });
                item.classList.remove(stickyColumnClass, overflowClass, swipeInfoClass);
            };
        }

        window.addEventListener("load", detector);
        window.addEventListener('resize', detector);

    });
}

responsiveTable();
