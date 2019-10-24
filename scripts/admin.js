// DROPDOWN COM O NOME DAS EQUIPAS

var equipaDropdownWrapper = document.getElementById("equipas-dropdown-wrapper");
var equipaDropdownArrow = document.getElementById("equipas-dropdown-arrow");
var equipasWrapper = document.getElementById("equipas-wrapper");
var listaEquipas = equipasArray;
var equipaArrowClicked = false;
var lastEquipa;
var postosFromDBElem = [];
var postosWrapper = document.getElementById("postos-wrapper");
var equipaIsInOrder=true;
var ordemFromFB;

equipaDropdownWrapper.addEventListener("click", function() {
    if (!equipaArrowClicked) {
        equipaDropdownArrow.classList.add("up");
        equipaDropdownArrow.classList.remove("down");
        equipaArrowClicked=true;
        displayEquipas();
    }
    else {
        equipaDropdownArrow.classList.add("down");
        equipaDropdownArrow.classList.remove("up");
        equipaArrowClicked=false;
        equipasWrapper.removeChild(equipasWrapper.childNodes[3]);
    }
});

var equipasUl = document.createElement("ul");
var equipa;

function displayEquipas() {
    equipasWrapper.appendChild(equipasUl);
    equipasUl.id="lista-equipas";
    for (var i=0; i<listaEquipas.length; i++) {
        equipa = document.createElement("li");
        equipa.appendChild(document.createTextNode(listaEquipas[i]));
        equipasUl.appendChild(equipa);
    }
}

equipasUl.addEventListener("click", selectEquipa, false);

var clickedEquipa;

// equipaID
function getEquipaId(equipa) {
    for (var i=0; i<listaEquipas.length; i++) {
        var aux;
        if (listaEquipas[i] === equipa) {
            aux = i;
        }
    }
    return aux;
}

var selectedEquipaWrapper = document.createElement("div");
var orderMsg = document.createElement("p");
var lastPostoString;
var currentPosto;
var postosOrder = ordemArray;
var postoValue;

function selectEquipa(e) {
    // scroll down after clicking
    window.scrollTo(0, 300);
    
    // disponibilizar os pointer events depois de ter escolhido uma equipa
    postosWrapper.style.pointerEvents="unset";
    
    if (equipasWrapper.contains(selectedEquipaWrapper)) {
        equipasWrapper.removeChild(selectedEquipaWrapper);
    }
    
    if (e.target !== e.currentTarget) {
        clickedEquipa = e.target.innerHTML;
        console.log(clickedEquipa);
        if (e.target.innerHTML != lastPostoString) {
            
            if (postosWrapper.querySelectorAll("p")[0].length>0) {
                postosContainer.removeChild(orderMsg);   
            }
            
            if (postosFromDBElem.length>0) {
                var auxArray = postosWrapper.querySelectorAll("li");
                for (var j=0; j<auxArray.length; j++) {
                    if (auxArray[j].classList.contains("posto-visitado")) {
                        auxArray[j].classList.remove("posto-visitado");
                    }
                }   
            }
        }
        
        var equipaIndex;
        
        for (var i=0; i<listaEquipas.length; i++) {
            if (clickedEquipa == listaEquipas[i]) {
                equipaIndex = i;
                // correr o array info com a informação das equipas
                for (var j=0; j<info.length; j++) {
                   postosFromDB = info[i][1]; 
                }
                
                // activate postos vindos da DB
                for (var i=0; i<postos.length; i++) {
                    currentPosto = postos[i];
                    console.log(currentPosto);
                    var postoValueHTML = currentPosto.innerHTML;
                    postoValue = parseInt(postoValueHTML.split(">")[1].split("<")[0],10);
                    for (var j=0; j<postosFromDB.length; j++) {
                        if (postoValue == postosFromDB[j]) {
                            currentPosto.classList.add("posto-visitado");
                            postosFromDBElem.push(currentPosto);
                        }
                    }
                }
                
                var ordemFromFBString = info[equipaIndex][2];
                ordemFromDB = ordemFromFBString[0].split(".");
                // adicionar ordem dos postos
                var postosTitle = document.getElementById("postos-title");
                var titleString = "Postos (";
                console.log(postosOrder);
                var equipaID = getEquipaId(clickedEquipa);
                console.log(equipaID);
                console.log(postosOrder[equipaID]);
                console.log(postosOrder[equipaID].length); // tenho que remover os pontos entre os números para contar bem
                for (var a=0; a<postosOrder[equipaID].split(".").length; a++) {
                    if (a<(postosOrder[equipaID].split(".").length-1)) {
                       titleString+=(ordemFromDB[a]+"|"); 
                    }
                    else {
                        titleString+=(ordemFromDB[a]+")");   
                    }
                    console.log(titleString);
                }
                postosTitle.innerHTML = titleString;
                
                // checar se a equipa está a cumprir a ordem
                var ordemFromDBSliced = ordemFromDB.slice(0, postosFromDB.length); 
                equipaIsInOrder=true;
                for (var l=0; l<postosFromDB.length; l++) {
                    if (!ordemFromDBSliced.includes(postosFromDB[l])) {
                        equipaIsInOrder = false;
                    }
                }
                postosContainer.appendChild(orderMsg);
                orderMsg.style.fontSize="15px";
                orderMsg.style.marginLeft="50px";
                orderMsg.style.marginRight="50px";
                orderMsg.style.fontWeight="bolder";
                if(equipaIsInOrder) {
                    orderMsg.innerHTML="À primeira vista, a equipa está a cumprir a ordem dos postos.";
                    orderMsg.style.color="green";
                }
                else {
                    orderMsg.innerHTML="Parece que a equipa pode não estar a cumprir a ordem dos postos.";
                    orderMsg.style.color="red";
                }
            }
        }
        
    }
    e.stopPropagation();
    
    selectedEquipaWrapper.classList.add("equipa-selecionada-wrapper");
    equipasWrapper.appendChild(selectedEquipaWrapper);
    var selectedEquipaNameDisplay = document.createElement("p");
    selectedEquipaNameDisplay.appendChild(document.createTextNode("> "+clickedEquipa+" <"));
    selectedEquipaNameDisplay.classList.add("equipa-selecionada-display");
    selectedEquipaWrapper.appendChild(selectedEquipaNameDisplay);
    lastPostoString = e.target.innerHTML;
}

