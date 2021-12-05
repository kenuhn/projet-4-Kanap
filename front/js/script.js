// requette pour le json produit 
const url   = 'http://localhost:3000/api/products';
let articles;

  async function requetteProduit(){ 
    const requette = await fetch (url, {methode: 'GET'});
    if (!requette.ok){
      const message = 'Un problème est survenu vuillez réessayer ultérieurment';
      throw new Error(message);


    } else {
      articles = await requette.json();
      console.log(articles);
      afficherProduit(articles)

    }
}


requetteProduit()
  //let section = document.getElementById('items')
  function afficherProduit(articles){

    //let produits    = createElement('article')
    
    for (article of articles){

      let lienArticle =  document.createElement('a');
      lienArticle.href = ` product.html?id=${article._id} `
      document.querySelector('.items').appendChild(lienArticle)

      let eltArticle          =  document.createElement('article');
      eltArticle.style.width  = "300px";
      eltArticle.style.height = "350px";
      eltArticle.style.margin = "25px";
      lienArticle.appendChild(eltArticle)

      let imgArticle             = document.createElement('div');
      imgArticle.innerHTML       = `<img src="${article.imageUrl}" alt="${article.altTxt}">`;
      imgArticle.style.marginTop = "20px"
      imgArticle.style.textAlign = "center"
      eltArticle.appendChild(imgArticle);
      
      let nomArticle          = document.createElement('h3');
      nomArticle.textContent  = article.name;
      imgArticle.appendChild(nomArticle);

      let descritpionArticle             = document.createElement('p');
      descritpionArticle.innerHTML       = `${article.description}`;
      descritpionArticle.style.fontSize  = "small";
      nomArticle.appendChild(descritpionArticle);

      let prixArticle         = document.createElement('div')
      prixArticle.textContent = article.price +"€"
      nomArticle.appendChild(prixArticle)

     /* let objetproduit = {
      titre: document.createElement('div').textContent += article.name
      images: 
      description:document.createElement('div').textContent += article.description
      couleurs:
      prix:
      id:
      }*/

        /*section.innerHTML += `<article>
        <img src="${article.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1"> 
        <h3 class="productName">${article.name}</h3>
        <p class="productDescription">${article.description}</p>
      </article>`*/
    }
    
  }




