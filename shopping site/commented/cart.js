
// // cart.js
// // Load the saved cart data from local storage
// const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

// // Get the cart items container element
// const cartItemsElement = document.getElementById('cart-items');

// // Display cart items on the cart page
// function displayCartItems(cartItems) {

//   cartItemsElement.innerHTML = ''; // Önce mevcut içeriğimi temizle

//     cartItems.forEach(item => {
//         const cartItemElement = document.createElement('div');
//         cartItemElement.classList.add('col-md-4', 'mb-4');

//         const productCard = document.createElement('div');
//         productCard.classList.add('card');

//         const productImage = document.createElement('img');
//         productImage.src = item.image;
//         productImage.classList.add('card-img-top');

//         const cardBody = document.createElement('div');
//         cardBody.classList.add('card-body');

//         const productTitle = document.createElement('h5');
//         productTitle.classList.add('card-title');
//         productTitle.textContent = item.title;

//         const productPrice = document.createElement('p');
//         productPrice.classList.add('card-text');
//         productPrice.textContent = `Price: ${item.price}`;

//         cardBody.appendChild(productTitle);
//         cardBody.appendChild(productPrice);

//         productCard.appendChild(productImage);
//         productCard.appendChild(cardBody);

//         cartItemElement.appendChild(productCard);
//         cartItemsElement.appendChild(cartItemElement);
//     });

//     updateTotalAmount(cartItems); // Update total amount display
// }

// // Display saved cart items on the cart page
// if (savedCart) {
//     displayCartItems(savedCart);
// }


// // Sepeti güncelleme fonksiyonu
// function updateCart() {
//   const modalBody = document.querySelector('.modal-body');
//   modalBody.innerHTML = '';

//   cart.forEach((item, index) => {
//       const cartItemElement = document.createElement('div');
//       cartItemElement.classList.add('cart-item');
//       cartItemElement.textContent = `${item.title} - ${item.price} TL`;

//       const deleteButton = document.createElement('button');
//       deleteButton.textContent = 'Sil';
//       deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
//       deleteButton.addEventListener('click', () => {
//           removeFromCart(index);
//       });

//       cartItemElement.appendChild(deleteButton);
//       modalBody.appendChild(cartItemElement);
//   });

//   updateCartTotal();
// }

// // Sepetten ürünü çıkarma işlevi
// function removeFromCart(itemId) {
//   const updatedCart = savedCart.filter(item => item.id !== itemId);
//   localStorage.setItem('cart', JSON.stringify(updatedCart));
//   displayCartItems(updatedCart);
// }

// // Sepetteki ürünlerin toplam tutarını hesaplama işlevi
// function calculateTotalPrice(cartItems) {
//   return cartItems.reduce((total, item) => total + item.price, 0);
// }

// // Toplam tutar elementini güncelleme işlevi
// function updateTotalAmount(cartItems) {
//   const totalPrice = calculateTotalPrice(cartItems);
//   const totalAmountElement = document.querySelector('.total-amount'); // Get total amount element
//   totalAmountElement.textContent = `${totalPrice.toFixed(2)} TL`;
// }

// // Sepet sayfasını güncelleme
// function updateCartPage(cartItems) {
//   displayCartItems(cartItems);
// }

// // Çıkar butonlarını dinleme ve sepette ürünü çıkarma
// cartItemsElement.addEventListener('click', event => {
//   if (event.target.classList.contains('remove-button')) {
//       const itemId = parseInt(event.target.getAttribute('data-id'));
//       removeFromCart(itemId);
//   }
// });


// // Sepet sayfasını güncelle
// if (savedCart) {
//   updateCartPage(savedCart);
// }
