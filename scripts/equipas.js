var listaEquipasUl = document.getElementById("lista-equipas-ul");
var equipasLista = document.getElementById("equipas-lista");
var scrolledPage=false;
var navbar = document.getElementById("navbar-container");
var clickedEquipa;
var clickedToHide=false;
var isAtPosition=false;
var scrollDirection; //true if is up
var equipasListaArrowsWrapper = document.getElementById("equipas-lista-arrows-wrapper");

// hide entire navbar
listaEquipasUl.addEventListener('click', hideDivs, false);

function hideDivs(e) {
    if (e.target !== e.currentTarget) {
        equipasListaArrowsWrapper.classList.add("hidden");
        if (e.target.nodeName == "li") {
            var aTag = e.target.querySelectorAll("a");
            clickedEquipa=aTag[0].innerHTML;
        }
        else {
            var aTag = e.target;
            clickedEquipa=aTag.innerHTML;
        }
        console.log(e.target);
        console.log(aTag);
        console.log(clickedEquipa);
        navbar.classList.add("hidden");
        this.classList.add("hidden");
    }
    clickedToHide=true;
}


// info from DB
var equipas = equipasArray;
var cursos = cursoArray;
var pontos = pontosArray;
var membros = [];

// get membros array
for (var i=0; i<membrosArray.length; i++) {
    var memb = membrosArray[i].split("/");
    membros.push(memb);
}

var postosOrdem = [];

// get ordem array
for (var i=0; i<ordemArray.length; i++) {
    var ordem = ordemArray[i].split(".");
    postosOrdem.push(ordem);
}

var postosVisitados = postosArray;

var gregar = [];

// get all gregar
for (var i=0; i<gregarArray.length; i++) {
    var g=0;
    for (var j=0; j<gregarArray[i].length; j++) {
        g+=parseInt(gregarArray[i][j]);
    }
    gregar.push(g);
}

var extra = [];

// get all extras
for (var i=0; i<extraArray.length; i++) {
    var g=0;
    for (var j=0; j<extraArray[i].length; j++) {
        g+=parseInt(extraArray[i][j]);
    }
    extra.push(g);
}

var ovo = [true, true, false, true, false];

console.log(equipas);
console.log(postosOrdem);
console.log(cursos);
console.log(membros);
console.log(pontos);
console.log(postosVisitados);
console.log(gregar);
console.log(extra);

window.onscroll = function(e) {
    equipasListaArrowsWrapper.classList.remove("hidden");
    scrollDirection = this.oldScroll > this.scrollY;
    this.oldScroll = this.scrollY;
    if (clickedToHide) {
        var divId = nameToLowerCase(clickedEquipa);
        var divElem = document.getElementById(divId);
        var distanceFromTop = divElem.offsetTop;

        if($(this).scrollTop() < distanceFromTop+5 && $(this).scrollTop() > distanceFromTop-5) {
            isAtPosition=false;
            console.log(isAtPosition);
        }
        
        if (scrollDirection) {
            isAtPosition=true;
        }
        
        if($(this).scrollTop() > distanceFromTop+25) {
            navbar.classList.remove("hidden");
            listaEquipasUl.classList.remove("hidden");   
            clickedToHide=false;
        }
        if (isAtPosition) {
            navbar.classList.remove("hidden");
            listaEquipasUl.classList.remove("hidden");
            isAtPosition=false;
        }
    }
    
    if($(this).scrollTop() > 50) {
        if (!scrolledPage) {
            equipasLista.classList.add("equipas-lista-fixed");
            setTimeout(function() {
                equipasLista.style.left="0";
            }, 50);
            listaEquipasUl.style.margin="0";
            equipasListaArrowsWrapper.style.top="31px";
            scrolledPage=true;
        }
    }
    else {
        equipasLista.classList.remove("equipas-lista-fixed");
        equipasLista.style.left="1000px";
        listaEquipasUl.style.marginBottom="10";
        equipasListaArrowsWrapper.style.top="200px";
        scrolledPage=false;
    }
}

// criação da lista de equipas

var lEquiLi;
var lEquiA;

