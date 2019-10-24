var navbarCont = document.getElementById("navbar-container");
var navbarUl = document.getElementById("navbar-ul");
var navbarWrapper = document.getElementById("navbar-wrapper");
var navbarLeft = document.getElementById("navbar-left");
var navbarRight = document.getElementById("navbar-right");
var scrolled = false;

$(window).scroll(function() {
    if($(this).scrollTop() > 50 && $(this).scrollTop() < 100) {
        if (!scrolled) {
            navbarCont.style.boxShadow="0px 3px 10px -4px black";
            navbarUl.style.textAlign="center";
            navbarLeft.classList.add("hidden");
            navbarWrapper.style.marginTop="55px";
            setTimeout(function() {
            navbarWrapper.style.marginTop="0";}, 200);
            scrolled=true;
        }
    }
    if ($(this).scrollTop() < 50) {
        navbarCont.style.boxShadow="unset";
        navbarUl.style.textAlign="right";
        navbarLeft.classList.remove("hidden");
        scrolled=false;
    }
});

$(document).ready(function() {
    if(window.innerWidth > 480) {
        navbarCont.style.padding="0px "+(window.innerWidth/4.3)+"px";   
    }
    
    if(window.innerWidth < 590) {
        navbarCont.style.padding="0";    
    }
});

// resize margin on navbar-container
window.onresize = function() {
    if(window.innerWidth > 480) {
        navbarCont.style.padding="0px "+(window.innerWidth/4.3)+"px";   
    }
    
    if(window.innerWidth < 590) {
        navbarCont.style.padding="0";    
    }
}