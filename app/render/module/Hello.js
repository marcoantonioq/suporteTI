'use stric'
/**
 * Retorna Ola Mundo!!!
 *
 * @returns {string} Ola mundo
 */

const Hello = () => {
    return BemVindo()
}

const BemVindo = (name) => {
    return `
    <h1>Ola Mundo!!!</h1>
    Ola ${name}!!! Seja bem vindo!!!
    `
}

module.exports = Hello;