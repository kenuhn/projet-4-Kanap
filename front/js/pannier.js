let tableauProduit = JSON.parse(localStorage.getItem("produit"));
console.log(tableauProduit)
let cartItems = document.querySelector('#cart__items');




if ( tableauProduit == "" || tableauProduit == null){
  cartItems.innerHTML       += `Mince Le panier est vide`;
  cartItems.style.textAlign = "center";
  cartItems.style.fontSize  = "x-large"
  cartItems.style.fontWeight= "bold"
} else {

function afficherPanier () {

        for (let i = 0; i < tableauProduit.length; i++){
          cartItems.innerHTML +=`<article class="cart__item" data-id="${tableauProduit[i].id}" data-color="${tableauProduit[i].couleurSelectione}">
          <div class="cart__item__img">
          <img src="${tableauProduit[i].image}" alt="${tableauProduit[i].altImg}">
        </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${tableauProduit[i].nom}</h2>
                <p>${tableauProduit[i].couleurSelectione}</p>
                <p class ="cart__price">${tableauProduit[i].prix}€</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté :  </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${tableauProduit[i].quantite}" >
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article> `         
      }
    }

  afficherPanier ();


/////////////////////////////////////////////////////////////////  CHANGEMENT DE QUANTITE


function changeQuantite (){
let selectionInput = document.querySelectorAll(".itemQuantity")

  for (let i = 0; i < selectionInput.length; i++){
  selectionInput[i].addEventListener("change" , () => {
       //const ancienneQuantite = tableauProduit[i].quantite;
         let nouvelleQuantite = selectionInput[i].valueAsNumber;
        tableauProduit[i].quantite = nouvelleQuantite;
        localStorage.setItem("produit", JSON.stringify(tableauProduit))
        

    })
  }
}
changeQuantite ();

/////////////////////////////////////////////////////////////////  CHANGEMENT DU PRIX

 function changerPrix () {
  let selectionInput = document.querySelectorAll(".itemQuantity")
  let selectionPrix  = document.querySelectorAll("cart__price")
  for (let i = 0; i < selectionInput.length; i++){
    selectionInput[i].addEventListener("change" , () => {

      const nouveauPrix = parseInt ( tableauProduit[i].prixBase) * parseInt(selectionInput[i].valueAsNumber);
      tableauProduit[i].prix = nouveauPrix;
      selectionPrix.textContent =  "tableauProduit[i].prix";
      localStorage.setItem("produit", JSON.stringify(tableauProduit))
      location.reload();
    })
    }
 }

 changerPrix ()



  /////////////////////////////////////////////////////////////////  SUPPRESSION D'UN ARTICLE 

  function supprimerArticle () {

    let btnSupprimer = document.querySelectorAll('.deleteItem');
    for (let i = 0; i < btnSupprimer.length; i++){
        btnSupprimer[i].addEventListener('click', () =>  {
         let idProduit    = tableauProduit[i].id
         let couleurProduit = tableauProduit[i].couleurSelectione
         console.log(idProduit)
         tableauProduit  = tableauProduit.filter(el => el.id !== idProduit || el.couleurSelectione !== couleurProduit)
         console.log(tableauProduit)
         localStorage.setItem("produit", JSON.stringify(tableauProduit))
         alert("ce produit va être supprimé")
         location.reload();
      })
    }
  }

  supprimerArticle () 




 /////////////////////////////////////////////////////////////////  INSERTION DU PRIX TOTAL

function prixTotal () {
  let tableauPrix = []
  let selectionPrix = document.querySelector("#totalPrice")
  for(let i = 0 ; i < tableauProduit.length; i++){

   let prix = tableauProduit[i].prix;
   tableauPrix.push(prix)
   console.log(tableauPrix)
   const reducer = (accumumator, currentValue) => accumumator + currentValue;
   const prixTotal = tableauPrix.reduce(reducer,0)
   selectionPrix.textContent    = prixTotal;
  }

}
prixTotal ()

 /////////////////////////////////////////////////////////////////  INSERTION DU QUANTITE TOTAL

 function qttTotal () {
  let tableauQuantite = []
  let selectionQUantite = document.querySelector("#totalQuantity")
  for(let i = 0 ; i < tableauProduit.length; i++){

   let quantite = parseInt(tableauProduit[i].quantite);
   tableauQuantite.push(quantite)
   console.log(tableauQuantite)
   const reducer = (accumumator, currentValue) => accumumator + currentValue;
   const quantiteTotal = tableauQuantite.reduce(reducer,0)
   selectionQUantite.textContent    = quantiteTotal;
  }

}
qttTotal ()

 
  /////////////////////////////////////////////////////////////////  GESTION FORMULAIRE ERRROR

  const prenomMsgErreur= document.querySelector("#firstNameErrorMsg");
  const nomFamilleMsgErreur = document.querySelector("#lastNameErrorMsg");
  const adresseMsgErreur = document.querySelector("#addressErrorMsg");
  const villeMsgErreur = document.querySelector("#cityErrorMsg");
  const emailMsgErreur = document.querySelector("#emailErrorMsg");                                     
  const btnValidation = document.querySelector("#order");
 



function traitementFormulaire() {

/////////////////////////////  VERIF PRENOM
  let formPrenom = document.querySelector("#firstName");
  formPrenom.addEventListener('change', function () {
    validPrenom(this)
  });

  const validPrenom = function (inputPrenom) {
      let prenomregex = new RegExp (
        /^[a-zA-Z ]+$/
      );
      const testprenom = prenomregex.test(inputPrenom.value);

      if (testprenom == false){
        prenomMsgErreur.textContent = "Vous avez actuellement une erreur"
      } else {
        prenomMsgErreur.textContent = "valide"
      }
  }


/////////////////////////////  VERIF NOM

let formNom  = document.querySelector("#lastName")
  formNom.addEventListener('change', function () {
    verifNom(this)
  })  

const verifNom = (inputNom) => {
  const nomRegexp = new RegExp ( 
    /^[a-zA-Z\-]+$/
  );

  let testNom = nomRegexp.test(inputNom.value)
  if (testNom == false){
    nomFamilleMsgErreur.textContent = "Vous avez actuellement une erreur"
  } else {
    nomFamilleMsgErreur.textContent = "valide"
  }
}

/////////////////////////////  VERIF ADRESSE


let formAdresse = document.querySelector("#address")
  formAdresse.addEventListener('change', function () {
    verifAdresse(this)
  })

const verifAdresse  = (inputAdresse) => {
  let adresseRegexp = new RegExp ( 
    /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/
  );

  const testAdresse = adresseRegexp.test(inputAdresse.value)
  if (testAdresse == false ){
    adresseMsgErreur.textContent = "Vous avez actuellement une erreur"
  } else {
    adresseMsgErreur.textContent = "valide"
  }
}
/////////////////////////////  VERIF VILLE

let formVille          = document.querySelector("#city")
formVille.addEventListener('change',  function ()  {
  verifVille(this)
  console.log(this)
})

const verifVille = (inputVille) => {
  let villeRegexp = new RegExp ( 
    /^\s*[a-zA-Zéèàê]+\s*$/
  );

  const testVille = villeRegexp.test(inputVille.value)
  if (testVille == false){
    villeMsgErreur.textContent = "Vous avez actuellement une erreur"
  } else {
    villeMsgErreur.textContent = "valide"
  }
}

/////////////////////////////  VERIF EMAIL

let formEmail = document.querySelector('#email')
console.log(formEmail)
formEmail.addEventListener('change',  function ()  {
  verifEmail(this)
  console.log(this)
});
const verifEmail = function(inputEmail){
  let emailRegexp = new RegExp (
    '^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i'
    );  
  let testEmail = emailRegexp.test(inputEmail.value);
console.log(testEmail)
console.log(inputEmail.value)
if (testEmail == false){
  emailErrorMsg.textContent = 'Adresse non Valide' ;
}
else{  
  emailErrorMsg.textContent = 'valide' ;
}
}
}

traitementFormulaire() 



function  validationDonne() {

  btnValidation.addEventListener('click', event => {
    event.preventDefault();

   let firstName = document.querySelector('#firstName').value;
   let lastName = document.querySelector('#lastName').value;
   let address = document.querySelector('#address').value;
   let city = document.querySelector('#city').value;
   let  email = document.querySelector('#email').value;
   //console.log(prenom, nom, adresse, ville, mail)


let products = [];

for (let i = 0; i < tableauProduit.length; i++ ){
  products.push(tableauProduit[i].id)
}

const tableauIdJson = JSON.stringify(products)

  const order = {
        contact : {
        firstName,
        lastName,
        address,
        city,
        email,
      },
      products,
    
  }

  

//console.log(tableauId)

if (firstName  == "" || lastName  == ""|| address == ""|| city  == ""|| email == ""){
  alert("veuillez remplir le formulaire")

}

else {

    alert ("vous venez d'effectuer votre commande")

    const envoie = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
          'Accept': 'application/json', 
          "Content-Type": "application/json" 
      },
  };
  console.log(order)
  console.log(envoie)
  console.log(tableauIdJson)

  fetch("http://localhost:3000/api/products/order", envoie)
  .then((response) => response.json())
  .then((data) => {
      console.log(data);
      localStorage.clear();
      localStorage.setItem("orderId", data.orderId);

      document.location.href = "confirmation.html";
  })
  .catch((err) => {
      alert ("Problème avec fetch : " + err.message);
  })
  
}

})
  
}
validationDonne ()
}