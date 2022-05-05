function showSwipeInfo() {

    console.log('touched');
    document.querySelector('.table-component').classList.add("show-swipe-info");

    // Reset status after one minute
    setTimeout(function () {
        document.querySelector('.table-component').classList.remove("show-swipe-info");
    }, 60000);

}