// recuperer l'url
let recupUrl = window.location.search;

// recuperer l'id dans l'url (on recuperer id (?id=) et non l'id du produit(098765576879))
let recupId = new URLSearchParams(recupUrl);
let idUrl = recupId.get("id");

/**
 * chercher donnes sur le serveur
 */
fetch("http://localhost:3000/api/products/" + idUrl)
  .then((resp) => resp.json())
  .then(function (produitUrl) {
    let nomProduit = document.getElementById("title");
    let prixProduit = document.getElementById("price");
    let descriptionProduit = document.getElementById("description");

    nomProduit.textContent = produitUrl.name;
    prixProduit.textContent = produitUrl.price;
    descriptionProduit.textContent = produitUrl.description;

    // creation et insertion de l'img dans le dom
    let imgProduit = document.createElement("img");
    let parentImgProduit = document.querySelector(".item__img");
    parentImgProduit.appendChild(imgProduit);
    imgProduit.src = produitUrl.imageUrl;

    // creation et insertion des couleur dans le dom
    for (let color of produitUrl.colors) {
      let colorProduit = document.createElement("option");
      let selectHTML = document.getElementById("colors");

      selectHTML.appendChild(colorProduit);
      colorProduit.textContent = color;
      colorProduit.setAttribute("value", color);
    }

    // detecter les changement des donees des element interactifs
    // changement de couleur
    // changement de qtt
    let inputHTML = document.getElementById("quantity");
    let btnCommander = document.querySelector("#addToCart");

    /**
     * click sur le boutton qui enregistre dans le panier (localstorage)
     */
    btnCommander.addEventListener("click", (e) => {
      e.preventDefault();

      // on enregistre l'id, la qtt, et la couleur
      let optionProduit = {
        idProduit: produitUrl._id,
        colorProduit: colors.value,
        qttProduit: inputHTML.value,
      };

      let d = optionProduit.colorProduit[0] != undefined;
      let v = optionProduit.qttProduit != 0;

      if (d) {
        if (v) {
          // on envoie les données de optionProduit dans le localStorage
          let stockProduit = JSON.parse(localStorage.getItem("produits"));

          /**
           * si le stockProduit contient deja ce type de canapé avec la même couleur, le remplacer par le nouveau
           * parcourir stockProduit
           */
          if (stockProduit) {
            let produitDejaStocker;
            for (produits of stockProduit) {
              produitDejaStocker = stockProduit.find(
                (a) =>
                  a.idProduit === optionProduit.idProduit &&
                  a.colorProduit === optionProduit.colorProduit
              );
            }

            if (produitDejaStocker) {
              // si un produit similaire a été trouvé
              // on supprime le produit dans stockProduit
              stockProduit.splice(stockProduit.indexOf(produitDejaStocker), 1);
              // on push le nouveau produit
              stockProduit.push(optionProduit);
              localStorage.setItem("produits", JSON.stringify(stockProduit));
            } else {
              // si on ne recuperer pas de produit similaire, on push le produit
              stockProduit.push(optionProduit);
              localStorage.setItem("produits", JSON.stringify(stockProduit));
            }
          } else {
            // si aucun produit n'est dans stockProduit
            // On initialise stockproduit et on push
            stockProduit = [];
            stockProduit.push(optionProduit);
            localStorage.setItem("produits", JSON.stringify(stockProduit));
          }
          alert("Votre produit à bien été ajouté au panier");
        } else {
          alert("Vous n'avez pas choisi de quantitée");
        }
      } else {
        alert("Vous n'avez pas choisi votre couleur");
      }
    });
  })
  .catch((err) => {
    alert("Erreur captures", err);
  });
