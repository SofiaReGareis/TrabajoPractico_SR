import { readFile } from 'fs/promises'

const fileUsuarios = await readFile('./data/usuarios.json', 'utf-8')
const userData = JSON.parse(fileUsuarios)

export const get_user_byId = (id) => {
    return userData.find(e => e.id === id)
}