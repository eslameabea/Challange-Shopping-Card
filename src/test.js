let button = document.querySelectorAll(".card-title button");
let div = document.querySelector('.count');
let massage = document.querySelector('.massage');

let shop = document.querySelector('.section-cards-list');

fetch('index.json').then(function (result) {
  let MyData = result.json();
  return MyData;
}).then((MyData) => {
  generateShop(MyData)
}).catch(() => {
  console.log('Not Found!');
});

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = function (MyDat) {
  return (shop.innerHTML = MyDat.map(function (x) {
    let { id, img, name, price, des } = x;
    return `
    <li id="${id}">
      <div class="card">
        <img src="${img}" alt="Not Found">
        <div class="card-title">
          <h3>${name}</h3>
          <p>price: <span>${price}$</span></p>
          <button onclick='myFunc(${id})'>
            <p>${des}</p> 
            <ion-icon name="bag-outline"></ion-icon>
          </button>
        </div>
      </div>
    </li>
    `;
  }).join(''));
}

let myFunc = (id) => {
  massage.classList.add('active');
  setTimeout(function () {
    massage.classList.remove('active');
  }, 1000);

  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
}

let update = function (id) {
  let search = basket.find((x) => x.id === id);

  let card = document.querySelector(".count");
  card.innerHTML = search.item;
  calculation();
}

let calculation = function () {
  let card = document.querySelector(".count");
  card.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

calculation();

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