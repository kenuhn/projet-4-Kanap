// requette pour le json produit 
const url   = 'http://localhost:3000/api/products';
let articles;



  async function requetteProduit(){ 
    const requette = await fetch (url, {methode: 'GET'});
    if (!requette.ok){
      alert('il y a un problème')

    } else {
      articles = await requette.json();
      console.log(articles);
      afficherProduit(articles)
     
    }
}


requetteProduit()

  function afficherProduit(articles){
    let section = document.getElementById('items')

    for (article of articles){
       
        section.innerHTML += `<article>
        <img src="${article.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1"> 
        <h3 class="productName">${article.name}</h3>
        <p class="productDescription">${article.description}</p>
      </article>`
    }
    
  }




