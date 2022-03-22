// Générer le numéro de commande
let cmd = Date.now();
let htmlSpanCommande = document.getElementById("orderId");
htmlSpanCommande.textContent = cmd;
