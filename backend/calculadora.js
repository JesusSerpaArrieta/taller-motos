/**
 * Función que suma dos números
 * @param {number} numero1 
 * @param {number} numero2 
 * @returns {number} resultado de la suma
 */
function sumar(numero1, numero2) {
  const resultado = numero1 + numero2;
  return resultado;
}
/**
 * Función que resta dos números
 * @param {number} numero1 
 * @param {number} numero2 
 * @returns {number} resultado de la resta
 */
function restar(numero1, numero2) {
  const resultado = numero1 - numero2;
  return resultado;
}
/**
 * Función que multiplica dos números
 * @param {number} numero1 
 * @param {number} numero2 
 * @returns {number} resultado de la multiplicación
 */
function multiplicar(numero1, numero2) {
  const resultado = numero1 * numero2;
  return resultado;
}
/**
 * 
 * @param {number} numero1 
 * @param {number} numero2 
 * @returns {number} resultado de la división
 */
function dividir(numero1, numero2) {
  const resultado = numero1 / numero2;
  return resultado;
}

module.exports = {
  sumar, restar, multiplicar, dividir
};
