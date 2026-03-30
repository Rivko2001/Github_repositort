const pizzas = [
    "img/pasta1.JPG",
    "img/pasta.jpeg",
    "img/pizza2.jpeg", 
    "img/pizza_joost.JPG",
    "img/napels_pizza.jpeg"
];

let huidigeIndex = 0;

const pizzaFoto = document.getElementById("pizzaFoto");
const pizzaKnop = document.getElementById("pizzaKnop");

pizzaKnop.addEventListener("click", function () {

    huidigeIndex = (huidigeIndex + 1) % pizzas.length;

    pizzaFoto.src = pizzas[huidigeIndex];

});