// recuperer les donnees du panier (localStorage)
let stockProduit = JSON.parse(localStorage.getItem("produits"));
//console.log(stockProduit);

fetch("http://localhost:3000/api/products")
  .then((resp) => resp.json())
  .then(function (produits) {
    // Recuperer les id, color, qté dans les produits du localstorage
    for (let produit of stockProduit) {
      let idProduit = produit.idProduit;
      let colorProduit = produit.colorProduit;
      let qteProduit = produit.qteProduit;

      // Chercher dans l'API les produits au id correspondant à ceux du localstorage
      let produitPanier = produits.find((produit) => produit._id === idProduit);

      // Pour chaque produits recuperer créer le DOM
      let section = document.getElementById("cart__items");
      let article = document.createElement("article");
      let div1 = document.createElement("div");
      let img = document.createElement("img");
      let div2 = document.createElement("div");
      let div3 = document.createElement("div");
      let titre = document.createElement("h2");
      let p1 = document.createElement("p");
      let p2 = document.createElement("p");
      let div4 = document.createElement("div");
      let div5 = document.createElement("div");
      let p3 = document.createElement("p");
      let input = document.createElement("input");
      let div6 = document.createElement("div");
      let p4 = document.createElement("p");

      //
      section.appendChild(article);
      article.appendChild(div1);
      div1.appendChild(img);
      article.appendChild(div2);
      div2.appendChild(div3);
      div3.appendChild(titre);
      div3.appendChild(p1);
      div3.appendChild(p2);
      div2.appendChild(div4);
      div4.appendChild(div5);
      div5.appendChild(p3);
      div5.appendChild(input);
      div4.appendChild(div6);
      div6.appendChild(p4);

      // add des class
      article.className = "cart__item";
      div1.className = "cart__item__img";
      div2.className = "cart__item__content";
      div3.className = "cart__item__content__description";
      div4.className = "cart__item__content__settings";
      div5.className = "cart__item__content__settings__quantity";
      input.className = "itemQuantity";
      div6.className = "cart__item__content__settings__delete";
      p4.className = "deleteItem";

      // add des atributs
      article.setAttribute("data-id", idProduit);
      article.setAttribute("data-color", colorProduit);
      img.setAttribute("alt", produitPanier.altTxt);
      input.setAttribute("type", "number");
      input.setAttribute("name", input.className);
      input.setAttribute("min", 1);
      input.setAttribute("max", 100);
      input.setAttribute("value", qteProduit);

      // add des données
      img.src = produitPanier.imageUrl;
      titre.textContent = produitPanier.name;
      p1.textContent = colorProduit;
      p2.textContent = produitPanier.price + " €";
      p3.textContent = "Qté : ";
      p4.textContent = "Supprimer";

      // add total
      let qteTotal = document.getElementById("totalQuantity");
      let prixTotal = document.getElementById("totalPrice");

      //prixTotal.textContent = produitPanier.price * input.value;
      //qteTotal.textContent = produitPanier.qteProduit * produitPanier;

      //qte totale = input.value x produitPanier
      //prix total par produit = input.value x le prix

      //prix totale = on additionne tous les prix total des produit

      input.addEventListener("change", recupValueInput);
      function recupValueInput(e) {
        produitPanier.qteProduit = e.target.value; //recupere la qteProduit au changement de l'input

        let indexProduit = stockProduit.indexOf(produit); // recupere l'index du produit
        stockProduit.splice(indexProduit, 1); // supprime le produit grace a l'index recuperer

        let prixTotalProduit = produitPanier.qteProduit * produitPanier.price;

        let optionProduit = {
          // creation du produit que l'on va renvoyer au localstorage
          idProduit: produit.idProduit,
          colorProduit: colorProduit,
          qteProduit: produitPanier.qteProduit,
          prixTotal: prixTotalProduit,
        };

        //console.log(optionProduit.prixTotal);
        console.log(stockProduit);
        console.log(produit);
        let sum = 0;
        for (let d of stockProduit) {
          //produit.prixTotal += sum;
          d = produit.prixTotal;
          //console.log(d);
          console.log(optionProduit.prixTotal);
        }
        stockProduit.push(optionProduit); // Envoie du produit dans stockProduit
        localStorage.setItem("produits", JSON.stringify(stockProduit)); // Envoie de stockProduit dans le localstorage
        // pour chaque produit dans stockProduit, qteproduit * prixProduit = prixtotalProd, prixtotalProd +=
        // qte * prix = total produit
        // changer dans stockProduit
        // réenregistrer stockProduit dans localStorage
        // calculer la sommes des qtts de stockProduit // stockProduit.reduce(...) // for ()
        // qteTotal.textContent = sumQtt(stockProduit)
        // prixTotal.textContent =
      }
    }
  });

//let form = document.querySelector("form.cart__order__form");
//form.addEventListener("submit", function (e) {
//  e.preventDefault();
//  console.log("TEST");
//});

// recuperer les donnees completes des cancapes selectionnes
// afficher les canapes*/
