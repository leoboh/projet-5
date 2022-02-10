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
  .then((resp) => resp.json()) // pourquoi then accepte pas la l'attribut function "namefunction"
  .then(function recupData(data) {
    // on stock automatiquement les donnes dans resp ? qu'on a traduit et ensuite c'est automatiquement mis dans data ?
    let produits = data.resultat;
  });

function produit(couleur, id, nom, prix, img, description, alt) {
  (this.couleur = couleur),
    (this.id = id),
    (this.nom = nom),
    (this.prix = prix),
    (this.img = img),
    (this.description = description),
    (this.alt = alt);
}
