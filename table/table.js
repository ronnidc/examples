/* Todo: 
    1. Sticky first column needs to be optional if column 1 is no more leading than column 2, 3, etc.
    2. Refactor this code. Maybe too many functions / wrappers. 
*/  
function responsiveTable() {
    const items = document.querySelectorAll(".table");

    function stickyColumn() {
        const elThisItem = document.querySelector(".table"); // ToDo needs to be uniq for THIS table and not for all tables on the page
        const clSwipeInfo = "show-swipe-info";
        const clStickyColumn = "table-sticky-column";

        function newHeight() {
            const idealHeight = visualViewport.height * 0.6;
            elThisItem.style.height = idealHeight + "px";
        }

        function detector() {
            const wrapperWidth = elThisItem.offsetWidth;
            const tableWidth = elThisItem.scrollWidth;
            const overflowX = tableWidth > wrapperWidth;

            if (overflowX) {
                newHeight();
                elThisItem.classList.add(clStickyColumn);
                item.addEventListener("touchstart", function () {
                    this.classList.add(clSwipeInfo);
                });
            } else if (!overflowX) {
                elThisItem.classList.remove(clStickyColumn);
                elThisItem.style.height = null;
            }
        }

        window.addEventListener("load", detector);
        window.addEventListener('resize', detector);
    }

    // Loop through all tables on the page:
    for (var item of items) {
        stickyColumn();
    }
}

responsiveTable();
