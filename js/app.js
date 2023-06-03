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
    mostrarAlerta('Todos los campos son obligatorios');
    return;
  }

  consultarApi(ciudad, pais);

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



// * Realiza una consulta a la API
const consultarApi = (ciudad, pais) => {
  const appId = "bdb137a7be80a9e65889b73b0a258937";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  spinner();

  fetch(URL)
    .then(respuesta => respuesta.json())
    .then(datos => {
      limpiarHtml();

      if (datos.cod === '404') {
        mostrarAlerta('Ciudad no encontrada');
        return;
      }

      mostrarClima(datos);

      formulario.reset();
    })
};



// * Muestr el clima en pantalla
const mostrarClima = (datos) => {
  const { name, main: { temp, temp_max, temp_min } } = datos;
  const temperatura = convertirCentigrados(temp);
  const temperaturaMax = convertirCentigrados(temp_max);
  const temperaturaMin = convertirCentigrados(temp_min);

  const tenperaturaHtml = document.createElement('p');
  tenperaturaHtml.innerHTML = `${temperatura} &#8451;`;
  tenperaturaHtml.classList.add('font-bold', 'text-6xl');

  const resultadoDiv = document.createElement('div');
  resultadoDiv.classList.add('text-center', 'text-white');

  const temperatutaMaxHtml = document.createElement('p');
  temperatutaMaxHtml.innerHTML = `Max: ${temperaturaMax} &#8451;`;
  temperatutaMaxHtml.classList.add('text-xl')

  const temperatutaMinHtml = document.createElement('p');
  temperatutaMinHtml.innerHTML = `Min: ${temperaturaMin} &#8451;`;
  temperatutaMinHtml.classList.add('text-xl')

  const nombreCiudad = document.createElement('p');
  nombreCiudad.textContent = `Clima en ${name}`;
  nombreCiudad.classList.add('font-bold', 'text-2xl')

  resultadoDiv.append(nombreCiudad, tenperaturaHtml, temperatutaMaxHtml, temperatutaMinHtml);

  resultado.appendChild(resultadoDiv);
};



// * Convierte a grados centigrados
const convertirCentigrados = (temperatura) => parseInt(temperatura - 273.15);



// * Limpia el html previo
const limpiarHtml = () => {
  while (resultado.firstChild) {
    resultado.firstChild.remove();
  }
};



// * Muestra un spinner
const spinner = () => {

  limpiarHtml();

  const divSpinner = document.createElement('div');
  divSpinner.classList.add('sk-fading-circle');
  divSpinner.innerHTML = `
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
  `;

  resultado.appendChild(divSpinner);
};