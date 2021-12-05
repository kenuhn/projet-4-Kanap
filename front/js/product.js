var str = window.location.href;
var url = new URL(str);
let id  = url.searchParams.get("id");
let articles;

// récuperer l'ID des canapés 
const urlProduit = `http://localhost:3000/api/products/${id}`;
async function requetteProduit(){ 
    const requette = await fetch (urlProduit, {methode: 'GET'});
    if (!requette.ok){
      const message = 'Un problème est survenu vuillez réessayer ultérieurment';
      throw new Error(message);

    } else {
      articles = await requette.json();
      afficherProduit(articles)
      choixCouleur ()
      console.log(articles); 
    }
}
requetteProduit()



// Variable des prix produits
let prixProduit                 = document.querySelector('#price');
let descriptionProduit          = document.querySelector('#description');
let imgProduit                  = document.querySelector('.item__img');
//for (couleurProduit in articles )

let select            = document.querySelector('select');


function afficherProduit(){

        prixProduit.innerHTML           = articles.price;   
        descriptionProduit.innerHTML    = articles.description;

        imgProduit.innerHTML            = ` <img src="${articles.imageUrl}" alt="Photographie d'un canapé">`;
        imgProduit.style.width          = "400px";
        imgProduit.style.height         = "400px";
}


const choixCouleur = () =>{           //crée un élément pour chaque option de couleur dans le tableau

  let nbrCouleur        = articles.colors.length;
  for (var i = 0; i < nbrCouleur; i++){

      optionCouleur  = document.createElement('option');
      optionCouleur.innerHTML      = `${articles.colors[i]}`
      select.appendChild(optionCouleur);  
      console.log(optionCouleur)
 } 
}

const selectionCouleur = document.querySelector('#colors')
const btnPanier        = document.querySelector('#addToCart')
const quantite        = document.querySelector('#quantity');

btnPanier.addEventListener( 'click', (produitChoisie) => {
  let produitLocalStorage = [];

  produitChoisie = {      //creation de l'objet produit choisie pour stocker les valeurs choisie par l'utilisateur.


    id                : id,
    couleurSelectione : selectionCouleur.value,
    quantite          : quantite.value,
    prix              : prixProduit.innerHTML ,
    prixBase          : prixProduit.innerHTML,
    nom               : articles.name,
    image             : articles.imageUrl,
    altImg            : articles.altTxt
  }
  console.log(selectionCouleur.value)
  
if ( produitChoisie.quantite <= 0 || produitChoisie.quantite >  100){     //Si la quantité choisie par l'utilisteur est inferieur ou égal à 0 ou superieur à 100. afficher une alerte
    alert('vous devez choisir une quantité compris entre 1 et 100');
  }
  
else if (selectionCouleur.value == "" ){
    alert('Vous devez choisir une couleur');
  } 
  
else{     
  
  if (localStorage.getItem('produit')){                                    //Si il y a quelque chose dans le Local Storage verifie si il est le produit choisie est le meme 

      produitLocalStorage   =  JSON.parse(localStorage.getItem("produit"));
      const resultatTrouver = produitLocalStorage.find(
        (el) => el.id === produitChoisie.id && el.couleurSelectione === produitChoisie.couleurSelectione);
  
        if (resultatTrouver){
          var total = parseInt(resultatTrouver.quantite) + parseInt(produitChoisie.quantite); 
          resultatTrouver.quantite = total;  
          console.log(total) 
          resultatTrouver.prix = resultatTrouver.quantite * produitChoisie.prix;
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));      
        }
        else {   
          produitChoisie.prix = prixProduit.innerHTML * quantite.value
          produitLocalStorage.push(produitChoisie);
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));    
      }
  }

  else {                                  
    produitChoisie.prix = prixProduit.innerHTML * quantite.value                                     // sinon pousse le directement dans le local storage
      produitLocalStorage.push(produitChoisie);
      localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
  }

}
    


   console.log(produitLocalStorage)


    })   