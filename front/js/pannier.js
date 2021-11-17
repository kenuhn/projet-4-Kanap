let tableauProduit = localStorage.getItem("products");
let cartItems  = document.querySelector('#cart_items');
if (!tableauProduit){
    cartItems.textContent = "Mince Le panier est vide"
} else {
   var tableauProduitJSON = JSON.parse(tableauProduit)

}

