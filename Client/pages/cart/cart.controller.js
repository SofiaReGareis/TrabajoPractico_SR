import { getProducts } from "../../api/products.api.js";

// Función para cargar todos los productos y mostrarlos en la página
async function loadProducts() {
    try {
        const products = await getProducts();
        const productList = document.getElementById('productList');
        productList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos productos

        if (products && products.length > 0) {
            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item', 'p-4', 'border', 'rounded', 'shadow-sm', 'mb-4');
                productItem.innerHTML = `
                    <h3 class="font-bold">${product.nombre}</h3>
                    <p>${product.desc}</p>
                    <p>$${product.precio}</p>
                    <button class="add-to-cart bg-yellow-500 text-white px-4 py-2 rounded mt-2" data-id="${product.id}">Añadir al carrito</button>
                `;
                productList.appendChild(productItem);
            });

            // Añadir evento a todos los botones de "Añadir al carrito"
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', addToCart);
            });
        } else {
            productList.innerHTML = '<p class="text-center">No hay productos disponibles</p>';
        }
    } catch (error) {
        console.error('Error al mostrar los productos: ', error);
    }
}

// Función para cargar productos del carrito y mostrarlos en la página
function loadCartProducts() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos productos

    if (cartItems.length > 0) {
        cartItems.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'p-4', 'border', 'rounded', 'shadow-sm', 'mb-4');
            cartItem.innerHTML = `
                <h3 class="font-bold">${product.nombre}</h3>
                <p>${product.desc}</p>
                <p>$${product.precio}</p>
                <p>Cantidad: ${product.quantity}</p>
                <button class="remove-from-cart bg-lime-500 text-white px-4 py-2 rounded mt-2" data-id="${product.id}">Quitar del carrito</button>
            `;
            cartList.appendChild(cartItem);
        });

        // Añadir evento a todos los botones de "Quitar del carrito"
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    } else {
        cartList.innerHTML = '<p class="text-center">El carrito está vacío</p>';
    }
}

// Función para añadir productos al carrito y guardarlos en localStorage
function addToCart(event) {
    const button = event.target;
    const productId = button.getAttribute('data-id');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verificar si el producto ya está en el carrito
    const productInCart = cart.find(product => product.id === productId);
    if (productInCart) {
        productInCart.quantity += 1; // Incrementar la cantidad
    } else {
        const product = {
            id: productId,
            nombre: button.parentElement.querySelector('h3').innerText,
            desc: button.parentElement.querySelector('p:nth-of-type(1)').innerText,
            precio: parseFloat(button.parentElement.querySelector('p:nth-of-type(2)').innerText.replace('$', '')),
            quantity: 1
        };
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto añadido al carrito');
    loadCartProducts();
}

// Función para quitar productos del carrito y actualizar localStorage
function removeFromCart(event) {
    const button = event.target;
    const productId = button.getAttribute('data-id');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart = cart.filter(product => product.id !== productId);

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto eliminado del carrito');
    loadCartProducts();
}

// Cargar productos al cargar la página
window.addEventListener('load', () => {
    loadProducts();
    loadCartProducts();
});
