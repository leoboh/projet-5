// Récuperer l'orderId
let orderId = sessionStorage.getItem("orderId");
let htmlSpanCommande = document.getElementById("orderId");
htmlSpanCommande.textContent = orderId;