// FIM DO DROPDOWN COM O NOME DAS EQUIPAS


// POSTOS

var postosContainer = document.getElementById("postos-container");

var postos = postosWrapper.querySelectorAll("li");
var posto;
var lastPosto;
var postosFromDB;
var isFromDB=false;
var optionsDiv;
var optionsBooleans = [false,false,false,false,false];
var optionsPoints = [30,10,0,0,0];
var totalPoints = 0;
var optionsCounter=0;
var optionsContainer = document.createElement("div");

postosWrapper.addEventListener('click', selectPosto, false);

function selectPosto(e) {
    if (optionsCounter == 4) {
        optionsCounter = 0;
    }
    if (e.target !== e.currentTarget) {
        
        // remove from lastPosto clicked
        if (lastPosto != null) {
            posto = postos[(lastPosto)-1];
            posto.classList.remove("posto-clicado"); 

            var divs = optionsContainer.querySelectorAll("div");
            for (var i=0; i<divs.length; i++) {
                optionsContainer.removeChild(divs[i]);
            }
        }
        
        // check new clickedPosto
        var currentPostoHTML = e.target.innerHTML;
        currentPostoInt = parseInt(currentPostoHTML.split(">")[1].split("<")[0],10);
        posto = postos[currentPostoInt-1];
        
        // check if is from DB
        for (var i=0; i<postosFromDBElem.length; i++) {
            if (postosFromDBElem.length>0) {
                if (posto.classList.contains(postosFromDBElem[i].className)) {
                    isFromDB=true;   
                }
            }
        }
        
        if (!isFromDB) {
            posto.classList.add("posto-clicado");
            postosContainer.appendChild(optionsContainer);
            optionsContainer.id="optionsContainer";
            optionsContainer.appendChild(createOption("A equipa está a seguir a ordem correta?"));
            optionsContainer.appendChild(createOption("A equipa bebeu o consumo mínimo?"));
            optionsContainer.appendChild(createOption("A equipa completou o desafio?"));
            optionsContainer.appendChild(createOption("Algum elemento da equipa gregou?"));
            optionsContainer.appendChild(createOption("A equipa bebeu extras?"));
        }
        lastPosto = currentPosto;
        isFromDB=false; 
    }
}

