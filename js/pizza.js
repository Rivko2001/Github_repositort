const pizzas = [
  "img/eten/napels_pizza_opt.jpg",
  "img/eten/pasta_opt.jpg",
  "img/eten/pasta1_opt.jpg",
  "img/eten/pizza2_opt.jpg",
  "img/eten/pizza_joost.JPG",
  "img/eten/pizza3_opt.jpg",
];

let huidigeIndex = 0;

const pizzaFoto = document.getElementById("pizzaFoto");
const pizzaKnop = document.getElementById("pizzaKnop");

pizzaKnop.addEventListener("click", function () {

    huidigeIndex = (huidigeIndex + 1) % pizzas.length;

    pizzaFoto.src = pizzas[huidigeIndex];

});