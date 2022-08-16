function responsiveTable() {

    const items = document.querySelectorAll(".table");

    const swipeInfoClass = "swipe-info";
    const stickyHeaderClass = "sticky-header";
    const stickyColumnClass = "sticky-column";
    const overflowClass = "no-overflow";

    items.forEach(function (item) {

        function detector() {
            const parentWidth = item.offsetWidth;
            const tableWidth = item.scrollWidth;
            const overflowX = tableWidth > parentWidth;
            const stickyHeader = item.dataset.stickyheader;
            const stickyColumn = item.dataset.stickycolumn;

            if (stickyHeader) {
                item.classList.add(stickyHeaderClass);
            };

            if (overflowX) {

                item.classList.add(overflowClass);

                if (stickyColumn) {
                    item.classList.add(stickyColumnClass);
                };

                item.addEventListener("touchstart", function () {
                    this.classList.add(swipeInfoClass);
                });

            } else if (!overflowX) {
                item.classList.remove(stickyColumnClass, overflowClass, swipeInfoClass);
            };
        }

        window.addEventListener("load", detector);
        window.addEventListener('resize', detector);

    });
}

responsiveTable();
