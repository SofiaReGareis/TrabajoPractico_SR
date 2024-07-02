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
    event.preventDefault() // Prevenir el comportamiento por defecto del botón de submit(me daba error al iniciar el html)

    try {
        const name = document.getElementById('txtName').value
        const pass = document.getElementById('txtPass').value

        if (name !== '' && pass !== '') {
            const user = await auth({ name, pass })
            addSession(user)
            window.location.href = "../pages/home/"
        } else {
            alert('Hay campos incompletos')
        }
    } catch (error) {
        console.error("Error durante la autenticación:", error)
        alert("Hubo un error durante la autenticación. Por favor, inténtelo de nuevo.")
    }
})