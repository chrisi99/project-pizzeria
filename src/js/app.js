import {settings, select, classNames, templates} from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';

const app = {
  initMenu: function(){
    const thisApp = this;
    console.log('thisApp.data:', thisApp.data);
    
    thisApp.data.products.forEach(function(product){
      new Product(product.id, product);
    });
  },

  initData: function(){
    const thisApp = this;

    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.products;

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then (function(parsedReposne){
        console.log('parsedResponse', parsedReposne);

        thisApp.data.products = parsedReposne;

        app.initMenu();
        console.log(thisApp.data.products);
      });

    console.log('thisApp.data', JSON.stringify(thisApp.data));
  },

  initCart: function(){
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);

    thisApp.productList.addEventListener('add-to-cart', function(event){
      app.cart.add(event.detail.product);
    });
  },

  init: function(){
    const thisApp = this;
    console.log('*** App starting ***');
    console.log('thisApp:', thisApp);
    console.log('classNames:', classNames);
    console.log('settings:', settings);
    console.log('templates:', templates);
    
    thisApp.initData();
    thisApp.initCart();
  },
};

app.init();

