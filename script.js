const baseUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const getListUrl = '/catalogData.json';
const getBasketUrl = '/getBasket.json';
const addToBasketUrl = '/addToBasket.json';
const removeFromBasketUrl = '/deleteFromBasket.json';
// 1
let xhr;
function makeGETRequest(url) {
  return new Promise((resolve, reject) => {

    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.responseText);
      }
    }
    xhr.open('GET', url, true);
    xhr.send();

    return Promise;
  })
}

let goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const basketName = 'Добавить в корзину';
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


class Product {
  constructor(title, price) {
    this.title = title;
    this.price = price;

  }


  render() {
    return `
      <div class="goods-list_item">
          <img />
          <span class="heading">${this.title}</span>
          <span class="price">${this.price}</span>
          <a class="button" href="#">${basketName}</a>
      </div>
      `;
  }
}

class Goods {
  constructor(goods) {
    this.goods = goods;
  }
  render(container) {
    let html = '';
    for (let i in this.goods) {
      const goodsItem = this.goods[i];
      html += goodsItem.render();
    }
    container.innerHTML = html;
  }

  transformData(list) {
    return list.map((item) => ({
      title: item.product_name,
      price: item.price,
      id: item.product_name
    }));
  }

  render(container) {
    let html = '';
    for (let i in this.goods) {
      const goodsItem = this.goods[i];
      html += goodsItem.render();
    }
    container.innerHTML = html;
  }

  fetchData() {
    makeGETRequest(`${baseUrl}${getListUrl}`)
      .then((goods) => {
        goods = this.transformData(JSON.parse(xhr.response))
        this.goods = goods
        console.log(goods)
        let items = goods.map((product) => new Product(product.title, product.price))

        let goodsList = new Goods(items);
        let listElement = document.querySelector('.goods-list')
        goodsList.render(listElement);
      })
      .catch(err => { console.log(goods), console.log('err') })
  }



  render(container) {
    let html = '';
    for (let i in this.goods) {
      const goodsItem = this.goods[i];
      html += goodsItem.render();
    }
    container.innerHTML = html;
  }

  rendeTotalSumm() {
    let totalPrice = document.querySelector('.goods-list_total');
    let summPrice = 0;
    this.goods.forEach(good => {
      summPrice += good.price
    });
    console.log(summPrice)
    totalPrice.innerText = `Итого:  ${summPrice}`;
  }


  addInbasket(title) {

  }
  reduceWithoutQuantty(title) {

  }
}



(async () => {

})()


document.addEventListener('DOMContentLoaded', async () => {
  let isBasketOpen = false;
  //const r = await fetch(`${baseUrl}${getListUrl}`);
  //goods = await r.json();
  let items = goods.map((product) => new Product(product.title, product.price))

  let goodsList = new Goods(items);
  let listElement = document.querySelector('.goods-list');
  //insertCode(listElement, renderList(goods));


  goodsList.render(listElement);
  goodsList.fetchData();


  goodsList.rendeTotalSumm();





  const cartBth = document.querySelector('.cart-button');
  const cart = document.querySelector('.basket');

  cartBth.addEventListener('click', () => {
    isBasketOpen = !isBasketOpen;
    cart.style.display = isBasketOpen ? 'block' : 'none';
  });

});


