export async function makePurchase(order) {
    try {
        const response = await fetch('http://localhost:3000/sales/newSale', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        if (!response.ok) {
            const error = await response.json()
            console.error('Error al realizar la compra:', error)
            throw new Error('Error al realizar la compra')
        }

        return await response.json()
    } catch (error) {
        console.error('Error al realizar la compra:', error)
        throw error;
    }
}
