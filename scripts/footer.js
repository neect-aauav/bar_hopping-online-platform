var footer = document.getElementsByTagName("footer")[0];

$(document).ready(function() {
    // update DB with the data from spreadsheet
    $.ajax({
        url: "fetch-from-sheets.php",
        type: "post",
        data: ""
    });
    
    if(window.innerWidth >= 430) {
        footer.style.padding="0px "+(window.innerWidth/4.3)+"px"; 
    }
    
    if(window.innerWidth < 430) {
        footer.style.padding="0";
    }
});

// resize margin on navbar-container
window.onresize = function() {
    if(window.innerWidth >= 430) {
        footer.style.padding="0px "+(window.innerWidth/4.3)+"px"; 
    }
    
   
    
    if(window.innerWidth < 430) {
        footer.style.padding="0";
    }
}