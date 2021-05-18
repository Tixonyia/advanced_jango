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

const makeGETRequest = (url, callback) => {
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr.responseText)
    }
  }
  xhr.open('GET', url, true);
  xhr.send();
};

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app',
    data: {
      goods: [],
      query: '',
      basketName: 'Добавить в корзину'
    },
    methods: {
      fetchData() {
        makeGETRequest(`${baseUrl}${getListUrl}`, (data) => {
          data = JSON.parse(data);
          this.goods = this.transformData(data);
        });
      },
      transformData(list) {
        return list.map((item) => ({
          title: item.product_name,
          price: item.price,
          id: item.product_name
        }));
      }
    },

    computed: {
      filteredGoods() {
        return this.goods.filter((product) => (new RegExp(this.query, 'i')).test(product.title));
      }
    },

    created() {
      this.fetchData();
    }
  });
});
