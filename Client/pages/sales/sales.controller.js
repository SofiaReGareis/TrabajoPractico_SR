import { makePurchase } from "../../api/sales.api.js";

// Función para cargar productos del carrito y mostrarlos en la página
function loadCartProducts() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Limpiar la lista antes de agregar nuevos productos

    if (cartItems.length > 0) {
        cartItems.forEach(product => {
            const cartItem = document.createElement('tr');
            cartItem.innerHTML = `
                <td class="px-6 py-4 whitespace-no-wrap">${product.nombre}</td>
                <td class="px-6 py-4 whitespace-no-wrap">${product.desc}</td>
                <td class="px-6 py-4 whitespace-no-wrap">$${product.precio}</td>
                <td class="px-6 py-4 whitespace-no-wrap">${product.quantity}</td>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    } else {
        cartItemsContainer.innerHTML = '<tr><td colspan="4" class="text-center">El carrito está vacío</td></tr>';
    }
}

// Función para manejar la compra
async function handlePurchase() {
    const address = document.getElementById('address').value;
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const user = JSON.parse(sessionStorage.getItem('user')); // Asumiendo que el usuario está almacenado en sessionStorage

    const order = {
        user: user,
        address: address,
        date: new Date().toISOString().split('T')[0], // Fecha actual
        products: cartItems
    };

    try {
        const purchaseResponse = await makePurchase(order);
        alert('Compra realizada con éxito');
        localStorage.removeItem('cart'); // Limpiar el carrito después de la compra
        window.location.href = '../home/index.html'; // Redirigir al inicio
    } catch (error) {
        alert('Error al realizar la compra');
    }
}

// Añadir evento al botón de compra
document.getElementById('buyButton').addEventListener('click', handlePurchase);

// Cargar productos del carrito al cargar la página
window.addEventListener('load', loadCartProducts);
