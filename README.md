https://gulsumergin.github.io/shopping-site/shopping%20site/ 

Project Summary:

This is a shopping website project that is still in progress for responsive design.
Bootstrap has been used for styling, and the project utilizes a fake external API from https://fakestoreapi.com/docs for product data.
The project involves displaying products, adding them to a cart, and calculating the total amount.

----------------------------------------------------------------------------------------------------

Relevant Code Lines:

Styling and Bootstrap CDN links are included in the <head> of the HTML file.
The main container holds a header with a navigation bar, a search bar, and a product list.
JavaScript code for fetching products, handling searches, updating the cart, and performing actions on the cart items.


----------------------------------------------------------------------------------------------------
(Detailed Explanation)

Fetching and Displaying Products:

The fetchProducts function asynchronously fetches product data from the API and displays them using the displayProducts function.
The fetched products are displayed in cards with the product image, title, price, and an "Add to Cart" button.
Search Functionality:

Users can search for products by entering search terms in the search input field. The performSearch function filters products based on the search term and updates the displayed products accordingly.
The search can be triggered either by clicking the "Search" button or pressing the "Enter" key.

Cart Functionality:

The cart items are stored in the cart array, which is initialized from local storage when the page loads.
Users can add products to the cart by clicking the "Add to Cart" button on a product card. The selected product is added to the cart, and the cart total is updated.
The cart contents are displayed in a modal when the cart button is clicked. Users can also remove items from the cart individually.
The cart notification in the top right corner displays the current number of items in the cart.

Other Functionality:

The updateTotalAmount function calculates and updates the total amount of the cart based on the selected products' prices.
The clearCart function clears all items from the cart and updates the cart display.
The application handles notifications when a product is added to the cart, displaying a success message temporarily.
Event listeners are set up to handle user interactions, such as clicking the search button, clicking on cart buttons, and clicking on "Remove" buttons in the cart.

Additional API Calls:

The commented-out code includes examples of other API calls for fetching categories, limited products, descending products, jewelry products, and deleting a product.
These API calls are intended to demonstrate how to fetch and process data from the API. However, they are not integrated into the main functionality of the application.

HTML Structure:

The HTML structure includes a header with the site's name and cart button, a product list container, a modal for displaying the cart, and a footer with the copyright notice.
Each product card contains the product image, title, price, and "Add to Cart" button.
External Libraries:

The code references external libraries, such as Bootstrap and jQuery, for styling and functionality.
