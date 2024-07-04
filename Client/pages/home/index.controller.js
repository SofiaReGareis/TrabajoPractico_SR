import { getSession } from "../../utils/sessionStorage.controller.js";

const txtSaludo = document.getElementById('txtSaludo')

const user = getSession('user')

txtSaludo.textContent = user.nombre + ' ' + user.apellido + '!'

btnLogout.addEventListener('click', () => {
    sessionStorage.removeItem('user')
    window.location.href = '../../index.html'
})