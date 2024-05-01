let label = document.querySelector(".text-center");
let shoppingCart = document.querySelector(".shopping-cart");

let Data = [
  {
    "id": "one",
    "name": "Chicken Masala",
    "img": "img/food-menu-5.png",
    "price": 79,
    "des": "Add The Card"
  },
  {
    "id": "two",
    "name": "Burger Kingo",
    "img": "img/food-menu-4.png",
    "price": 59,
    "des": "Add The Card"
  },
  {
    "id": "three",
    "name": "Maxican Pizza",
    "img": "img/food-menu-1.png",
    "price": 46,
    "des": "Add The Card"
  },
  {
    "id": "four",
    "name": "Soft Drinks",
    "img": "img/promo-2.png",
    "price": 105,
    "des": "Add The Card"
  },
  {
    "id": "five",
    "name": "French Fry",
    "img": "img/promo-3.png",
    "price": 95,
    "des": "Add The Card"
  },
  {
    "id": "sex",
    "name": "fruits & vegetables",
    "img": "img/promo-5.png",
    "price": 1400,
    "des": "Add The Card"
  },
  {
    "id": "seven",
    "name": "fried eggs",
    "img": "img/promo-4.png",
    "price": 1700,
    "des": "Add The Card"
  }
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = function () {
  let card = document.querySelector(".count");
  card.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

calculation();

let generateCartItem = function () {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket.map((x) => {
      let { id, item } = x;
      let search = Data.find((i) => i.id === id) || [];

      return `
        <div class="cart-item" id="${id}">
          <img src="${search.img}" alt="Not Found">
          <div class="details">
            <div class="title-price-x">
              <div>
                <h4>${search.name}</h4>
                <p>${search.price}$</p>
              </div>
              <button onclick='removeItem(${id})'>
                <ion-icon name="close-outline"></ion-icon>
              </button>
            </div>
            <div class="cart-item-two">
              <ion-icon name="remove-outline"></ion-icon>
              <p>${item}</p>
              <ion-icon name="add-outline"></ion-icon>
            </div>
            <div class="total-price">
              <p>Total Price: <span>${item * search.price}$</span></p>
            </div>
          </div>
        </div>
      `;
    }).join(''));
  } else {
    label.innerHTML = `
      <h2>Card is empty</h2>
      <a href="index.html">
        <button class="HomeBtn">
          Back to home
          <ion-icon name="home-outline"></ion-icon>
        </button>
      </a>
    `;
    shoppingCart.innerHTML = ``;
  }
}

generateCartItem();

let removeItem = function (id) {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItem();
  totalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
}

let totalCard = document.querySelector(".total-cart");

let totalAmount = function () {
  if (basket.length !== 0) {
    let amount = basket.map((x) => {
      let { id, item } = x;

      let search = Data.find((x) => x.id === id);
      return item * search.price;
    }).reduce((x, y) => x + y, 0);

    return totalCard.innerHTML = `
    <div class="total">
      <p>Total Cards: ${amount} $</p>
      <div>
        <button class="clear-btn" onclick="clearCard()">Clean Card</button>
        <button class="Order-btn">Order Now</button>
      </div>
    </div>
    `;
  } else return totalCard.innerHTML = `
  <div class="total">
    <p>Total Cards: 0 $</p>
    <div>
      <button class="clear-btn" onclick="clearCard()">Clean Card</button>
      <button class="Order-btn">Order Now</button>
    </div>
  </div>
  `;
}

totalAmount();

let clearCard = function () {
  basket = [];
  generateCartItem();
  localStorage.clear();
  totalAmount();
  calculation();
}

let sunny = document.querySelector('.sunny');
let moon = document.querySelector('.moon');
let root = document.querySelector(':root');

let Mode = function () {
  sunny.addEventListener('click', function () {
    moon.classList.add('active');
    sunny.classList.add('active');
    root.classList.add('active');
  });

  moon.addEventListener('click', function () {
    moon.classList.remove('active');
    sunny.classList.remove('active');
    root.classList.remove('active');
  });
}

Mode();

let header = document.querySelector('header');
let btnTop = document.querySelector('.btn-top')

window.addEventListener('scroll', function () {
  if (this.scrollY >= 50) {
    header.classList.add('active');
    btnTop.classList.add('top');
  } else {
    header.classList.remove('active');
    btnTop.classList.remove('top');
  }

  btnTop.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })
});