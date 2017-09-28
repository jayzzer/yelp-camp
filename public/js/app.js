var menuBtn = document.querySelector('.navbar-toggle');
menuBtn.onclick = function() {
    var collapsedMenu = document.querySelector(menuBtn.dataset.target);
    collapsedMenu.classList.toggle('collapse');
}