// SIDE NAVBAR VARS

var equipaNome = document.getElementById("equipa");
var postoNmr = document.getElementById("posto");
var oC_bool = document.getElementById("oC_bool");
var oC_pts = document.getElementById("oC_pts");
var cM_bool = document.getElementById("cM_bool");
var cM_qnt = document.getElementById("cM_qnt");
var cM_pts = document.getElementById("cM_pts");
var cD_bool = document.getElementById("cD_bool");
var cD_pts = document.getElementById("cD_pts");
var aG_bool = document.getElementById("aG_bool");
var aG_qnt = document.getElementById("aG_qnt");
var aG_pts = document.getElementById("aG_pts");
var bE_bool = document.getElementById("bE_bool");
var bE_qnt = document.getElementById("bE_qnt");
var bE_pts = document.getElementById("bE_pts");
var nE_bool = document.getElementById("nE_bool");
var nE_qnt = document.getElementById("nE_qnt");
var nE_pts = document.getElementById("nE_pts");
var total_pts = document.getElementById("total_pts");

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
var equipasUl = document.createElement("ul");
var equipa;

equipaDropdownWrapper.addEventListener("click", function() {
    var equipasElems = equipasUl.querySelectorAll("li");
    for (var i=0; i<equipasElems.length; i++) {
        equipasUl.removeChild(equipasElems[i]);
    }
    
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

function displayEquipas() {
    equipasWrapper.appendChild(equipasUl);
    equipasUl.id="lista-equipas";
    console.log(listaEquipas);
    for (var i=0; i<listaEquipas.length; i++) {
        equipa = document.createElement("li");
        equipa.appendChild(document.createTextNode(listaEquipas[i]));
        equipa.style.width="unset";
        equipa.style.height="unset";
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
var selectedEquipaNameDisplay;
var postosTitleWrapper = document.getElementById("postos-title-wrapper");
var tbdText;
var lastTarget;
var clickedOnEquipasUl=false;

function selectEquipa(e) {
    // scroll down after clicking
    //window.scrollTo(0, 300);
    console.log("here");
    
    // disponibilizar os pointer events depois de ter escolhido uma equipa
    postosWrapper.style.pointerEvents="unset";
    
    if (lastPostoString != null) {
        selectedEquipaWrapper.removeChild(selectedEquipaNameDisplay);
    }
    
    if (equipasWrapper.contains(selectedEquipaWrapper)) {
        equipasWrapper.removeChild(selectedEquipaWrapper);
    }
    
    if (e.target !== e.currentTarget) {

        e.target.style.backgroundColor="#5da899";
        e.target.style.boxShadow="inset 0px 0px 7px -2px black";
        e.target.style.color="black";

        if (lastTarget != null && lastTarget!=e.target) {
            lastTarget.style.backgroundColor="unset";
            lastTarget.style.boxShadow="unset";
            lastTarget.style.color="#011897";
        }
        
        lastTarget = e.target;
        
        if (tbdText != null) {
            postosTitleWrapper.removeChild(tbdText);    
        }
        
        clickedEquipa = e.target.innerHTML;
        if (e.target.innerHTML != lastPostoString) {
            
            console.log(clickedEquipa);
            
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
                
                 equipaNome.innerHTML = clickedEquipa;
                
                // correr o array info com a informação das equipas
                for (var j=0; j<info.length; j++) {
                   postosFromDB = info[i][1]; 
                }
                
                // activate postos vindos da DB
                for (var ii=0; ii<postos.length; ii++) {
                    currentPosto = postos[ii];
                    var postoValueHTML = currentPosto.innerHTML;
                    postoValue = parseInt(postoValueHTML.split(">")[1].split("<")[0],10);
                    for (var jj=0; jj<postosFromDB.length; jj++) {
                        if (postoValue == postosFromDB[jj]) {
                            currentPosto.classList.add("posto-visitado");
                            postosFromDBElem.push(currentPosto);
                        }
                    }
                }
                
                var ordemFromFBString = info[equipaIndex][2];
                ordemFromDB = ordemFromFBString[0].split(".");
                // adicionar ordem dos postos
                var postosTitle = document.getElementById("postos-title");
                var titleString="Postos (";
                var equipaID = getEquipaId(clickedEquipa);
                var orderSplitted = postosOrder[equipaID].split(".");
                for (var a=0; a<orderSplitted.length; a++) {
                    if (orderSplitted.length>1) {
                        if (a<(orderSplitted.length-1)) {
                           titleString+=(orderSplitted[a]+"|"); 
                        }
                        else {
                            titleString+=(orderSplitted[a]+")");   
                        }
                    }
                    else {
                        titleString="Postos";
                        tbdText = document.createElement("p");
                        postosTitleWrapper.appendChild(tbdText);
                        tbdText.innerHTML="("+postosOrder[equipaID]+")";
                        tbdText.style.fontSize="22px";
                    }
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
    selectedEquipaNameDisplay = document.createElement("p");
    selectedEquipaNameDisplay.appendChild(document.createTextNode("> "+clickedEquipa+" <"));
    selectedEquipaNameDisplay.classList.add("equipa-selecionada-display");
    selectedEquipaWrapper.appendChild(selectedEquipaNameDisplay);
    lastPostoString = e.target.innerHTML;
    clickedOnEquipasUl=false;
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
var optionsBooleans = [false,true,false,false,false,false,true];
var optionsPoints = [30,0,0,0,0,0,0];
var totalPoints = 0;
var optionsCounter=0;
var optionsContainer = document.createElement("div");

postosWrapper.addEventListener('click', selectPosto, false);
var firstClick=true;
var hasDisplayedOptions=false;
var ovoElem;
var completouDesElem;
var nmrCorretoElems;

function selectPosto(e) {
    if (optionsCounter == 4) {
        optionsCounter = 0;
    }
    if (e.target !== e.currentTarget) {
        
        // remove from lastPosto clicked
        if (lastPosto != null) {
            lastPosto.classList.remove("posto-clicado"); 
        }
        
        // check new clickedPosto
        var currentPostoHTML = e.target.innerHTML;
        currentPostoInt = parseInt(currentPostoHTML.split(">")[1].split("<")[0],10);
        
        postoNmr.innerHTML=currentPostoInt;
        
        if (firstClick) {
            // values on side navbar
            oC_bool.innerHTML="Não";
            oC_pts.innerHTML="-30pts";
            cM_bool.innerHTML="Sim";
            cM_pts.innerHTML="0pts";
            cD_bool.innerHTML="Não";
            cD_pts.innerHTML="0pts";
            aG_bool.innerHTML="Não";
            aG_qnt.innerHTML="0";
            aG_pts.innerHTML="0pts";
            bE_bool.innerHTML="Não";
            bE_qnt.innerHTML="0";
            bE_pts.innerHTML="0pts";
            nE_bool.innerHTML="Sim";
            nE_qnt.innerHTML="0";
            nE_pts.innerHTML="0pts";
            total_pts.innerHTML="-30pts";
            firstClick=false;
        }
        
        posto = postos[currentPostoInt-1];
        
        // check if is from DB
        for (var i=0; i<postosFromDBElem.length; i++) {
            if (postosFromDBElem.length>0) {
                if (posto.classList.contains(postosFromDBElem[i].className)) {
                    isFromDB=true;   
                }
            }
        }
        
        posto.classList.add("posto-clicado");
        postosContainer.appendChild(optionsContainer);
        optionsContainer.id="optionsContainer";
        
        if (!hasDisplayedOptions) {
             if (!isFromDB) {
                optionsContainer.appendChild(createOption("A equipa está a seguir a ordem correta?"));
                optionsContainer.appendChild(createOption("A equipa não bebeu o consumo mínimo?"));
                completouDesElem = createOption("A equipa completou o desafio?");
                optionsContainer.appendChild(completouDesElem);
                optionsContainer.appendChild(createOption("Algum elemento da equipa gregou?"));
                optionsContainer.appendChild(createOption("A equipa bebeu extras?"));
                ovoElem = createOption("A equipa ainda tem o ovo intacto?");
                optionsContainer.appendChild(ovoElem);
                optionsContainer.appendChild(createOption("A equipa não tem o número correto de elementos?"));
                hasDisplayedOptions=true;
            }    
        }
        
        lastPosto = e.target;
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
var howManyMin = document.createElement("ul");
var howManyFaltas = document.createElement("ul");
var howManyExtraP = document.createElement("li");
var howManyMinP = document.createElement("li");
var howManyFaltasP = document.createElement("li");
var howManyExtraValue = document.createElement("li");
var howManyExtraClicker = document.createElement("li");
var howManyExtraIncrement = document.createElement("li");
var howManyExtraDecrement = document.createElement("li");
var howManyMinValue = document.createElement("li");
var howManyMinClicker = document.createElement("li");
var howManyMinIncrement = document.createElement("li");
var howManyMinDecrement = document.createElement("li");
var howManyFaltasValue = document.createElement("li");
var howManyFaltasClicker = document.createElement("li");
var howManyFaltasIncrement = document.createElement("li");
var howManyFaltasDecrement = document.createElement("li");
var elem;
var parentElem;
var nmrOption;
var clickedOptions = [];
var clickedDropdown=false;
var liDiv = document.createElement("ul");
var extraCounter=0;
var minCounter=0;
var faltasCounter=0;

function optionsSelect(e) {
    if (e.target !== e.currentTarget) {
        if (e.target.id !== "") {
            elem = document.getElementById(e.target.id);   
            parentElem = elem.parentNode;
        }
        nmrOption = e.target.id.split("n")[1];
        if (!clickedOptions.includes(nmrOption)) {
            
            if (parentElem.id !== "optionsContainer" && parentElem != howManyExtraClicker) {
                parentElem.style.backgroundColor="#5da899";
                parentElem.style.color="#011897";    
            }
            
            
            if (nmrOption == 1) {
                optionsPoints[0] = 0;
                oC_bool.innerHTML="Sim";
                oC_pts.innerHTML="0pts";
                setTotal();
            }
            
            if (nmrOption == 2) {
                cM_bool.innerHTML="Não";
                optionsContainer.insertBefore(howManyMin, completouDesElem);
                howManyMin.appendChild(howManyMinP);
                howManyMin.style.marginLeft="50px";
                howManyMin.style.marginRight="50px";
                howManyMin.id="quantosUlMin";
                howManyMinP.innerHTML="Quantos?";
                howManyMinP.classList.add("quantos");
                howManyMin.appendChild(howManyMinValue);
                minCounter=1;
                optionsPoints[1]=10;
                cM_qnt.innerHTML=minCounter;
                cM_pts.innerHTML = "-"+optionsPoints[1]+"pts";
                setTotal();
                howManyMinValue.innerHTML=minCounter;
                howManyMinValue.style.borderBottom="2px solid #011897";
                howManyMin.appendChild(howManyMinClicker);
                howManyMinClicker.style.borderRadius="20px";
                howManyMinClicker.appendChild(howManyMinIncrement);
                howManyMinIncrement.innerHTML="+";
                howManyMinIncrement.id="min-increment";
                howManyMinValue.classList.add("quantos");
                howManyMinIncrement.classList.add("quantos");
                howManyMinIncrement.classList.add("extra-clicker");
                howManyMinClicker.appendChild(howManyMinDecrement);
                howManyMinDecrement.innerHTML="-";
                howManyMinDecrement.id="min-decrement";
                howManyMinDecrement.classList.add("quantos");
                howManyMinDecrement.classList.add("extra-clicker");
                howManyMinDecrement.style.marginLeft="8px";
            }
            
            if (nmrOption == 3) {
                optionsPoints[nmrOption-1] = 50;
                cD_bool.innerHTML="Sim";
                cD_pts.innerHTML="+50pts";
                setTotal();
            }
            
            if (nmrOption == 4) {
                aG_bool.innerHTML="Sim";
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
                bE_bool.innerHTML="Sim";
                optionsContainer.insertBefore(howManyExtra, ovoElem);
                howManyExtra.appendChild(howManyExtraP);
                howManyExtra.style.marginLeft="50px";
                howManyExtra.style.marginRight="50px";
                howManyExtra.id="quantosUl";
                howManyExtraP.innerHTML="Quantos?";
                howManyExtraP.classList.add("quantos");
                howManyExtra.appendChild(howManyExtraValue);
                extraCounter=1;
                optionsPoints[4]=20;
                bE_qnt.innerHTML=extraCounter;
                bE_pts.innerHTML = "+"+optionsPoints[4]+"pts";
                setTotal();
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
            
            if (nmrOption == 7) {
                nE_bool.innerHTML="Não";
                optionsContainer.appendChild(howManyFaltas);
                howManyFaltas.appendChild(howManyFaltasP);
                howManyFaltas.style.marginLeft="50px";
                howManyFaltas.style.marginRight="50px";
                howManyFaltas.id="quantosUlFaltas";
                howManyFaltasP.innerHTML="Quantos?";
                howManyFaltasP.classList.add("quantos");
                howManyFaltas.appendChild(howManyFaltasValue);
                faltasCounter=1;
                optionsPoints[6]=30;
                nE_qnt.innerHTML=faltasCounter;
                nE_pts.innerHTML = "-"+optionsPoints[6]+"pts";
                setTotal();
                howManyFaltasValue.innerHTML=faltasCounter;
                howManyFaltasValue.style.borderBottom="2px solid #011897";
                howManyFaltas.appendChild(howManyFaltasClicker);
                howManyFaltasClicker.style.borderRadius="20px";
                howManyFaltasClicker.appendChild(howManyFaltasIncrement);
                howManyFaltasIncrement.innerHTML="+";
                howManyFaltasIncrement.id="min-increment";
                howManyFaltasValue.classList.add("quantos");
                howManyFaltasIncrement.classList.add("quantos");
                howManyFaltasIncrement.classList.add("extra-clicker");
                howManyFaltasClicker.appendChild(howManyFaltasDecrement);
                howManyFaltasDecrement.innerHTML="-";
                howManyFaltasDecrement.id="min-decrement";
                howManyFaltasDecrement.classList.add("quantos");
                howManyFaltasDecrement.classList.add("extra-clicker");
                howManyFaltasDecrement.style.marginLeft="8px";
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
                oC_bool.innerHTML="Não";
                oC_pts.innerHTML="-30pts";
                setTotal();
            }
            
            if (nmrOption == 2) {
                howManyMin.removeChild(howManyMinP);
                howManyMin.removeChild(howManyMinValue);
                howManyMin.removeChild(howManyMinClicker);
                minCounter=0;
                optionsPoints[1]=0;
                cM_bool.innerHTML="Sim";
                cM_qnt.innerHTML="0";
                cM_pts.innerHTML="0pts";
                setTotal();
            }
            
            if (nmrOption == 3) {
                optionsPoints[nmrOption-1] = 0;
                cD_bool.innerHTML="Não";
                cD_pts.innerHTML="0pts";
                setTotal();
            }
            
            if (nmrOption == 4) {
                howManyDiv.removeChild(howManyP);
                howManyDiv.removeChild(dropdownGregarP);
                dropdownGregarP.removeChild(gregarArrow);
                aG_bool.innerHTML="Não";
                aG_qnt.innerHTML="0";
                aG_pts.innerHTML="0pts";
                setTotal();
            }
            
            if (nmrOption == 5) {
                howManyExtra.removeChild(howManyExtraP);
                howManyExtra.removeChild(howManyExtraValue);
                howManyExtra.removeChild(howManyExtraClicker);
                extraCounter=0;
                optionsPoints[4]=0;
                bE_bool.innerHTML="Não";
                bE_qnt.innerHTML="0";
                bE_pts.innerHTML="0pts";
                setTotal();
            }
            
            if (nmrOption == 7) {
                howManyFaltas.removeChild(howManyFaltasP);
                howManyFaltas.removeChild(howManyFaltasValue);
                howManyFaltas.removeChild(howManyFaltasClicker);
                faltasCounter=0;
                optionsPoints[6]=0;
                nE_bool.innerHTML="Sim";
                nE_qnt.innerHTML="0";
                nE_pts.innerHTML="0pts";
                setTotal();
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
    
    e.stopPropagation();
}

// bebida mínima

howManyMinIncrement.addEventListener("click", function() {
    minCounter++;
    howManyMinValue.innerHTML = minCounter;
    optionsPoints[1]+=10;
    cM_qnt.innerHTML=minCounter;
    cM_pts.innerHTML="-"+optionsPoints[1]+"pts";
    setTotal();
});

howManyMinDecrement.addEventListener("click", function() {
    if (minCounter>1) {
        minCounter--;  
        optionsPoints[1]-=10;
    }
    else {
        minCounter=1;
    }
    howManyMinValue.innerHTML = minCounter;
    cM_qnt.innerHTML=minCounter;
    cM_pts.innerHTML="-"+optionsPoints[1]+"pts";
    setTotal();
});

// falta de elementos

howManyFaltasIncrement.addEventListener("click", function() {
    faltasCounter++;
    howManyFaltasValue.innerHTML = faltasCounter;
    optionsPoints[6]+=30;
    nE_qnt.innerHTML=faltasCounter;
    nE_pts.innerHTML="-"+optionsPoints[6]+"pts";
    setTotal();
});

howManyFaltasDecrement.addEventListener("click", function() {
    if (faltasCounter>1) {
        faltasCounter--;  
        optionsPoints[6]-=30;
    }
    else {
        faltasCounter=1;
    }
    howManyFaltasValue.innerHTML = faltasCounter;
    nE_qnt.innerHTML=faltasCounter;
    nE_pts.innerHTML="-"+optionsPoints[6]+"pts";
    setTotal();
});

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
            aG_qnt.innerHTML=nmrGregar;
            optionsPoints[3] = 50*parseInt(nmrGregar);
            aG_pts.innerHTML="-"+optionsPoints[3]+"pts";
            setTotal();
            clickedNmrGregar=true;
        }
        else {
            e.target.classList.add("nmr-gregar-li");
            e.target.classList.remove("nmr-gregar-li-clicked");
            nmrGregar = null;
            optionsPoints[3] = 0;
            clickedNmrGregar=false;
            aG_qnt.innerHTML=0;
            aG_pts.innerHTML="0pts";
            setTotal();
        }
        lastTarget = e.target;
    }
}

// EXTRAS

howManyExtraIncrement.addEventListener("click", function() {
    extraCounter++;
    howManyExtraValue.innerHTML = extraCounter;
    optionsPoints[4]+=20;
    bE_qnt.innerHTML=extraCounter;
    bE_pts.innerHTML="+"+optionsPoints[4]+"pts";
    setTotal();
});

howManyExtraDecrement.addEventListener("click", function() {
    if (extraCounter>1) {
        extraCounter--;  
        optionsPoints[4]-=20;
    }
    else {
        extraCounter=1;
    }
    howManyExtraValue.innerHTML = extraCounter;
    bE_qnt.innerHTML=extraCounter;
    bE_pts.innerHTML="+"+optionsPoints[4]+"pts";
    setTotal();
});

// Observações

var obs = document.getElementById("observacaoInput");
var obsContent;

function sumPoints() {
    return (-optionsPoints[0])-optionsPoints[1]+optionsPoints[2]-optionsPoints[3]+optionsPoints[4]-optionsPoints[6];
}

function setTotal() {
    total_pts.innerHTML=sumPoints()+"pts";
}

// SEND BUTTON

var send = document.getElementById("send-button");
var clickedSend=false;

send.addEventListener("click", function() {
    totalPoints = sumPoints();
    
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
        obsContent = obs.value;
        console.log(); 
        var connectedSuc = $.post("send-equipa.php", {posto:currentPostoInt, ordemCorreta:optionsBooleans[0], ordemCorretaPts:optionsPoints[0], bebidaMinima:optionsBooleans[1], nmrBebidaMinima:minCounter, bebidaMinimaPts:optionsPoints[1], desafio:optionsBooleans[2], desafioPts:optionsPoints[2], gregou:optionsBooleans[3], nmrGregar:parseInt(nmrGregar,10), nmrGregarPts:optionsPoints[3], extra:optionsBooleans[4], nmrExtras:extraCounter ,extraPts:optionsPoints[4], faltas:optionsBooleans[6], nmrFaltas:faltasCounter ,faltasPts:optionsPoints[6], totalPts:totalPoints, obs:obsContent ,db:finalClickedEquipa, time:time, user:username, ovo:optionsBooleans[5]});  
        console.log(connectedSuc);
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
    
    var counter=-37;
    var interval = setInterval(arrowToRight, 25);
    var toRight=true;
    
    function arrowToRight() {
        arrowWrapper.style.right=counter+"px";
        if (toRight) {
            counter-=1.5;      
        }
        else {
            counter+=1.5;
        }
        if (counter==-77.5) {
            toRight=false;
        }
        if (counter==-37) {
            clearInterval(interval);
        }
    }
}

$(document).ready(function() {
    if (!conn) {
        window.location="login";
    }
    else {
        document.body.style.filter="unset";
    }
});

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

// SIDE NAVBAR

var arrowWrapper = document.getElementById("arrow-wrapper");
var sideNavCont = document.getElementById("side-navbar-container");
var arrow = document.getElementById("arrow");
var clicked=false;
var darkBack = document.getElementById("dark-back");
var adminNavCont = document.getElementsByClassName("admin-navbar-container")[0];
var adminNavLi = document.getElementById("admin-navbar-li");
var adminNavA = document.getElementById("admin-navbar-a");

arrowWrapper.addEventListener("click", showSideBar);
darkBack.addEventListener("click", showSideBar);

function showSideBar() {
    if(!clicked) {
        sideNavCont.style.left="0px";
        arrowWrapper.style.right="-20px";
        arrowWrapper.style.boxShadow="2px 0 6px 0px white";
        arrow.className="left";
        arrow.style.marginLeft="5px";
        darkBack.classList.remove("hidden");
        adminNavCont.style.borderBottom="2px solid white";
        adminNavCont.style.boxShadow = "0px 0px 5px 1px white";
        adminNavCont.style.backgroundColor="#011897";
        adminNavLi.style.color="#64F13B";
        adminNavA.style.color="#64F13B";
        clicked=true;
    }
    else {
        sideNavCont.style.left="-166px";
        arrowWrapper.style.right="-36px";
        arrowWrapper.style.boxShadow="unset";
        arrow.className="right";
        arrow.style.marginLeft="-5px";
        darkBack.classList.add("hidden");
        adminNavCont.style.borderBottom="unset";
        adminNavCont.style.boxShadow = "0px 0px 5px 1px black";
        adminNavCont.style.backgroundColor="#64F13B";
        adminNavLi.style.color="#011897";
        adminNavA.style.color="#011897";
        clicked=false;
    }
}