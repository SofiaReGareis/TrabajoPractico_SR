const btnLogin = document.getElementById('btnLogin') //click del boton
import { addSession } from "../utils/sessionStorage.controller.js"

const auth = async ({ name, pass }) => {
    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "username": name, "pass": pass })
        })

        if (!response.ok) {
            throw new Error("Error en la petición")
            //no iniciar sesion, actualmente ingresa a la pagina sigueinte pero no se guarda correctamente el ss
        }

        const user = await response.json()

        return user

    } catch (error) {
        console.error("Error:", error)
        alert("Error en la autenticación: " + error.message)
    }
}

btnLogin.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del botón de submit

    try {
        const nameField = document.getElementById('txtName')
        const passField = document.getElementById('txtPass')

        if (!nameField || !passField) {
            alert('Error interno: Campos de entrada no encontrados.')
            return;
        }

        const name = nameField.value.trim()
        const pass = passField.value.trim()

        if (!name || !pass) {
            alert('Hay campos incompletos')
            return;
        }

        const user = await auth({ name, pass })

        if (!user) {
            alert('Autenticación fallida. Por favor, verifique sus credenciales.')
            return;
        }

        addSession(user)
        window.location.href = "../pages/home/"
    } catch (error) {
        console.error("Error durante la autenticación:", error)


        if (error.message.includes('NetworkError')) {
            alert("Error de red. Por favor, verifique su conexión a Internet e inténtelo de nuevo.")
        } else {
            alert("Hubo un error durante la autenticación. Por favor, inténtelo de nuevo.")
        }
    }
})