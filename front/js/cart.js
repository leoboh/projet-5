// recuperer les donnees du panier (localStorage)
let stockProduit = JSON.parse(localStorage.getItem("produits"));

// recup totaux dans le DOM
let htmlSpanQttTotal = document.getElementById("totalQuantity");
let htmlSpanPrixTotal = document.getElementById("totalPrice");

// fonction qui recuperer le prixTotal
function sumPriceProduit(dataApi, stockProduit) {
  let sumP = 0;
  for (let produit of stockProduit) {
    let idProduit = produit.idProduit;
    let product = dataApi.find((produit) => produit._id === idProduit);
    let priceProduit = produit.qttProduit * product.price;
    sumP = sumP + priceProduit;
  }
  return sumP;
}

// fonction qui recupere la quantitée total
function sumQttProduit(stockProduit) {
  let sumQ = 0;
  for (let produit of stockProduit) {
    sumQ = sumQ + produit.qttProduit;
  }
  return sumQ;
}

// recupere les donnees de l'api
fetch("http://localhost:3000/api/products")
  .then((resp) => resp.json())
  .then(function (dataApi) {
    // Recuperer les id, color, qté dans les produits du localstorage
    for (let produit of stockProduit) {
      let idProduit = produit.idProduit;
      let colorProduit = produit.colorProduit;
      let qttProduit = produit.qttProduit;

      // Chercher dans l'API les produits au id correspondant à ceux du localstorage
      let produitDatApi = dataApi.find((produit) => produit._id === idProduit);

      // Pour chaque produits recuperer, créer le DOM
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

      // Definir la place des element dans le DOM
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
      img.setAttribute("alt", produitDatApi.altTxt);
      input.setAttribute("type", "number");
      input.setAttribute("name", input.className);
      input.setAttribute("min", 1);
      input.setAttribute("max", 100);
      input.setAttribute("value", qttProduit);

      // add des données
      img.src = produitDatApi.imageUrl;
      titre.textContent = produitDatApi.name;
      p1.textContent = colorProduit;
      p2.textContent = produitDatApi.price + " €";
      p3.textContent = "Qté : ";
      p4.textContent = "Supprimer";

      // Calcule des totaux
      input.addEventListener("change", recupValueInput);
      function recupValueInput(e) {
        let qtt = Number(e.target.value); //recupere la qttProduit au changement de l'input (number = on veux un nombre)*/
        produit.qttProduit = qtt; // copie la valeur dans le produit

        // Envoie des totaux dans le DOM
        htmlSpanQttTotal.textContent = sumQttProduit(stockProduit);
        htmlSpanPrixTotal.textContent = sumPriceProduit(dataApi, stockProduit);
        localStorage.setItem("produits", JSON.stringify(stockProduit));
      }

      // Supprimer un produit
      p4.addEventListener("click", supprimeProduit);
      function supprimeProduit() {
        section.removeChild(article);

        stockProduit = stockProduit.filter(function (d) {
          return d !== produit;
        });

        localStorage.setItem("produits", JSON.stringify(stockProduit));
      }
    }
  });

// Recuperer les inputs du formulaire
let inputFirstName = document.getElementById("firstName");
let inputLastName = document.getElementById("lastName");
let inputAdress = document.getElementById("address");
let inputCity = document.getElementById("city");
let inputEmail = document.getElementById("email");

// Recuperer les messages d'erreur du formulaire
let errorFirstName = document.getElementById("firstNameErrorMsg");
let errorLastName = document.getElementById("lastNameErrorMsg");
let errorAdress = document.getElementById("addressErrorMsg");
let errorCity = document.getElementById("cityErrorMsg");
let errorEmail = document.getElementById("emailErrorMsg");

// Création des REGEX
let firstNameRegex = /^[a-zA-Z-]+$/;
let lastNameRegex = /^[a-zA-Z]+$/;
let emailRegex = /^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$/;
let adressRegex =
  /^[a-zA-Z0-9]+[\s]+[a-zA-Z0-9]+[\s]+[a-zA-Z0-9]+[\s]+[a-zA-Z0-9]+$/;
let cityRegex = /^[a-zA-Z-]+[\s]+[a-zA-Z-]+$/;

// Fonction qui verifie les valeurs du formulaire et les envoie dans le back
function validForm() {
  let testFirstName = firstNameRegex.test(inputFirstName.value);
  if (testFirstName) {
    let testLastName = lastNameRegex.test(inputLastName.value);

    if (testLastName) {
      let testAdress = adressRegex.test(inputAdress.value);

      if (testAdress) {
        let testCity = cityRegex.test(inputCity.value);

        if (testCity) {
          let testEmail = emailRegex.test(inputEmail.value);
          if (testEmail) {
            // Création de la variable qui va récupérer les valeurs du formulaire
            let valuesForm = {
              prenom: inputFirstName.value,
              nom: inputLastName.value,
              email: inputEmail.value,
              adress: inputAdress.value,
              city: inputCity.value,
            };

            // Création de la variable qui va envoyer les donnes au serv
            let formulaire = JSON.parse(localStorage.getItem("user"));

            //  Envoie des données au serv
            if (formulaire) {
              formulaire.push(valuesForm);
              localStorage.setItem("user", JSON.stringify(formulaire));
            } else {
              formulaire = [];
              formulaire.push(valuesForm);
              localStorage.setItem("user", JSON.stringify(formulaire));
            }
          } else {
            errorEmail.textContent =
              "L'adresse que vous avez saisi n'est pas recevable";
          }
        } else {
          errorCity.textContent =
            "La ville que vous avez saisi n'est pas valide";
        }
      } else {
        errorAdress.textContent =
          "L'adresse que vous avez saisi n'est pas recevable";
      }
    } else {
      errorLastName.textContent =
        "Le nom que vous avez saisi n'est pas recevable.";
    }
  } else {
    errorFirstName.textContent =
      "Le prénom que vous avez saisi n'est pas recevable, il ne doit contenir que des lettres";
  }
}

// Fonction qui ecoute la validation du formulaire
let form = document.querySelector("form.cart__order__form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  validForm();
  window.location.href = "./confirmation.html";
});
