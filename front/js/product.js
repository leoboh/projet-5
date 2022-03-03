// recuperer l'url
let recupUrl = window.location.search;

// recuperer l'id dans l'url (on recuperer id (?id=) et non l'id du produit(098765576879))
let recupId = new URLSearchParams(recupUrl);
let idUrl = recupId.get("id");

/// chercher donnes sur le serveur
fetch("http://localhost:3000/api/products")
  .then((resp) => resp.json())
  .then(function (produits) {
    let produitUrl = produits.find((produit) => produit._id === idUrl); // Chercher dans les produits, le produit pour lequel l'id est =

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

    // click sur le boutton qui enregistre dans le panier (localstorage)
    btnCommander.addEventListener("click", (e) => {
      e.preventDefault();

      // on enregistre l'id, la qtt, et la couleur
      let optionProduit = {
        idProduit: produitUrl._id,
        colorProduit: colors.value,
        qteProduit: inputHTML.value,
      };

      // on envoie les données de optionProduit dans le localStorage
      let stockProduit = JSON.parse(localStorage.getItem("produits")); // comprend pas

      if (stockProduit) {
        stockProduit.push(optionProduit);
        localStorage.setItem("produits", JSON.stringify(stockProduit));
      } else {
        stockProduit = [];
        stockProduit.push(optionProduit);
        localStorage.setItem("produits", JSON.stringify(stockProduit));
      }
      //let stockProduit = [];
      //stockProduit.push(optionProduit);
      //localStorage.setItem("produit", JSON.stringify(stockProduit));

      alert("Votre produit à bien été ajouté au panier");
    });
  })
  .catch((err) => {
    alert("Erreur captures", err);
  });
