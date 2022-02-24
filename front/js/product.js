// recuperer l'url
let recupUrl = window.location.search

// recuperer l'id dans l'url (on recuperer id (?id=) et non l'id du produit(098765576879))
let recupId = new URLSearchParams(recupUrl)
let idUrl = recupId.get("id")

/// chercher donnes sur le serveur
fetch("http://localhost:3000/api/products")
  .then((resp) => resp.json())
  .then(function (produits) {
    let produitUrl = produits.find((produit) => produit._id === idUrl) // Chercher dans les produits, le produit pour lequel l'id est =

    let nomProduit = document.getElementById("title")
    let prixProduit = document.getElementById("price")
    let descriptionProduit = document.getElementById("description")

    // creation et insertion de l'img dans le dom
    let imgProduit = document.createElement("img")
    let parentImgProduit = document.querySelector(".item__img")
    parentImgProduit.appendChild(imgProduit)
    imgProduit.src = produitUrl.imageUrl

    // creation et insertion des couleur dans le dom
    let couleurProduit = document.createElement("option")
    let parentCouleurProduit = document.getElementById("colors")
    parentCouleurProduit.appendChild(couleurProduit)
    couleurProduit.textContent = produitUrl.colors

    nomProduit.textContent = produitUrl.name
    prixProduit.textContent = produitUrl.price
    descriptionProduit.textContent = produitUrl.description

    // detecter les changement des donees des element interactifs
    // changement de couleur
    // changement de qtt
    // click sur le boutton qui enregistre dans le panier (localstorage)
    // on enregistre l'id, la qtt, et la couleur
  })
  .catch((err) => {
    alert("Erreur captures", err)
  })
