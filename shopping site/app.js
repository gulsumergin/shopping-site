document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.querySelector('.product-list');
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const cartButton = document.querySelector('.cart-button');
    const cartNotification = document.querySelector('.cart-notification');
    const modalBody = document.querySelector('.modal-body');
    const clearCartButton = document.querySelector('.btn-clear-cart'); // "Sepeti Temizle" düğmesini seçtim

    const data = [];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Restore cart data when the page loads
    updateCart();
    updateCartNotification();

    async function fetchProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const responseData = await response.json();
            data.push(...responseData);
            displayProducts(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Function to display products
    function displayProducts(products) {
        const productContainer = document.querySelector('.product-list');
        productContainer.innerHTML = '';

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('col-md-4', 'mb-4');
            productCard.innerHTML = `
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.price} TL</p>
                        <button class="btn btn-primary btn-add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;

            productContainer.appendChild(productCard);

            // Event listener for the created button
            const addToCartButton = productCard.querySelector('.btn-add-to-cart');
            addToCartButton.addEventListener('click', () => {
                const productId = addToCartButton.getAttribute('data-id');
                const selectedProduct = data.find(product => product.id === parseInt(productId));
                if (selectedProduct) {
                    addToCart(selectedProduct);
                } else {
                    console.log('Product not found.');
                }
            });
        });
    }

    // Search function
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = data.filter(product => product.title.toLowerCase().includes(searchTerm));
        displayProducts(filteredProducts);
    }

    searchButton.addEventListener('click', () => {
        performSearch();
    });

    searchInput.addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    // Update the cart
    function updateCart() {
        modalBody.innerHTML = '';
    
        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            
            const productInfo = document.createElement('div');
            productInfo.classList.add('product-info');
            productInfo.textContent = `${item.title} - ${item.price} TL`;
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Remove';
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
            deleteButton.addEventListener('click', () => {
                removeFromCart(index);
            });
    
            cartItemElement.appendChild(productInfo);
            cartItemElement.appendChild(deleteButton);
            modalBody.appendChild(cartItemElement);
        });
    
        updateTotalAmount(cart);
    }
    

    // Add product to cart
    function addToCart(selectedProduct) {
        cart.push(selectedProduct);
        localStorage.setItem('cart', JSON.stringify(cart));

        const notification = document.createElement('div');
        notification.classList.add('alert', 'alert-success', 'mt-3');
        notification.textContent = `${selectedProduct.title} added to cart!`;
        document.body.appendChild(notification);

        setTimeout(() => {
            document.body.removeChild(notification);
        }, 2000);

        updateCart();
        updateCartNotification();
    }

    // Remove product from cart
    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
        updateCartNotification();
    }

    // Function to clear the cart when "Clear Cart" button is clicked
    clearCartButton.addEventListener('click', () => {
        clearCart();
    });

    function clearCart() {
        cart.length = 0;
        localStorage.removeItem('cart');
        updateCart();
        updateCartNotification();
    }

    // Update cart notification
    function updateCartNotification() {
        cartNotification.textContent = cart.length;
    }

    // Update total amount
    function updateTotalAmount(cartItems) {
        const totalAmountElement = document.querySelector('.total-amount');
        const totalPrice = calculateTotalPrice(cartItems);
        totalAmountElement.textContent = `Total: ${totalPrice.toFixed(2)} TL`;
    }

    // Calculate total price
    function calculateTotalPrice(cartItems) {
        return cartItems.reduce((total, item) => total + item.price, 0);
    }

    // Update the cart when the cart button is clicked
    cartButton.addEventListener('click', () => {
        updateCart();
    });

    // Fetch products
    fetchProducts();
});




// // Verileri çekme ve diğer işlemler
// async function fetchAndProcessData() {
//     try {
//         // Ürünleri çek
//         const response = await fetch('https://fakestoreapi.com/products');
//         const responseData = await response.json();
//         data.push(...responseData);
//         displayProducts(data);

//         // Diğer işlemler
//         await fetchCategories();
//         await fetchLimitedProducts();
//         await fetchDescendingProducts();
//         await fetchJeweleryProducts();
//         await deleteProduct();
//     } catch (error) {
//         console.error('Veri çekme hatası:', error);
//     }
// }

// // Diğer HTTP istekleri

// async function fetchCategories() {
//     try {
//         const res = await fetch('https://fakestoreapi.com/products/categories');
//         const json = await res.json();
//         console.log(json);
//     } catch (error) {
//         console.error('Veri çekme hatası:', error);
//     }
// }

// async function fetchLimitedProducts() {
//     try {
//         const res = await fetch('https://fakestoreapi.com/products?limit=5');
//         const json = await res.json();
//         console.log(json);
//     } catch (error) {
//         console.error('Veri çekme hatası:', error);
//     }
// }

// async function fetchDescendingProducts() {
//     try {
//         const res = await fetch('https://fakestoreapi.com/products?sort=desc');
//         const json = await res.json();
//         console.log(json);
//     } catch (error) {
//         console.error('Veri çekme hatası:', error);
//     }
// }

// async function fetchJeweleryProducts() {
//     try {
//         const res = await fetch('https://fakestoreapi.com/products/category/jewelery');
//         const json = await res.json();
//         console.log(json);
//     } catch (error) {
//         console.error('Veri çekme hatası:', error);
//     }
// }

// async function deleteProduct() {
//     try {
//         const res = await fetch('https://fakestoreapi.com/products/6', {
//             method: "DELETE"
//         });
//         const json = await res.json();
//         console.log(json);
//     } catch (error) {
//         console.error('Veri çekme hatası:', error);
//     }
// }

// // Verileri çekme ve diğer işlemleri başlat
// fetchAndProcessData();






// // Verileri çekme  (burayı güncelledim yukarıda)
// fetch('https://fakestoreapi.com/products')
//     .then(response => response.json())
//     .then(responseData => {
//         data.push(...responseData);
//         displayProducts(data);
//     })
//     .catch(error => {
//         console.error('Veri çekme hatası:', error);
//     });

// // Sepete ekleme butonlarına tıklama işlemi
// addToCartButtons.forEach(button => {
//     button.addEventListener('click', event => {
//         const productId = event.target.getAttribute('data-id');
//         const selectedProduct = data.find(product => product.id === parseInt(productId));
//         if (selectedProduct) {
//             addToCart(selectedProduct);
//         } else {
//             console.log('Ürün bulunamadı.');
//         }
//     });
// });

// // Diğer HTTP istekleri
// fetch('https://fakestoreapi.com/products/categories')
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(error => {
//         console.error('Veri çekme hatası:', error);
//     });

// fetch('https://fakestoreapi.com/products?limit=5')
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(error => {
//         console.error('Veri çekme hatası:', error);
//     });

// fetch('https://fakestoreapi.com/products?sort=desc')
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(error => {
//         console.error('Veri çekme hatası:', error);
//     });

// fetch('https://fakestoreapi.com/products/categories')
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(error => {
//         console.error('Veri çekme hatası:', error);
//     });

// fetch('https://fakestoreapi.com/products/category/jewelery')
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(error => {
//         console.error('Veri çekme hatası:', error);
//     });

// fetch('https://fakestoreapi.com/products/6', {
//     method: "DELETE"
// })
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(error => {
//         console.error('Veri çekme hatası:', error);
//     


//



