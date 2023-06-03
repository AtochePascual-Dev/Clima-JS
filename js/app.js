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
    mostrarAlerta('Todos los campos son obligatorios')
  }

};



// * Muestra un mensaje en pantalla
const mostrarAlerta = (mensaje) => {
  const existeAlerta = document.querySelector('.alerta');

  if (!existeAlerta) {
    const alerta = document.createElement('div');
    alerta.textContent = mensaje;
    alerta.className = "bg-red-100 border-red-400 text-red-700 px-4 py-3 rounder max-w-md mx-auto mt-6 text-center font-bold alerta";

    container.appendChild(alerta);

    // eliminamos la alerta
    setTimeout(() => {
      alerta.remove();
    }, 2000);
  }
};