function createOption(text) {
    // show div to check if team is going on the correct order
    optionsDiv = document.createElement("div");
    optionsCounter++;

    optionsDiv.classList.add("optionsWrapper");
    
    var msg = document.createElement("p");
    optionsDiv.appendChild(msg);
    msg.id="option"+optionsCounter;
    msg.innerHTML=text;
    msg.classList.add("options");
    return optionsDiv;
}

optionsContainer.addEventListener('click', optionsSelect, false);

var gregouClicked=false;
var clickedOnDiv=false;
var howManyDiv = document.createElement("ul");
var howManyP = document.createElement("li");
var dropdownGregarP = document.createElement("li");
var gregarArrow = document.createElement("i");
var howManyExtra = document.createElement("ul");
var howManyExtraP = document.createElement("li");
var howManyExtraValue = document.createElement("li");
var howManyExtraClicker = document.createElement("li");
var howManyExtraIncrement = document.createElement("li");
var howManyExtraDecrement = document.createElement("li");
var elem;
var parentElem;
var nmrOption;
var clickedOptions = [];
var clickedDropdown=false;
var liDiv = document.createElement("ul");
var extraCounter=0;

function optionsSelect(e) {
    if (e.target !== e.currentTarget) {
        if (e.target.id !== "") {
            elem = document.getElementById(e.target.id);   
            parentElem = elem.parentNode;
        }
        nmrOption = e.target.id.split("n")[1];
        if (!clickedOptions.includes(nmrOption)) {
            
            parentElem.style.backgroundColor="#5da899";
            parentElem.style.color="#011897";
            
            
            if (nmrOption == 1) {
                optionsPoints[nmrOption-1] = 0;
            }
            
            if (nmrOption == 2) {
                optionsPoints[nmrOption-1] = 0;
            }
            
            if (nmrOption == 3) {
                optionsPoints[nmrOption-1] = 50;
            }
            
            if (nmrOption == 4) {
                // "Quantos?"
                var optionsList = optionsContainer.querySelectorAll("div");
                optionsContainer.insertBefore(howManyDiv, optionsList[4]);
                howManyDiv.appendChild(howManyP);
                howManyDiv.style.marginBottom="25px";
                howManyDiv.style.marginLeft="50px";
                howManyDiv.style.marginRight="50px";
                howManyP.innerHTML="Quantos?";
                howManyP.classList.add("quantos");
                howManyP.id="quantosId";
                
                // nmr de elemntos que gregaram
                dropdownGregarP.id = "quantos-arrow-wrapper";
                dropdownGregarP.style.display="inline-block";
                dropdownGregarP.appendChild(gregarArrow);
                gregarArrow.classList.add("down");
                gregarArrow.id="quantos-arrow";
                howManyDiv.appendChild(dropdownGregarP); 
                
            }
            
            if (nmrOption == 5) {
                optionsContainer.appendChild(howManyExtra);
                howManyExtra.appendChild(howManyExtraP);
                howManyExtra.style.marginLeft="50px";
                howManyExtra.style.marginRight="50px";
                howManyExtra.id="quantosUl";
                howManyExtraP.innerHTML="Quantos?";
                howManyExtraP.classList.add("quantos");
                howManyExtra.appendChild(howManyExtraValue);
                extraCounter=1;
                optionsPoints[4]=20;
                howManyExtraValue.innerHTML=extraCounter;
                howManyExtraValue.style.borderBottom="2px solid #011897";
                howManyExtra.appendChild(howManyExtraClicker);
                howManyExtraClicker.style.borderRadius="20px";
                howManyExtraClicker.appendChild(howManyExtraIncrement);
                howManyExtraIncrement.innerHTML="+";
                howManyExtraIncrement.id="extra-increment";
                howManyExtraValue.classList.add("quantos");
                howManyExtraIncrement.classList.add("quantos");
                howManyExtraIncrement.classList.add("extra-clicker");
                howManyExtraClicker.appendChild(howManyExtraDecrement);
                howManyExtraDecrement.innerHTML="-";
                howManyExtraDecrement.id="extra-decrement";
                howManyExtraDecrement.classList.add("quantos");
                howManyExtraDecrement.classList.add("extra-clicker");
                howManyExtraDecrement.style.marginLeft="8px";
            }
            
            clickedOptions.push(nmrOption);
            
        }
        else {
            
            // get index in array of nmrOption
            var index;
            for (var ind=0; ind<clickedOptions.length; ind++) {
                if (clickedOptions[ind] == nmrOption) {
                    index=ind;
                }
            }
            
            parentElem.style.backgroundColor="#64F13B";
            parentElem.style.color="#011897";
            
            if (nmrOption == 1) {
                optionsPoints[nmrOption-1] = 30;
            }
            
            if (nmrOption == 2) {
                optionsPoints[nmrOption-1] = 10;
            }
            
            if (nmrOption == 3) {
                optionsPoints[nmrOption-1] = 0;
            }
            
            if (nmrOption == 4) {
                howManyDiv.removeChild(howManyP);
                howManyDiv.removeChild(dropdownGregarP);
                dropdownGregarP.removeChild(gregarArrow);
            }
            
            if (nmrOption == 5) {
                howManyExtra.removeChild(howManyExtraP);
                howManyExtra.removeChild(howManyExtraValue);
                howManyExtra.removeChild(howManyExtraClicker);
                extraCounter=0;
                optionsPoints[4]=0;
            }
            
            clickedOptions.splice(index,1);
        }
    
    }
    for (var p=0; p<optionsBooleans.length; p++) {
        if (clickedOptions.includes((p+1).toString())) {
            optionsBooleans[p] = true;
        }
        else {
            optionsBooleans[p] = false;
        }
    }
}