for (var i=0; i<equipas.length; i++) {
    lEquiLi = document.createElement("li");
    lEquiA = document.createElement("a");
    var equipaId = nameToLowerCase(equipas[i]);
    listaEquipasUl.appendChild(lEquiLi);
    lEquiLi.appendChild(lEquiA);
    lEquiA.href="#"+equipaId;
    lEquiA.innerHTML=equipas[i];
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

// criação de blocos de equipas

var contentCont = document.getElementById("content-container");
var equipaWrapper, titleUl, membrosUl, postosUl, statsUl;

for (var i=0; i<equipas.length; i++) {
    equipaWrapper = document.createElement("div");
    contentCont.appendChild(equipaWrapper);
    equipaWrapper.classList.add("equipa-wrapper");
    equipaWrapper.id=nameToLowerCase(equipas[i]);
    
    titleUl = document.createElement("ul");
    equipaWrapper.appendChild(titleUl);
    titleUl.classList.add("title");
    var equipaNome = document.createElement("li");
    titleUl.appendChild(equipaNome);
    equipaNome.classList.add("nome-equipa");
    equipaNome.innerHTML=equipas[i];
    var curso = document.createElement("li");
    titleUl.appendChild(curso);
    curso.classList.add("curso");
    curso.innerHTML=cursos[i];
    var pontosEl = document.createElement("li");
    titleUl.appendChild(pontosEl);
    pontosEl.classList.add("pontos");
    pontosEl.innerHTML=pontos[i]+" pts";
    
    membrosUl = document.createElement("ul");
    equipaWrapper.appendChild(membrosUl);
    membrosUl.classList.add("membros");
    for (var m=0; m<membros[i].length; m++) {
        var membrosLi = document.createElement("li");
        membrosUl.appendChild(membrosLi);
        membrosLi.classList.add("nome-membro");
        membrosLi.innerHTML=membros[i][m];
    }
    
    postosUl = document.createElement("ul");
    equipaWrapper.appendChild(postosUl);
    postosUl.classList.add("postos");
    var postosLabel = document.createElement("p");
    postosUl.appendChild(postosLabel);
    postosLabel.innerHTML="Postos";
    var postoLi;
    for (var p=0; p<postosOrdem[i].length; p++) {
        console.log("pO[i] = "+postosOrdem[i]);
        postoLi = document.createElement("li");
        postosUl.appendChild(postoLi);
        for (var v=0; v<postosVisitados[i].length; v++) {
            if (postosOrdem[i][p] == postosVisitados[i][v]) {
                postoLi.classList.add("visitado");
            }
        }
        var postoP = document.createElement("p");
        postoLi.appendChild(postoP);
        postoP.innerHTML=postosOrdem[i][p];
        postoP.classList.add("centered-content");
    }
    
    statsUl = document.createElement("ul");
    equipaWrapper.appendChild(statsUl);
    statsUl.classList.add("estatisticas");
    var gregarLi = document.createElement("li");
    statsUl.appendChild(gregarLi);
    gregarLi.innerHTML="Gregaram: "+gregar[i]+ ((parseInt(gregar[i]) == 1) ? " vez" : " vezes");
    var extrasLi = document.createElement("li");
    statsUl.appendChild(extrasLi);
    extrasLi.innerHTML="Bebidas extra: "+extra[i];
    var ovoLi = document.createElement("li");
    statsUl.appendChild(ovoLi);
    ovoLi.style.textAlign="right";
    if (ovo[i]) {
        ovoLi.innerHTML="Ainda têm o ovo!";
        ovoLi.style.color="green";
    }
    else {
        ovoLi.innerHTML="Já não têm o ovo!"
        ovoLi.style.color="red";
    }
}

var contentCont = document.getElementById("content-container");

$(document).ready(function() {
    if(window.innerWidth > 480) {
        contentCont.style.margin="0px "+(window.innerWidth/4.3)+"px";
        contentCont.style.marginTop="170px";
    }
});

// resize margin on navbar-container
window.onresize = function() {
    if(window.innerWidth > 480) {
        contentCont.style.margin="0px "+(window.innerWidth/4.3)+"px";
        contentCont.style.marginTop="170px";
    }
}
