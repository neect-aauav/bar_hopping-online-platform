// desafio final

// ESSUAr toda a noite!!
totalPontos[6] = totalPontos[6] + 50 + 50;
totalPontos[3] = totalPontos[3] + 50 + 50;
totalPontos[1] = totalPontos[1] + 50 + 0;
totalPontos[2] = totalPontos[2] + 0 + 0;
totalPontos[0] = totalPontos[0] + 50 + 50;
totalPontos[4] = totalPontos[4] + 0 + 0;
totalPontos[7] = totalPontos[7] + 50 + 50;
totalPontos[5] = totalPontos[5] + 50 + 50 + 25;
totalPontos[8] = totalPontos[8] + 50 + 0;

var arrowCont = document.getElementById("arrow-container");
var arrow = document.getElementById("arrow");
var arrowClicked=false;
var scrollDirection; // true if is up
var buttonLogo = document.getElementById("button-logo");

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

var counter=0;

$(window).scroll(function() {
    scrollDirection = this.oldScroll > this.scrollY;
    this.oldScroll = this.scrollY;
    
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
    
    if (!scrollDirection) {
        counter+=0.5;
    }
    
    else {
        counter-=0.5;
    }
    if ($(this).scrollTop()<5 && scrollDirection) {
         buttonLogo.style.filter="hue-rotate(0deg)";
         counter=0;
    }
    else {
        buttonLogo.style.filter="hue-rotate("+counter+"deg)";    
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
        
        var lugarP = document.createElement("p");
        rankLi.appendChild(lugarP);
        lugarP.classList.add("lugar");
        lugarP.innerHTML=t+1;
        
        var nomeEquipaWrapper = document.createElement("div");
        rankLi.appendChild(nomeEquipaWrapper);
        nomeEquipaWrapper.style.overflow="auto";
        
        if (t==0) {
            rankLi.id="first-place";
            nomeEquipaWrapper.style.height="40px";
        }
        else if (t==1) {
            rankLi.id="second-place";
            nomeEquipaWrapper.style.height="37px";
        }
        else if (t==2) {
            rankLi.id="third-place";
            nomeEquipaWrapper.style.height="35px";
        }
        else {
            nomeEquipaWrapper.style.height="30px";
        }
        
        var nomeEquipaP = document.createElement("a");
        nomeEquipaWrapper.appendChild(nomeEquipaP);
        
        //desqualificação
        if (equipasOrdered[t] == "O Belo e as monstras") {
            nomeEquipaP.style.color="red";
        }
        if (equipasOrdered[t] == "Food Eat") {
            nomeEquipaP.style.color="purple";
        }
        
        nomeEquipaP.innerHTML=equipasOrdered[t];
        nomeEquipaP.href="equipas#"+nameToLowerCase(equipasOrdered[t]);
        
        var pontosP = document.createElement("p");
        rankLi.appendChild(pontosP);
        pontosP.classList.add("pontos");
        pontosP.innerHTML=pontosOrdered[t]+" Pts";
        
        if (equipasOrdered[t] == "ESSUAr toda a noite!!" || equipasOrdered[t] == "Chifrons" || equipasOrdered[t] == "GRUA - Grupo de Rallys da Universidade de Aveiro" || equipasOrdered[t] == "Vamos ao Cão" || equipasOrdered[t] == "Food Eat") {
            var desafioFinalPts = document.createElement("p");
            rankLi.appendChild(desafioFinalPts);
            desafioFinalPts.style.fontSize="9px";
            desafioFinalPts.style.color="white";
            desafioFinalPts.innerHTML="Desafio final: 50 + 50";
        }
        else if (equipasOrdered[t] == "Drink++" || equipasOrdered[t] == "Bareiros com B de bota abaixo") {
            var desafioFinalPts = document.createElement("p");
            rankLi.appendChild(desafioFinalPts);
            desafioFinalPts.style.fontSize="9px";
            desafioFinalPts.style.color="white";
            desafioFinalPts.innerHTML="Desafio final: 0 + 0";
        }
        else if (equipasOrdered[t] == "Do it for the sinal" || equipasOrdered[t] == "O Belo e as monstras") {
            var desafioFinalPts = document.createElement("p");
            rankLi.appendChild(desafioFinalPts);
            desafioFinalPts.style.fontSize="9px";
            desafioFinalPts.style.color="white";
            desafioFinalPts.innerHTML="Desafio final: 50 + 0";
        }
    }
        
    var rankingWrapper = document.getElementById("ranking-wrapper");
    var infoAtEndOfRankingDesq = document.createElement("p");
    rankingWrapper.appendChild(infoAtEndOfRankingDesq);
    infoAtEndOfRankingDesq.style.color="red";
    infoAtEndOfRankingDesq.style.fontStyle="italic";
    infoAtEndOfRankingDesq.style.fontWeight="bold";
    infoAtEndOfRankingDesq.style.textAlign="right";
    infoAtEndOfRankingDesq.style.marginRight="25px";
    infoAtEndOfRankingDesq.style.marginLeft="25px";
    infoAtEndOfRankingDesq.style.fontSize="11px";
    infoAtEndOfRankingDesq.innerHTML="> Equipas com o nome a vermelho foram desqualificadas.";
    
    var infoAtEndOfRankingBestName = document.createElement("p");
    rankingWrapper.appendChild(infoAtEndOfRankingBestName);
    infoAtEndOfRankingBestName.style.color="purple";
    infoAtEndOfRankingBestName.style.fontStyle="italic";
    infoAtEndOfRankingBestName.style.fontWeight="bold";
    infoAtEndOfRankingBestName.style.textAlign="right";
    infoAtEndOfRankingBestName.style.marginRight="25px";
    infoAtEndOfRankingBestName.style.marginLeft="25px";
    infoAtEndOfRankingBestName.style.fontSize="11px";
    infoAtEndOfRankingBestName.innerHTML="> Equipa com o nome a roxo teve o nome mais original.";
    
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
    createRanks();
    
    if(window.innerWidth > 480) {
        navbarContainer.style.margin="0px "+(window.innerWidth/4.3)+"px";   
    }
    
    var elemsOfRankList = rankingList.querySelectorAll("li");
    if (elemsOfRankList.length == 0) {
        var div = document.createElement("div");
        rankingWrapper.appendChild(div);
        div.style.textAlign="center";
        div.style.marginTop="-50px";
        div.style.fontSize="17px";
        div.style.marginBottom="20px";
        var p = document.createElement("p");
        div.appendChild(p);
        p.innerHTML="Sem equipas";
    }
});

// resize margin on navbar-container
window.onresize = function() {
    if(window.innerWidth > 480) {
        navbarContainer.style.margin="0px "+(window.innerWidth/4.3)+"px";   
    }
}