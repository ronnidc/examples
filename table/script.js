function showSwipeInfo() {
    console.log('touched');
    setTimeout(function () {
        document.querySelector('.table-component').classList.add("show-swipe-info");
    }, 1000);
    setTimeout(function () {
        document.querySelector('.table-component').classList.remove("show-swipe-info");
    }, 3000);
}