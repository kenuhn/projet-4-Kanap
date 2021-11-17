var str = window.location.href;
var url = new URL(str);
let id  = url.searchParams.get("id");
console.log(id);
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


const choixCouleur = () =>{           //crée un élément <option> pour chaque couleur

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
btnPanier.addEventListener( 'click', (produitEnregistrer) => {

    produitEnregistrer = {

    id                : id,
    couleurSelectione : selectionCouleur.value,
    quantité          : quantite.value,
    prix              : quantite.value * prixProduit.innerHTML
  
  }

  let tableauProduit = [];

  if (localStorage.getItem('produit')  !== null){
    tableauProduit   =  JSON.parse(localStorage.getItem("products"));
  }
  tableauProduit.push(produitEnregistrer)
  localStorage.setItem("products", JSON.stringify(tableauProduit));
 
}) 