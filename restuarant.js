const products = [
    { id: 1, name: 'Burger', price: 10.99, image: 'burger.jpg' },
    { id: 2, name: 'Pizza', price: 15.99, image: 'pizza.jpg' },
    { id: 3, name: 'Spaghetti', price: 10.99, image: 'spaghetti.jpg' },
    { id: 4, name: 'Fries', price: 7.99, image: 'fries.jpg' },
    { id: 5, name: 'Coke', price: 5.99, image: 'coke.jpg' },
    { id: 6, name: 'Chicken', price: 12.99, image: 'chicken.jpg' },
    // add more products here
  ];
  
  let cart = [];
  
  // render products list
  const productList = document.getElementById('product-list');
  products.forEach((product) => {
    const listItem = document.createElement('LI');
    listItem.innerHTML = `
      <h2>${product.name}</h2>
      <img src="${product.image}">
      <!-- other product details -->
  `;
    listItem.dataset.productId = product.id;
    productList.appendChild(listItem);
  });
  
  // add event listener to products list
  productList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      const productId = e.target.dataset.productId;
      const product = products.find((p) => p.id === parseInt(productId));
      addProductToCart(product);
    }
  });
  
  // add product to cart
  function addProductToCart(product) {
    const cartItem = cart.find((item) => item.id === product.id);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
    }
    updateCart();
  }
  
  // update cart
  function updateCart() {const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
  
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
  
    cart.forEach((item) => {
      const cartItemText = document.createElement('span');
      cartItemText.textContent = `${item.name} x ${item.quantity} - $${item.price * item.quantity}`;
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'X';
      deleteButton.addEventListener('click', () => {
        removeProductFromCart(item);
      });
  
      const listItem = document.createElement('li');
      listItem.appendChild(cartItemText);
      listItem.appendChild(deleteButton);
      cartList.appendChild(listItem);
    });
  }
  
  // remove product from cart
  function removeProductFromCart(item) {
    cart = cart.filter((i) => i.id!== item.id);
    updateCart();
  }

  const checkoutButton = document.getElementById("checkout");

  checkoutButton.addEventListener("click", () => {
    // Get the total price
    const total = document.getElementById("total").textContent.split("$")[1];
  
    // Redirect to the checkout page
    window.location.href = 'checkout.html?total=' + total;
  });
  
  document.getElementById('cancel-order').addEventListener('click', () => {
    // Clear the cart list
    const cartList = document.getElementById("cart-list");
    while (cartList.firstChild) {
      cartList.removeChild(cartList.firstChild);
    }
  
    // Clear the cart array
    cart = [];
  
    // Update the total price
    const totalElement = document.getElementById("total");
    totalElement.textContent = "Total: $0.00";
  });
  
// checkout
document.getElementById('checkout').addEventListener('click', () => {
    // Get the total price
    const total = document.getElementById("total").textContent.split("$")[1];
  
    // Redirect to the checkout page
    window.location.href = 'checkout.html?total=' + total;
  });
  
  // Get the total price from the query string
  const urlSearchParams = new URLSearchParams(window.location.search);
  const total = urlSearchParams.get('total');
  
  // Display the total price
  const totalElement = document.getElementById("total");
  totalElement.textContent = "Total: $" + total;

  const db = require('./database');
  
// Get the payment type
const paymentTypeElement = document.getElementById("payment-type");
const paymentType = paymentTypeElement.value;

// payment
document.getElementById('payment-form').addEventListener('submit', (event) => {
    event.preventDefault();
  
    // Get the payment information
    const name = document.getElementById('name').value;
    const paymentType = document.getElementById('payment-type').value;

processPayment(total, paymentType) ;{
    function processPayment(total, paymentType) {
        // Pretend to process payment
        setTimeout(() => {
          // Redirect back to the previous page
          window.location.href = document.referrer;
      
          // Insert the sales data into the sales table
          const sql = 'INSERT INTO sales (product_name, price, payment_type, payment_status) VALUES (?,?,?, "paid")';
          const params = ['Restaurant Design', total, paymentType];
          db.run(sql, params, function(err) {
            if (err) {
              console.error(err.message);
            } else {
              console.log(`Sales data inserted with id ${this.lastID}`);
            }
          });
        }, 2000);
    }
    }});
