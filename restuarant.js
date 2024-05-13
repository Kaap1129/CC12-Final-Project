/ products data
const products = [
    { id: 1, name: 'Burger', price: 10.99, image: 'burger.jpg' },
    { id: 2, name: 'Pizza', price: 15.99, image: 'pizza.jpg' },
    { id: 3, name: 'Spaghetti', price: 10.99, image: 'spaghetti.jpg' },
    { id: 4, name: 'Fries', price: 7.99, image: 'fries.jpg' },
    { id: 5, name: 'Coke', price: 5.99, image: 'coke.jpg' },
    { id: 6, name: 'Chicken', price: 12.99, image: 'chicken.jpg' },
    // add more products here
];

//cart data
let cart = []

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
})

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
function updateCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    cart.forEach((item) => {
        const listItem = document.createElement('li');
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        listItem.appendChild(img);
        const cartItemText = document.createElement('span');
        cartItemText.textContent = `${item.name} x ${item.quantity} - $${item.price * item.quantity}`;
        listItem.appendChild(cartItemText);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            cart = cart.filter((cartItem) => cartItem.id!== item.id);
            updateCart();
        });
        listItem.appendChild(deleteButton);
        cartList.appendChild(listItem);
    });

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}

// checkout
document.getElementById('checkout').addEventListener('click', () => {
    // send cart data to server to process payment
    console.log('Checkout clicked!');
    // TO DO: implement payment processing logic here
});

const checkoutButton = document.getElementById('checkout');
checkoutButton.addEventListener('click', async () => {
    const response = await fetch('/create-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cart })
    });
    const { orderId } = await response.json();
});


    const mysql = require('mysql');

    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'your_username',
      password: 'your_password',
      database: 'your_database'
    });
    
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected to MySQL database!');
    });
