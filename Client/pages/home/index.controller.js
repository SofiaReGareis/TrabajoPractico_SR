import { getSession } from "../../utils/sessionStorage.controller.js";

const txtSaludo = document.getElementById('txtSaludo')

const user = getSession('user')

txtSaludo.textContent = user.nombre + ' ' + user.apellido + '!'