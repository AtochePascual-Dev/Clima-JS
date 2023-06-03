// * VARIABLES
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');



// * EVENTOS
// * Cuando el documento esta listo
document.addEventListener('DOMContentLoaded', () => {
  formulario.addEventListener('submit', buscarClima);
});



// * FUNCIONES
// * Busca un clima
const buscarClima = (event) => {
  event.preventDefault();

  // Obtenemos los valores de los imputs
  const ciudad = document.querySelector('#ciudad').value.trim();
  const pais = document.querySelector('#pais').value.trim();

  // validamos si la infomacion contiene vacio
  if ([ciudad, pais].includes('')) {

  }

};