// dropdown de gregar
var clickedNmrGregar=false;
var lastTarget;
var nmrGregar;

gregarArrow.addEventListener('click', displayNmrGregar, false);
liDiv.addEventListener('click', selectNmrGregar, false);

function displayNmrGregar(e) {
    if (e.target.id == "quantos-arrow-wrapper" || e.target.id == "quantos-arrow") {
        if (!clickedDropdown) {
            gregarArrow.classList.add("up");
            gregarArrow.classList.remove("down");
            liDiv.style.marginTop="10px";
            howManyDiv.appendChild(liDiv);
            for (var li=0; li<5; li++) {
                var liElem = document.createElement("li");
                liElem.classList.add("nmr-gregar-li");
                var pElem = document.createElement("p");
                pElem.classList.add("super-centered-content");
                liElem.appendChild(pElem);
                liDiv.appendChild(liElem);
                pElem.innerHTML=li+1;
                pElem.style.pointerEvents="none";
            }
            clickedDropdown=true;
        }
        else {
            gregarArrow.classList.add("down");
            gregarArrow.classList.remove("up");
            var children = liDiv.querySelectorAll("li");
            for (var i=0; i<children.length; i++) {
                liDiv.removeChild(children[i]);
            }
            howManyDiv.removeChild(liDiv);
            clickedDropdown=false;
        }
    }   
}

function selectNmrGregar(e) {
    if (e.target !== e.currentTarget) {
        if (lastTarget != null) {
            lastTarget.classList.add("nmr-gregar-li");
            lastTarget.classList.remove("nmr-gregar-li-clicked");
        }
        
        if (!clickedNmrGregar) {
            e.target.classList.add("nmr-gregar-li-clicked");
            e.target.classList.remove("nmr-gregar-li");
            nmrGregar = e.target.innerHTML.split(">")[1].split("<")[0];
            optionsPoints[3] = 50*parseInt(nmrGregar);
            clickedNmrGregar=true;
        }
        else {
            e.target.classList.add("nmr-gregar-li");
            e.target.classList.remove("nmr-gregar-li-clicked");
            nmrGregar = null;
            optionsPoints[0];
            clickedNmrGregar=false;
        }
        lastTarget = e.target;
    }
}

// EXTRAS

howManyExtraIncrement.addEventListener("click", function() {
    extraCounter++;
    howManyExtraValue.innerHTML = extraCounter;
    optionsPoints[4]+=20;
});

howManyExtraDecrement.addEventListener("click", function() {
    extraCounter--;
    if (extraCounter < 1) {
        extraCounter=1;
        howManyExtraDecrement.style.pointerEvents="none";
    }
    else {
        howManyExtraDecrement.style.pointerEvents="unset";
    }
    howManyExtraValue.innerHTML = extraCounter;
    optionsPoints[4]-=20;   
})

// Observações

var obs = document.getElementById("observacaoInput");
var obsContent;


// SEND BUTTON

var send = document.getElementById("send-button");
var clickedSend=false;

