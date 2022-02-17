// appel de l'api qui va stock les données dans la variable "resultat"
/*fetch("http://localhost:3000/api/products").then((resultat) => {
  // si les données ont bien été récuperés alors ...
  if (resultat.ok) {
    // la variable "data" va heriter de de la variable "resultat"
    resultat.json().then((data) => {
      // la variable "produits" va heriter de "data"
      produits = data.resultat;
    });
  } else {
    alert("il y a une erreur");
  }
});

var produits = {};
console.log(produits);
// les afficher

// transformer les donnees en "html"
// les ajouter au DOM
*/

fetch("http://localhost:3000/api/products")
  .then((resp) => resp.json())
  .then(function (produits) {
    for (let produit of produits) {
      // pour chaque produit dans produits
      let a = document.createElement("a"); // je crée une balise "a"
      let article = document.createElement("article");
      let img = document.createElement("img");
      let titre = document.createElement("h3");
      let p = document.createElement("p");
      let section = document.getElementById("items");

      a.href = "./product.html?id=${produit._id}";
      img.src = produit.imageUrl;
      titre.textContent = produit.name;
      p.textContent = produit.description;

      section.appendChild(a);
      a.appendChild(article);
      article.appendChild(img);
      article.appendChild(titre);
      article.appendChild(p);

      /*let id = produit._id;
      let couleur = produit.color;
      let nom = produit.name;
      let prix = produit.price;
      let image = produit.imageUrl;
      let desc = produit.description;
      let alt = produit.altTxt;*/
    }
  });
