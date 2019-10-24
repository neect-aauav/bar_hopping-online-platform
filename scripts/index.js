var arrowCont = document.getElementById("arrow-container");
var arrow = document.getElementById("arrow");
var arrowClicked=false;

arrowCont.addEventListener("click", function() {
    if (!arrowClicked) {
        window.scrollTo(0, 560);
        arrow.classList.add("up");
        arrow.classList.remove("down");  
        arrowClicked=true;
    }
    else {
        window.scrollTo(0, 0);
        arrow.classList.add("down");
        arrow.classList.remove("up");  
        arrowClicked=false;
    }
});

$(window).scroll(function() {
    if($(this).scrollTop()>400) {
        arrow.classList.add("up");
        arrow.classList.remove("down");
        arrowCont.addEventListener("click", function() {
            window.scrollTo(0, 0);
        });
    }
    else {
        arrow.classList.add("down");
        arrow.classList.remove("up"); 
        arrowCont.addEventListener("click", function() {
            window.scrollTo(0, 560);
        });
    }
});

var rankingList = document.getElementById("ranking-list");

function blurDiv() {
    rankingList = document.getElementById("ranking-list");
    console.log("here");
    rankingList.style.filter="blur(8px)";
} 

function loadContent() {
    console.log("loaded");
    $( "#ranking-container" ).load("index.php #ranking-wrapper");
    rankingList.style.filter="blur(0)";  
}

//setInterval(blurDiv, 5000);
    
//setInterval(loadContent, 5500); 

console.log(equipasArray);
console.log(cursoArray);
console.log(totalPontos);

// create rankings

function createRanks() {
    var equipas = equipasArray;
    var pontos = totalPontos;
    
    var swapp;
    var n = pontos.length-1;
    var x=pontos;
    var y=equipas;
    do {
        swapp = false;
        for (var i=0; i < n; i++)
        {
            if (x[i] < x[i+1])
            {
               var temp = x[i];
               x[i] = x[i+1];
               x[i+1] = temp;
               
               var temp2 = y[i];
               y[i] = y[i+1];
               y[i+1] = temp2;
               
              swapp = true;
            }
        }
        n--;
    } while (swapp);
    
    var pontosOrdered = x;
    var equipasOrdered = y;
    
    for (var t=0; t<equipasOrdered.length; t++) {
        var rankLi = document.createElement("li");
        rankingList.appendChild(rankLi);
        
        if (t===0) {rankLi.id="first-place";}
        if (t===1) {rankLi.id="second-place";}
        if (t===2) {rankLi.id="third-place";}
        
        var lugarP = document.createElement("p");
        rankLi.appendChild(lugarP);
        lugarP.classList.add("lugar");
        lugarP.innerHTML=t+1;
        
        var nomeEquipaP = document.createElement("a");
        rankLi.appendChild(nomeEquipaP);
        nomeEquipaP.innerHTML=equipasOrdered[t];
        nomeEquipaP.href="equipas#"+nameToLowerCase(equipasOrdered[t]);
        
        var pontosP = document.createElement("p");
        rankLi.appendChild(pontosP);
        pontosP.classList.add("pontos");
        pontosP.innerHTML=pontosOrdered[t];
    }
    
    function nameToLowerCase(name) {
        var finalS = "";
        for (var i=0; i<name.length; i++) {
            var char = name.charAt(i);
            if (char == char.toUpperCase()) {
                finalS+=char.toLowerCase();
            }
            else {
                finalS+=char;
            }
        }
        return finalS;
    }   
}

var navbarContainer = document.getElementsByClassName("navbar-container")[0];

$(document).ready(function() {
    if(window.innerWidth > 480) {
        navbarContainer.style.margin="0px "+(window.innerWidth/4.3)+"px";   
    }
    createRanks();
});

// resize margin on navbar-container
window.onresize = function() {
    if(window.innerWidth > 480) {
        navbarContainer.style.margin="0px "+(window.innerWidth/4.3)+"px";   
    }
}