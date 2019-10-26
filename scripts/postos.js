var listaPostos = document.getElementById("lista-postos");
var contentCont = document.getElementById("content-container");
var postoInfo;
var bottomText = document.getElementById("bottom-text");
var postoTitle;

var info = [["Aristides", "Autocarro Bar", "Macaca", "McDonald's", "I <3 Aveiro", "Ciência Viva"], ["Anis", "Gin", "Beirão", "Vodka", "Triple sec", "Anis"], ["Na Caixa", "Passar a bola", "Sentados no ar", "Mimisutra", "Palavras por chamada", "Roda e acerta na lata"], ["Todos temos pavor ao desconhecido, não é verdade? Bem, neste desafio, tu e a tua equipa vão ter de superar isso e meter a mão numa caixa e adivinhar o que está contido. Cada elemento tem 1 minuto para adivinhar.", "Em equipa, têm de transportar uma bola com uma colher, e fazê-la passar por todos os membros para assim completar o desafio com sucesso.", "Põe-te de joelhos, e deita-te nos joelhos da outra pessoa, e sempre assim.", "Imitar uma posição dita.", "O quão bom é receber uma chamada daquele amigo bêbedo às tantas da madrugada! Prepara-te que hoje, tu e a tua equipa são os bêbedos, e um de vocês vai ter de ligar a um número dos contactos e falar usando as seguintes palavras: capivara, pau, bidé, gastrocnémio, sunga, arroz de tomate, papaia, marmelo, chupar, piaçába, mexilhão, (imitar uma tartaruga a ter um orgasmo), bolas, Goucha, rally.", "Roda dez vezes sobre ti mesmo e atira uma bola contra uma torre de latas. Se as derrubares todas vences o desafio."], ["https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1470.9012802442785!2d-8.655161356803358!3d40.62979658118965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd23a2a9585c1803%3A0xfd9f4322f55f36b9!2sPavilh%C3%A3o%20Aristides%20Hall%2C%203810-489%20Aveiro!5e0!3m2!1sen!2spt!4v1571356852238!5m2!1sen!2spt","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.8135803608243!2d-8.659146684735182!3d40.6339929793404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd23980082025c87%3A0x59457cab4b1bf9ea!2sAutocarro-Bar!5e0!3m2!1sen!2spt!4v1571356780822!5m2!1sen!2spt","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1761.703965476785!2d-8.654102956178995!3d40.63653347620547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd239807189ece3f%3A0x34febc4870dca568!2sParque%20da%20Macaca!5e0!3m2!1sen!2spt!4v1571356738782!5m2!1sen!2spt","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.902506655822!2d-8.652960684735175!3d40.63203197934065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd23a2a85bad0da1%3A0xa9e86289b89bc34f!2sMcDonald's%20-%20Aveiro%20Universidade!5e0!3m2!1sen!2spt!4v1571357671911!5m2!1sen!2spt","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.6166964441127!2d-8.647958884735036!3d40.638334379340044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2398091999495f%3A0x997d6c84f9a2e953!2sI%20Love%20Aveiro%20Stairs!5e0!3m2!1sen!2spt!4v1571356532831!5m2!1sen!2spt", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.6198665697734!2d-8.659844184735002!3d40.638264479339995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2398018970f515%3A0x10a737e8a06f4b6a!2sF%C3%A1brica%20Centro%20Ci%C3%AAncia%20Viva%20de%20Aveiro!5e0!3m2!1sen!2spt!4v1571356402108!5m2!1sen!2spt"]];

listaPostos.addEventListener("click", showInfo, false);
var postosArray = listaPostos.querySelectorAll("p");
console.log(postosArray);
var clicked=false;
var lastId;

function showInfo(e) {
    var id;
    if (e.target != e.currentTarget && e.target.tagName != "UL") {
        
        if (clicked) {
            contentCont.removeChild(postoInfo);
        }
        
        clicked=true;
        
        bottomText.classList.add("hidden");
        
        id = parseInt(e.target.querySelector("p").innerHTML);
        var pos = id-1;
        
        if (lastId != null) {
            postosArray[lastId-1].innerHTML=lastId;
            postosArray[lastId-1].style.fontSize="40px";       
        }
        
        postosArray[pos].innerHTML=info[0][pos];
        postosArray[pos].style.fontSize="20px";

        
        postoInfo = document.createElement("div");
        contentCont.appendChild(postoInfo);
        postoInfo.id="posto-info";
        
        var postoTitle = document.createElement("p");
        postoInfo.appendChild(postoTitle);
        postoTitle.id="posto-title";
        postoTitle.innerHTML = info[0][pos];
        
        var postoDetails = document.createElement("ul");
        postoInfo.appendChild(postoDetails);
        postoDetails.id="posto-details";
        
        var bebidaWrapper = document.createElement("li");
        postoDetails.appendChild(bebidaWrapper);
        bebidaWrapper.id="bebida-wrapper";
        var bebidaLabel = document.createElement("p");
        bebidaWrapper.appendChild(bebidaLabel);
        bebidaLabel.id="bebida-label";
        bebidaLabel.innerHTML = "Bebida:";
        var bebida = document.createElement("p");
        bebidaWrapper.appendChild(bebida);
        bebida.id="bebida";
        bebida.innerHTML = info[1][pos];
        
        var desafioLabel = document.createElement("li");
        postoDetails.appendChild(desafioLabel);
        desafioLabel.id="desafio-label";
        desafioLabel.innerHTML="Desafio:";
        
        var desafioTitle = document.createElement("li");
        postoDetails.appendChild(desafioTitle);
        desafioTitle.id="desafio-title";
        desafioTitle.innerHTML=info[2][pos];
        
        var desafio = document.createElement("li");
        postoDetails.appendChild(desafio);
        desafio.id="desafio";
        desafio.innerHTML=info[3][pos];
        
        var mapWrapper = document.createElement("div");
        postoDetails.appendChild(mapWrapper);
        var mapLabel = document.createElement("p");
        mapWrapper.appendChild(mapLabel);
        mapLabel.id="map-label";
        mapLabel.innerHTML="Localização:";
        var map = document.createElement("iframe");
        mapWrapper.appendChild(map);
        map.src=info[4][pos];
        map.style.width="100%";
        map.height="300";
        map.frameborder="0";
        map.style.border="0";
        map.allowfullscreen="";
        map.style.filter="hue-rotate(45deg)";
        
        lastId=id;
        
        window.scrollTo(0,550);
    }
}


var loading = document.getElementById("loading");
var interval;

function spinningObject() {
    interval = setInterval(frame, 4);
    var counter=0;
    function frame() {
        if (counter==360) {
            counter=0;
        }
        loading.style.transform="translate(-50%, -50%) rotate("+counter+"deg"+")";
        counter++;
    }    
}

document.addEventListener("DOMContentLoaded", spinningObject);

window.addEventListener('load', function() {
    clearInterval(interval);
    loading.classList.add("hidden");
    contentCont.classList.remove("hidden");
    document.getElementsByTagName("footer")[0].classList.remove("hidden");
});