send.addEventListener("click", function() {
    totalPoints = -optionsPoints[0]-optionsPoints[1]+optionsPoints[2]-optionsPoints[3]+optionsPoints[4];
    
    var today = new Date();
    var time = today.getDate() +'-'+(today.getMonth()+1)+'-'+ today.getFullYear() + " | " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    if (!clickedSend) {
        this.style.backgroundColor="#64F13B";
        this.style.color="#011897";
        this.style.boxShadow="inset 0 0 7px -3px black";
        clickedSend=true;
        
        var finalClickedEquipa="";
        
        for (var g=0; g<clickedEquipa.length; g++) {
            if (clickedEquipa.charAt(g) === " ") {
                finalClickedEquipa+="_";
            }
            else {
                finalClickedEquipa+=clickedEquipa.charAt(g);
            }
        }
        
        console.log(finalClickedEquipa);
        
        obsContent = obs.value;
        console.log(totalPoints);
        console.log(optionsPoints);
        console.log({posto:currentPostoInt, ordemCorreta:optionsBooleans[0], ordemCorretaPts:optionsPoints[0], nmrElementosCorreto:optionsBooleans[1], nmrElementosCorretoPts:optionsPoints[1], desafio:optionsBooleans[2], desfioPts:optionsPoints[2], gregou:optionsBooleans[3], nmrGregar:parseInt(nmrGregar,10), nmrGregarPts:optionsPoints[3], extra:optionsBooleans[4], nmrExtras:extraCounter ,extraPts:optionsPoints[4], totalPts:totalPoints, obs:obsContent ,db:finalClickedEquipa, time:time});
        
        $.post("send-equipa.php", {posto:currentPostoInt, ordemCorreta:optionsBooleans[0], ordemCorretaPts:optionsPoints[0], nmrElementosCorreto:optionsBooleans[1], nmrElementosCorretoPts:optionsPoints[1], desafio:optionsBooleans[2], desfioPts:optionsPoints[2], gregou:optionsBooleans[3], nmrGregar:parseInt(nmrGregar,10), nmrGregarPts:optionsPoints[3], extra:optionsBooleans[4], nmrExtras:extraCounter ,extraPts:optionsPoints[4], totalPts:totalPoints, obs:obsContent ,db:finalClickedEquipa, time:time});  
    }
    else {
        this.style.backgroundColor="#64F13B";
        this.style.color="#011897";
        this.style.boxShadow="unset";
        clickedSend=false;
    }
    location.reload();
});

// WINDOW ONLOAD FUNCTION
var comment = document.getElementById("observacaoInput");

window.onload = function() {
    
    // give correct size to observacao
    comment.cols=(window.innerWidth/12)-1;  
    
    if (window.innerWidth > 480) {
        equipasUl.style.margin="0px "+(window.innerWidth/4.3)+"px"; 
        selectedEquipaWrapper.style.padding="0px "+(window.innerWidth/4.3)+"px";
        optionsContainer.style.padding="0px "+(window.innerWidth/4.3)+"px";
    }
    // TODO in case IP is not on the login list
    var body = document.getElementsByTagName('BODY')[0];
    
   $.getJSON('https://ipapi.co/json/', function(data) {
        var authorized = false;
        user = JSON.parse(JSON.stringify(data));
        console.log(ipsAutorizados);
        console.log(user.ip);
        for (var d=0; d<ipsAutorizados.length; d++) {
            if (ipsAutorizados[d] == user.ip) {
                authorized=true;
            }
        }
        console.log(authorized);
        if (!authorized) {
            body.removeChild(document.getElementsByClassName('admin-navbar-container')[0]);
            body.removeChild(document.getElementsByClassName('centered-content')[0]);
            body.removeChild(document.getElementsByClassName('centered-content')[1]);
            body.removeChild(document.getElementById('postos-container'));
            window.location="login";
        }      
       
   });
}

// WINDOW ON RESIZE FUNCTION

// resize comment section

window.onresize = function() {
    commentsSectionInputResize();
    
    if (window.innerWidth > 480) {
        equipasUl.style.margin="0px "+(window.innerWidth/4.3)+"px"; 
        selectedEquipaWrapper.style.padding="0px "+(window.innerWidth/4.3)+"px";
        optionsContainer.style.padding="0px "+(window.innerWidth/4.3)+"px";
    }
}

function commentsSectionInputResize() {
    comment.cols=(window.innerWidth/12)-1;   
}