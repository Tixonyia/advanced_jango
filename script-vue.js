const baseUrl = '';
const getListUrl = '/catalogData';
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
  let xhr;
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
const makePOSTRequest = (url, data, callback) => {
  let xhr;

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr.responseText);
    }
  }

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  xhr.send(data);
};

document.addEventListener('DOMContentLoaded', () => {
  Vue.component('GoodsList', {
    template:
      `<div class="goods-list">
        <div v-for="(item, i) in filteredGoods" class="goods-list_item">
            <img />
            <span class="heading">{{ item.title }}</span>
            <span class="price">{{ item.price }}</span>
            <a class="button" href='#' @click= "() => addToCard(item)">{{ basketName[i] }}</a>
          </div>
        </div>`,
    props: {
      goods: {
        type: Array,
        default: () => []
      },
      should: {
        type: Boolean
      },

    },
    data() {
      return {
        query: '',
        basketList: []
      };
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
      },
      addToCart(item) {
        makePOSTRequest('/addToCart', JSON.stringify(item), () => {
          this.basketList.push(item.id);
        })
      }
    },

    computed: {
      filteredGoods() {
        return this.goods.filter((product) => (new RegExp(this.query, 'i')).test(product.title));
      },
      basketName() {
        return this.goods.map(item => this.basketList.includes(item.id) ? 'Удалить' : "Добавить")
      },
    },

    created() {
      this.fetchData();
    },
    watch: {
      should: (a, b) => { console.log("wather", a, b) }
      ,
    }
  });
  const app = new Vue({
    el: '#app',
    data: {
      should: false,
      goodsList: [
        { title: 'Shirt', price: 150 },
        { title: 'Socks', price: 50 },
        { title: 'Jacket', price: 350 },
        { title: 'Shoes', price: 250 },
      ],
    },
    methods: {
      handleLoadClick() {
        this.should = true
      },
    },
  });
});
