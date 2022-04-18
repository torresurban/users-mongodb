const UserRepository = require('../repositorios/users.repositorios')
const repositorio = new UserRepository()

const findById = async (id) => {
    return await repositorio.findById(id)
}

// const findByEmail = async (email) => {
//     return await repositorio.findByEmail(email)
// }

// const findAll = async () => {
//     return await repositorio.findAll()
// }

const findAll = async (filter, options) => {
    return await repositorio.findAllWithPagination(filter, options)
}

const save = async (user) => {
    return await repositorio.save(user)
}

const update = async (id, user) => {
    return await repositorio.update(id, user)
}

const remove = async (id) => {
    return await repositorio.remove(id)
}

module.exports = {
    findById,
    //findByEmail,
    findAll,
    save,
    update,
    remove
}