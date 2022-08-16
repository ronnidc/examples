function responsiveTable() {

    const items = document.querySelectorAll(".table");

    items.forEach(function (item) {

        const clSwipeInfo = "show-swipe-info";
        const clStickyColumn = "table-sticky-column";

        function detector() {
            const parentWidth = item.offsetWidth;
            const tableWidth = item.scrollWidth;
            const overflowX = tableWidth > parentWidth;

            if (overflowX) {
                item.classList.add(clStickyColumn);
                item.addEventListener("touchstart", function () {
                    this.classList.add(clSwipeInfo);
                });
            } else if (!overflowX) {
                item.classList.remove(clStickyColumn);
            }
        }

        window.addEventListener("load", detector);
        window.addEventListener('resize', detector);

    });
}

responsiveTable();
