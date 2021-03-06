/* Todo: 
1. Sticky first column needs to be optional if column 1 is no more leading than column 2, 3, etc. 
2. Height on scroll? If there is more content on the page, how will the table height be calculated.
    maybe the perfect height calculation should be set when the table reaches the top of the page? 
*/  
function responsiveTable() {
    const items = document.querySelectorAll(".table");

    function stickyColumn() {
        const thisItem = document.querySelector(".table"); // ToDo needs to be uniq for THIS table and not for all tables on the page
        const swipeInfo = "show-swipe-info";

        function newHeight() {
            const position = thisItem.getBoundingClientRect();
            const topDistance = position.top.toFixed();
            const viewportHeight = window.innerHeight;
            const perfectHeight = viewportHeight - topDistance;
            thisItem.style.height = perfectHeight + "px";
        }

        function detector() {
            const wrapperWidth = thisItem.offsetWidth;
            const tableWidth = thisItem.scrollWidth;
            const overflowX = tableWidth > wrapperWidth;

            if (overflowX) {
                newHeight();
                thisItem.classList.add('table-sticky-column');
                item.addEventListener("touchstart", function () {
                    this.classList.add(swipeInfo);
                });
            } else if (!overflowX) {
                thisItem.classList.remove('table-sticky-column');
                thisItem.style.height = null;
                item.classList.remove(swipeInfo);
                item.addEventListener("touchstart", function () { // ToDo: this listener should be unnecessary
                    this.classList.remove(swipeInfo);
                });
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
