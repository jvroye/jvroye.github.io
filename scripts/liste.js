
//APPEL - Au fonction pour charger les listes deroulantes (Event onload on tag <body> )
function chargerListes(){

    chargerListe("entree", entree);
    chargerListe("repas", repas);
    chargerContenu("entree", entree, "imageEntree", "prixEntree");
    chargerContenu("repas", repas, "imageRepas", "prixRepas");
}

//APPEL - Au fonction pour charger le contenu d'une sélection (Event onchange on tag <select> )
function chargerEntree(){
    chargerContenu("entree", entree, "imageEntree", "prixEntree");
}

function chargerRepas(){
    chargerContenu("repas", repas, "imageRepas", "prixRepas");
}




//FONCTION  - Charge la liste dans le menu deroulant <SELECT></SELECT>
function chargerListe(typePlat, liste){
    var taille = liste.length;
    var elem = document.getElementById(typePlat);

        for(i=0; i<taille; i++){
            elem.options[i] = new Option(liste[i]["nom"]);
        }

        elem.options[0].selected=true; 
}



//FONCTION  - Charger contenu suite à une sélection du menu deroulant <SELECT></SELECT>
function chargerContenu(selectID, liste, IDimageOut,IDprixOut){

    //Affecter l'objet select du DOM à la variable select
    var select = document.getElementById(selectID);

    //Variable pour mémoriser la position de l'élément selectionné
    var pos; 

    // Trouver l'élément sélectionné, et garder sa position en mémoire
    for (i in select.options){
        if(select.options[i].selected){
            pos=i;
        }
    }

    //Charger l'image dans le DOM pour la selection donnée
    document.images[IDimageOut].src = liste[pos]["image"];

    //Charger le prix dans le DOM pour la selection donnée
    document.getElementById(IDprixOut).innerHTML= liste[pos]["prix"]+"$";

    //Appeler la fonction pour recalculer le total
    calculTotal();

} 


//FONCTION  - Calcul le sous-total, taxes et total pour les prix données par les sélections
function calculTotal(){
    
    var select;       // Pour mémoriser l'objet SELECT du DOM
    var prixEntree; 
    var prixRepas;

    // Trouver les éléments sélectionnés (entrée et repas), et garder les prix en mémoire
    select = document.getElementById("entree");
    for (i in select.options){
        if(select.options[i].selected){
            prixEntree=entree[i]["prix"];
        }
    }

    select = document.getElementById("repas");
    for (i in select.options){
        if(select.options[i].selected){
            prixRepas=repas[i]["prix"];
        }
    }

    //Calcul des montants à partir des prix
    var soustotal = prixEntree + prixRepas;
    var TPS = 5/100*soustotal;
    var TVQ = 9.975/100*soustotal;
    var taxes = TPS+TVQ;
    var total = soustotal + taxes;

    //Affichage des montants
    document.getElementById("soustotal").innerHTML= roundToTwo(soustotal);
    document.getElementById("taxes").innerHTML= roundToTwo(taxes);
    document.getElementById("total").innerHTML= roundToTwo(total);
}

//FONCTION  -  Pour arrondir les prix à deux décimal prêt
function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}