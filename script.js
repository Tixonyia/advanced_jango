const baseUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const getListUrl = '/catalogData.json';
const getBasketUrl = '/getBasket.json';
const addToBasketUrl = '/addToBasket.json';
const removeFromBasketUrl = '/deleteFromBasket.json';

let goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const renderList = (items) => {
  return items.map(item => {
    const isAdded = true;
    const basketName = isAdded ? 'Добавить в корзину' : 'Убрать из корзины';
    const basketUrl = isAdded ? `${baseUrl}${addToBasketUrl}` : `${baseUrl}${removeFromBasketUrl}`;
    return `
      <div class="goods-list_item">
          <img />
          <span class="heading">${item.product_name}</span>
          <a class="button" href="${basketUrl}">${basketName}</a>
      </div>
      `;
  }).join('');
};

const insertCode = (container, html) => {
  container.innerHTML = html;
};

(async () => {

})()


document.addEventListener('DOMContentLoaded', async () => {
  let isBasketOpen = false;
  const r = await fetch(`${baseUrl}${getListUrl}`);
  goods = await r.json();
  console.log(goods);
  const listElement = document.querySelector('.goods-list');
  insertCode(listElement, renderList(goods));

  const cartBth = document.querySelector('.cart-button');
  const cart = document.querySelector('.basket');

  cartBth.addEventListener('click', () => {
    isBasketOpen = !isBasketOpen;
    cart.style.display = isBasketOpen ? 'block' : 'none';
  });

});


